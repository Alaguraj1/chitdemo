import "./Login.css";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link } from "react-router-dom/dist";
import {
  UserOutlined,
  UnlockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import SideMenu from "../SideMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetState } from "../../utils/function.utils";
import Models from "../../imports/models.import";

function Login() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const [state, setState] = useSetState({
    passwordVisible: false,
  });

  const onFinish = async (values) => {
    try {
      const res = await Models.auth.Login(values);
      localStorage.setItem("token", res?.results[0].key);
      localStorage.setItem("userName", res?.results[0].Name);
      localStorage.setItem("code", res?.results[0].Code);
      localStorage.setItem("ccaDate", res?.results[0].ccaDate);

      if (res?.results[0].Success === 1) {
        messageApi.open({
          type: "success",
          content: "Successfully Login",
        });

        // If the Success value is 1, navigate to the '/' route
        navigate("/");
      } else {
        // If the Success value is not 1, handle an unsuccessful response
        messageApi.open({
          type: "error",
          content: res?.results[0]?.Msg,
        });
      }
      console.log("✌️res --->", res);
    } catch (error) {
      console.log("Form error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const togglePasswordVisibility = () => {
    setState({ passwordVisible: !state.passwordVisible });
  };
  return (
    <>
      {contextHolder}
      <div
        className="elisc_tm_all_wrap"
        data-magic-cursor="show"
        data-enter="fadeInLeft"
        data-exit="true"
      >
        <SideMenu />
        <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px]">
          <div className="container-login">
            <div className="login-left">
              <h1 className="login-title">WELCOME</h1>
              <p className="login-subTitle">User Login</p>
              <div style={{ marginTop: "30px" }}>
                <Form
                  name="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  form={form} // Pass the form instance
                  // style={{ width: "400px" }}
                  className="login-form"
                >
                  <Form.Item
                    name="USERNAME"
                    label="Mobile Number"
                    style={{ fontSize: "18px !important" }}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter your mobile number!",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Mobile number must be a 10-digit number!",
                      },
                    ]}
                  >
                    <div className="login-input-warrper">
                      <UserOutlined className="login-input-icon" />
                      <Input
                        type="tel"
                        className="login-input-style"
                        maxLength={10}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="PASSWORD"
                    label="Password"
                    style={{ fontSize: "18px !important" }}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <div className="login-input-wrapper password-sec">
                      <UnlockOutlined className="login-input-icon" />
                      <Input
                        type={state.passwordVisible ? "text" : "password"}
                        className="login-input-style"
                      />
                      {state.passwordVisible ? (
                        <EyeOutlined
                          onClick={togglePasswordVisibility}
                          className="eyeIcon"
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={togglePasswordVisibility}
                          className="eyeIcon"
                        />
                      )}
                    </div>
                  </Form.Item>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <p style={{ textDecoration: "underline" }}>
                      <Link to="/forget-password">Forget Password</Link>
                    </p>
                  </div>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ background: "#9a2526" }}
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <p>
                  No account yet?{" "}
                  <Link to="/signup" style={{ textDecoration: "underline" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            <div className="login-outer">
              <img
                src="assets/img/bg-1.png"
                alt="side-modal"
                className="login-side-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
