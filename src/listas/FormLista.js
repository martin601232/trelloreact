import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormLista = () => {
    const navigate = useNavigate();
    const { id, id_tablero } = useParams();
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState([]);
    
    const [numero, setNumero] = useState(1);
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
        
    }, [id])

    const loadUnUsuario = () => {
        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("item_id")}`,
            },
       };   
       axios.get('http://localhost:8000/api/users/show', config).then(res => {
        setUsuario (res.data[0]) ;
          
            console.log(usuario);


        })
        .catch(error => {
            console.log(error);
        })
      };

      const loadNumero = () => {
        
        axios.get('http://localhost:8000/api/listas/cantableros/'+ id_tablero).then(res => {
            
            setNumero (res.data+1) ;

            })
            .catch(error => {
                console.log(error);
                setUsuario ('') ;
            })
      };

    const limpiarDatos = () => {
        setNombre("");
    }
    const cargarDatos = (id) => {
        
        axios.get('http://localhost:8000/api/listas/' + id)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombre);
                setNumero(persona.orden);
                
            })
            .catch(error => {
                console.log(error);
            })
    }
    const guardarDatos = () => {
        const params = {
            nombre: nombre,
            orden:numero,
            tablero_id: id_tablero
           
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
       axios.put('http://localhost:8000/api/listas/'+id,
            params, config
        ).then(res => {
            navigate('/lista/'+id_tablero);
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

        axios.post('http://localhost:8000/api/listas',
            params, config
        ).then(res => {
            navigate('/lista/'+id_tablero);
        }).catch(error => {
            console.log(error);
        })

    
    }
    return (<Container>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <div>
                    <label>texto:</label>
                    <FormControl type="text" value={nombre} onChange={(e) => {
                        setNombre(e.currentTarget.value);
                    }} />
                    <div>Tu variable nombre es: {nombre}</div>
                </div>
               
                <div className='mt-3'>
                    <Button variant="primary" onClick={guardarDatos}>Guardar</Button>
                </div>
            </Col>
        </Row>
    </Container>);
}

export default FormLista;