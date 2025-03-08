import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

function PrivateRoute({ children }) {
    return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
    return !localStorage.getItem("token") ? children : <Navigate to="/dashboard" />;
}

function App() {
    return (
        <Router>
                <PrivateRoute>
                    <Navbar bg="primary">
                      <Container>
                        <Link to={"/dashboard"} className="navbar-brand text-white">
                          Basic Crud App
                        </Link>
                      </Container>
                    </Navbar>
                </PrivateRoute>
            <Routes>
                {/* Default route redirects to login */}
                <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

                {/* Authentication Routes */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/employees" element={<PrivateRoute><Employees /></PrivateRoute>} />

                {/* Catch-All Route (Optional) */}
                <Route path="*" element={<PublicRoute><Login /></PublicRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
