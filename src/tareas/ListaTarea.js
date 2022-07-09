import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const ListaTarea= () => {
  
   
  const navigate = useNavigate();
  const { id, tablero } = useParams();
  const [ListaPublicacion, setListaPublicacion] = useState('');
  const [ListaRespuesta, setListaRespuesta] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [listaUsuario, setListaUsuario] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('item_id')) {
      navigate('/login');
      return;
  }
  loadEquipoList();
    loadUnUsuario();
  }, []);

  const loadUnUsuario = () => {
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("item_id")}`,
        },
   };   
   console.log(config)
    axios.get('http://localhost:8000/api/tareas/'+id, config).then(res => {
        setUsuario (res.data[0]) ;
          
            console.log(usuario);


        })
        .catch(error => {
            console.log(error);
        })
  };

  const loadEquipoList = () => {
    axios
      .get(
        "http://localhost:8000/api/tareas/"+id
      )
      .then((res) => {
        setListaPublicacion(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
        <h3>tablas del equipo {id}</h3>
        <td>
                      <Link className="btn btn-primary" to={"/lista/"+tablero}>Atras</Link>
                    </td>
          <Card>
            <Card.Body>
              <Card.Title>{ListaPublicacion.orden+".-"+ ListaPublicacion.titulo}</Card.Title>
              <Card.Text>{ListaPublicacion.descripcion} </Card.Text>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </Container>
  );
};
export default ListaTarea;
