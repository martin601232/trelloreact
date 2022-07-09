import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormTarea = () => {
    const navigate = useNavigate();
    const { id, tablero, lista } = useParams();
    const [titulo, setTitulo] = useState("");
    const [vence, setVence] = useState("");
    const [orden, setOrden] = useState(1);
    const [estado, setEstado] = useState(true);
    
    const [usuarioSel, setUsuarioSel] = useState();
    
    const [descripcion, setdescripcion] = useState("");
    const [usuario, setUsuario] = useState([]);
    const [usuariox, setUsuariox] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('item_id')) {
            navigate('/login');
            return;
        }
        if (id) {
            cargarDatos(id);
        } else {
            limpiarDatos();
            
            loadNumero();

        }
        loadUnUsuario();
        loadUsuario();
    }, [id])
    const loadNumero = () => {
        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("item_id")}`,
            },
       };   
       console.log(config)
        axios.get('http://localhost:8000/api/tareas/cantlsta/'+ lista, config).then(res => {
            
            setOrden (res.data+1) ;

            })
            .catch(error => {
                console.log(error);
                setUsuario ('') ;
            })
      };

    const loadUsuario = () => {
       
        axios.get('http://localhost:8000/api/users').then(res => {
            setUsuariox (res.data) ;
              
                console.log(usuario);
    
    
            })
            .catch(error => {
                console.log(error);
            })
      };

    const loadUnUsuario = () => {
        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("item_id")}`,
            },
       };   
       console.log(config)
        axios.get('http://localhost:8000/api/us', config).then(res => {
            setUsuario (res.data[0]) ;
              
                console.log(usuario);
    
    
            })
            .catch(error => {
                console.log(error);
            })
      };

    const limpiarDatos = () => {
        setTitulo("");
        setEstado(true);
        setVence("");
        setdescripcion("");
    }
    const cargarDatos = (id) => {
        axios.get('http://localhost:8000/api/tareas/' + id)
            .then(res => {
                const persona = res.data;
                setTitulo(persona.titulo);
        setEstado(persona.estado);
        setVence(persona.vence);
        setOrden(persona.orden);
        setdescripcion(persona.descripcion);
        setUsuarioSel(persona.usuario_id)
               
            })
            .catch(error => {
                console.log(error);
            })
    }
    const guardarDatos = () => {
        const params = {
        
        titulo: titulo,
        vence:vence,
        orden:orden,
        estado:estado,
        descripcion:descripcion, 
            lista_id: lista,
            usuario_id:usuarioSel
           
        };
        if (id) {
            editarPersona(params);
        } else {
            insertarPersona(params);
        }
    }
    const editarPersona = (params) => {
        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("item_id")}`,
            },
       };  
       axios.put('http://localhost:8000/api/tareas/'+id,
            params, config
        ).then(res => {
            navigate('/lista/'+tablero);
        }).catch(error => {
            console.log(error);
        })

    
    }
    const insertarPersona = (params) => {

        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("item_id")}`,
            },
       };  
       axios.post('http://localhost:8000/api/tareas',
            params, config
        ).then(res => {
            navigate('/lista/'+tablero);
        }).catch(error => {
            console.log(error);
        })

    
    }
    return (<Container>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <div>
           
                <label>titulo:</label>
                    <FormControl type="text" value={titulo} onChange={(e) => {
                        setTitulo(e.currentTarget.value);
                    }} />
                    <label>descripcion:</label>
                    <FormControl type="text" value={descripcion} onChange={(e) => {
                        setdescripcion(e.currentTarget.value);
                    }} />
                    <label>fecha:</label>
                    <FormControl type="date" value={vence} onChange={(e) => {
                        setVence(e.currentTarget.value);
                    }} />
                    <label>Visibilidad:</label>
                    <FormSelect  id='visible' value={estado} onChange={(e) => {
                        setEstado(e.target.value);
                    }}>
                        <option value='1'>no realizado </option>
                        <option value='0'>realizado </option>
                    </FormSelect>
                     <label>Personas:</label>
                    <FormSelect  id='visible' value={usuarioSel} onChange={(e) => {
                        setUsuarioSel(e.target.value);
                    }}>
                        {usuariox.map((item) => {
                return (
                        <option key={"item-" + item.id} value={item.id}>{item.email} </option>
                )})}
                    </FormSelect>
                </div>
               
                <div className='mt-3'>
                    <Button variant="primary" onClick={guardarDatos}>Guardar</Button>
                </div>
            </Col>
        </Row>
    </Container>);
}
export default FormTarea;