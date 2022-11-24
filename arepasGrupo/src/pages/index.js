import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { Button, Container, Card, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { imagesUrl } from "../utils/urls";
import {useDispatch} from 'react-redux';
import {shopitem} from '../utils/actions'
import { Link } from "react-router-dom";
import "../App.css";

function Menu2() {
  //state functionality
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [XTotalCount] = useState(3);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  

  useEffect(() => {
    loadUsersData(0, 3, 0);
  }, []);

  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:3000/arepas?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/arepas?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "filter":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/arepas?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:3000/arepas?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 3, 0, "search");
  };

  const renderPagination = () => {
    if (data.length < 3 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <button className="btn btn-secondary" onClick={() => loadUsersData(3, 6, 1, operation)}>
              Siguiente
            </button >
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < XTotalCount + XTotalCount && data.length === XTotalCount) {
      return (
        <MDBPagination className="mb-0">        
          <MDBPaginationItem>
            <button className="btn btn-secondary"
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 3,
                  currentPage * 3,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Anterior
            </button >
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <button className="btn btn-secondary"
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 3,
                  (currentPage + 2) * 3,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Siguiente
            </button >
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <button className="btn btn-secondary"
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 3,
                  currentPage * 3,
                  -1,
                  operation
                )
              }
            >
              Anterior
            </button >
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <Container fluid>
      <h1 className="letrica text-yellow">P&A Arepas con todo y algo mas...</h1>
      <div className="border-bottom border border-white mx-auto"></div>
      <div className="pt-3">
        <Navbar expand="lg" bg="light" variant="light" className="rounded">
          <Container>
            <form
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
              }}
              className="d-flex input-group w-auto"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Busca un ingrediente de la arepa"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <button  type="submit" className="btn btn-primary">
                Buscar
              </button >
            </form>
          </Container>
        </Navbar>
      </div>
      <Row xs={3} md={3} className="g-4">
        {data.map((item) => (
          <Col key={item.id}>
            <Container>
              <Card>
                <Link to="/Details" state={{ Id: item.id }}>
                  <Card.Img
                    variant="top"
                    src={`${imagesUrl + item.Image}`}
                    className="img-thumbnail"
                  />
                </Link>
                <Card.Body className="Historia">
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Historia}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button className="btn btn-primary" onClick={()=> dispatch(shopitem(item.id))}>
                    Pidelo por ${item.Price}
                  </Button>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        ))}
      </Row>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "250px",
          alignContent: "center",
        }}
      >
        {renderPagination()}
      </div>
    </Container>
  );
}

export default Menu2;


