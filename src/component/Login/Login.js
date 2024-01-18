import "./Login.css"
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom/dist';
import { UserOutlined, UnlockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import SideMenu from "../SideMenu";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [passwordVisible, setPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [messageApi, contextHolder] = message.useMessage();




    const onFinish = (values) => {
        console.log('Form values:', values);

        axios.post("https://chatbot.thechennaisilks.com:5575/API/CCALOGINLIVE", values)
            .then((res) => {
                console.log(res);

                localStorage.setItem("token", res?.data?.results[0].key)
                localStorage.setItem("name", res?.data?.results[0].Name)
                localStorage.setItem("code", res?.data?.results[0].Code)
                localStorage.setItem("ccadate", res?.data?.results[0].ccaDate)


                messageApi.open({
                    type: 'success',
                    content: 'Successfully Login',
                });

                if (res?.data?.results[0].Success === 1) {
                    // If the Success value is 1, navigate to the '/' route
                    navigate('/');
                } else {
                    // If the Success value is not 1, handle an unsuccessful response
                    error();
                }
            }).catch((error) => {
                console.error(error);

                if (error.code === 'ERR_NETWORK') {
                    // Handle network-related errors
                    showNetworkError();
                } else {
                    // Handle other errors
                    errors(error);
                }
            });


        // const request = new Request("https://chatbot.thechennaisilks.com:5575/API/CCALOGINLIVE",
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000/",
        //             'Accept': 'application/json'
        //         },
        //         body: values,
        //         mode: 'cors',
        //     });
        // console.log(request)
        // fetch(request)
        //     .then(response => {
        //         if (response.status === 200) {
        //             return response.json();
        //         }
        //         else {
        //             throw new Error('Something went wrong on api server!');
        //         }
        //     })
        //     .then(response => {
        //         console.debug(response);
        //         // ...
        //     }).catch(error => {
        //         console.error(error);
        //     });

    };

    const showNetworkError = () => {
        // Display a user-friendly message for network errors
        console.error("Network error. Please check your internet connection.");
    };

    const errors = (error) => {
        // Handle other errors here or display a generic error message
        console.error("An error occurred. Please try again later.");
    };

    const error = () => {
        // Handle specific errors or display a generic error message
        console.error("An error occurred during the API request.");
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            {contextHolder}
            <div className="elisc_tm_all_wrap" data-magic-cursor="show" data-enter="fadeInLeft" data-exit="true">
                <SideMenu />
                <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px] lo" >

                    <div className='container-login'>
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
                                                required: false,
                                                message: 'Please enter your mobile number!',
                                            },
                                            {
                                                pattern: /^[0-9]{10}$/,
                                                message: 'Mobile number must be a 10-digit number!',
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
                                                message: 'Please enter your password!',
                                            },
                                        ]}
                                    >
                                        <div className="login-input-wrapper">
                                            <UnlockOutlined className="login-input-icon" />
                                            <Input
                                                type={passwordVisible ? 'text' : 'password'}
                                                className="login-input-style"
                                            />
                                            {passwordVisible ? (
                                                <EyeOutlined onClick={togglePasswordVisibility} className="eyeIcon" />
                                            ) : (
                                                <EyeInvisibleOutlined onClick={togglePasswordVisibility} className="eyeIcon" />
                                            )}
                                        </div>
                                    </Form.Item>


                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Form.Item
                                            name="remember"
                                            valuePropName="checked"
                                        >
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>
                                        <p style={{ textDecoration: 'underline' }}><Link to="/forget-password">Forget Password</Link></p>
                                    </div>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" size="large" style={{ background: "#9a2526" }}>
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <p>New User? <Link to="/signup" style={{ textDecoration: 'underline' }}>Sign Up</Link></p>
                            </div>
                        </div>

                        <div className="login-outer">
                            <img src="assets/img/bg-1.png" alt="side-modal" className="login-side-img" />
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;
