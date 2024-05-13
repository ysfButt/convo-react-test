import React from 'react';
import { Card, Form, Input, InputNumber, Button, DatePicker } from 'antd';
// import moment from 'moment';

const FormCard = ({ addRecord }) => {

  // console.log("all addFact", addFact);

  // Form Submit
  const onFinish = (values) => {

    const record = {
      ...values,
      'DatePicker': values['DatePicker'].format('YYYY-MM-DD'),
      // 'key': null,
    };
    // localStorage.setItem('record', JSON.stringify(record));

    // const records = JSON.parse(localStorage.getItem('record'));
    // const records = localStorage.getItem("record");
    console.log(record);

    addRecord(record);

  };

  return (
    <Card title="Add Record" className="form-card" bordered={false}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
          <InputNumber min={1} max={100} placeholder="Enter upvotes number between 0 to 100" className="w-100" />
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
            // onChange={onChange} 
            placeholder="Enter date..." 
            className="w-100" 
            type="object"
          />
        </Form.Item>

        <Form.Item className="mr-0">
          <Button type="success" htmlType="submit" block>Add Data</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default FormCard;
