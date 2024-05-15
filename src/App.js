
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, ConfigProvider, Modal } from 'antd';

// Components
import FormCard from './components/FormCard';
import RecordTable from './components/RecordTable';
import SearchField from './components/SearchField';

// Modals
import RecordView from './components/RecordView';
import RecordEdit from './components/RecordEdit';

// Utils 
import useIndexedDB from './utils/useIndexedDB';

// Styles
import './styles/index.css';

function App() {

  // States
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); 
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // IndexedDB
  const { addObject, getAllObjects, updateObject, deleteObject } = useIndexedDB('RecordsDB', 'RecordsStore');


  // Effects
  useEffect(() => {
    getAllObjects(setRecords);
  }, []);

  // Add Record
  const addRecord = (record) => {
    addObject(record);
    setRecords([...records, record]);
  };

  // View Record
  const handleView = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  // Edit Record
  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  // Save Edit Record
  const handleSaveEdit = (editedRecord) => {
    updateObject(editedRecord);
    setRecords(records.map(item => (item.id === editedRecord.id ? editedRecord : item)));
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Delete Confirm
  const handleConfirmDelete = (id) => {
    setRecords(records.filter(item => item.id !== id));
    deleteObject(id);
  };

  // Delete
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete Record',
      content: 'Are you sure you want to delete this record!',
      okText: "Yes", 
      okType: "danger",
      cancelText: "no",
      onOk: () => handleConfirmDelete(record.id),
    });
  };

  // Closed
  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#017da5',
          colorSuccess: '#00a233',
          colorError: '#a81501',

          // Font Family
          fontFamily: `"Mulish", sans-serif`,
        },
      }}
    >
      <div className="wrapper">
        
        {/* Main Layout */}
        <Layout className="main-layout">

          {/* Record Section */}
          <section className="record-section pd-30">
            <Row gutter={[30, 30]}>

              {/* Record Form */}
              <Col xs={24} md={10} lg={10}>
                <FormCard addRecord={addRecord} />
              </Col>
              {/* Record Form End */}

              {/* Record Content */}
              <Col xs={24} md={14} lg={14}>
                <div className="record-content">

                  {/* Search Field */}
                  <SearchField />
                  {/* Search Field End */}

                  {/* Record Table */}
                  <RecordTable records={records} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
                  {/* Record Table End */}

                </div>
              </Col>
              {/* Record Content End */}

            </Row>
          </section>
          {/* Record Section End */}

        </Layout>
        {/* Main Layout End */}

        {/* Modals */}
        {selectedRecord && <RecordView selectedRecord={selectedRecord} handleCloseModal={handleCloseModal} isViewModalOpen={isViewModalOpen} />}
        {isEditModalOpen && <RecordEdit selectedRecord={selectedRecord} handleSaveEdit={handleSaveEdit} handleCloseModal={handleCloseModal} />}
        {/* Modals End */}

      </div>
    </ConfigProvider>
  );
}

export default App;
