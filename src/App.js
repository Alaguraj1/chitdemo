import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from "./component/Login/Login"
import Signup from "./component/Signup/Singup";
import ChitDetails from "./component/ChitDetails/ChitDetails";
import PayDue from "./component/PayDue/PayDue";
import Payment from "./component/Payment/Payment";
import ClosedDue from "./component/ClosedDue/ClosedDue";
import Home from "./component/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-chit" element={<ChitDetails />} />
          <Route path="/my-profile" element={<PayDue />} />
          <Route path="/chit-details" element={<Payment />} />
          <Route path="/closed-due" element={<ClosedDue />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
