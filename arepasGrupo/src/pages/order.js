import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../css/Menu.css";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export function Orders() {
  let logged = useSelector((state) => state.logged.log);
  let id = useSelector((state) => state.logged.id);
  let DeliveryAddress = useSelector((state) => state.logged.Email);
  let DeliveryPhoneNumber = useSelector((state) => state.logged.PhoneNumber);
  let DeliveryFirstName = useSelector((state) => state.logged.FirstName);
  let DeliveryLastName = useSelector((state) => state.logged.LastName);
  var today = new Date(),date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
  console.log(today);
  const [fromData, setFormData] = useState({
    DeliveryAddress: DeliveryAddress,
    DeliveryPhoneNumber: DeliveryPhoneNumber,
    DeliveryFirstName: DeliveryFirstName,
    DeliveryLastName: DeliveryLastName,
    Notes: "",
  });

  const handleFormSubmit = async (e) => {
    setFormData({ ...fromData, CustomerId: id });
    setFormData({ ...fromData, DeliveryPhoneNumber: DeliveryPhoneNumber });
    setFormData({ ...fromData, date: today });
    let response = await axios.post("http://localhost:3000/Orders", fromData);

    if (response) {
      alert("dato enviado con exito");
      window.location.href = "/";
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

  if (logged == false) {
    return (
      <Container className="mt-9">
        <h1 className="text-light letrica">
          ingresa tus datos para realizar el pedido
        </h1>
        <Form.Group className="form-group mb-3" controlId="formBasicEmail">
          <p></p>
          <div className="center">
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Nombre</h4>
            </div>
            <input
              placeholder="su Nombre"
              type="name"
              className="form-control-lg"
              id="ControlInputCorreo"
              value={fromData.DeliveryFirstName}
              onChange={(e) =>
                setFormData({ ...fromData, DeliveryFirstName: e.target.value })
              }
              size={25}
            />
            <p></p>
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Apellido </h4>
            </div>
            <input
              placeholder="contraseña"
              type="name"
              className="form-control-lg"
              id="ControlInputContraseña"
              value={fromData.DeliveryLastName}
              onChange={(e) =>
                setFormData({ ...fromData, DeliveryLastName: e.target.value })
              }
              size={25}
            />
            <p></p>
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Dirreccion</h4>
            </div>
            <input
              placeholder="Su Nombre"
              type="Address"
              className="form-control-lg"
              id="exampleFormControlInput1"
              value={fromData.DeliveryAddress}
              onChange={(e) =>
                setFormData({ ...fromData, DeliveryAddress: e.target.value })
              }
              size={25}
            />
            <p></p>
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Numero</h4>
            </div>
            <input
              placeholder="Su Numero"
              type="phone"
              className="form-control-lg"
              id="exampleFormControlInput1"
              value={fromData.DeliveryPhoneNumber}
              onChange={(e) =>
                setFormData({
                  ...fromData,
                  DeliveryPhoneNumber: e.target.value,
                })
              }
              size={25}
            />
            <p></p>
            <div className="justify-content-start text-light letrica ">
              <h4 className="center">Notas</h4>
            </div>
            <input
              placeholder="direcion, casa o apartamento etc."
              type="text"
              className="form-control-lg"
              id="exampleFormControlInput1"
              value={fromData.Notes}
              onChange={(e) =>
                setFormData({ ...fromData, Notes: e.target.value })
              }
              size={25}
            />
            <p></p>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-success"
              type="submit"
              href="/"
              onClick={handleFormSubmit}
            >
              ORDENAR!!!
            </button>
          </div>
        </Form.Group>
      </Container>
    );
  } else {
    return (
      <Container className="mt-9">
        <h1 className="text-light letrica">
          ingresa tus datos para realizar el pedido
        </h1>
        <Form.Group className="form-group mb-3" controlId="formBasicEmail">
          <p></p>
          <div className="center">
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Nombre</h4>
            </div>
            <input
              placeholder="su Nombre"
              type="name"
              className="form-control-lg"
              id="ControlInputCorreo"
              value={fromData.DeliveryFirstName}
              size={25}
              readOnly
            />
            <p></p>
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Apellido </h4>
            </div>
            <input
              placeholder="contraseña"
              type="name"
              className="form-control-lg"
              id="ControlInputContraseña"
              value={fromData.DeliveryLastName}
              size={25}
              readOnly
            />
            <p></p>
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Dirreccion</h4>
            </div>
            <input
              placeholder="Su Direcion"
              type="Address"
              className="form-control-lg"
              id="exampleFormControlInput1"
              value={fromData.DeliveryAddress}
              size={25}
              readOnly
            />
            <p></p>
            <div className="justify-content-start text-light letrica">
              <h4 className="center">Numero</h4>
            </div>
            <input
              placeholder="Su Numero"
              type="phone"
              className="form-control-lg"
              id="exampleFormControlInput1"
              value={fromData.DeliveryPhoneNumber}
              size={25}
              
            />
            <p></p>
            <div className="justify-content-start text-light letrica ">
              <h4 className="center">Notas</h4>
            </div>
            <input
              placeholder="direcion, casa o apartamento etc"
              type="text"
              className="form-control-lg"
              id="exampleFormControlInput1"
              
              size={25}
            />
            <p></p>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-success"
              type="submit"
              href="/"
              onClick={handleFormSubmit}
            >
                \n
              Hacer orden
            </button>
          </div>
        </Form.Group>
      </Container>
    );
  }
}
