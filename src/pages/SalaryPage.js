import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import { fetchSalaries } from "../api/Salary";

function SalaryPage() {
  const [salaries, setSalaries] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState({
    field: "employee_name",
    order: "ascend",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    showLessItems: true,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "employee_name",
      sorter: true,
      ellipsis: true,
      sortIndex: "e.employee_name",
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Department",
      dataIndex: "employee_department",
      ellipsis: true,
    },
    {
      title: "Position",
      dataIndex: "employee_position",
      ellipsis: true,
    },
  ];

  useEffect(() => {
    fetch({ size: pagination.pageSize }, { page: pagination.current });
  }, []);

  async function fetch(datas, params) {
    try {
      setLoading(true);
      await fetchSalaries(datas, params).then((response) => {
        // console.log(response);

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
      message.error(e.message);
    }
  }

  function onChange(pagination, filters, sorter) {
    paginate(pagination);
    // sort(sorter);
  }

  function selectRows(selectedRows) {
    console.log(selectedRows);
  }

  function paginate(pagination) {
    fetch(
      {
        size: pagination.pageSize,
      },
      { page: pagination.current }
    );
  }

  function sort(sorter) {
    console.log(sorter);

    const sorts = salaries.sort((a, b) => {
      if (sorter.order === "descend") {
        return b[sorter.field].localeCompare(a[sorter.field]);
      }

      return a[sorter.field].localeCompare(b[sorter.field]);
    });

    setSalaries(sorts);
  }

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Data Gaji Karyawan</h1>
      <Table
        loading={loading}
        columns={columns}
        dataSource={salaries}
        pagination={pagination}
        onChange={(pagination, filters, sorter) => {
          onChange(pagination, filters, sorter);
        }}
        rowSelection={{
          onSelect: (record, selected, selectedRows, nativeEvent) => {
            selectRows(selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            selectRows(selectedRows);
          },
        }}
      />
    </div>
  );
}

export default SalaryPage;
