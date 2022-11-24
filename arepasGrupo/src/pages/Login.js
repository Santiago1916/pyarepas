import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "../css/NavBar.css";
import {} from '../utils/actions'

const baseUrl = "http://localhost:3000/usuarios"; 
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      Email: '',
      Password: ''
    }
  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  iniciarSesion = async () => {
    await axios.get(baseUrl, { params: { Email: this.state.form.Email, Password: (this.state.form.Password) } })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set('id', respuesta.id, { path: "/" });
          cookies.set('Email', respuesta.Email, { path: "/" });
          cookies.set('Password', respuesta.Password, { path: "/" });
          cookies.set('FirstName', respuesta.FirstName, { path: "/" });
          cookies.set('LastName', respuesta.LastName, { path: "/" });
          cookies.set('BirthOrDate', respuesta.BirthOrDate, { path: "/" });
          cookies.set('RegisterDate', respuesta.RegisterDate, { path: "/" });
          cookies.set('Address', respuesta.Address, { path: "/" });
          cookies.set('log', true, { path: "/" });
          alert(`Bienvenido ${respuesta.FirstName} ${respuesta.LastName}`);
          window.location.href = "./";
        } else {
          alert('El usuario o la contraseña no son correctos');
        }
      })
      .catch(error => {
        console.log(error);
      })

  }

  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = "./";
    }
  }
  render() {
    return (
      <div class="row">         
          <div class="col-md-6">
              <img src="https://raw.githubusercontent.com/Jucer74/WebDevelopment/main/Proyecto/ImageProducts/PyA-Logo.png" width="450" height="400" class="img-fluid"/>
          </div>
          <div class="col-md-6">
              <h1 className='text-bold letrica'>Login</h1>
              <div className='pt-3'></div>
              <div className='border-bottom border border-white mx-auto'></div>

              <Form.Group className="form-group mt-3" controlId="formBasicEmail">
            <p></p>
              <input
                type="text"
                id="txtPassword"
                className="form-control-lg "
                name="Email"
                onChange={this.handleChange}
                placeholder="Correo eléctronico"
                size={22}
              />
            <p></p>
            <input
                type="password"
                id="txtEmail"
                className="form-control-lg"
                name="Password"
                onChange={this.handleChange}
                placeholder="Contraseña"
                size={22}
            />
            <p></p>
            <div class="d-grid gap-2 col-6 mx-auto">   
              <button className="btn btn-danger" onClick={() => this.iniciarSesion()}>Login</button>
            </div>
          </Form.Group>
        </div>
        <footer class="border-top footer text-muted">
        <div class="container">
            PyA Arepas y algo más...
        </div>
        </footer>
      </div>
      
    );
  }
}

export default Login;