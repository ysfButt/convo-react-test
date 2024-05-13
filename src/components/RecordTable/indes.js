import React from 'react';
import { Table, Button, Space, Row } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const RecordTable = (records) => {

  const newData = [
    ...records.records,
  ];

  const oldRecords = [
    ...records.records,
  ];

  const newRecords = oldRecords.map((item, i) => ({
    ...item,    
    key: i
  }));

  console.log("newRecords", newRecords);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '350px'
    },
    {
      title: 'Upvotes',
      dataIndex: 'upvotes',
      key: 'upvotes',
    },
    {
      title: 'Date',
      dataIndex: 'DatePicker',
      key: 'DatePicker',
      render: (text) => moment(text).format('l'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="success"  icon={<EyeOutlined />}>View</Button>
          <Button type="primary"  icon={<EditOutlined />}>Edit</Button>
          <Button type="danger"  icon={<DeleteOutlined />}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-wrap record-table-wrap">
      <Table 
        columns={columns}
        // dataSource={newData}
        dataSource={newRecords}
        pagination={false} 
      />
    </div>
  )
}

export default RecordTable;
