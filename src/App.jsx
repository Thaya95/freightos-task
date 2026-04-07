import React from 'react';
import { ConfigProvider, theme } from 'antd';
import CharactersPage from './pages/CharactersPage';
import './index.css';

/**
 * App root.
 * ConfigProvider wraps the entire tree so the dark algorithm
 * and custom tokens apply globally — no per-component theme props needed.
 */
const App = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#6c63ff',
        colorBgBase:  '#141626',
        borderRadius: 8,
        fontFamily:   "'Inter', system-ui, sans-serif",
      },
    }}
  >
    <CharactersPage />
  </ConfigProvider>
);

export default App;
