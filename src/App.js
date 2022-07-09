//import logo from './logo.svg';
import "./App.css";
import ListaPersona from "./ListaPersona";
import ListaMascota from "./ListaMascota";
import FormPersona from "./FormPersona";
import FormMascota from "./FormMascota";


import { Route, Link, Routes } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Register from "./user/Register";
import Login from "./user/Login";
import Pppp from "./user/pppp";
import ListaTablero from "./tableros/ListaTablero";
import FormEquipo from "./tableros/FormTablero";
import ListaPublicacion from "./listas/ListaLista";
import FormPublicacion from "./listas/FormLista";
import ListaRespuesta from "./tareas/ListaTarea";
import FormRespuesta from "./tareas/FormTarea";
import Add from "./user/add";
import FormTarea from "./tareas/FormTarea";
import ListaTarea from "./tareas/ListaTarea";

function App() {
  /* return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/

  return (
    <div>
      <Navbar bg='dark' variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/tablero/lista">Lista de Tableros</Link>
            <Link className="nav-link"  to="/login">Iniciar sesion</Link>
            <Link className="nav-link"  to="/register">Registrarse</Link>
            <Link className="nav-link"  to="/pppp">Cerrar sesion</Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pppp" element={<Pppp />} />
        
        <Route path="/tablero/lista" element={<ListaTablero />} />
        <Route path="/tablero/create" element={<FormEquipo />} />
        <Route path="/tablero/:id" element={<FormEquipo />} />
        <Route path="/add/:id" element={<Add />} />
        
        <Route path="/lista/:id" element={<ListaPublicacion />} />
        <Route path="/publicacion/create/:id_tablero" element={<FormPublicacion />} />
        <Route path="/publicacion/:id/:id_tablero" element={<FormPublicacion />} />
        <Route path="/tarea/:lista/:tablero" element={<FormTarea />} />
        <Route path="/detalle/:id/:tablero" element={<ListaTarea />} />
        <Route path="/tarea/:id/:lista/:tablero" element={<FormTarea />} />
        <Route path="/respuesta/lista" element={<ListaRespuesta />} />
        <Route path="/respuesta/create/:id" element={<FormRespuesta />} />
        <Route path="/respuesta/:id" element={<FormRespuesta />} />
      </Routes>
    </div>
  );
}

export default App;
