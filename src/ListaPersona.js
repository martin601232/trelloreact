import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const ListaPersonas = () => {
  const [listaPersonas, setListaPersonas] = useState([]);
  useEffect(() => {
    loadPersonaList();
  }, []);

  const loadPersonaList = () => {
    axios
      .get(
        "http://localhost:8000/api/personas"
      )
      .then((res) => {
        setListaPersonas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const eliminar = (id) => {
    axios
      .delete(
        "http://localhost:8000/api/personas/"+id
      )
      .then((res) => {
        loadPersonaList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Ciudad</th>
                <th>Edad</th>
                <th>Fecha de Nacimiento</th>
                <th>Género</th>
                <th>editar</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaPersonas.map((item) => {
                return (
                  <tr key={"item-" + item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombres}</td>
                    <td>{item.apellidos}</td>
                    <td>{item.ciudad}</td>
                    <td>{item.edad}</td>
                    <td>{item.fechaNacimiento}</td>
                    <td>{item.genero}</td>
                    <td>
                        <Link className="btn btn-primary" to={"/personas/"+item.id}>Edit</Link>
                    </td>
                    <td>
                        <Button variant="danger" onClick={()=>{eliminar(item.id)}}>Eliminar</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default ListaPersonas;
