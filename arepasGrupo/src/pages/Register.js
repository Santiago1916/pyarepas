import React, { useState } from 'react';
import axios from 'axios';
import {  Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../css/Menu.css'

export const Register = () => {

  const [fromData, setFormData] = useState({
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    BirthOrDate: "",
    RegisterDate: "",
    Address: "",
    PhoneNumber: ""
  });

  const handleFormSubmit = async (e) => {

    let response = await axios.post('http://localhost:3000/usuarios', fromData);

    if (response) {
      alert("Datos enviados con exito");
    } else {
      alert("Error algo salió mal");
    }

    setFormData({
      Email: "",
      Password: "",
      FirstName: "",
      LastName: "",
      BirthOrDate: "",
      RegisterDate: "",
      Address: "",
      PhoneNumber: ""
    });
  }

  return (
    <Container class='row'>
      <h1 className='text-bold letrica'>Registro</h1>
      <div className='pt-3'></div>
      <div className='border-bottom border border-white mx-auto'></div>
      <Form.Group className="form-group mb-3" controlId="formBasicEmail">
          <p></p>
          <input placeholder='Correo eléctronico' type="Email"  className="form-control-lg" id="ControlInputCorreo" value={fromData.Email} onChange={(e) => setFormData({ ...fromData, Email: e.target.value })} size={25} />
          <p></p>
          <input placeholder='Contraseña' type="Password" className="form-control-lg" id="ControlInputContraseña" value={fromData.Password} onChange={(e) => setFormData({ ...fromData, Password: e.target.value })} size={25} />
          <p></p>
          <input placeholder='Nombre' type="name" className="form-control-lg" id="exampleFormControlInput1" value={fromData.FirstName} onChange={(e) => setFormData({ ...fromData, FirstName: e.target.value })} size={25} />
          <p></p>
          <input placeholder='Apellido' type="name" className="form-control-lg" id="exampleFormControlInput1" value={fromData.LastName} onChange={(e) => setFormData({ ...fromData, LastName: e.target.value })} size={25} />
          <p></p>   
          <input placeholder='Dirección' type="Address" className="form-control-lg" id="exampleFormControlInput1" value={fromData.Address} onChange={(e) => setFormData({ ...fromData, Address: e.target.value })} size={25} />
          <p></p> 
          <input placeholder='Teléfono' type="phone" className="form-control-lg" id="exampleFormControlInput1" value={fromData.PhoneNumber} onChange={(e) => setFormData({ ...fromData, PhoneNumber: e.target.value })} size={25} />
          <p></p>
          <div className='justify-content-start text-bold letrica'>
          <h4>Fecha de Nacimiento</h4>
          </div>
          <input placeholder='Fecha de nacimiento' type="date" className="form-control-lg" id="exampleFormControlInput1" value={fromData.BirthOrDate} onChange={(e) => setFormData({ ...fromData, BirthOrDate: e.target.value })} size={25} />
          <p></p>
          <div className='justify-content-start text-bold letrica'>
          <h4>Fecha de Registro</h4>
          </div>
          <input placeholder='Fecha de Registro' type="date" className="form-control-lg" id="exampleFormControlInput1" value={fromData.RegisterDate} onChange={(e) => setFormData({ ...fromData, RegisterDate: e.target.value })} size={25} />
          <p></p>   
          <div class="d-grid gap-2 col-3 mx-auto">   
            <button className="btn btn-success" onClick={handleFormSubmit}>Registrarse</button>
          </div>
          <p></p>
      </Form.Group>
  </Container>
  )
}