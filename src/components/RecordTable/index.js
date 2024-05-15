import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const RecordTable = ({records, handleView}) => {

  const oldRecords = [
    ...records,
  ];

  const newRecords = oldRecords.map((item, i) => ({
    ...item,    
    key: i
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
    },
    {
      title: 'Date',
      dataIndex: 'DatePicker',
      key: 'DatePicker',
      render: (text) => text.format('DD-MM-YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="success"  icon={<EyeOutlined />} onClick={() => handleView(record)}>View</Button>
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
        dataSource={newRecords}
        pagination={false} 
      />
    </div>
  )
}

export default RecordTable;
