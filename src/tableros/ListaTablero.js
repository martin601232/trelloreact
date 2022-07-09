import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const ListaTablero = () => {
  
  const navigate = useNavigate();
  const [listaEquipos, setListaEquipos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [listaUsuario, setListaUsuario] = useState([]);
  
  const [listaId, setListaId] = useState([]);
  useEffect(() => {
    
    loadEquipoList();
    loadUsuarioList();
    loadUnUsuario();
    loadIds();
  }, []);

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
        })
  };

  const loadEquipoList = () => {
    axios
      .get(
        "http://localhost:8000/api/tableros"
      )
      .then((res) => {
        setListaEquipos(res.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const loadUsuarioList = () => {
    axios
      .get(
        "http://localhost:8000/api/usutab"
      )
      .then((res) => {
        setListaUsuario(res.data);
        
    console.log(res.data);
    console.log(listaUsuario);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadIds = () => {
    var vec=[];
        listaUsuario.map((item2) =>{
          {console.log(item2.tablero_id)}
      vec.concat(item2.tablero_id);
    })
    {console.log(vec)}
    setListaId(vec);
    console.log(listaId);
   // console.log(listaUsuario);
  }

  const eliminar = (id) => {
    const config = {
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("item_id")}`,
      },
 };  
    axios
      .delete(
        "http://localhost:8000/api/tableros/"+id, config
      )
      .then((res) => {
        loadEquipoList();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const buscar = (id) => {
    var a=false;
    listaUsuario.map((item2) =>{
      if(item2.tablero_id==id && item2.usuario_id==usuario.id){
        
        a= true;
      }
    })

    return a;
        
  };

  return (
    <Container>
      
      <Row>
        <Col>
          <h3>Tablas de equipos</h3>
          <td>
              <Link className="btn btn-primary" to={"/tablero/create" }>Crear equipo</Link>
            </td>
          <Container  className="grid" >
            {console.log(listaUsuario)};
            {console.log(listaId)};
          {listaEquipos.map((item) => {
            var csm=buscar(item.id);
           // return(
                if(item.visibilidad==true || item.usuario_id==usuario.id || buscar(item.id)){
                  console.log(item.usuario_id  +"  "+ usuario.id);
                return (
                  <Card style={{ width: '18rem'}}  className="box" key={"item-" + item.id}>
                    <Card.Body style={{ background: item.color }}>
                      <Card.Title>{item.titulo}</Card.Title>
                      {(() => {if (item.usuario_id === usuario.id ) {
                      return (
                        <><td>
                        <Link className="btn btn-primary" to={"/tablero/" + item.id}>Edit</Link>
                        </td><td>
                          <Button variant="danger" onClick={() => { eliminar(item.id); } }>Eliminar</Button>
                        </td>  </>
                      )
                    }else {
                      return (
                        <><td></td><td></td></>
                      )
                    }})()}
                      
                          <Link className="btn btn-primary" variant="primary"  to={"/lista/" + item.id}> Entrar</Link>
                    </Card.Body>
                  </Card>)
                  }
                  
                })}
          
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default ListaTablero;

/*  <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Creador</th>
                
                <th>Publicaciones</th>
                <th>editar</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaEquipos.map((item) => {
                
                return (
                  <tr key={"item-" + item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    {listaUsuario.map((item2) => {
                      if(item.usuario_id === item2.id){
                        return(
                        <td>{item2.name}</td>)
                      }
                    })}
                    <td>
                      <Link className="btn btn-primary" to={"/publicacion/lista/"+item.id}>Publicar</Link>
                    </td>
                    {(() => {

        if (usuario.length>0 && item.usuario_id === usuario[0].id) {
          return (
            <><td>
              <Link className="btn btn-primary" to={"/equipos/" + item.id}>Edit</Link>
            </td><td>
                <Button variant="danger" onClick={() => { eliminar(item.id); } }>Eliminar</Button>
              </td> </>
          )
        }else {
          return (
            <><td></td><td></td></>
          )
        }
      })()}
                     
                    
                    
                    
                    
                  </tr>
                );
              })}
            </tbody>*/
