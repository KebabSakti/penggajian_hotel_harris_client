import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchSalaries } from "../api/Salary";

function SalaryPage() {
  const [salaries, setSalaries] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  useEffect(() => {
    fetch({ size: pagination.pageSize }, { page: pagination.current });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "employee_name",
      sorter: true,
    },
    {
      title: "Department",
      dataIndex: "employee_department",
      responsive: ["md"],
    },
    {
      title: "Position",
      dataIndex: "employee_position",
      responsive: ["md"],
    },
  ];

  function fetch(datas, params) {
    try {
      setLoading(true);
      fetchSalaries(datas, params).then((response) => {
        console.log(response);

        setSalaries(
          response.data.data.map((item) => {
            return { ...item, key: item.salary_id };
          })
        );

        setPagination({
          ...pagination,
          current: response.data.current_page,
          total: response.data.total,
          pageSize: response.data.per_page,
        });

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Data Gaji Karyawan</h1>
      <Table
        columns={columns}
        dataSource={salaries}
        pagination={pagination}
        onChange={(pagination, filters, sorter) => {
          console.log(pagination);
          console.log(sorter);
          fetch({ size: pagination.pageSize }, { page: pagination.current });
        }}
        rowSelection={{
          onSelect: (record, selected, selectedRows, nativeEvent) => {
            console.log(selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selectedRows);
          },
        }}
        loading={loading}
      />
    </div>
  );
}

export default SalaryPage;
