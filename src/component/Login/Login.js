import "./Login.css"
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { Link } from 'react-router-dom/dist';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import SideMenu from "../SideMenu";
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const navigate = useNavigate(); 
    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log('Form values:', values);
        form.resetFields();
        navigate('/');
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
                                    name="mobileNumber"
                                    label="Mobile Number"
                                    style={{ fontSize: "18px !important" }}
                                    rules={[
                                        {
                                            message: 'Please enter your mobile number!',
                                        },
                                        {
                                            validator: validateMobileNumber,
                                        },
                                    ]}
                                >
                                    <div className="login-input-warrper" >
                                        <UserOutlined className="login-input-icon" />
                                        <Input
                                            type="tel" className="login-input-style"
                                        />
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    style={{ fontSize: "18px !important" }}
                                    rules={[
                                        {
                                            message: 'Please enter your password!',
                                        },
                                    ]}
                                >
                                    <div className="login-input-warrper" >
                                        <UnlockOutlined className="login-input-icon" />
                                        <Input className="login-input-style" />
                                    </div>
                                </Form.Item>


                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <p style={{textDecoration:'underline'}}>Forget Password</p>
                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" style={{ background: "#9a2526" }}>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p>New User? <Link to="/signup" style={{textDecoration:'underline'}}>Sign Up</Link></p>
                        </div>
                    </div>

                    <div className="login-outer">
                        <img src="assets/img/bg-1.png" alt="image" className="login-side-img" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
