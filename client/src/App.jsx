import { BrowserRouter, Route, Routes } from "react-router-dom";
import Check_Availability from "./components/Check_Availability";
import MainNavBar from "./components/MainNavBar";
import NavBar from "./components/NavBar";
import PrivateComponent from "./components/PrivateComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComponent />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/j-pincode" element={<Check_Availability />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
