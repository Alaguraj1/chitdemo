import React from "react";
import SideMenu from "../SideMenu";
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import Models from "../../imports/models.import";

const ForgetPassword = ({ setStep, setMobileNumber }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Form values:", values);

    try {
      const res = await Models.auth.ForgetOtp(values);
      console.log("✌️res forget--->", res);
      if (res?.results[0]?.success === 1) {
        localStorage.setItem(
          "mobileNumber",
          res?.results[0]?.mobileNumber
        );
        localStorage.setItem("otp", res?.results[0]?.Otp);
        setStep(2);
        form.resetFields();
        console.log("otpotpotp", res?.results[0]?.Otp);
      } else {
        alert(res?.results[0]?.Otp);
      }
    } catch (error) {
      console.log(error);
    }

  };



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="elisc_tm_all_wrap"
      data-magic-cursor="show"
      data-enter="fadeInLeft"
      data-exit="true"
    >
      <SideMenu />
      <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px] lo">
        <div className="container-forget">
          <div className="forget-left">
            <h1 className="forget-title">WELCOME</h1>
            <p className="forget-subTitle">Forget Password</p>
            <div style={{ marginTop: "30px" }}>
              <Form
                name="forget-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                form={form}
                className="login-form"
              >
                <Form.Item
                  name="mobileNumber"
                  label="Mobile Number"
                  style={{ fontSize: "18px !important" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your mobile number!",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Mobile number must be a 10-digit number!",
                    },
                  ]}
                >
                  <div className="forget-input-warrper">
                    <Input
                      type="tel"
                      className="forget-input-style"
                      maxLength={10}
                    />
                  </div>
                </Form.Item>

                <Form.Item style={{ textAlign: "end" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ background: "#9a2526" }}
                  >
                    Generate OTP
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="forget-outer">
            <img
              src="assets/img/bg-1.png"
              alt="background-image"
              className="forget-side-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
