import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const ListaMascota = () => {
  const [listaMacotas, setListaMacotas] = useState([]);
  useEffect(() => {
    loadMacotaList();
  }, []);

  const loadMacotaList = () => {
    axios
      .get(
        "http://localhost:8080/web2/practicaapi2/?controller=mascota&action=list"
      )
      .then((res) => {
        setListaMacotas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminar = (id) => {
    axios
      .delete(
        "http://localhost:8080/web2/practicaapi2/?controller=mascota&action=delete&id=" +
          id
      )
      .then((res) => {
        loadMacotaList();
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
                <th>Tipo</th>
                <th>Duenho</th>
                <th>editar</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaMacotas.map((item) => {
                return (
                  <tr key={"item-" + item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.tipo}</td>
                    <td>{item.persona_id}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={"/personas/" + item.id}
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          eliminar(item.id);
                        }}
                      >
                        Eliminar
                      </Button>
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

export default ListaMascota;
