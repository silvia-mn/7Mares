import * as React from 'react';
import { Box, TextField, Button,Alert, FormControl, InputAdornment } from '@mui/material';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'

export default function RegistrationFormU(props) {
  const [nombre, setNombre] = React.useState('');
  const [puerto,  setPuerto] = React.useState('');
  const [ubicacion, setUbicacion] = React.useState('');
  const [aforo, setAforo] = React.useState('');
  const [fecha, setFecha] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [empresa_email, setEmpresa_email] = React.useState('');
  const [hora, setHora] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const hoy = new Date();
  hoy.setDate(hoy.getDate() +2);
  const minDate = hoy.toISOString().split("T")[0]; 
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nombre,
      puerto,
      ubicacion,
      empresa_email,
      aforo,
      fecha,
      descripcion,
      hora,
      precio
    };
    
    axios
      .post('http://localhost:8080/registrarCrucero', data)
      .then((response) => {
        console.log(response.data);
        navigate('/home');
      })
      .catch((error) => {
        if(error?.response?.data?.mensaje)
          setErrorMessage(error.response.data.mensaje);
        else
          setErrorMessage("Se ha producido un error");
        setError(true);
      });
};

const onClose = ()=>{
  setError(false);
}

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:'column',justifyContent: 'center', minHeight: '100vh' }}>
       {
          error &&
            <Alert severity="error" onClose={onClose}>{errorMessage}</Alert>
        }
    <Box sx={{ width: '400px', p: 2 }}>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%'}}>
          <TextField
            required
            label="Nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            required
            label="Puerto"
            value={ puerto}
            onChange={(event) =>  setPuerto(event.target.value)}
            sx={{ width: '100%' }}
          />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Ubicacion"
              value={ubicacion}
              onChange={(event) => setUbicacion(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Aforo"
              required
              value={aforo}
              onChange={(event) => setAforo(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              id="fecha"
              label="Fecha"
              type="date"
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  min: minDate,
                },
                placeholder: "",
              }}
              fullWidth
              onChange={(event) => setFecha(event.target.value)}
              sx={{ mb: 2 }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Descripcion"
              required
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            required
            label="email de la empresa"
            value={empresa_email}
            onChange={(event) => setEmpresa_email(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            required
            label="Hora"
            type="hora"
            value={hora}
            onChange={(event) => setHora(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            required
            label="Precio"
            type="precio"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
            <Button variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>Registrar</Button>
      </FormControl>
      </form>
    </Box>
  </Box>
);
};
