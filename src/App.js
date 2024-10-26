import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
                <Route path="/" element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Dashboard userRole={userRole} />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
