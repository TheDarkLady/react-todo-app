import { useState } from 'react'
import './App.css'

function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false)
  return (
    <>
    <div className='App'>
    <h1>My Todos </h1>
    <div className='todo-wrapper'>
      <div className='todo-input'>
        <div className='todo-input-item'>
          <label htmlFor="todo">Title</label>
          <input type="text" id="todo" placeholder='Add Tasks'/>
        </div>
        <div className='todo-input-item'>
          <label htmlFor="todo">Description</label>
          <input type="text" id="todo" placeholder='Add Description'/>
        </div>
        <div className='todo-input-item'>
          <button type='button'className='primary-btn'>Add Todo</button>
        </div>
      </div>
    <div className='btn-area'>
      <button className="secondaryBtn">Todo</button>
      <button className="secondaryBtn" >Completed</button>
    </div>
    <div className='todo-list-area'>
      <div className='todo-list-item'>
        <h3>Task 1</h3>
        <p>Description</p>
      </div>

    </div>
    </div>

  </div>

      
    </>
  )
}

export default App
