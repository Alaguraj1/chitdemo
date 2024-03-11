import React, { useEffect, useState } from "react";
import "./PaymentHistory.css";
import { Table } from "antd";
import { Select } from "antd";
import SideMenuTwo from "../SideMenuTwo";
import { useSetState } from "../../utils/function.utils";
import Models from "../../imports/models.import";
import { useNavigate } from "react-router-dom";

const ClosedDue = () => {

const navigate = useNavigate();

const [state, setState] = useSetState({
  dataSource:[],
})



  useEffect(() => {

    getTransactions()
  }, []);

  const getTransactions = async () => {
    try {
      const res = await Models.paymentHistory.Transactions({
        CUSMOBI: localStorage.getItem("code"),
      });

      if (res?.results[0].Success === 1) {
        setState({dataSource : res.results[0]?.Message})
      } else {
        navigate("/login");
      }

      if (res.results[0].Message == "Authentication Session Failed") {
        navigate("/login");
        return false;
      }
    } catch (error) {}
  }



  const columns = [
    {
      title: "Group",
      dataIndex: "CHTGRUP",
      key: "CHTGRUP",
    },
    {
      title: "No Of Due",
      dataIndex: "DUENUMB",
      key: "DUENUMB",
    },
    {
      title: "Amount",
      dataIndex: "DUEAMNT",
      key: "DUEAMNT",
    },
    {
      title: "Status",
      dataIndex: "MSTATUS",
      key: "MSTATUS",
    },
  ];

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
            <h2 className="closed-due-title">Your Transactions</h2>
          </div>

          {/* <div className='select-option-outer' >
                            <p style={{ paddingRight: "20px" }}>Select Branch and Chit to Pay</p>
                            <Select
                                defaultValue={selectedOption}
                                style={{ width: 200 }}
                                onChange={(value) => handleChange('branch', value)}
                                className='closedDue-Select'
                            >
                                <Option value="madurai">madurai</Option>
                                <Option value="thirupur">thirupur</Option>
                                <Option value="dindugal">dindugal</Option>
                            </Select>
                        </div> */}

          <div style={{ padding: "20px 0px" }}>
            <Table
              dataSource={state.dataSource}
              columns={columns}
              pagination={false}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedDue;
