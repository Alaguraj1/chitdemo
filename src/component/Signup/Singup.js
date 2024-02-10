import "./Signup.css";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link } from "react-router-dom/dist";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  UnlockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import SideMenu from "../SideMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Models from "../../imports/models.import";

function Signup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [otp, setOtp] = useState(null);

  const initialValues = {
    IMEINUM: 1,
    APPCODE: 1,
    APPVERSION: 1,
    FCMID: 1,
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  
    if (values.otp !== String(otp)) {
      messageApi.open({
        type: "error",
        content: "Invalid OTP",
      });
      return;
    } else {
      messageApi.open({
        type: "success",
        content: "OTP verified",
      });
  
      axios
        .post(
          "https://chatbot.thechennaisilks.com:5575/API/LOGIN/USERREGISTRATION",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: initialValues, // Check if this should be included in the URL or as data
          }
        )
        .then((res) => {
          console.log(res);
  
          if (res?.data?.results[0]?.Success === 1) {
            messageApi.open({
              type: "success",
              content: "Successfully registered",
            });
            navigate("/");
          } else {
            // Handle unsuccessful response
            error();
  
            messageApi.open({
              type: "error",
              content: res?.data?.results[0]?.Msg,
            });
          }
        })
        .catch((error) => {
          console.error(error);
  
          if (axios.isAxiosError(error)) {
            // Handle specific cases for Axios errors
            if (error.response) {
              console.error("Server responded with status:", error.response.status);
              // Handle specific status codes if needed
            } else if (error.request) {
              console.error("No response received from the server");
            } else {
              console.error("Error setting up the request:", error.message);
            }
          } else if (error.code === "ECONNABORTED") {
            console.error("Request timed out");
          } else {
            console.error("An error occurred:", error.message);
          }
  
          showNetworkError();
        });
    }
  };
  
  const showNetworkError = () => {
    // Display a user-friendly message for network errors
    console.error("Network error. Please check your internet connection.");
  };

  const error = () => {
    // Handle specific errors or display a generic error message
    console.error("An error occurred during the API request.");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log("otp", otp);
  //   generate otp
  const ForgetOtp = async (values) => {
    console.log("✌️values --->", values);
    try {
      const res = await Models.auth.ForgetOtp({ mobileNumber: values });
      console.log("✌️res --->", res);
      setOtp(res?.results[0]?.Otp);
    } catch (error) {
      console.log(error);
    }
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
        <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px] signup-bg">
          <div className="container-signup">
            <div className="signup-left">
              <h1 className="signup-title">WELCOME</h1>
              <p className="login-subTitle">User Signup</p>
              <div style={{ marginTop: "20px" }}>
                <Form
                  form={form}
                  name="signup-form"
                  initialValues={initialValues}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="login-form"
                >
                  <Form.Item
                    name="NAME"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter your name!",
                      },
                    ]}
                  >
                    <div className="login-input-warrper">
                      <UserOutlined className="login-input-icon" />
                      <Input className="login-input-style" />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="MAILID"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        type: "email",
                        message: "The input is not a valid email!",
                      },
                      {
                        message: "Please enter your email!",
                      },
                    ]}
                  >
                    <div className="login-input-warrper">
                      <MailOutlined className="login-input-icon" />
                      <Input className="login-input-style" />
                    </div>
                  </Form.Item>

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
                      <PhoneOutlined className="login-input-icon" />
                      <Input
                        type="tel"
                        className="login-input-style"
                        maxLength={10}
                        onChange={(e) => {
                          if (e.target.value.length === 10) {
                            ForgetOtp(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </Form.Item>

                  {otp !== null && (
                    <Form.Item
                      name="otp"
                      label="OTP"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please enter your OTP!",
                        },
                      ]}
                    >
                      <div className="login-input-wrapper">
                        <Input className="login-input-style" />
                      </div>
                    </Form.Item>
                  )}

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
                    <div className="login-input-wrapper">
                      <UnlockOutlined className="login-input-icon" />
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        className="login-input-style"
                      />
                      {passwordVisible ? (
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

                  <Form.Item
                    name="IMEINUM"
                    initialValue={initialValues.IMEINUM}
                    hidden
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="APPCODE"
                    initialValue={initialValues.APCODE}
                    hidden
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="APPVERSION"
                    initialValue={initialValues.APPVERSION}
                    hidden
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="FCMID"
                    initialValue={initialValues.FCMID}
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  {/* <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={['password-signup']}
                                    rules={[
                                        {
                                            message: "Please confirm your password!"
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                              if (!value || getFieldValue('password-signup') === value) {
                                                return Promise.resolve();
                                              }
                                              return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                          }),
                                    ]}
                                >
                                    <Input className="login-input-style"/>
                                </Form.Item> */}

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/* <p style={{textDecoration:'underline'}}>Forgot Password</p> */}
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ background: "#9a2526" }}
                      size="large"
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
                <p>
                  Already user ?{" "}
                  <Link to="/login" style={{ textDecoration: "underline" }}>
                    Login
                  </Link>
                </p>
              </div>
            </div>

            <div className="signup-outer">
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

export default Signup;
