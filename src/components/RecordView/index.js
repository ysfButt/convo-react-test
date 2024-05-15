import React from 'react';
import { Form, Input, InputNumber, DatePicker, Modal } from 'antd';

const RecordView = ({selectedRecord, handleCloseModal}) => {

  // Form View
  const [form] = Form.useForm(); 
  form.setFieldsValue(selectedRecord);

  // Custom Format
  const customFormat = value => value.format("DD-MM-YYYY");

  return (
    <Modal
      title="View Record"
      open={selectedRecord} 
      footer={null}
      onCancel={handleCloseModal}
      className="form-card"
    >
      <Form
        name="recordView"
        layout="vertical"
        autoComplete="off"
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
          <Input placeholder="Enter title..." disabled={form} />
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
          <InputNumber min={1} max={100} placeholder="Enter upvotes number between 0 to 100" disabled={form} />
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
            disabled={form}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RecordView;
