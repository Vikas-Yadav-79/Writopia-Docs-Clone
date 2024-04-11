import { useState } from 'react'
import Editor from './components/Editor'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


import './App.css'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<Navigate replace to = {`/docs/${uuidv4()}`} />}/>

          < Route path='/docs/:id' element={<Editor/>} />
            

          
        </Routes>
      </Router>


    </>
  )
}

export default App
