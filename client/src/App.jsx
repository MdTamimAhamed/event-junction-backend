import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Signup from './components/signups/Signup';
import Login from './components/logins/Login';
import Home from './components/home/Home';
import HomeLayout from './components/home/HomeLayout';

import Events from './components/pages/Events.jsx';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

import LayoutAdminDashboard from './components/admin-dashboard/LayoutAdminDashboard';
import AdminProfile from './components/profile/AdminProfile';
import Dashboard from './components/admin-dashboard/Dashboard';
import CreateEventForm from './components/event-forms/CreateEventForm';
import Logout from './components/logout/Logout';

import EventEdit from './components/event-pages/EventEdit';
import PreviewEvent from './components/event-pages/PreviewEvent';
import ShowEvent from './components/client-components/ShowEvent';

import ProtectedRoute from './components/protected-route/ProtectedRoutes';
import { useState, useEffect } from 'react';

function App() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        zIndex: 9999,
                    },
                }}
            />
            <Routes>
                {/* Public routes */}

                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/events" element={<Events />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Private routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            element={<LayoutAdminDashboard />}
                            userRole="Admin"
                        />
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route
                        path="preview-event/:id"
                        element={<PreviewEvent />}
                    />
                    <Route path="event-edit/:id" element={<EventEdit />} />
                    <Route path="admin-profile" element={<AdminProfile />}>
                        <Route
                            path="create-event"
                            element={<CreateEventForm />}
                        />
                    </Route>
                    <Route index path="logout" element={<Logout />} />
                </Route>

                {/* User Private routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            element={<HomeLayout />}
                            userRole="Client"
                        />
                    }
                />
                <Route
                    path="/show-event/:id"
                    element={
                        <ProtectedRoute
                            element={<ShowEvent />}
                            userRole="Client"
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
