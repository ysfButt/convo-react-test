
import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Row, Col, ConfigProvider, Modal, notification } from 'antd';

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
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); 
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // IndexedDB
  const { addObject, getAllObjects, updateObject, deleteObject } = useIndexedDB('RecordsDB', 'RecordsStore');

  // Notify
  const [api, contextHolder] = notification.useNotification();

  // Effects
  useEffect(() => {
    getAllObjects((result) => {
      console.log('Fetched Facts:', result); // Debugging log
      setRecords(result);
      setFilteredRecords(result);
    });
  }, []);
  // useEffect(() => {
  //   getAllObjects(setRecords);
  // }, []);

  // useEffect(() => {
  //   getAllObjects(setFilteredRecords);
  // }, [filteredRecords]);    

  // Add Record
  const addRecord = (record) => {
    addObject(record);
    const newRecords = [...records, record];
    setRecords(newRecords);
    setFilteredRecords(newRecords);
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
    const updatedRecords = records.map(item => (item.id === editedRecord.id ? editedRecord : item));
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Delete Confirm
  const handleConfirmDelete = (id) => {
    const updatedRecords = records.filter(item => item.id !== id);
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    deleteObject(id);
    api.success({
      message: `Record Deleted`,
      description: "Deleted the record!",
      placement: 'topRight',
    });
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

  // Search
  const handleSearch = useCallback((term) => {
    if (term.length >= 3) {
      const filtered = records.filter(fact =>
        fact.title.toLowerCase().includes(term.toLowerCase())
      );
      console.log('Search Term:', term);
      console.log('Filtered Facts:', filtered);
      setFilteredRecords(filtered);
    } else {
      console.log('Search Term less than 3 characters:', term);
      setFilteredRecords(records);
    }
  }, [records]);

  // Sorted
  const handleSort = useCallback((criteria) => {
    console.log('criteria', criteria);
    const sortedFacts = [...filteredRecords].sort((a, b) => {
      console.log('Sorting by:', criteria);
      console.log('a:', a);
      console.log('b:', b);
      if (criteria === 'upvotes') {
        return console.log("a b", b.upvotes - a.upvotes);
      } else if (criteria === 'DatePicker') {
        return new Date(b.DatePicker) - new Date(a.DatePicker);
      }
      return 0;
    });
    console.log('sortedFacts', sortedFacts);
    setFilteredRecords(sortedFacts);
    console.log("records", records);
    console.log("filteredRecords", filteredRecords);
  }, [filteredRecords]);

  // const handleClearSort = useCallback(() => {
  //   setFilteredRecords(records);
  // }, [records]);

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
      {/* Notify */}
      {contextHolder}
      {/* Notify End */}

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
                  <SearchField handleSearch={handleSearch} handleSort={handleSort} />
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
