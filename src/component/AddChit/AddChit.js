import React, { useEffect, useState } from "react";
import {
  Select,
  Table,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
} from "antd";
import "./AddChit.css";
import SideMenuTwo from "../SideMenuTwo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { columns } from "../../utils/constants.utils";
import { useSetState } from "../../utils/function.utils";
import Models from "../../imports/models.import";

const { Option } = Select;

const ChitDetails = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [state, setState] = useSetState({
    city: [],
    selectedBranch: null,
    branch: [],
    chit: [],
    selectedChit: null,

  });

  useEffect(() => {
    GetCity()
    getBranch()
  }, []);

const GetCity = async() => {
  try{
    const res = await Models.chit.City();
    if (res.results[0].Message == "Authentication Session Failed") {
      navigate("/login");
      return false;
    }
    setState({
      city:
        res.results[0].Success === 1
          ? res?.results[0]?.Message
          : alert(res?.results[0].Message),
    });
  }
  catch(error) {
    console.log("Form error:", error);
  }
}


console.log("state.city", state.city)
// city change
const handleCityChange = async (value) => {
  console.log(value)
}


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
            : alert(res?.results[0].Message),
      });
    } catch (error) {
      console.log("Form error:", error);
    }
  };

  // branch  onchange function
  const handleBranchChange = async (value) => {
    console.log("✌️value --->", value);
    setState({ selectedBranch: value, selectedChit: null });

    Chit(value);
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
    } catch (error) {
      console.log("Form error:", error);
    }
  };

  // chit onchange
  const handleChitChange = async (value) => {
    console.log("✌️value --->", value);
    setState({ selectedChit: value });
  };
  console.log("✌️selectedChit --->", state.selectedChit);

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const dataSource = [
    {
      key: "1",
      chitGroup: "SLABU",
      noOfDues: 12,
      groupCapacity: 300,
      bonusAmount: 500,
      giftAmount: 0,
    },
  ];
  return (
    <>
      <div
        className="elisc_tm_all_wrap chit-details"
        data-magic-cursor="show"
        data-enter="fadeInLeft"
        data-exit="true"
      >
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
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Customer Name"
                      name="customer_name"
                      style={{ width: "350px" }}
                      rules={[
                        {
                          required: false,
                          message: "Customer Name field is required.",
                        },
                      ]}
                    >
                      <Input style={{ padding: "10px 5px !important" }} />
                    </Form.Item>

                    <Form.Item
                      label="Address"
                      name="address"
                      style={{ width: "350px" }}
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Land Mark"
                      name="landMark"
                      style={{ width: "350px" }}
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      style={{ width: "350px" }}
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <Input type="email" />
                    </Form.Item>

                    <Form.Item
                      label="Mobile Number"
                      name="mobile_number"
                      style={{ width: "350px" }}
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item
                      label="Select City"
                      name="city"
                      style={{ width: "350px" }}
                    >
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
                    </Form.Item>

                    <Form.Item
                      label="Pin Code"
                      name="pin_code"
                      style={{ width: "350px" }}
                      rules={[
                        {
                          required: false,
                          message: "Address field is required.",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>

                    {/* <Form.Item>
                            <div className="form-btn-main">
                                <Space>
                                    <Button danger htmlType="submit" onClick={() => onClose()}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Space>
                            </div>
                        </Form.Item> */}
                  </Form>
                </div>
                <h6 className="chit-details-subTitle">Add Chit</h6>
                <Form.Item
                  label="Select Branch"
                  name="branch"
                  style={{ width: "300px" }}
                >
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
                </Form.Item>

                {/* <Select >
                                        {formFields?.city1?.map((val) => (
                                            <Select.Option key={val.name} value={val.id} >
                                                {val.name}
                                            </Select.Option>
                                        ))}
                                    </Select> */}
                {/* <div className="select-option-outer">
                  <p style={{ paddingRight: "43px" }}>Chit Name</p>
                  <Select
                    defaultValue={selectedOption}
                    style={{ width: 200 }}
                    onChange={(value) => handleChange("chitName", value)}
                  >
                    <Option value="Gold Virksham">Gold Virksham</Option>
                    <Option value="Swarna Laksita">Swarna Laksita</Option>
                    <Option value="Gold Virksham Plus">
                      Gold Virksham Plus
                    </Option>
                  </Select>
                </div> */}

                <Form.Item
                  label="Chit Name"
                  name="chit_name"
                  style={{ width: "300px" }}
                  onChange={handleChitChange}
                >
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
                </Form.Item>
                {/* <div className="select-option-outer">
                  <p style={{ paddingRight: "60px" }}>Amount</p>
                  <Select
                    defaultValue={selectedOption}
                    style={{ width: 200 }}
                    onChange={(value) => handleChange("amount", value)}
                  >
                    <Option value="5000">5000</Option>
                    <Option value="10000">10000</Option>
                    <Option value="15000">15000</Option>
                  </Select>
                </div> */}
                <Form.Item
                  label="Amount"
                  name="amount"
                  style={{ width: "300px" }}
                >
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {state?.branch[0]?.Message?.map((val) => (
                      <Option key={val?.BRNCODE} value={val?.NICADDR}>
                        {val?.NICADDR}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <p style={{ fontSize: "14px" }}>
                  *NOTE you can purchase from the selected branch
                </p>
                <div style={{ margin: "20px 0px" }}>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    style={{ width: "100%" }}
                    scroll={{ x: "100%" }}
                    className="responsive-table"
                  />
                </div>
                {/* <div style={{ marginTop: "35px" }}>
                  <h6 style={{ paddingBottom: "10px" }}>
                    Reference User
                    <span style={{ fontSize: "16px", paddingLeft: "5px" }}>
                      (optional)
                    </span>
                  </h6>
                  <Select
                    defaultValue={selectedOption}
                    style={{ width: 200 }}
                    onChange={(value) => handleChange("referenceUser", value)}
                  >
                    <Option value="Person 1">Person 1</Option>
                    <Option value="Person 2">Person 2</Option>
                    <Option value="Person 3">Person 3</Option>
                  </Select>
                </div> */}
                <Form.Item
                  label="Reference User (Optional)"
                  name="amount"
                  style={{ width: "400px" }}
                >
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {state?.branch[0]?.Message?.map((val) => (
                      <Option key={val?.BRNCODE} value={val?.NICADDR}>
                        {val?.NICADDR}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Checkbox>Terms and conditions</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    style={{ backgroundColor: "#9a2526", marginTop: "10px" }}
                    htmlType="submit"
                  >
                    Add Chit
                  </Button>
                </Form.Item>
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
    </>
  );
};

export default ChitDetails;
