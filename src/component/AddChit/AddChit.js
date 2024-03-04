import React, { useEffect } from "react";
import {
  Select,
  Table,
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  message,
} from "antd";
import "./AddChit.css";
import SideMenuTwo from "../SideMenuTwo";
import { useNavigate } from "react-router-dom";
import { columns } from "../../utils/constants.utils";
import { useSetState } from "../../utils/function.utils";
import Models from "../../imports/models.import";

const { Option } = Select;

const ChitDetails = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const [state, setState] = useSetState({
    localCode: "",
    city: [],
    selectedBranch: null,
    branch: [],
    chit: [],
    selectedChit: null,
    getChit: [],
    ReferenseUser: [],
    chitTable: [],
    selectedAmount: "",
    isModalVisible: false,
    isCheckboxChecked: false,
  });

  useEffect(() => {
    GetCity();
    getBranch();
  }, []);

  useEffect(() => {
    const LocalDatas = localStorage.getItem("code");
    setState({ localCode: LocalDatas });
  }, []);

  const GetCity = async () => {
    try {
      const res = await Models.chit.City();
      console.log("✌️res --->", res);
      if (res.results[0].Message == "Authentication Not Valid") {
        navigate("/login");
        return false;
      }
      setState({
        city:
          res.results[0].Success === 1
            ? res?.results[0]?.Message
            : //  alert(res?.results[0].Message),
              messageApi.open({
                type: "error",
                content: res?.results[0].Message,
              }),
      });
    } catch (error) {}
  };

  // city change
  const handleCityChange = async (value) => {};

  const getBranch = async () => {
    try {
      const res = await Models.chit.Branch();
      if (res.results[0].Message == "Authentication Session Failed") {
        navigate("/login");
        return false;
      }
      setState({
        branch:
          res.results[0].Success === 1
            ? res?.results
            : //  alert(res?.results[0].Message),
              messageApi.open({
                type: "error",
                content: res?.results[0].Message,
              }),
      });
    } catch (error) {}
  };

  // branch onchange function
  const handleBranchChange = async (value) => {
    setState({ selectedBranch: value, selectedChit: null });
    Chit(value);
    getChitDetails(null, value);
    ReferenseEmployee(value);
  };

  // Chit api call
  const Chit = async (selectBranch) => {
    try {
      const res = await Models.chit.Chit({ BRNCODE: selectBranch });
      if (res.results?.length > 0) {
        if (res.results[0].Message == "Authentication Session Failed") {
          navigate("/login");
          return false;
        }
      }

      if (res.results?.length > 0) {
        setState({ chit: res.results[0].Message });
      } else {
        setState({ chit: [] });
      }
    } catch (error) {}
  };

  // chit onchange function
  const handleChitChange = async (value) => {
    setState({ selectedChit: value });
    getChitDetails(value, state.selectedBranch);
  };

  // function to get chit details
  const getChitDetails = async (chitValue1, chitValue2) => {
    try {
      const res = await Models.chit.GetChit({
        CHTCODE: chitValue1,
        BRNCODE: chitValue2,
      });
      if (res.results[0].Message == "Authentication Session Failed") {
        navigate("/login");
        return false;
      }
      const data = res.results[0].Message;
      let filterData = [];
      if (state.selectedAmount) {
        filterData = data.filter(
          (item) => item.CHTAMNT === state.selectedAmount
        );
      } else {
        filterData = data;
      }

      setState({ getChit: data, chitTable: filterData });
    } catch (error) {}
  };

  // reference user
  const ReferenseEmployee = async (Reference) => {
    try {
      const res = await Models.chit.EmployeeName({
        brncode: Reference,
      });
      if (res.results[0].Message == "Authentication Session Failed") {
        navigate("/login");
        return false;
      }
      setState({ ReferenseUser: res.results[0].Message });
    } catch (error) {}
  };

  // amount change

  const handleAmountChange = (value) => {
    const tableData = state.getChit;
    const filter = tableData?.filter((item) => item.CHTAMNT === value);
    setState({ chitTable: filter });

    setState({ selectedAmount: value });
  };

  const onFinish = (values) => {
    const completeMobileNumber = `${state.localCode}`;

    const body = {
      customer_name: values.customer_name,
      address: values.address,
      landMark: values.landMark,
      email: values.email,
      mobile_number: completeMobileNumber,
      city: values.city,
      pin_code: values.pin_code,
      branch: values.branch,
      chit_name: values.chit_name,
      amount: values.amount,
      referenceUser: values.referenceUser,
    };
  };

  const onFinishFailed = (errorInfo) => {};

  // terms and conditions Modal
  const handleCheckboxChange = () => {
    setState({ isModalVisible: true });
  };

  const handleModalAccept = () => {
    setState({ isModalVisible: false });
    setState({ isCheckboxChecked: true });
  };

  const handleModalCancel = () => {
    setState({ isCheckboxChecked: false });
    setState({ isModalVisible: false });
  };

console.log("state?.selectedChit", state?.selectedChit)

  return (
    <>
      <div
        className="elisc_tm_all_wrap chit-details"
        data-magic-cursor="show"
        data-enter="fadeInLeft"
        data-exit="true"
      >
        {contextHolder}
        <SideMenuTwo />
        <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px] chit-main-container">
          <div className="chit-container">
            <div className="details w-full flex items-center container-chit-details">
              <div className="left w-1/2 chit-details-left">
                <div>
                  <h6 className="chit-details-subTitle">Personal Details</h6>
                  <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Customer Name"
                      name="customer_name"
                      className="add-chit-inputs"
                      rules={[
                        {
                          required: false,
                          message: "Customer Name field is required.",
                        },
                      ]}
                    >
                      <div className="chit_inputs name-input">
                        <Input style={{ padding: "10px 5px !important" }} />
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Address"
                      name="address"
                      className="add-chit-inputs"
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <div className="chit_inputs address-input">
                        <Input />
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Land Mark"
                      name="landMark"
                      className="add-chit-inputs"
                      rules={[
                        {
                          required: false,
                          message: "landmark field is required.",
                        },
                      ]}
                    >
                      <div className="chit_inputs landmark-input">
                        <Input />
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      className="add-chit-inputs"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This Field is required.",
                        },
                      ]}
                    >
                      <div className="chit_inputs email-input">
                        <Input type="email" />
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Mobile Number"
                      name="mobile_number"
                      className="add-chit-inputs"
                      rules={[
                        {
                          required: false,
                          message: "Mobile Number field is required.",
                        },
                      ]}
                    >
                      <div className="chit_inputs mobile-input">
                        <Input prefix={state.localCode} disabled />
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Select City"
                      name="city"
                      className="add-chit-inputs"
                    >
                      <div className="chit_inputs city-input">
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={handleCityChange}
                        >
                          {state?.city?.map((val) => (
                            <Option key={val?.CITYCODE} value={val?.CITYCODE}>
                              {val?.CITYNAME}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Pincode"
                      name="pin_code"
                      className="add-chit-inputs"
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <div className="chit_inputs pincode-input">
                        <Input type="number" />
                      </div>
                    </Form.Item>

                    <h6 className="chit-details-subTitle">Chit</h6>
                    <Form.Item
                      label="Select Branch"
                      name="branch"
                      className="add-chit-inputs"
                    >
                      <div className="chit_inputs branch-input">
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={handleBranchChange}
                        >
                          {state?.branch[0]?.Message?.map((val) => (
                            <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                              {val?.NICADDR}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Chit Name"
                      name="chit_name"
                      className="add-chit-inputs"
                      onChange={handleChitChange}
                    >
                      <div className="chit_inputs chit-input">
                        <Select
                          onChange={handleChitChange}
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {state?.chit?.map((val) => (
                            <Option key={val?.CHTCODE} value={val?.CHTCODE}>
                              {val?.CHTNAME}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Amount"
                      name="amount"
                      className="add-chit-inputs"
                      onChange={handleAmountChange}
                    >
                      <div className="chit_inputs amount-input">
                        {state?.selectedChit == 6 ? (
                          <>
                            <Input type="number"/>
                            <p>Min amount is Rs 50,000/-</p>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Select
                              onChange={handleAmountChange}
                              showSearch
                              filterOption={(input, option) =>
                                option.children.indexOf(input) >= 0
                              }
                            >
                              {state?.getChit?.map((val) => (
                                <Option key={val?.CHTAMNT} value={val?.CHTAMNT}>
                                  {val?.CHTAMNT}
                                </Option>
                              ))}
                            </Select>{" "}
                          </>
                        )}
                      </div>
                    </Form.Item>

                    {/* <p style={{ fontSize: "14px" }}>
                      *NOTE you can purchase from the selected branch
                      {state.chitTable?.length > 0 &&
                        state.selectedAmount !== "" && (
                          <>
                            <div style={{ margin: "20px 0px" }}>
                              <Table
                                dataSource={state.chitTable}
                                columns={columns}
                                pagination={false}
                                style={{ width: "100%" }}
                                scroll={{ x: "100%" }}
                                className="responsive-table"
                              />
                            </div>
                          </>
                        )}
                    </p> */}

                    <Form.Item
                      label="Reference User (Optional)"
                      name="referenceUser"
                      // style={{ width: "400px" }}
                      labelCol={{ span: 14 }}
                      wrapperCol={{ span: 18 }}
                    >
                      <div className="chit_inputs refer-input">
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {state?.ReferenseUser?.map((val) => (
                            <Option key={val?.EMPCODE} value={val?.EMPCODE}>
                              {val?.EMPCODE} - {val?.EMPNAME}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <Checkbox
                        onChange={handleCheckboxChange}
                        checked={state.isCheckboxChecked}
                      >
                        Terms and conditions
                      </Checkbox>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        size="large"
                        style={{
                          backgroundColor: "#9a2526",
                          marginTop: "10px",
                        }}
                        htmlType="submit"
                      >
                        Add Chit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div className="right w-1/2 pl-[50px] chit-details-image-cover">
                <img
                  src="assets/img/newChit.png"
                  alt="new-chit-image"
                  className="new-chit-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* terms and conditions */}
      <Modal
        visible={state.isModalVisible}
        // onOk={handleModalAccept}
        // okText="Accept"
        // onCancel={handleModalCancel}
        width={700}
        footer={false}
      >
        {state.selectedChit == 4 ? (
          <>
            <div style={{ marginTop: "30px" }}>
              <img src="assets/img/terms_swarna-laksita.png" />
            </div>
          </>
        ) : (
          <>
            <div style={{ marginTop: "30px" }}>
              <img src="assets/img/terms-goldvirksham.png" />
            </div>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Space style={{ marginTop: "30px" }}>
            <button className="terms_accept" onClick={handleModalCancel}>
              Cancel
            </button>
            <button className="terms_cancel" onClick={handleModalAccept}>
              Accept
            </button>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default ChitDetails;
