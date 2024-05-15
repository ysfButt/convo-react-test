import React, { useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Modal, Button } from 'antd';

const RecordEdit = ({selectedRecord, handleCloseModal, handleSaveEdit}) => {

  // Form View
  const [form] = Form.useForm();
  
  // Effects
  useEffect(() => {
    form.setFieldsValue(selectedRecord);
  }, [selectedRecord]);

  // Custom Format
  const customFormat = value => value.format("DD-MM-YYYY");

  // Form Submit
  const onFinish = (values) => {
    const record = {
      id: selectedRecord.id,
      title: values.title,
      upvotes: values.upvotes,
      DatePicker: values.DatePicker,
    }
    handleSaveEdit(record); 
  };

  return (
    <Modal
      title="Edit Record"
      open={selectedRecord} 
      footer={null}
      onCancel={handleCloseModal}
      className="form-card"
      >
      <Form
        name="recordEdit"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        form={form}
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
          <Button type="success" htmlType="submit" block>Save Edit</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RecordEdit;
