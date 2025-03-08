import { useNavigate } from "react-router-dom";
import { Container, Button, Navbar, Nav } from "react-bootstrap";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Dashboard</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => navigate("/employees")}>Employees</Nav.Link>
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <h2>Welcome to the Dashboard</h2>
            </Container>
        </div>
    );
}

export default Dashboard;
