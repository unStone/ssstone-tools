import React, { useEffect, useRef } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SiderLayout from 'components/sider-layout';
import { FLAT_TOOLS } from 'constants/tools';
import { increaseToolUsage } from 'utils/tool-usage';

const HomeComponent = React.lazy(() => import('pages/home'));
const NumberConponent = React.lazy(() => import('pages/convert/number'));
const JSONComponent = React.lazy(() => import('pages/format/json'));
const HashComponent = React.lazy(() => import('pages/generate/hash'));
const UrlComponent = React.lazy(() => import('pages/code/url'));
const AuthenticatorComponent = React.lazy(() => import('pages/generate/authenticator'));

const RouteUsageTracker = () => {
  const location = useLocation();
  const prevPathRef = useRef<string>('');

  useEffect(() => {
    const path = location.pathname.replace(/^\//, '');

    if (!path || path === 'home' || prevPathRef.current === path) {
      return;
    }

    if (FLAT_TOOLS.some((tool) => tool.path === path)) {
      increaseToolUsage(path);
      prevPathRef.current = path;
    }
  }, [location.pathname]);

  return null;
};

const Root: React.FC = () => {
  return (
    <Router>
      <Layout hasSider data-tauri-drag-region>
        <SiderLayout />
        <Layout style={{ marginLeft: 200, height: '100vh' }}>
          <RouteUsageTracker />
          <React.Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomeComponent />}></Route>
              <Route path="home" element={<HomeComponent />}></Route>
              <Route path="convert">
                <Route
                  path="number"
                  element={<NumberConponent />}
                />
              </Route>
              <Route path="code">
                <Route
                  path="url"
                  element={<UrlComponent />}
                />
              </Route>
              <Route path="format">
                <Route
                  path="json"
                  element={<JSONComponent />}
                />
              </Route>
              <Route path="generate">
                <Route
                  path="hash"
                  element={<HashComponent />}
                />
                <Route
                  path="authenticator"
                  element={<AuthenticatorComponent />}
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
