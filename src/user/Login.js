import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl,  Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [pwd, setPwd] = useState("");
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
            nombres: nombre,
            email: email,
            password: password
        };
        insertarPersona(params);
        
    }
    const insertarPersona = (params) => {

        axios.post('http://localhost:8000/api/login',
            params
        ).then(res => {
            
            localStorage.setItem("item_id", res.data.access_token);
            console.log(localStorage.getItem("item_id"));
            
            navigate('/tablero/lista');
        }).catch(error => {
            console.log(error);
        })
    }
    return (<Container>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
               
                <div className='mt-3'>
                    <label>Email:</label>
                    <FormControl id='email' type="text" value={email} onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }} />
                </div>
                <div className='mt-3'>
                    <label>Password:</label>
                    <FormControl id='pass' type="password" value={password} onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }} />
                </div>
                
                
                <div className='mt-3' >
                    
                <Link className="btn btn-primary" to={"/register"}>Registrarse</Link>
                    <Button id="acc" variant="primary" onClick={guardarDatos}>Guardar</Button>
                </div>
            </Col>
        </Row>
    </Container>);
}

export default Login;