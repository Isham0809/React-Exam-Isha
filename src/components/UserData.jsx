import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaSort } from "react-icons/fa";

function UserData() {
  const [userdata, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let data = await fetch("http://localhost:3000/userdata");
    let fetchdata = await data.json();
    setUserData(fetchdata ? fetchdata : []);
  };

  const handleSort = (field) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...userdata].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(newOrder);
    setUserData(sortedData);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/userdata/${id}`, { method: "DELETE" });
    setUserData(userdata.filter((user) => user.id !== id));
  };

  const filteredData = userdata.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Card className="shadow-sm w-100">
            <Card.Body>
              <Row className="mb-4 g-3">
                <Col md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, email, or phone"
                    onChange={(e) => setSearch(e.target.value)}
                    className="shadow-sm"
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                    className="shadow-sm"
                  >
                    <option value="5">5 records per page</option>
                    <option value="10">10 records per page</option>
                    <option value="15">15 records per page</option>
                  </Form.Select>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table striped bordered hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-center">ID</th>
                      <th>
                        Name{" "}
                        <FaSort
                          className="cursor-pointer"
                          onClick={() => handleSort("name")}
                        />
                      </th>
                      <th>
                        Email{" "}
                        <FaSort
                          className="cursor-pointer"
                          onClick={() => handleSort("email")}
                        />
                      </th>
                      <th>
                        Phone{" "}
                        <FaSort
                          className="cursor-pointer"
                          onClick={() => handleSort("phone")}
                        />
                      </th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((v, i) => (
                      <tr key={i}>
                        <td className="text-center">
                          {indexOfFirstRecord + i + 1}
                        </td>
                        <td>{v.name}</td>
                        <td>{v.email}</td>
                        <td>{v.phone}</td>
                        <td className="text-center">
                          <img
                            src={v.image}
                            alt={v.name}
                            width={50}
                            height={50}
                            className="rounded-circle"
                            style={{ objectFit: "cover" }}
                          />
                        </td>
                        <td className="text-center">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(v.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-muted">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default UserData;
