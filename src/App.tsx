import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Under Construction</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click <a href="https://r3dacted42.github.io/resume/resume.pdf" target='_blank'>here</a> to download my resume.
      </p>
    </>
  )
}

export default App
