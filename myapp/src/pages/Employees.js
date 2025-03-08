import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/employees", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/api/employees/${editingId}`, { name, email, position }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
            } else {
                await axios.post("http://localhost:8000/api/employees", { name, email, position }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
            }
            setShowModal(false);
            fetchEmployees();
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    const handleEdit = (employee) => {
        setEditingId(employee.id);
        setName(employee.name);
        setEmail(employee.email);
        setPosition(employee.position);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/employees/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Employees</h2>
            <Button variant="success" onClick={() => { setEditingId(null); setShowModal(true); }}>Add Employee</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleEdit(emp)}>Edit</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Employee Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? "Edit Employee" : "Add Employee"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{editingId ? "Update" : "Save"}</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Employees;
