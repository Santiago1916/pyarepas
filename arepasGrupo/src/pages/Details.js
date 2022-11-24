import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { imagesUrl } from "../utils/urls";
import ListGroup from "react-bootstrap/ListGroup";

export function Details(props) {
  const location = useLocation();
  const id = location.state?.Id;
  const baseUrl = `http://localhost:3000/arepas?id=${id}`;

  const [data, setData] = useState([]);

  const GetUsers = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetUsers();
  }, []);

  
  function RenderIngredientes(ingredientes) {
    console.log(ingredientes);
    const ingredientesList = [];
    for (let i = 0; i < ingredientes.length; i++) {
      ingredientesList.push(<ListGroup.Item key={"ingrediente"+i}>{ingredientes[i]}</ListGroup.Item>);
    }
    return ingredientesList;
  }

  return (
    <Container className="text-center text-md-left">
      <h1 className="letrica text-yellow">P&A Arepas con todo y algo mas...</h1>
      <div className="border-bottom border border-white mx-auto"></div>
      <div className="pt-3"></div>
      <Table id="UsersTable">
        <tbody>
          {data.map((usr) => (
            <tr key={usr.id}>
              <td>
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol md="10" lg="8" xl="6" >
                  <MDBCard className="card-stepper" style={{ borderRadius: "16px" }}>
                    <MDBCardBody className="p-4">
                      <div className="d-flex flex-row mb-4 pb-2">
                        <div className="flex-fill">
                          <MDBTypography tag="h5" className="bold">
                            {usr.Name}
                          </MDBTypography>
                          <p className="text-muted">
                            <span className="text-body">{usr.Description}</span>
                          </p>
                          <MDBTypography tag="h5" className="bold">
                            Descripcion:
                          </MDBTypography>
                          <p className="text-muted">
                            <span className="text-body">{usr.Historia}</span>
                          </p>

                          <MDBTypography tag="h5" className="bold">
                            Ingredientes:
                          </MDBTypography>

                          <div>{RenderIngredientes(usr.IngreArepa)}</div>

                          <MDBTypography tag="h4" className="mb-3">
                            Precio: {usr.Price}
                          </MDBTypography>
                        </div>
                        <div>
                          <MDBCardImage
                            fluid
                            className="align-self-center rounded"
                            src={`${imagesUrl + usr.Image}`}
                            width="450"
                            height="500"
                          />
                        </div>
                      </div>
                    </MDBCardBody>
                    <MDBCardFooter className="p-4">
                      <Button className="btn btn-primary">
                        Pidelo por ${usr.Price}
                      </Button>
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
