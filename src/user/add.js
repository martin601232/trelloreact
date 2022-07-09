import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const Add = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [usuario, setUsuario] = useState([]);
    const [usuarioSel, setUsuarioSel] = useState();
    useEffect(() => {
        if (!localStorage.getItem('item_id')) {
            navigate('/login');
            return;
        }
        
        loadUnUsuario();
    }, [id])

    const loadUnUsuario = () => {
       
        axios.get('http://localhost:8000/api/users').then(res => {
            setUsuario (res.data) ;
              
                console.log(usuario);
    
    
            })
            .catch(error => {
                console.log(error);
            })
      };


    
    const guardarDatos = () => {
        const params = {
            usuario_id: usuarioSel,
            tablero_id:id
           
        };
       
            insertarPersona(params);
       
    }
    const insertarPersona = (params) => {

        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("item_id")}`,
            },
       };   
        axios.post('http://localhost:8000/api/usutab',
            params,config
        ).then(res => {
            console.log(res)
            navigate('/lista/'+id);
        }).catch(error => {
            console.log(error);
        })

    
    }
    return (<Container>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <div>
                    <div>
                    <label>Personas:</label>
                    <FormSelect  id='visible' value={usuarioSel} onChange={(e) => {
                        setUsuarioSel(e.target.value);
                    }}>
                        {usuario.map((item) => {
                return (
                        <option key={"item-" + item.id} value={item.id}>{item.email} </option>
                )})}
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

export default Add;