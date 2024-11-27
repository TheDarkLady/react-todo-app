import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import { MdOutlineDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState(""); // This will be used with ReactQuill
  const [completedTodo, setCompletedTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleAddTodo() {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      toast.warning("Title and Description cannot be empty");
      return;
    }

    let updatedTodoArr = [...allTodos];

    if (editIndex !== null) {
      // Edit existing todo
      updatedTodoArr[editIndex] = {
        title: newTitle,
        description: newDescription,
      };
      setEditIndex(null); // Reset edit index after editing
      toast.success("Todo Updated Successfully")
    } else {
      // Add new todo
      let newTodoItem = {
        title: newTitle,
        description: newDescription,
      };
      toast.success("New Todo Added Successfully")
      updatedTodoArr.push(newTodoItem);
    }

    setNewTitle("");
    setNewDescription("");
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoArr));
  }

  function handleEdit(index) {
    setEditIndex(index);
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  }

  function handleDeleteTodo(index) {
    const reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
    if (index === editIndex) {
      setEditIndex(null); // Reset edit index if the item being edited is deleted
      setNewTitle("");
      setNewDescription("");
    }
    toast.error("Todo Deleted Successfully")
  }

  function handleComplete(index) {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, "0");
    let mm = String(now.getMonth() + 1).padStart(2, "0");
    let yyyy = now.getFullYear();
    let h = String(now.getHours()).padStart(2, "0");
    let m = String(now.getMinutes()).padStart(2, "0");
    let s = String(now.getSeconds()).padStart(2, "0");

    let completedOn = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedArr));

    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setAllTodos(updatedTodos);
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    toast.success("Your Task is completed Successfully")
    // handleDeleteTodo(index);
  }

  function handleCompleteDeleteTodo(index) {
    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.splice(index, 1);
    localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedArr));
    setCompletedTodo(updatedCompletedArr);
    toast.error("Todo Deleted Successfully")

  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    let saveCompleteTodo = JSON.parse(localStorage.getItem("completedTodo"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (saveCompleteTodo) {
      setCompletedTodo(saveCompleteTodo);
    }
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
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
              />
              {/* Same as */}
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
