import React , {useState,useContext} from 'react';
import { Box,Alert, TextField, Button, FormControl, Typography} from '@mui/material';
import {MenuItem,Select,InputLabel} from '@mui/material';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';

export default function Login() {

    const [tipo,setTipo] = useState('cliente');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const {setCarga} = useContext(LoginContext);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({url : "http://localhost:8080/login",
                method :"POST",
                data : {
                    email: email,
                    rolEmail : JSON.stringify({email:email, rol:tipo}),
                    password : password
                },
                withCredentials:true
        }).then(r=>{
            if (r.data?.email){
                setCarga(false);
                navigate('/inicio');
            }
        }).catch(err=>{
            setError(true);
            setErrorMessage("Datos incorrectos de sesión")
        });
    }

    const onClose = ()=>{
      setError(false);
    }

    return (
      <Box sx={{ display: 'flex', flexDirection:"column", alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {
          error &&
            <Alert severity="error" onClose={onClose}>{errorMessage}</Alert>
        }
      <Box sx={{ width: '400px', p: 2 }}>
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{marginBottom:3}}>
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
            labelId="tipo"
            id="tipo"
            value={tipo}
            label="Tipo"
            onChange={(event) => setTipo(event.target.value)}
        >
            <MenuItem value={'cliente'}>Cliente</MenuItem>
            <MenuItem value={'empresa'}>Empresa</MenuItem>
            <MenuItem value={'admin'}>Administrador</MenuItem>
        </Select>
        </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              required
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              required
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
              <Button variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>Log in </Button>
        </FormControl>
        </form>
        <Box sx={{width:"100%", textAlign:"center", marginTop:2}}>
        <Typography>¿Aún sin cuenta? Registrate ahora</Typography>
        <Box sx={{
            display :"flex",
            direction: "row",
            width:"100%"
        }}>
            <Button component={Link} to='/registrar/empresa' variant="outlined" sx={{flexGrow:0.5}}>Registrarse como empresa</Button>
            <Button component={Link} to='/registrar/usuario' variant="outlined" sx={{flexGrow:0.5}}>Registrarse como cliente</Button>
        </Box>
      </Box>
      </Box>
      
    </Box>
  );
  };