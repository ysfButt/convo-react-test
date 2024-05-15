
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, ConfigProvider } from 'antd';

// Components
import FormCard from './components/FormCard';
import RecordTable from './components/RecordTable';
import SearchField from './components/SearchField';

// Modals
import RecordView from './components/RecordView';

// Utils 
import useIndexedDB from './utils/useIndexedDB';

// Styles
import './styles/index.css';

function App() {

  // States
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); 

  // IndexedDB
  const { addObject, getAllObjects } = useIndexedDB('RecordsDB', 'RecordsStore');


  // IndexedDB Effect
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
  };

  const handleCloseModal = () => {
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
                  <RecordTable records={records} handleView={handleView} />
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
        {selectedRecord && <RecordView selectedRecord={selectedRecord} records={records} handleCloseModal={handleCloseModal}  />}
        {/* Modals End */}

      </div>
    </ConfigProvider>
  );
}

export default App;
