import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Container, Card, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import "../App.css";


function Carrito() {
  let xd = useSelector((state) => state.car.fetchedSpendings);

  const [fromData, setFormData] = useState({
    DeliveryAddress: "",
    DeliveryPhoneNumber: "",
    DeliveryFirstName: "",
    DeliveryLastName: "",
    Notes: "",
  });

  const handleFormSubmit = async (e) => {
    let response = await axios.post("http://localhost:3000/Orders", fromData);

    if (response) {
      alert("dato enviado con exito");
      window.location.href = "/Login";
    } else {
      alert("algo salio mal");
    }

    setFormData({
      DeliveryAddress: "",
      DeliveryPhoneNumber: "",
      DeliveryFirstName: "",
      DeliveryLastName: "",
      Notes: "",
    });
  };

  const [myArray, updateMyArray] = useState([]);

  const GetItem = async (id) => {
    await axios
      .get(`http://localhost:3000/arepas?id=${id}`)
      .then((response) => {
        updateMyArray((arr) => [...arr, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    for (let i = 0; i < xd.length; i++) {
      GetItem(xd[i]);
    }
  }, [-1]);

  if (xd.length > 0) {
    console.log(myArray);
    return (
  
      <Container>
      <Row xs={3} md={3} className="g-4">
        {myArray.map((item) => (
          <Col key={item.id} >
              <Card>
                <Card.Body className="description">
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="left"
                    variant="outline-danger"
                  >
                    eliminar
                  </Button>
                </Card.Footer>
              </Card>
            
            
          </Col>
        ))}
      </Row>
      <button className="btn btn-success"type="submit"href="/"onClick={handleFormSubmit}>pedir ahora!!!</button>
      </Container>
      
    );
  } else if (xd.length === 0) {
    return <h1 className="letrica text-white">carrito vacio</h1>;
  }
}

export default Carrito;