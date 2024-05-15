import React from 'react';
import { Card, Form, Input, InputNumber, Button, DatePicker } from 'antd';
import moment from 'moment';

const FormCard = ({ addRecord }) => {

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

    form.resetFields();
  };

  const customFormat = value => value.format("DD-MM-YYYY");

  return (
    <Card title="Add Record" className="form-card" bordered={false}>
      <Form
        name="form_card"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
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
    </Card>
  )
}

export default FormCard;
