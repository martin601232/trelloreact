import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl,  Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        
            limpiarDatos();
        
    }, [])

    const limpiarDatos = () => {
        setNombre("");
        setEmail("");
        setPassword("");
    }
    
    const guardarDatos = () => {
        const params = {
            name: nombre,
            email: email,
            password: password
        };
        insertarPersona(params);
        
    }
    const insertarPersona = (params) => {

        axios.post('http://localhost:8000/api/register',
            params
        ).then(res => {
            navigate('/login');
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
                    <label>Email:</label>
                    <FormControl type="text" value={email} onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }} />
                </div>
                <div className='mt-3'>
                    <label>Password:</label>
                    <FormControl type="password" value={password} onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }} />
                </div>
                
                
                <div className='mt-3' class="d-flex justify-content-around">
                    <Link className="btn btn-primary" to={"/login"}>Login</Link>
                    <Button variant="primary" onClick={guardarDatos}>Guardar</Button>
                </div>
            </Col>
        </Row>
    </Container>);
}

export default Register;