import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import { MdOutlineDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState(""); // This will be used with ReactQuill
  const [completedTodo, setCompletedTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleAddTodo() {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title and Description cannot be empty");
      return;
    }
  
    const newTodo = {
      title: newTitle,
      description: newDescription,
    };
  
    if (editIndex !== null) {
      // Update existing todo
      fetch(`http://localhost:5000/todos/${allTodos[editIndex].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }).then(() => {
        setAllTodos((prevTodos) => {
          const updatedTodos = [...prevTodos];
          updatedTodos[editIndex] = { ...updatedTodos[editIndex], ...newTodo };
          return updatedTodos;
        });
        setEditIndex(null);
        setNewTitle("");
        setNewDescription("");
      });
    } else {
      // Add new todo
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((data) => {
          setAllTodos((prevTodos) => [...prevTodos, data]);
          setNewTitle("");
          setNewDescription("");
        });
    }
  }
  

  function handleEdit(index) {
    setEditIndex(index);
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  }

  function handleDeleteTodo(index) {
    fetch(`http://localhost:5000/todos/${allTodos[index].id}`, {
      method: "DELETE",
    }).then(() => {
      setAllTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
      if (index === editIndex) {
        setEditIndex(null);
        setNewTitle("");
        setNewDescription("");
      }
    });
  }
  

  function handleComplete(index) {
    let now = new Date();
    let completedOn = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  
    const completedItem = {
      ...allTodos[index],
      completedOn,
    };
  
    fetch("http://localhost:5000/completedTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setCompletedTodo((prevTodos) => [...prevTodos, data]);
        handleDeleteTodo(index);
      });
  }
  

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => setAllTodos(data));
  
    fetch("http://localhost:5000/completedTodos")
      .then((response) => response.json())
      .then((data) => setCompletedTodo(data));
  }, []);
  
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
              <ReactQuill
                value={newDescription}
                onChange={setNewDescription}
                placeholder="Add Description"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                className="primary-btn"
                onClick={handleAddTodo}
              >
                {editIndex !== null ? "Update Todo" : "Add Todo"}
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
            {!isCompleteScreen &&
              allTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></p>
                    </div>
                    <div>
                      <FaEdit
                        className="check-icon"
                        onClick={() => handleEdit(index)}
                      />
                      <MdOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => {
                          handleComplete(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            {isCompleteScreen &&
              completedTodo.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></p>
                      <p>
                        <small>Completed on: {item.completedOn}</small>
                      </p>
                    </div>
                    <div>
                      <MdOutlineDelete
                        className="icon"
                        onClick={() => handleCompleteDeleteTodo(index)}
                      />
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
