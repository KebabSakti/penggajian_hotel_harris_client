import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import SalaryForm from "../components/SalaryForm";
import moment from "moment";
import "moment/locale/id";
import { formatCurrency, mMessage } from "../helper/Helper";
import {
  fetchSalaries,
  addSalary,
  updateSalary,
  deleteSalary,
} from "../api/Salary";
import {
  MailOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Input,
  message,
  Table,
  Button,
  DatePicker,
  Divider,
  Row,
  Col,
  Dropdown,
  Menu,
  Typography,
  Modal,
  Upload,
} from "antd";

function SalaryPage() {
  const { RangePicker } = DatePicker;
  const { Text } = Typography;
  const { confirm } = Modal;

  const dateFormat = "DD/MM/YYYY";

  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
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
    position: ["bottomCenter"],
    showSizeChanger: true,
  });

  const columns = [
    {
      title: "Bulan",
      dataIndex: "salary_periode",
      // fixed: "left",
      sorter: true,
      render: (value) => moment(value).locale("id").format("MMMM YYYY"),
    },
    {
      title: "ID",
      dataIndex: "employee_id",
      // fixed: "left",
    },
    {
      title: "Status",
      dataIndex: "employee_status",
      // fixed: "left",
    },
    {
      title: "Nama",
      dataIndex: "employee_name",
      sorter: true,
      // fixed: "left",
    },
    {
      title: "Dept",
      dataIndex: "employee_department",
      sorter: true,
    },
    {
      title: "Jabatan",
      dataIndex: "employee_position",
      sorter: true,
    },
    {
      title: "Tgl Onboard",
      dataIndex: "employee_onboard_date",
      sorter: true,
      ellipsis: true,
      render: (text) => moment(text).locale("id").format("DD MMM YYYY"),
    },
    {
      title: "Rekening",
      dataIndex: "salary_account_number",
      ellipsis: true,
    },
    {
      title: "NPWP",
      dataIndex: "salary_npwp",
      ellipsis: true,
    },
    {
      title: "Tax Sts",
      dataIndex: "salary_tax_status",
      ellipsis: true,
    },
    {
      title: "Kehadiran",
      ellipsis: true,
      children: [
        {
          title: "H.Kerja",
          dataIndex: "salary_working_day",
          ellipsis: true,
        },
        {
          title: "H.Masuk Kerja",
          dataIndex: "salary_checkin_day",
          ellipsis: true,
        },
      ],
    },
    {
      title: "Total",
      dataIndex: "salary_day_total",
      ellipsis: true,
      sorter: true,
    },
    {
      title: "Gaji Per Hari",
      dataIndex: "salary_per_day",
      sorter: true,
      ellipsis: true,
      render: (value) => formatCurrency(value),
    },
    {
      title: "Gaji Pokok",
      dataIndex: "salary_basic",
      sorter: true,
      ellipsis: true,
      render: (value) => formatCurrency(value),
    },
    {
      title: "Additional",
      children: [
        {
          title: "Jml Tambahan Service",
          dataIndex: "salary_additional_service",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "Jam Lembur",
          dataIndex: "salary_overtime",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "Tnj Jabatan",
          dataIndex: "salary_allowance",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "Uang Makan",
          dataIndex: "salary_meal_allowance",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "Insentive",
          dataIndex: "salary_incentive",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
      ],
    },
    {
      title: "Service Charge  ",
      dataIndex: "salary_service_charge",
      sorter: true,
      ellipsis: true,
      render: (value) => formatCurrency(value),
    },
    {
      title: "Deduction",
      children: [
        {
          title: "PPH 21",
          dataIndex: "salary_pph",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "JHT",
          dataIndex: "salary_jht",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "JP",
          dataIndex: "salary_jp",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "BPJS KES",
          dataIndex: "salary_bpjs",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
        {
          title: "Miscellaneous",
          dataIndex: "salary_misc",
          ellipsis: true,
          sorter: true,
          render: (value) => formatCurrency(value),
        },
      ],
    },
    {
      title: "Gaji Final",
      dataIndex: "salary_final",
      ellipsis: true,
      sorter: true,
      render: (value) => formatCurrency(value),
    },
    {
      title: "Ket",
      dataIndex: "salary_description",
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "salary_id",
      fixed: "right",
      render: (text, record) => {
        const menu = (
          <Menu onClick={(key) => menuItemHandler(key, record)}>
            <Menu.Item key="cetak">Cetak Slip Gaji</Menu.Item>
            <Menu.Item key="email">Email Slip Gaji</Menu.Item>
            <Menu.Divider style={{ padding: "0px", margin: "0px" }} />
            <Menu.Item key="edit">Edit Data</Menu.Item>
            <Menu.Item key="hapus">
              <Text type="danger">Hapus Data</Text>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown
            trigger={["click", "hover"]}
            placement="topCenter"
            overlay={menu}
            arrow
          >
            <Button size="small" shape="circle" type="dashed">
              <MenuFoldOutlined />
            </Button>
          </Dropdown>
        );
      },
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
        // console.log(response.data);

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
          showSizeChanger: response.data.total > 10 ? true : false,
          pageSizeOptions: ["10", response.data.total],
        });

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      message.error(e.message);
    }
  }

  async function createSalary(values) {
    try {
      setSubmitLoading(true);

      mMessage("Memproses data, mohon tunggu", "loading");

      return await addSalary(values).then((response) => {
        fetch(
          {
            size: pagination.pageSize,
            date_start: periode[0],
            date_end: periode[1],
          },
          { page: pagination.current }
        );

        setSubmitLoading(false);

        mMessage("Data berhasil di tambah", "success");

        return response.data;
      });
    } catch (e) {
      setSubmitLoading(false);

      mMessage(e.message, "error");
    }
  }

  async function editSalary(values) {
    try {
      setSubmitLoading(true);

      mMessage("Memproses data, mohon tunggu", "loading");

      return await updateSalary(values).then((response) => {
        fetch(
          {
            size: pagination.pageSize,
            date_start: periode[0],
            date_end: periode[1],
          },
          { page: pagination.current }
        );

        setSubmitLoading(false);

        mMessage("Data berhasil di update", "success");

        return response.data;
      });
    } catch (e) {
      setSubmitLoading(false);

      mMessage(e.message, "error");
    }
  }

  async function destroySalary(value) {
    try {
      setLoading(true);

      mMessage("Memproses data, mohon tunggu", "loading");

      deleteSalary({ salary_id: value.salary_id }).then(() => {
        fetch(
          {
            size: pagination.pageSize,
            date_start: periode[0],
            date_end: periode[1],
          },
          { page: pagination.current }
        );

        setLoading(false);

        mMessage("Data berhasil di hapus", "success");
      });
    } catch (e) {
      setLoading(false);

      mMessage(e.message, "error");
    }
  }

  function importData(values) {
    mMessage("Memproses file. mohon tunggu", "loading");

    if (values.file.status === "done") {
      // console.log(values.file);

      fetch(
        {
          size: pagination.pageSize,
          date_start: periode[0],
          date_end: periode[1],
        },
        { page: pagination.current }
      );

      mMessage("Import data berhasil", "success");
    }

    if (values.file.status === "error") {
      mMessage(values.file.error.message, "error");
    }
  }

  function toggleModal(value) {
    setModalContent(value);
    setShowModal(true);
  }

  function topMenuItemHandler(target) {
    switch (target.key) {
      case "add":
        toggleModal(null);
        break;

      case "excel":
        window.open(
          process.env.REACT_APP_BASE_URL +
            "/export/salary/xlsx/start/" +
            periode[0] +
            "/end/" +
            periode[1]
        );
        break;

      case "csv":
        window.open(
          process.env.REACT_APP_BASE_URL +
            "/export/salary/csv/start/" +
            periode[0] +
            "/end/" +
            periode[1]
        );
        break;

      case "download":
        window.open(
          process.env.REACT_APP_BASE_URL + "/export/salary/skeleton/"
        );
        break;
    }
  }

  function menuItemHandler(target, record) {
    switch (target.key) {
      // case "email":
      //   console.log("email");
      //   break;

      case "cetak":
        break;

      case "edit":
        toggleModal(record);
        break;

      case "hapus":
        confirm({
          title: "Anda yakin?",
          icon: <ExclamationCircleOutlined />,
          content: "Proses ini tidak dapat dikembalikan",
          onOk() {
            destroySalary(record);
          },
        });
        break;
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
      <Modal
        width={700}
        closable={false}
        destroyOnClose={true}
        visible={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
      >
        <div style={{ marginTop: "20px" }}>
          <SalaryForm
            submitLoading={submitLoading}
            data={modalContent}
            createSalary={createSalary}
            updateSalary={editSalary}
          />
        </div>
      </Modal>

      <h1>Data Gaji Karyawan</h1>
      <Divider />
      <div style={{ marginBottom: "10px" }}>
        <Row gutter={[16, 10]} justify="space-between">
          <Col xs={24} lg={18}>
            <Row justify="start" gutter={[10, 10]}>
              <Col xs={24} lg={4}>
                <Dropdown
                  trigger={["click", "hover"]}
                  overlay={() => (
                    <Menu onClick={(value) => topMenuItemHandler(value)}>
                      <Menu.Item key="add">Tambah Data</Menu.Item>
                      <Menu.Item key="import">
                        <Upload
                          action="http://localhost:1001/api/import/salary"
                          withCredentials={true}
                          showUploadList={false}
                          // accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          accept=".csv"
                          onChange={(values) => importData(values)}
                        >
                          Import Data
                        </Upload>
                      </Menu.Item>
                      <Menu.Item key="download">Download File Import</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="excel">Export Excel</Menu.Item>
                      <Menu.Item key="csv">Export CSV</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="delete">
                        <Text type="danger">
                          ({selectedRows.length}) Hapus Data
                        </Text>
                      </Menu.Item>
                    </Menu>
                  )}
                >
                  <Button block>
                    Menu <MenuFoldOutlined />
                  </Button>
                </Dropdown>
              </Col>
              <Col xs={24} lg={6}>
                <Button
                  type="primary"
                  block={true}
                  icon={<MailOutlined />}
                  disabled={selectedRows.length == 0 ? true : false}
                >
                  ({selectedRows.length}) Kirim Email
                </Button>
              </Col>
              <Col xs={24} lg={8}>
                <RangePicker
                  defaultValue={[
                    moment(periode[0], dateFormat),
                    moment(periode[1], dateFormat),
                  ]}
                  format={dateFormat}
                  ranges={{
                    "Hari Ini": [moment(), moment()],
                    "Bulan Ini": [
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ],
                    "Tahun ini": [
                      moment().startOf("year"),
                      moment().endOf("year"),
                    ],
                  }}
                  onChange={(dates, dateStrings) =>
                    datePickerHandler(dates, dateStrings)
                  }
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={6}>
            <Input
              onChange={searchBox}
              style={{ float: "right" }}
              placeholder="Ketik untuk mencari"
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>
      </div>
      <Table
        showHeader={records.length > 0 && true}
        loading={loading}
        columns={columns}
        dataSource={records}
        pagination={pagination}
        bordered={true}
        sortDirections={["ascend", "descend", "ascend"]}
        scroll={records.length > 0 && { x: true, y: false }}
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
