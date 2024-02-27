import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./Payment.css";
import { Select, Modal } from "antd";
import SideMenuTwo from "../SideMenuTwo";
import Models from "../../imports/models.import";
import { useSetState } from "../../utils/function.utils";
import { ClosedDue, PayDueHeadings } from "../../utils/constants.utils";
import { useNavigate } from "react-router-dom";



const Payment = () => {
  const navigate = useNavigate();
  const { Option } = Select;


  const [state, setState] = useSetState({
    selectedBranch: null,
    branch: [],
    payDueDataSource: [],
    dataSource: [],
    selectedRowData: null,
    selectedPayDueShowData: null,
    isModalVisible: false,
    payDueModalVisible: false,
    SelectedPayDueBranch: null,

  });

  useEffect(() => {
    closedDueBranch();
  }, []);


  
    useEffect(() => {
      const Token = localStorage.getItem("token");

      if (Token == null) {
        navigate("/login");
      }
    },[])
  const closedDueBranch = async () => {
    try {
      const res = await Models.paydue.CdBranch({
        CUSMOBI: localStorage.getItem("code"),
      });
      if (res.results[0].Message == "Authentication Session Failed") {
        navigate("/login");
        return false;
      }
      setState({ branch: res.results[0].Message });
    } catch (error) {
    }
  };

  //   branch change
  const handleBranchChange = (value) => {
    closedDue(null, value);
    setState({ selectedBranch: value });
  };

  const closedDue = async (cusmobi, brncode) => {
    try {
      const res = await Models.paydue.ClosedDue({
        CUSMOBI: localStorage.getItem("code"),
        BRNCODE: brncode,
      });

      if (res.results[0].Message == "Authentication Session Failed") {
        navigate("/login");
        return false;
      }

      setState({ dataSource: res.results[0].Message });
    } catch (error) {
    }
  };

  const payDueChange = (value) => {
    setState({ SelectedPayDueBranch: value });
    PayDue(null, value);
  };

  const PayDue = async (cusmobi, brncode) => {
    try {
      const res = await Models.paydue.PayDue({
        CUSMOBI: localStorage.getItem("code"),
        BRNCODE: brncode,
      });
      const updatedDataSource = res.results[0].Message.map((object, index) => {
        // Add some data to the object here
        return {
          ...object,
          key: `${index + 1}`,
          sNo: index + 1,
        };
      });

      setState({ payDueDataSource: updatedDataSource });
    } catch (error) {
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleRowClick = (record) => {
    setState({ selectedRowData: record });
    setState({ isModalVisible: true });
  };

  const handleCloseModal = () => {
    setState({ isModalVisible: false });
  };

  const handlePayDueRowClick = (record) => {
    setState({ payDueModalVisible: true });
    setState({ selectedPayDueShowData: record });
  };

  const handleClosePayDueModal = () => {
    setState({ payDueModalVisible: false });
  };
  return (
    <div
      className="elisc_tm_all_wrap"
      data-magic-cursor="show"
      data-enter="fadeInLeft"
      data-exit="true"
    >
      <SideMenuTwo />
      <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px] closedDue-container">
        <div className="closedDue">
          <div className="closedDue-title-outer">
            <h2 className="closed-due-title">Current Chit Details</h2>
          </div>

          <div className="select-option-outer">
            <p style={{ paddingRight: "20px" }}>
              Select Branch and Chit to Pay
            </p>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200 }}
              onChange={payDueChange}
              placeholder="Select Branch"
            >
              {state?.branch?.map((val) => (
                <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                  {val?.NICADDR}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ paddingTop: "20px" }}>
            <Table
              dataSource={state.payDueDataSource}
              columns={PayDueHeadings}
              pagination={false}
              style={{ width: "100%", }}
              rowSelection={{
                type: state.selectedPayDueShowData,
                ...rowSelection,
              }}
              onRow={(record, rowIndex) => ({
                onClick: () => handlePayDueRowClick(record),
              })}
              components={{
                body: {
                  row: ({ className, ...restProps }) => {
                    return <tr className={`${className} custom-cursor-pointer`} {...restProps} />;
                  },
                },
              }}
            />
          </div>
          <div className="closedDue-pay-outer">
            <button size="large" className="closedDue-pay">
              PAY
            </button>
          </div>
        </div>

        <div className="closedDue-containerfluid">
          <div className="closed-container">
            <div className="completed-title-outer">
              <h2 className="completed-due-title">Closed Chit Details</h2>
            </div>
            <div className="select-option-outer">
              <p style={{ paddingRight: "20px" }}>
                Select branch and view Completed Chit
              </p>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ width: 200 }}
                onChange={handleBranchChange}
                placeholder="Select Branch"
              >
                {state?.branch?.map((val) => (
                  <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                    {val?.NICADDR}
                  </Option>
                ))}
              </Select>
            </div>

            <div style={{ paddingTop: "20px" }}>
              <Table
                dataSource={state?.dataSource}
                columns={ClosedDue}
                pagination={false}
                style={{ width: "100%" }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleRowClick(record),
                  };
                }}
                components={{
                  body: {
                    row: ({ className, ...restProps }) => {
                      return <tr className={`${className} custom-cursor-pointer`} {...restProps} />;
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* currentChitDetails */}
      <Modal
        visible={state.payDueModalVisible}
        onCancel={handleClosePayDueModal}
        footer={null}
        style={{ width: "100%" }}
      >
        {/* Render detailed information from selectedRowData */}
        {state?.selectedPayDueShowData && (
          <>
            <div>
              <div className="PayDueShowHeading">
                <h6>Chit Name : {state?.selectedPayDueShowData?.CHTNAME}</h6>
              </div>
              <div
                style={{
                  backgroundColor: "#fff2d8",
                  padding: "10px 20px",
                  fontSize: "16px",
                  color: "#ab6465",
                }}
              >
                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "20px" }}>
                    <p>Chit Group / Chit SRNo:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {" "}
                      {state?.selectedPayDueShowData?.CHTGRUP}
                    </p>
                  </div>
                </div>

                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "70px" }}>
                    <p>Customer Name:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {state.selectedPayDueShowData?.CUSNAME}
                    </p>
                  </div>
                </div>

                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "120px" }}>
                    <p>Address1:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {state.selectedPayDueShowData?.CUSADD1}
                    </p>
                  </div>
                </div>

                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "120px" }}>
                    <p>Address2:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {state.selectedPayDueShowData?.CUSADD2}
                    </p>
                  </div>
                </div>

                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "135px" }}>
                    <p>Mobile:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {state.selectedPayDueShowData?.CUSMOBI}
                    </p>
                  </div>
                </div>

                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "145px" }}>
                    <p>Email:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {state.selectedPayDueShowData?.CUSMAIL}
                    </p>
                  </div>
                </div>

                <div className="PayDueLineShow">
                  <div style={{ paddingRight: "135px" }}>
                    <p>Branch:</p>
                  </div>
                  <div>
                    <p className="getPayDueDetails">
                      {state.selectedPayDueShowData?.BRNNAME}
                    </p>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="PayDueLineShow">
                    <div style={{ paddingRight: "5px" }}>
                      <p>Chit Amount:</p>
                    </div>
                    <div>
                      <p className="getPayDueDetails">
                        {state.selectedPayDueShowData?.DUEAMNT}
                      </p>
                    </div>
                  </div>

                  <div className="PayDueLineShow">
                    <div style={{ paddingRight: "5px" }}>
                      <p>Current Due:</p>
                    </div>
                    <div>
                      <p className="getPayDueDetails">
                        {state.selectedPayDueShowData?.DUENUMB}
                      </p>
                    </div>
                  </div>

                  <div className="PayDueLineShow">
                    <div style={{ paddingRight: "5px" }}>
                      <p>No of Dues:</p>
                    </div>
                    <div>
                      <p className="getPayDueDetails">
                        {state.selectedPayDueShowData?.NOOFDUE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* closed chit details */}
      <Modal
        visible={state.isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        style={{ width: "100%" }}
      >
        {/* Render detailed information from selectedRowData */}
        {state?.selectedRowData && (
          <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div>
                <p
                  style={{
                    backgroundColor: "#fff2d8",
                    padding: "8px 50px",
                    fontWeight: "bold",
                  }}
                >
                  From Date
                </p>{" "}
                <br />
                <p
                  style={{
                    backgroundColor: "white",
                    padding: "8px 50px",
                  }}
                >
                  {" "}
                  {state.selectedRowData.CLSFRMDATE}
                </p>
              </div>
              <div>
                <p
                  style={{
                    backgroundColor: "#fff2d8",
                    padding: "8px 50px",
                    fontWeight: "bold",
                  }}
                >
                  To Date{" "}
                </p>
                <br />
                <p
                  style={{
                    backgroundColor: "white",
                    padding: "8px 50px",
                  }}
                >
                  {" "}
                  {state.selectedRowData.CLSTODATE}
                </p>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Payment;
