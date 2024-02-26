import React from 'react'
import SideMenu from "../SideMenu";
import "../ForgetPassword/ForgetPassword.css"
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal, message } from 'antd';

const ForgetOtp = ({ setStep, mobileNumber }) => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
const [ messageApi, contextHolder ] = message.useMessage();

    const onFinish = (values) => {

        const storedOTP = localStorage.getItem("otp");

        if (values.otp === storedOTP) {
            setStep(3);
            form.resetFields(); // Reset the form fields
        } else {
            // alert("Enter Correct OTP");
            messageApi.open({
                type: "error",
                content: "Enter Correct OTP",
              });
        }
    };


    const onFinishFailed = (errorInfo) => {
    };


    return (
        <div className="elisc_tm_all_wrap" data-magic-cursor="show" data-enter="fadeInLeft" data-exit="true">
        {contextHolder}
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
                                    name="otp"
                                    label="OTP"
                                    style={{ fontSize: "18px !important" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your OTP!',
                                        },
                                    ]}
                                >
                                    <div className="forget-input-warrper" >
                                        <Input type='tel' className="forget-input-style" maxLength={4}/>
                                    </div>
                                </Form.Item>

                                <Form.Item style={{ textAlign: "end" }}>
                                    <Button type="primary" htmlType="submit" size="large" style={{ background: "#9a2526" }}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            {/* <p>New User? <Link to="/signup" style={{textDecoration:'underline'}}>Sign Up</Link></p> */}
                        </div>
                    </div>

                    <div className="forget-outer">
                        <img src="assets/img/bg-1.png" alt='side-modal' className="forget-side-img" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ForgetOtp