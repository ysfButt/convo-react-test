import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const RecordTable = ({records, handleView, handleEdit, handleDelete}) => {

  const oldRecords = [
    ...records,
  ];

  const newRecords = oldRecords.map((item, i) => ({
    ...item,
    key: i,
  }));

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
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Date',
      dataIndex: 'DatePicker',
      key: 'DatePicker',
      render: (text) => text.format('DD-MM-YYYY'),
      sorter: (a, b) => a.age - b.age,  
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="success"  icon={<EyeOutlined />} onClick={() => handleView(record)}>View</Button>
          <Button type="primary"  icon={<EditOutlined />} onClick={() => handleEdit(record)} >Edit</Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-wrap record-table-wrap">
      <Table 
        columns={columns}
        dataSource={newRecords}
        pagination={false} 
      />
    </div>
  )
}

export default RecordTable;
