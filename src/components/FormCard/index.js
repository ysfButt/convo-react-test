import React from 'react';
import { Card, Form, Input, InputNumber, Button, DatePicker, notification } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const FormCard = ({ addRecord }) => {

  // Notify
  const [api, contextHolder] = notification.useNotification();

  // Show Notify
  const openNotification = () => {
    api.success({
      message: `Record Added`,
      description: "Well done, you added a record!",
      placement: 'topRight',
    });
  };

  // UseForm
  const [form] = Form.useForm();

  // Form Submit
  const onFinish = (values) => {
    const record = {
      id: moment().format('LTS'),
      title: values.title,
      upvotes: values.upvotes,
      DatePicker: values.DatePicker,
    };

    addRecord(record);
    openNotification();
    form.resetFields();
  };

  // Custom Format
  const customFormat = value => value.format("DD-MM-YYYY");

  // Disable Date
  // const disabledDate = (current) => {
  //   return moment().add(-1, 'days')  >= current || moment().add(1, 'month')  <= current;
  // }
  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < moment().endOf('day');
  // };
  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().endOf('day');
  // };

  return (
    <Card title="Add Record" className="form-card" bordered={false}>
      {/* Notify */}
      {contextHolder}
      {/* Notify End */}

      {/* Add Record Form */}
      <Form
        name="form_card"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
        // disableddate={disabledDate}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!',
            },
          ]}
        >
          <Input placeholder="Enter title..." />
        </Form.Item>

        <Form.Item
          name="upvotes"
          rules={[
            {
              required: true,
              message: 'Please input your upvotes!',
            },
          ]}
        >
          <InputNumber min={1} max={100} placeholder="Enter upvotes number between 0 to 100" />
        </Form.Item>

        <Form.Item
          name="DatePicker"
          rules={[
            {
              required: true,
              message: 'Please input your date!',
            },
          ]}
        >
          <DatePicker 
            placeholder="Enter date..." 
            format={customFormat}
          />
        </Form.Item>

        <Form.Item>
          <Button type="success" htmlType="submit" block>Add Data</Button>
        </Form.Item>
      </Form>
      {/* Add Record Form End */}
    </Card>
  )
}

export default FormCard;
