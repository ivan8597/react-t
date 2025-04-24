import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';

import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}