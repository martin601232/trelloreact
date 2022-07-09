import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormTablero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("");
    const [visible, setVisible] = useState(true);
    const [usuario, setUsuario] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('item_id')) {
            navigate('/login');
            return;
        }
        if (id) {
            cargarDatos(id);
        } else {
            limpiarDatos();
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
       console.log(config)
        axios.get('http://localhost:8000/api/users/show', config).then(res => {
            setUsuario (res.data[0]) ;
              
                console.log(usuario);
    
    
            })
            .catch(error => {
                console.log(error);
            })
      };

    const limpiarDatos = () => {
        setNombre("");
        setColor("#ffffff");
        setVisible(false);
    }
    const cargarDatos = (id) => {
        axios.get('http://localhost:8000/api/tableros/' + id)
            .then(res => {
                const persona = res.data;
                setNombre(persona.titulo);
                setColor(persona.color);
                setVisible(persona.visibilidad);
                console.log(persona);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const guardarDatos = () => {
        const params = {
            color: color,
            titulo: nombre,
            visibilidad: visible,
            usuario_id: usuario.id,
           
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
        axios.put('http://localhost:8000/api/tableros/' + id,
            params,config
        ).then(res => {
            navigate('/tablero/lista');
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
        axios.post('http://localhost:8000/api/tableros',
            params,config
        ).then(res => {
            console.log(res)
            navigate('/tablero/lista');
        }).catch(error => {
            console.log(error);
        })

    
    }
    return (<Container>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <div>
                    <label>Nombres:</label>
                    <FormControl id='nombre' type="text" value={nombre} onChange={(e) => {
                        setNombre(e.currentTarget.value);
                    }} />
                    <div>Tu variable nombre es: {nombre}</div>
                    <label>Color:</label>
                    <FormControl id='color' type="color" value={color} onChange={(e) => {
                        setColor(e.currentTarget.value);
                    }} />
                   <div>
                    <label>Visibilidad:</label>
                    <FormSelect  id='visible' value={visible} onChange={(e) => {
                        setVisible(e.target.value);
                    }}>
                        <option value='1'>Publico </option>
                        <option value='0'>Privado </option>
                    </FormSelect>
                    
                </div>
                    
                </div>
               
                <div className='mt-3'>
                    <Button variant="primary" onClick={guardarDatos}>Guardar</Button>
                </div>
            </Col>
        </Row>
    </Container>);
}

export default FormTablero;