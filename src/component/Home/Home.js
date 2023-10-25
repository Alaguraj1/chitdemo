
import "./Home.css"
import React, { useState } from 'react';
import SideMenuTwo from "../SideMenuTwo";
import { Table, Button } from 'antd';

function Home() {


    const dataSource = [
        {
            key: '1',
            sno: 1,
            scheme: "Gold Virksham",
            amount: 1000,
            shouldPay: true,
        },
        {
            key: '2',
            sno: 2,
            scheme: "Swarna Laksita",
            amount: 2000,
            shouldPay: false,
        },
        {
            key: '3',
            sno: 3,
            scheme: "Gold Virksham",
            amount: 1000,
            shouldPay: false,
        },
        {
            key: '4',
            sno: 4,
            scheme: "Gold Virksham Plus",
            amount: 3000,
            shouldPay: true,
        },
    ];

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            key: 'sno',
        },
        {
            title: 'Scheme',
            dataIndex: 'scheme',
            key: 'scheme',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Due',
            key: 'due',
            render: (text, record) => {
                const amountContent = record.shouldPay ? record.amount : 'Nill';
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


    const handlePay = (record) => {
        // Handle the payment for the selected record
        console.log('Pay', record);
    };

    return (
        <div className="elisc_tm_all_wrap" data-magic-cursor="show" data-enter="fadeInLeft" data-exit="true">
            <SideMenuTwo />
            <div className="elisc_tm_mainpart w-full min-h-[100vh] clear-both float-left pl-[370px]"  >
                
                <div className="home-container-fluid">
                <h3 className="chit-details-title">Hi Karthick,  Welcome To Thangam Jewellery</h3>
                    
                    <div className="home-container">
                        
                        <div className="home-left">
                            
                            <div className="priceDetails">
                                <marquee className="product-price">Gold Rate : ₹ 5,565 /Gram  |  Silver Rate : ₹ 78 /Gram  |  Platinum Rate : ₹ 3,308 /Gram  |  Diamont Rate : ₹ 3,25,000 /Gram</marquee>
                            </div>

                            <div className="home-payDue">
                                <div className="home-table-outer">
                                    <h4 className="home-subTitle">Pay Due</h4>
                                    <Table dataSource={dataSource} columns={columns} pagination={false} style={{ width: "100%" }} className="custom-table" />
                                </div>
                            </div>

                            <div className="discount-outer">
                                <h4 className="home-subTitle">Discount</h4>
                                <img src="assets/img/home-discount.avif" alt="" />
                            </div>

                        </div>

                        <div className="home-right">
                            <img src="assets/img/bg-1.png" alt="image" className="login-side-img" />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
