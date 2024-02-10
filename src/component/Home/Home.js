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
import { useNavigate } from "react-router-dom";
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
    getGoldRate();

    const intervalId = setInterval(() => {
      getGoldRate();
    }, 5 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const getGoldRate = async () => {
    try {
      const res = await Models.goldrate.GoldRate();
      console.log("✌️res --->", res);
      if (res?.results[0].Success === 1) {
        setState({ productRate: res?.results });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Form error:", error);
    }
  };

  const dateSubmit = async () => {
    try {
      const res = await Models.goldrate.GoldMaxMinRate({
        MonthYear: state?.date,
      });
      console.log("✌️res --->", res);
      setState({ isModalOpen: true });
      setState({ calendarOpen: false });
      if (res?.results[0].Success === 1) {
        setState({ goldMaxMin: res?.results });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Form error:", error);
    }
  };

  const dataSource = [
    {
      key: "1",
      sno: 1,
      scheme: "Gold Virksham",
      amount: 1000,
      shouldPay: true,
    },
    {
      key: "2",
      sno: 2,
      scheme: "Swarna Laksita",
      amount: 2000,
      shouldPay: false,
    },
    {
      key: "3",
      sno: 3,
      scheme: "Gold Virksham",
      amount: 1000,
      shouldPay: false,
    },
    {
      key: "4",
      sno: 4,
      scheme: "Gold Virksham Plus",
      amount: 3000,
      shouldPay: true,
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Scheme",
      dataIndex: "scheme",
      key: "scheme",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Due",
      key: "due",
      render: (text, record) => {
        const amountContent = record.shouldPay ? record.amount : "Nill";
        return (
          <span>
            {record.shouldPay ? (
              <Button onClick={() => handlePay(record)}>{amountContent}</Button>
            ) : (
              <span>{amountContent}</span>
            )}
          </span>
        );
      },
    },
  ];

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

  const handlePay = (record) => {
    console.log("Pay", record);
  };

  function onPanelChange(value, mode) {
    const formattedDate = dayjs(value).format("MM-YYYY");
    console.log(formattedDate);
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
            Hi Karthick, Welcome To Thangam Jewellery
          </h3>

          <div className="home-container">
            <div className="home-left">
              <div className="priceDetails">
                <CalendarFilled className="calendor" onClick={showModal} />

                {state?.productRate[0]?.Message?.map((value) => {
                  console.log("value", value?.RATE1);
                  return (
                    <marquee className="product-price">
                      Gold Rate : ₹ {value?.RATE1} per GRAM | Silver Rate : ₹{" "}
                      {value?.RATE2} per GRAM | Platinum Rate : ₹ {value.RATE4}{" "}
                      per GRAM{" "}
                    </marquee>
                  );
                })}
              </div>

              <div className="home-payDue">
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
              </div>

              <div className="discount-outer">
                <h4 className="home-subTitle">Discount</h4>
                <img src="assets/img/home-discount.avif" alt="Discound" />
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

        <Modal
          title={dayjs(state?.date, "MM-YYYY").format("MMMM YYYY")}
          open={state?.isModalOpen}
          onOk={handleOk2}
          onCancel={handleCancel2}
          footer={false}
        >
          {/* <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </div> */}
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
              console.log("maxMin rate", value);
              return (
                <>
                  <p className="gold-minprice">Rs : {value.MINRATE}</p>
                  <p className="gold-maxprice">Rs : {value.MAXRATE}</p>
                  <p className="gold-gramprice">1 Gram</p>
                </>
              );
            })}
          </div>
        </Modal>

        {/* calendor */}
        <Modal
          title="SEP-GOLD RATE"
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
              cancel
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
        </Modal>
      </div>
    </div>
  );
}

export default Home;
