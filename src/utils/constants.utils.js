import { Checkbox } from "antd";


export const columns = [
  {
    title: "Chit Group",
    dataIndex: "CHTGRUP",
    key: "CHTGRUP",
  },
  {
    title: "No Of Dues",
    dataIndex: "NOOFDUE",
    key: "NOOFDUE",
  },
  {
    title: "Group Amount",
    dataIndex: "CHTAMNT",
    key: "CHTAMNT",
  },
  {
    title: "Group Capacity",
    dataIndex: "GRPCAPY",
    key: "GRPCAPY",
  },
  {
    title: "Bonus Amount",
    dataIndex: "BONAMNT",
    key: "BONAMNT",
  },

  {
    title: "Gift Amount",
    dataIndex: "GFTAMNT",
    key: "GFTAMNT",
  },
  {
    title: "Chtsrno",
    dataIndex: "CHTSRNO",
    key: "CHTSRNO",
  },
  {
    title: "Lucky Draw",
    dataIndex: "LUKDRAW",
    key: "LUKDRAW",
    render: (text) => {
      return <Checkbox checked={text === "Y"} />;
    },
  },
];
