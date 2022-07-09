import axios from 'axios';
import React,  { useEffect, useState }  from 'react';
import { Col, Container, Row } from 'react-bootstrap';
const FormMascota = () => {
    const [listaPersonas, setListaPersonas] = useState([]);
    useEffect(() => {
        loadPersonaList();
    }, []);
    const loadPersonaList = () => {
        axios.get('http://localhost:8080/web2/practicaapi2/?controller=persona&action=list')
            .then(res => {
                setListaPersonas(res.data);
            }).catch(error => {
                console.log(error);
            });

    }
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState(0);
    const [duenho, setDuenho] = useState(0);
    const guardarDatos=()=>{
        console.log(duenho);
        const params={
            nombre: nombre,
            tipo: tipo,
            persona: duenho
        };
        axios.post('http://localhost:8080/web2/practicaapi2/?controller=mascota&action=store', 
        params).then(res=>{})
        .catch(error=>{
            console.log(error)})

    }
    return (<Container>
        <Row>
          <Col>
        <div>
            <label>Nombres:</label>
            <input type="text" value={nombre} onChange={(e) => {
                setNombre(e.currentTarget.value);
            }} />
            <div>Tu variable nombre es: {nombre}</div>
        </div>
        <div>
            <label>Tipo:</label>
            <select value={tipo} onChange={(e)=>{
                setTipo(e.target.value);
            }}>
                <option value='1'>loro</option>
                <option value='-1'>perro</option>
                <option value='0'>gallo</option>
            </select>
        </div><div>
            <label>Duenho:</label>
            <select value={duenho} onChange={(e)=>{
                setDuenho(e.target.value);
            }}>
                 {listaPersonas.map(name => (                     
                <option value={name.id}>{name.nombres}</option>
                    ))}  
            </select>
        </div>
        
        <button onClick={guardarDatos}>Guardar</button>
        </Col>
      </Row>
    </Container>);
}

export default FormMascota;