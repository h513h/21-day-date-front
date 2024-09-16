import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, useAppContext } from './AppContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Completed from './pages/Completed';
import Processing from './pages/Processing';
import LoadingSpinner from './components/LoadingSpinner';

function AppContent() {
  const { isLoading } = useAppContext();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/processing" element={<Processing />} />
        </Routes>
      </Router>
      {isLoading && <LoadingSpinner />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;