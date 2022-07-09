
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Pppp = () => {
    const navigate = useNavigate();

    useEffect(() => {
         localStorage.removeItem('item_id')
            navigate('/login');
    }, [])

                }


export default Pppp;