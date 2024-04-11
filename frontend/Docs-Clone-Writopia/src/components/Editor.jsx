import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'

import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom';

export default function Editor() {

  const {id}  = useParams();
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const [] = useState();
  const [Quilltext, setQuillText] = useState();

  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket_client = io("http://localhost:9000");
    setSocket(socket_client);
    return () => { //  clean up on unmount(component) so that server dont get connected always:
      socket_client.disconnect();
    }
  }, [])



  useEffect(() => {
    const quillEditor = new Quill('#editor', { theme: 'snow', modules: { toolbar: toolbarOptions } });
    quillEditor.disable();
    quillEditor.setText('Wait Your data is Loading 😊..')
    setQuillText(quillEditor);
  }, [])

  useEffect( () =>{
    if(Quilltext === null || socket === null) return ;
    const handleChange =  (delta,oldData,source) =>{
      if(source == "user"){
      socket && socket.emit('send-changes',delta)
    }
  }
    Quilltext && Quilltext.on('text-change',handleChange)
    return () =>{

      Quilltext && Quilltext.off("text-change", handleChange)

    }
  },[Quilltext,socket]);


  useEffect( () =>{
    if(Quilltext === null || socket === null) return ;

    const handleChange =  (delta) =>{
      Quilltext.updateContents(delta);
     
  }

    socket && socket.on('receive-changes',handleChange)

    return () =>{

      socket && socket.off('receive-changes', handleChange)

    }
  },[Quilltext,socket]);


  useEffect(() =>{
    if(Quilltext === null || socket === null) return;

    // load document only if is fetched from backend and enable the quill editor
    socket && socket.once('load-document',(data)=>{

      Quilltext && Quilltext.setContents(data);
      Quilltext && Quilltext.enable();

    }
  )
    // get only particular docs with given docid
    socket && socket.emit('get-document',id);

    


  },[Quilltext,socket,id])


  useEffect(() =>{

    if(Quilltext === null || socket === null) return;

    const interval =setInterval(() =>{
      socket && socket.emit('save-document', Quilltext.getContents())

    },2000);

    return (() =>{
      clearInterval(interval);
    })




  },[Quilltext,socket,id])

  // useEffect(() => {

  //   if (Quilltext === null || socket === null) return;

  //   const handleChange = (delta, oldData, source) => {

  //     if (source !== "user") return;// to prevent

  //     socket && socket.emit('send-changes', delta)


  //   }

  //   Quilltext && Quilltext.on("text-change", handleChange)


  //   return () => {
  //     Quilltext && Quilltext.off("text-change", handleChange)

  //   }



  // }, [Quilltext, socket])

  return (
    <Box className='container1'>
      <Box id='editor' className='container2'></Box>

    </Box>
  )
}
