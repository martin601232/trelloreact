import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormPersonita = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [edad, setEdad] = useState(0);
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [genero, setGenero] = useState(0);
    useEffect(() => {
        if (id) {
            cargarDatos(id);
        } else {
            limpiarDatos();
        }
    }, [id])

    const limpiarDatos = () => {
        setNombre("");
        setApellidos("");
        setCiudad("");
        setEdad(0);
        setFechaNacimiento("");
        setGenero(0)
    }
    const cargarDatos = (id) => {
        axios.get('http://localhost:8080/practicaapi2/?controller=persona&action=show&id=' + id)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombres);
                setApellidos(persona.apellidos);
                setEdad(persona.edad);
                setFechaNacimiento(persona.fechaNacimiento);
                setGenero(persona.genero);
                setCiudad(persona.ciudad);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const guardarDatos = () => {
        const params = {
            nombres: nombre,
            apellidos: apellidos,
            ciudad: ciudad,
            edad: edad,
            fechaNacimiento: fechaNacimiento,
            genero: genero
        };
        if (id) {
            editarPersona(params);
        } else {
            insertarPersona(params);
        }
    }
    const editarPersona = (params) => {
        axios.put('http://localhost:8080/practicaapi2/?controller=persona&action=update&id=' + id,
            params
        ).then(res => {
            navigate('/');
        }).catch(error => {
            console.log(error);
        })
    }
    const insertarPersona = (params) => {

        axios.post('http://localhost:8080/practicaapi2/?controller=persona&action=store',
            params
        ).then(res => {
            navigate('/');
        }).catch(error => {
            console.log(error);
        })
    }
    return (<Container>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <div>
                    <label>Nombres:</label>
                    <FormControl type="text" value={nombre} onChange={(e) => {
                        setNombre(e.currentTarget.value);
                    }} />
                    <div>Tu variable nombre es: {nombre}</div>
                </div>
                <div className='mt-3'>
                    <label>Apellidos:</label>
                    <FormControl type="text" value={apellidos} onChange={(e) => {
                        setApellidos(e.currentTarget.value);
                    }} />
                </div>
                <div className='mt-3'>
                    <label>Ciudad:</label>
                    <FormControl type="text" value={ciudad} onChange={(e) => {
                        setCiudad(e.currentTarget.value);
                    }} />
                </div>
                <div className='mt-3'>
                    <label>Edad:</label>
                    <FormControl type="number" value={edad} onChange={(e) => {
                        setEdad(e.currentTarget.value);
                    }} />
                </div>
                <div className='mt-3'>
                    <label>Fecha de Nacimiento:</label>
                    <FormControl type="date" value={fechaNacimiento} onChange={(e) => {
                        setFechaNacimiento(e.currentTarget.value);
                    }} />
                </div>
                <div className='mt-3'>
                    <label>Genero:</label>
                    <FormSelect value={genero} onChange={(e) => {
                        setGenero(e.target.value);
                    }}>
                        <option value="1">Masculino</option>
                        <option value="-1">Femenino</option>
                        <option value="0">Indefinido</option>
                    </FormSelect>
                </div>
                <div className='mt-3'>
                    <Button variant="primary" onClick={guardarDatos}>Guardar</Button>
                </div>
            </Col>
        </Row>
    </Container>);
}

export default FormPersonita;