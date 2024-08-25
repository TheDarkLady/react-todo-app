import { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);
  function handleAddTodo() {
    const todoTitleInput = document.getElementById("todoTit");
    const todoDescInput = document.getElementById("todoDesc");
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    setNewTitle("");
    setNewDescription("");
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todlList', JSON.stringify(updatedTodoArr))
  }

  function handleDeleteTodo(index) {
    const reduceTodo = [...allTodos];
    reduceTodo.splice(index);
    localStorage.setItem('todlList', JSON.stringify(reduceTodo))
    setAllTodos(reduceTodo);
  }
  function handleComplete(index){
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let today = dd + '/' + mm + '/' + yyyy;
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }
    let updatedCompletedArr = [...completedTodo]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodo(updatedCompletedArr)
    localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))
    handleDeleteTodo(index)
  }
  function handleCompleteDeleteTodo(index){
    let updatedCompletedArr = [...completedTodo]
    updatedCompletedArr.splice(index)
    localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))
    setCompletedTodo(updatedCompletedArr)
  }
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todlList'))
    let saveCompleteTodo = JSON.parse(localStorage.getItem('completedTodo'))
    if(savedTodo){
      setAllTodos(savedTodo)
    }
    if(saveCompleteTodo){
      setCompletedTodo(saveCompleteTodo)
    }
  },[])
  return (
    <>
      <div className="App">
        <h1>My Todos </h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="todo">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                id="todoTit"
                placeholder="Add Tasks"
              />
            </div>
            <div className="todo-input-item">
              <label htmlFor="todo">Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                id="todoDesc"
                placeholder="Add Description"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                className="primary-btn"
                onClick={handleAddTodo}
              >
                Add Todo
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              className={`secondaryBtn ${!isCompleteScreen && "active"}`}
              onClick={() => setCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${isCompleteScreen && "active"}`}
              onClick={() => setCompleteScreen(true)}
            >
              Completed
            </button>
          </div>
          <div className="todo-list-area">
            {isCompleteScreen=== false && allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <MdOutlineDelete className="icon" onClick={()=>handleDeleteTodo(index)}/>
                    <BsCheckLg className="check-icon" onClick={()=>{handleComplete(index)}}/>
                  </div>
                </div>
              );
            })}
            {isCompleteScreen=== true && completedTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>
                  <div>
                    <MdOutlineDelete className="icon" onClick={()=>handleCompleteDeleteTodo(index)}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
