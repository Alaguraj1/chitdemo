import React, { useEffect } from "react";
import SideMenuTwo from "../SideMenuTwo";
import { Table, Select } from "antd";
import { LuckyWinnerHeading, PayDueHeadings } from "../../utils/constants.utils";
import { useSetState } from "../../utils/function.utils";
import Models from "../../imports/models.import";
import { useNavigate } from "react-router-dom";
const LuckyWinner = () => {

  const Navigate = useNavigate();
  const { Option } = Select;

  const [state, setState] = useSetState({
    branch: [],
    luckyTableData: [], 
  });

useEffect(() => {
  getBranch();
},[])

useEffect(() => {
  const Token = localStorage.getItem("token");

  if (Token == null) {
    Navigate("/login");
  }
},[])

const getBranch = async() => {
  try {
    const res = await Models.luckyWinner.Branch({
      CUSMOBI: localStorage.getItem("code"),
    });
    if (res.results[0].Message == "Authentication Session Failed") {
      Navigate("/login");
      return false;
    }
    setState({
      branch: res.results[0].Message,
    });
  } catch (error) {
  }
}

const BranchChange = (value) => {
LuckyWinner(null,value)
}


const LuckyWinner = async(cusmobi, brncode) => {
  try{
const res = await Models.luckyWinner.LuckyWinner({
  CUSMOBI: localStorage.getItem("code"),
  BRNCODE: brncode,
}) 


setState({
  luckyTableData: res.results[0].Message,
})


  }catch(error){
  }
}





  return (
    <div
      className="elisc_tm_all_wrap"
      data-magic-cursor="show"
      data-enter="fadeInLeft"
      data-exit="true"
    >
      <SideMenuTwo />
      <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px] home-container-fluid">
        <div className="closedDue">
          <div className="closedDue-title-outer">
            <h2 className="closed-due-title">Lucky Winner</h2>
          </div>

          <div className="select-option-outer">
            <p style={{ paddingRight: "20px" }}>Select Branch To Know The Winner</p>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200 }}
              onChange={BranchChange}
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
              dataSource={state.luckyTableData}
              columns={LuckyWinnerHeading}
              pagination={false}
              style={{ width: "100%" }}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyWinner;
