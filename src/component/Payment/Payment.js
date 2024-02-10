import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./Payment.css";
import { Select, Modal } from "antd";
import SideMenuTwo from "../SideMenuTwo";
import Models from "../../imports/models.import";
import { useSetState } from "../../utils/function.utils";
import { ClosedDue } from "../../utils/constants.utils";

const { Option } = Select;

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectionType, setSelectionType] = useState("checkbox");

  const [state, setState] = useSetState({
    selectedBranch: null,
    branch: [],
    dataSource: [],
    selectedRowData: null,
    isModalVisible: false,
  });

  useEffect(() => {
    closedDueBranch();
  }, []);

  const closedDueBranch = async () => {
    try {
      const res = await Models.paydue.CdBranch({
        CUSMOBI: localStorage.getItem("code"),
      });
      setState({ branch: res.results[0].Message });
      console.log("✌️res --->", res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("state.branch", state.branch);

  //   branch change
  const handleBranchChange = (value) => {
    console.log("✌️value --->", value);
    closedDue(null, value);
    setState({ selectedBranch: value });
  };

  const closedDue = async (cusmobi, brncode) => {
    try {
      const res = await Models.paydue.ClosedDue({
        CUSMOBI: localStorage.getItem("code"),
        BRNCODE: brncode,
      });

      setState({ dataSource: res.results[0].Message });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  const dataSource = [
    {
      key: "1",
      sNo: 1,
      group: 500,
      name: "Adams",
      currentDue: 1000,
      amount: 15000,
    },
    {
      key: "2",
      sNo: 2,
      group: 1000,
      name: "Raj",
      currentDue: 1000,
      amount: 15000,
    },
    {
      key: "3",
      sNo: 3,
      group: 1000,
      name: "Bala",
      currentDue: 1000,
      amount: 15000,
    },
  ];

  const columns = [
    {
      title: "S No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Current Due",
      dataIndex: "currentDue",
      key: "currentDue",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

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
    console.log("✌️record --->", record);
    setState({ selectedRowData: record });
    setState({ isModalVisible: true });
  };

  const handleCloseModal = () => {
    setState({ isModalVisible: false });
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
              defaultValue={selectedOption}
              style={{ width: 200 }}
              onChange={(value) => handleChange("branch", value)}
              className="closedDue-Select"
            >
              <Option value="madurai">madurai</Option>
              <Option value="thirupur">thirupur</Option>
              <Option value="dindugal">dindugal</Option>
            </Select>
          </div>

          <div style={{ paddingTop: "20px" }}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              style={{ width: "100%" }}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
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
                onRow={(record, rowIndex) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </div>
            <Modal
              visible={state.isModalVisible}
              onCancel={handleCloseModal}
              footer={null}
              style={{ width: "100%" }}
            >
              {/* Render detailed information from selectedRowData */}
              {state?.selectedRowData && (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div>
                      <p style={{backgroundColor:"#fff2d8", padding:"8px 50px", fontWeight:"bold"}}>From Date</p> <br />
                      <p style={{backgroundColor:"white", padding:"8px 50px"}}> {state.selectedRowData.CLSFRMDATE}</p>
                    </div>
                    <div>
                      <p style={{backgroundColor:"#fff2d8", padding:"8px 50px",  fontWeight:"bold"}}>To Date </p>
                      <br />
                      <p style={{backgroundColor:"white", padding:"8px 50px"}}> {state.selectedRowData.CLSTODATE}</p>
                    </div>
                  </div>
                </>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
