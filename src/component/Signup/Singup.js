import "./Signup.css"
// import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { Link } from 'react-router-dom/dist';
// import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import SideMenu from "../SideMenu";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log('Form values:', values);
        form.resetFields();
      

        axios.get("http://tjchitwebuad.thechennaisilks.com:5775/api/login/userregistration?IMEINUM=11110002222&APPCODE=1&APPVERSION=4&FCMID=00000&AADHAR=123456787",{
            params : values
        }).then((res) => {
            console.log(res)

            res.data.results.map((value) => {
                return(
                    value.Success === 1 ?   navigate('/') : warning()
                )
            })
          
        }).catch((error) => {
            console.log(error)
            errors()
        })

        const warning = () => {
            Modal.warning({
              title: 'This Number is Already Registred',
              content: 'Try to Another Number',
            });
          };

          const errors = () => {
            Modal.error({
              title: 'fill all input fields',
              content: 'try again ',
                });
          };
        
    };

    // Custom validation rule for mobile number
    const validateMobileNumber = (rule, value) => {
        const mobileNumberRegex = /^[0-9]{10}$/;
        if (!mobileNumberRegex.test(value)) {
            return Promise.reject('Please enter a 10-digit mobile number.');
        }
        return Promise.resolve();
    };


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="elisc_tm_all_wrap" data-magic-cursor="show" data-enter="fadeInLeft" data-exit="true">
            <SideMenu />
            <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px]">

                <div className='container-signup'>
                    <div className="signup-left">
                        <h1 className="signup-title">WELCOME</h1>
                        <p className="login-subTitle">User Signup</p>
                        <div style={{ marginTop: "20px" }}>
                            <Form
                                form={form}
                                name="signup-form"
                                initialValues={{
                                    remember: true
                                }}
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
                                          whitespace: true,
                                          message: "Please enter your name!",
                                        },
                                      ]}
                                >
                                    <Input className="login-input-style"/>
                                </Form.Item>

                                <Form.Item
                                    name="MAILID"
                                    label="Email"
                                    rules={[
                                        {
                                            type: "email",
                                            message: "The input is not a valid email!"
                                        },
                                        {
                                            message: "Please enter your email!"
                                        }
                                    ]}
                                >
                                    <Input className="login-input-style"/>
                                </Form.Item>

                                <Form.Item
                                    name="USERNAME"
                                    label="Mobile Number"
                                    rules={[
                                        {
                                            message: "Please enter your mobile number!"
                                        },
                                        {
                                            validator: validateMobileNumber
                                        }
                                    ]}
                                >
                                    <Input type="tel" className="login-input-style"/>
                                </Form.Item>

                                <Form.Item
                                    name="PASSWORD"
                                    label="Password"
                                    rules={[
                                        {
                                            message: "Please enter your password!"
                                        },
                                    ]}
                                >
                                    <Input className="login-input-style"/>
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

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                            <p>Already user ? <Link to="/login" style={{textDecoration:'underline'}}>Login</Link></p>
                        </div>
                    </div>

                    <div className="signup-outer">
                        <img src="assets/img/bg-1.png" alt="image" className="login-side-img" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;
