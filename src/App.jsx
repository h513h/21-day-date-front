import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Completed from './pages/Completed';
import Processing from './pages/Processing';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const handleLogin = (loggedInUsername) => {
    setUsername(loggedInUsername);
  };

  return (
    <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<Home username={username} />} />
            <Route path="/completed" element={<Completed username={username} />} />
            <Route path="/processing" element={<Processing username={username} />} />
          </Routes>
        </Router>
      </AppProvider>
  );
}

export default App;