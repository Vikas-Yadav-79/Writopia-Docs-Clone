import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'

import { io } from 'socket.io-client'

export default function Editor() {
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
