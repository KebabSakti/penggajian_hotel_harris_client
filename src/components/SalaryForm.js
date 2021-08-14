import React, { useEffect, useState } from "react";
import { fetchSalaryFormData } from "../api/Salary";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import {
  Form,
  Input,
  Select,
  message,
  InputNumber,
  DatePicker,
  Button,
} from "antd";

export default function SalaryForm({
  submitLoading,
  data,
  createSalary,
  updateSalary,
}) {
  const { Option } = Select;

  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      fetchSalaryFormData().then((response) => {
        setFormData(response.data);

        if (data !== null) {
          form.setFieldsValue({
            ...data,
            salary_periode: moment(data?.salary_periode) ?? moment(),
            salary_basic: parseFloat(data.salary_basic),
            salary_allowance: parseFloat(data.salary_allowance),
            salary_bpjs: parseFloat(data.salary_bpjs),
            salary_final: parseFloat(data.salary_final),
            salary_incentive: parseFloat(data.salary_incentive),
            salary_jht: parseFloat(data.salary_jht),
            salary_meal_allowance: parseFloat(data.salary_meal_allowance),
            salary_misc: parseFloat(data.salary_misc),
            salary_overtime: parseFloat(data.salary_overtime),
            salary_per_day: parseFloat(data.salary_per_day),
            salary_pph: parseFloat(data.salary_pph),
            salary_service_charge: parseFloat(data.salary_service_charge),
            salary_additional_service: parseFloat(
              data.salary_additional_service
            ),
          });
        }

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      message.error(e.message);
    }
  }, []);

  function submitForm(values) {
    if (data == null) {
      createSalary({
        ...values,
        salary_periode: values.salary_periode.format("YYYY-MM-DD"),
      }).then(() => {
        form.resetFields();
      });
    } else {
      updateSalary({
        ...values,
        salary_id: data.salary_id,
        salary_periode: values.salary_periode.format("YYYY-MM-DD"),
      });
    }
  }

  function onValuesChange(changedValue, allValues) {
    const salaryBasic = allValues.salary_working_day * allValues.salary_per_day;
    const salaryJht = salaryBasic * 0.02;
    const salaryJp = salaryBasic * 0.01;
    const salaryBpjs = salaryBasic * 0.01;

    const salaryFone =
      salaryBasic +
      allValues.salary_additional_service +
      allValues.salary_overtime +
      allValues.salary_allowance +
      allValues.salary_meal_allowance +
      allValues.salary_incentive +
      allValues.salary_service_charge;

    const salaryFtwo =
      allValues.salary_pph +
      salaryJht +
      salaryJp +
      salaryBpjs +
      allValues.salary_misc;

    const salaryFinal = salaryFone - salaryFtwo;

    //update fields
    form.setFieldsValue({
      salary_basic: isNaN(salaryBasic) ? 0 : salaryBasic,
      salary_jht: isNaN(salaryJht) ? 0 : salaryJht,
      salary_jp: isNaN(salaryJp) ? 0 : salaryJp,
      salary_bpjs: isNaN(salaryBpjs) ? 0 : salaryBpjs,
      salary_final: isNaN(salaryFinal) ? 0 : salaryFinal,
    });
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={onValuesChange}
      onFinish={(values) => submitForm(values)}
    >
      <Form.Item
        label="Periode"
        name="salary_periode"
        initialValue={moment()}
        rules={[{ required: true, message: "Pilih periode data" }]}
      >
        <DatePicker
          placeholder="Pilih bulan"
          picker={"month"}
          format="MMMM YYYY"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Karyawan"
        name="employee_id"
        rules={[
          { required: true, message: "Anda harus memilih satu karyawan" },
        ]}
      >
        <Select placeholder="Pilih karyawan" loading={loading}>
          {formData != null &&
            formData.emp.map((item) => (
              <Option key={item.employee_id} value={item.employee_id}>
                {item.employee_name} ({item.employee_id})
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="No Rekening" name="salary_account_number">
        <Input />
      </Form.Item>

      <Form.Item label="NPWP" name="salary_npwp">
        <Input />
      </Form.Item>

      <Form.Item label="Tax Status" name="salary_tax_status">
        <Select placeholder="Tax Status" loading={loading}>
          {formData != null &&
            formData.tax.map((item) => (
              <Option key={item.id} value={item.tax_name}>
                {item.tax_name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Hari Kerja" name="salary_working_day" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Hari Masuk Kerja"
        name="salary_checkin_day"
        initialValue={0}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="salary_day_total" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Gaji Per Hari" name="salary_per_day" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Gaji Pokok" name="salary_basic" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Jumlah Tambahan Service"
        name="salary_additional_service"
        initialValue={0}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Jumlah Lembur" name="salary_overtime" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Tunjangan Jabatan"
        name="salary_allowance"
        initialValue={0}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Uang Makan"
        name="salary_meal_allowance"
        initialValue={0}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Insentive" name="salary_incentive" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Service Charge"
        name="salary_service_charge"
        initialValue={0}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="PPH 21" name="salary_pph" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="JHT" name="salary_jht" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="BPJS" name="salary_bpjs" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Miscellaneous" name="salary_misc" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Gaji Final" name="salary_final" initialValue={0}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Keterangan" name="salary_description">
        <TextArea rows={5} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
