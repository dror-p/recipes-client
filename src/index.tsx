import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewAllRecipesPage from './components/ViewAllRecipesPage';
import reportWebVitals from './reportWebVitals';
import CreateRecipePage from './components/CreateRecipePage';
import CookingModePage from './components/CookingModePage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ViewAllRecipesPage />} />
        <Route path="/create" element={<CreateRecipePage />} />
        <Route path="/recipes/cooking/:id" element={<CookingModePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
