import React from "react";
import { Tabs } from "antd";
import Login from "./Login";
import Register from "./Register";

const UserAuth = () => {


  const items = [
    {
      key: "1",
      label: `Login`,
      children: <Login />,
    },
    {
      key: "2",
      label: `Register`,
      children: <Register />,
    },
  ];
  return (
    <div className="container">
      <div className="col-md-3 d-none  d-lg-block">
      </div>
      <div className="col-md-5 ">
        <Tabs
          className=""
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
};

export default UserAuth;
