
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, ConfigProvider } from 'antd';

// Components
import FormCard from './components/FormCard/indes';
import RecordTable from './components/RecordTable/indes';
import SearchField from './components/SearchField/indes';

// Utils 
import useIndexedDB from './utils/useIndexedDB';

// Styles
import './styles/index.css';

function App() {

  // States
  const [records, setRecords] = useState([]);

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
                  <RecordTable records={records} />
                  {/* Record Table End */}

                </div>
              </Col>
              {/* Record Content End */}

            </Row>
          </section>
          {/* Record Section End */}

        </Layout>
        {/* Main Layout End */}

      </div>
    </ConfigProvider>
  );
}

export default App;
