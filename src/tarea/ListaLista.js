import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const ListaLista = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [usuario, setUsuario] = useState([]);
  const [ListaPublicacion, setListaPublicacion] = useState([]);
  const [ListaRespuesta, setListaRespuesta] = useState([]);
  const [listaUsuario, setListaUsuario] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('item_id')) {
      navigate('/login');
      return;
  }
  loadEquipoList();
  loadRespuestaList();
    loadUsuarioList();
  }, []);

  const loadEquipoList = () => {
    axios
      .get(
        "http://localhost:8000/api/listas/tableros/"+id
      )
      .then((res) => {
        setListaPublicacion(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const loadUnUsuario = () => {
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("item_id")}`,
        },
   };   
   console.log(config)
    axios.get('http://localhost:8000/api/users/show', config).then(res => {
        setUsuario (res.data[0]) ;
          
            console.log(usuario);


        })
        .catch(error => {
            console.log(error);
            setUsuario('');
        })
  };


  const loadUsuarioList = () => {
    axios
      .get(
        "http://localhost:8000/api/users"
      )
      .then((res) => {
        setListaUsuario(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const loadRespuestaList = () => {
    axios
      .get(
        "http://localhost:8000/api/tareas"
      )
      .then((res) => {
        setListaRespuesta(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminar = (id) => {
    const config = {
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("item_id")}`,
      },
 }; 
    axios
      .delete(
        "http://localhost:8000/api/listas/"+id, config
      )
      .then((res) => {
        loadEquipoList();
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
          <Link className="btn btn-primary" to={"/publicacion/create/"+id}>Publicar</Link>
          <Link className="btn btn-primary" to={"/publicacion/create/"+id}>Agregar</Link>
        </td>

        <Container  className="grid" >
            {console.log(ListaPublicacion)};
          {ListaPublicacion.map((item) => {
           // return(
                
                return (
                  <Card style={{ width: '18rem'}}  className="box" key={"item-" + item.id}>
                    <Card.Body >
                      <Card.Title>{item.nombre}</Card.Title>
                      <ListGroup>
                      {ListaRespuesta.map((item2) => {
                          if(item2.lista_id==item.id){
                            return(
                              <ListGroupItem>
                                <Link to={'tarea/'+item2.id}>{item2.titulo} </Link>
                                </ListGroupItem>
                            )
                          }

                      })}
                      </ListGroup>
                      
          
                    <td>
                    <Link className="btn btn-primary" to={'/publicacion/'+item.id+'/'+id}>Edit</Link>
                  </td><td>
                      <Button variant="danger" onClick={() => { eliminar(item.id); } }>Eliminar</Button>
                    </td> 
                    <td>
                    <Link className="btn btn-primary" to={'/tarea/'+item.id+'/'+id}>Agregar</Link>
                  </td>
          
        
                      
                    </Card.Body>
                  </Card>)
                  
                  
                })}
          
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default ListaLista;
