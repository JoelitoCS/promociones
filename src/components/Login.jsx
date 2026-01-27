import { useState, useEffect } from 'react';

const [usuario, setUsuario] = useState('');
const [password, setPassword] = useState('');
const [error, setError]= useState('');
const [paginaActual, setPaginaActual]= useState('login');

const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

export default function Login(){

    if (adminCredentials.username === 'admin' && adminCredentials.password === 'admin123') {
       
    }

    return(
        <>
        <form action="GET">
            <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Iniciar Sesión</button>
        </form>
        </>
    )

}