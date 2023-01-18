import React from "react";
import { Table } from "antd";

const TableComponent = ({ onAdd, columns, data }) => {
  return (
    <section>
      <div >


        <p>Users</p>

        <button
          type="submit"
          className="btn btn-primary animated slideInLeft  hover_color py-md-2 px-md-4"
          onClick={onAdd}
        >
          Add
        </button>
      </div>
      <Table
        columns={columns}
        pagination={{
          position: ["bottomRight"],
        }}
        dataSource={Array.isArray(data) ? data : []}
      />
    </section >
  );
};

export default TableComponent;
