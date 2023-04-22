import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { ListClientPage, ViewClientPage } from './pages';

console.log(process.env.REACT_APP_ROUTE_CLIENT)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={`/${process.env.REACT_APP_ROUTE_CLIENT}`} element={<ListClientPage />} />
          <Route path={`/${process.env.REACT_APP_ROUTE_CLIENT}/:id`} element={<ViewClientPage />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
