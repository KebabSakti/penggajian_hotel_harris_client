import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { fetchSalaries } from "../api/Salary";
import moment from "moment";
import {
  Input,
  message,
  Table,
  Button,
  Space,
  DatePicker,
  Tooltip,
  Divider,
} from "antd";

function SalaryPage() {
  const { RangePicker } = DatePicker;

  const dateFormat = "DD/MM/YYYY";
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState({});

  const [periode, setPeriode] = useState([
    moment().startOf("month").format("DD-MM-YYYY"),
    moment().endOf("month").format("DD-MM-YYYY"),
  ]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    showLessItems: true,
    responsive: true,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "employee_name",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Department",
      dataIndex: "employee_department",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Position",
      dataIndex: "employee_position",
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (employee_position) => (
        <Tooltip placement="topLeft" title={employee_position}>
          {employee_position}
        </Tooltip>
      ),
    },
    {
      title: "Gaji Pokok",
      dataIndex: "salary_basic",
      sorter: true,
      ellipsis: true,
    },
  ];

  useEffect(() => {
    fetch(
      {
        size: pagination.pageSize,
        date_start: periode[0],
        date_end: periode[1],
      },
      { page: pagination.current }
    );
  }, [periode]);

  async function fetch(datas, params) {
    try {
      setLoading(true);
      await fetchSalaries(datas, params).then((response) => {
        console.log(response);

        let datas = response.data.data.map((item) => {
          return { ...item, key: item.salary_id };
        });

        if (JSON.stringify(sorting) !== "{}") {
          datas = sortItems(datas);
        }

        setRecords(datas);

        setPagination({
          ...pagination,
          current: response.data.current_page,
          total: response.data.total,
          pageSize: response.data.per_page,
          pageSizeOptions: ["10", response.data.total],
        });

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      message.error(e.message);
    }
  }

  function datePickerHandler(dates, dateStrings) {
    if (dates != null) {
      setPeriode([
        dates[0].format("DD-MM-YYYY"),
        dates[1].format("DD-MM-YYYY"),
      ]);
    } else {
      setPeriode(["", ""]);
    }
  }

  function searchBox(e) {
    const keyword = e.target.value;

    fetch(
      {
        size: pagination.pageSize,
        keyword: keyword,
        date_start: periode[0],
        date_end: periode[1],
      },
      { page: pagination.current }
    );
  }

  function sortItems(items) {
    const sortItems = items.sort((a, b) => {
      if (sorting.order === "descend") {
        return a[sorting.field].localeCompare(b[sorting.field]);
      }

      return b[sorting.field].localeCompare(a[sorting.field]);
    });

    return sortItems;
  }

  function onChange(pagination, filters, sorter) {
    paginate(pagination);
    sort(sorter);
  }

  function selectRows(items) {
    setSelectedRows(items);
  }

  function paginate(pagination) {
    fetch(
      {
        size: pagination.pageSize,
        date_start: periode[0],
        date_end: periode[1],
      },
      { page: pagination.current }
    );
  }

  function sort(sorter) {
    setSorting(sorter);
  }

  return (
    <div>
      <h1>Data Gaji Karyawan</h1>
      <Divider />
      <div style={{ marginBottom: "10px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedRows.length == 0 ? true : false}
          >
            ({selectedRows.length}) Kirim Email
          </Button>
          <RangePicker
            defaultValue={[
              moment(periode[0], dateFormat),
              moment(periode[1], dateFormat),
            ]}
            format={dateFormat}
            ranges={{
              "Hari Ini": [moment(), moment()],
              "Bulan Ini": [moment().startOf("month"), moment().endOf("month")],
              "Tahun ini": [moment().startOf("year"), moment().endOf("year")],
            }}
            onChange={(dates, dateStrings) =>
              datePickerHandler(dates, dateStrings)
            }
          />
        </Space>
        <Input
          onKeyUp={searchBox}
          style={{ float: "right", width: "200px" }}
          placeholder="Ketik untuk mencari"
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={records}
        pagination={pagination}
        sortDirections={["ascend", "descend", "ascend"]}
        onChange={(pagination, filters, sorter) =>
          onChange(pagination, filters, sorter)
        }
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => selectRows(selectedRows),
        }}
      />
    </div>
  );
}

export default SalaryPage;
