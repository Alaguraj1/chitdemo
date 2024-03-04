import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Singup";
import AddChit from "./component/AddChit/AddChit";
import PayDue from "./component/PayDue/PayDue";
import Payment from "./component/Payment/Payment";
import ClosedDue from "./component/ClosedDue/ClosedDue";
import Home from "./component/Home/Home";
// import ForgetMobileNumber from "./component/ForgetPassword/ForgetMobileNumber";
// import ConfirmPassword from "./component/ForgetPassword/ConfirmPassword";
// import ForgetOtp from "./component/ForgetPassword/ForgetOtp"
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import LuckyWinner from "./component/LuckyWinner/LuckyWinner";
import { useEffect } from "react";
import { useSetState } from "./utils/function.utils";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* {token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/add-chit" element={<AddChit />} />
            <Route path="/my-profile" element={<PayDue />} />
            <Route path="/chit-details" element={<Payment />} />
            <Route path="/closed-due" element={<ClosedDue />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )} */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-chit" element={<AddChit />} />
        {/* <Route path="/my-profile" element={<PayDue />} /> */}
        <Route path="/chit-details" element={<Payment />} />
        <Route path="/closed-due" element={<ClosedDue />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {/* <Route path="/lucky-winner" element={<LuckyWinner />}/> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
