import React, { useState } from 'react'
import SideMenu from "../SideMenu";
import "./ForgetPassword.css"
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button,  Modal } from 'antd';
import { Link } from 'react-router-dom/dist';

const ForgetPassword = () => {

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
                <div className='container-forget'>
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
                                        <div className="forget-input-warrper" >
                                            {/* <UserOutlined className="login-input-icon" /> */}
                                            <Input
                                                type="tel" className="forget-input-style"
                                            />
                                        </div>
                                    </Form.Item>

                                    <Form.Item
                                        name="otp"
                                        label="OTP"
                                        style={{ fontSize: "18px !important" }}
                                        rules={[
                                            {
                                                message: 'Please enter your password!',
                                            },
                                        ]}
                                    >
                                        <div className="forget-input-warrper" >
                                            {/* <UnlockOutlined className="login-input-icon" /> */}
                                            <Input className="forget-input-style" />
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" size="large" style={{ background: "#9a2526" }}>
                                            Generate OTP
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {/* <p>New User? <Link to="/signup" style={{textDecoration:'underline'}}>Sign Up</Link></p> */}
                            </div>
                        </div>

                        <div className="forget-outer">
                            <img src="assets/img/bg-1.png" alt="image" className="forget-side-img" />
                        </div>
                   

                </div>
            </div>
        </div>
    )
}

export default ForgetPassword