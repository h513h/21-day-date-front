import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, useAppContext } from './AppContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Completed from './pages/Completed';
import Processing from './pages/Processing';
import LoadingSpinner from './components/LoadingSpinner';

function AppContent() {
  const { username, isLoading } = useAppContext();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
      setLocalUsername(username);
    }
  }, [username]);

  const handleLogin = (loggedInUsername) => {
    setLocalUsername(loggedInUsername);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Home username={localUsername} />} />
          <Route path="/completed" element={<Completed username={localUsername} />} />
          <Route path="/processing" element={<Processing username={localUsername} />} />
        </Routes>
      </Router>
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