
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Router, Routes } from "react-router-dom";
import Remindify from "./Remindify";

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Remindify />} />
        </Routes>
    </>
  );
}

export default App;
