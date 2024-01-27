import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import compstore from "./Redux/Store";
import { ToastContainer } from "react-toastify";
import Navbar from "./Component/Navbar";
import Dvd from "./Component/Dvd";
import Friend from "./Component/Friend";
import Loan from "./Component/Loan";
import Case from "./Component/Case";

function App() {
  return (
    <Provider store={compstore}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Case />}></Route>
          <Route path="/dvd" element={<Dvd />}></Route>
          <Route path="/friend" element={<Friend />}></Route>
          <Route path="/loan" element={<Loan />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </Provider>
  );
}

export default App;
