import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiderLayout from 'components/sider-layout';

const HomeComponent = React.lazy(() => import('pages/home'));
const JSONComponent = React.lazy(() => import('pages/format/json'));
const HashComponent = React.lazy(() => import('pages/generate/hash'));

const Root: React.FC = () => {

  return (
    <Router>
      <Layout hasSider>
        <SiderLayout />
        <Layout style={{ marginLeft: 200, height: '100vh' }}>
          <React.Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomeComponent />}></Route>
              <Route path="home" element={<HomeComponent />}></Route>
              <Route path="format" element={<JSONComponent />}>
                <Route
                  path="json"
                  element={<JSONComponent />}
                />
              </Route>
              <Route path="generate" element={<HashComponent />}>
                <Route
                  path="hash"
                  element={<HashComponent />}
                />
              </Route>
            </Routes>
          </React.Suspense>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Root;