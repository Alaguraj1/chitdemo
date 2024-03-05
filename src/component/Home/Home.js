import "./Home.css";
import React, { useEffect } from "react";
import SideMenuTwo from "../SideMenuTwo";
import { Table, Button, Space } from "antd";
import {
  CalendarFilled,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { Link, useNavigate } from "react-router-dom";
import { useSetState } from "../../utils/function.utils";
import Models from "../../imports/models.import";

function Home() {
  const navigate = useNavigate();

  const [state, setState] = useSetState({
    productRate: [],
    goldMaxMin: [],
    date: dayjs().format("MM-YYYY"),
    isModalOpen: false,
    calendarOpen: false,
  });

  useEffect(() => {
    const Token = localStorage.getItem("token");

    if (Token == null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getGoldRate();

    const intervalId = setInterval(() => {
      getGoldRate();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getGoldRate = async () => {
    try {
      const res = await Models.goldrate.GoldRate();
      if (res?.results[0].Success === 1) {
        setState({ productRate: res?.results });
      } else {
        navigate("/login");
      }
    } catch (error) {}
  };
console.log("goldrate",state?.productRate)
  // const dateSubmit = async () => {
  //   try {
  //     const res = await Models.goldrate.GoldMaxMinRate({
  //       MonthYear: state?.date,
  //     });
  //     setState({ isModalOpen: true });
  //     setState({ calendarOpen: false });
  //     if (res?.results[0].Success === 1) {
  //       setState({ goldMaxMin: res?.results });
  //     } else {
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //   }
  // };

  // modal
  const showModal = () => {
    setState({ calendarOpen: true });
  };

  const handleOk = () => {
    setState({ calendarOpen: false });
  };

  const handleCancel = () => {
    setState({ calendarOpen: false });
  };

  const handleOk2 = () => {
    setState({ isModalOpen: false });
  };

  const handleCancel2 = () => {
    setState({ isModalOpen: false });
  };

  const handlePay = (record) => {};

  function onPanelChange(value, mode) {
    const formattedDate = dayjs(value).format("MM-YYYY");
    setState({ date: formattedDate });
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
        <div className="imagePosition">
          <h3 className="chit-details-title">
            Hi {localStorage.getItem("userName")}, Welcome To Sree Thangam
            Jewellery
          </h3>

          <div className="home-container">
            <div className="home-left">
              <div className="priceDetails">
                {/* <CalendarFilled className="calendor" onClick={showModal} /> */}

                {state?.productRate[0]?.Message?.map((value) => {
                  return (
                    <marquee className="product-price">
                      Gold Rate : ₹ {value?.RATE1} per GRAM | Silver Rate : ₹{" "}
                      {value?.RATE2} per GRAM | Platinum Rate : ₹ {value.RATE4}{" "}
                      per GRAM{" "}
                    </marquee>
                  );
                })}
              </div>

              {/* <div className="home-payDue">
                <div className="home-table-outer">
                  <h4 className="home-subTitle">Pay Due</h4>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    style={{ width: "100%" }}
                    className="custom-table"
                  />
                </div>
              </div> */}

              <div className="discount-outer">
                <h4 className="home-subTitle">Our Scheme</h4>
                <Link to="/add-chit">
                  <img
                    src="assets/img/scheme.jpg"
                    alt="Discound"
                    style={{ width: "100% !important" }}
                  />
                </Link>
              </div>
            </div>

            <div className="home-right">
              <img
                src="assets/img/bg-1.png"
                alt="side-modal"
                className="home-side-img"
              />
            </div>
          </div>
        </div>

        {/* <Modal
          title={dayjs(state?.date, "MM-YYYY").format("MMMM YYYY")}
          open={state?.isModalOpen}
          onOk={handleOk2}
          onCancel={handleCancel2}
          footer={false}
        >
          <div className="gold-stage">
            <h6 className="gold-low">
              LOW <CaretDownOutlined />
            </h6>
            <h6 className="gold-heigh">
              HIGH <CaretUpOutlined />
            </h6>
            <h6 className="gold-gram">GRAM</h6>
          </div>
          <div className="gold-price">
            {state?.goldMaxMin[0]?.Message?.map((value) => {
              return (
                <>
                  <p className="gold-minprice">Rs : {value.MINRATE}</p>
                  <p className="gold-maxprice">Rs : {value.MAXRATE}</p>
                  <p className="gold-gramprice">1 Gram</p>
                </>
              );
            })}
          </div>
        </Modal> */}

        {/* calendor */}
        {/* <Modal
          title={dayjs(state?.date, "MM-YYYY").format("MMMM YYYY")}
          open={state?.calendarOpen}
          width={350}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <div
            style={{ width: 300, border: "1px solid #d9d9d9", borderRadius: 4 }}
          >
            <Calendar fullscreen={false} mode="year" onChange={onPanelChange} />
          </div>
          <Space style={{ marginTop: "15px" }}>
            <Button
              type="primary"
              onClick={handleCancel}
              size="medium"
              style={{ border: "1px solid white" }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="medium"
              onClick={dateSubmit}
              style={{ border: "1px solid white" }}
            >
              Submit
            </Button>
          </Space>
        </Modal> */}
      </div>
    </div>
  );
}

export default Home;
