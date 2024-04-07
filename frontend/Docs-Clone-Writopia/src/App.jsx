import { useState } from 'react'
import Editor from './components/Editor'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <p>Hello {count}</p>
      <Editor/>

    </>
  )
}

export default App
