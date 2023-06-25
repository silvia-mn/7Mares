import * as React from 'react';
import { Box, TextField, Button,Alert, FormControl } from '@mui/material';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

export default function ModificarCruceroForm(props) {
  const [nombre, setNombre] = React.useState('');
  const [puerto,  setPuerto] = React.useState('');
  const [ubicacion, setUbicacion] = React.useState('');
  const [aforo, setAforo] = React.useState('');
  const [fecha, setFecha] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [hora, setHora] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const hoy = new Date();
  hoy.setDate(hoy.getDate() +2);
  const minDate = hoy.toISOString().split("T")[0]; 
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const patch = {};
    if (nombre!=='') patch.nombre=nombre;
    if (puerto!=='') patch.puerto=puerto;
    if (ubicacion!=='') patch.ubicacion=ubicacion;
    if (aforo!=='') patch.aforo=aforo;
    if (fecha!=='') patch.fecha=fecha;
    if (descripcion!=='') patch.descripcion=descripcion;
    if (hora!=='') patch.hora=hora;
    if (precio!=='') patch.precio=precio;
    const data = {
        id,
        patch
    };
    
    axios
      ({url:'http://localhost:8080/modificarCrucero',method:'POST',withCredentials:true, data:data})
      .then((response) => {
        console.log(response.data);
        navigate('/modificarCruceros');
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
        <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%'}}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            label="Puerto"
            value={ puerto}
            onChange={(event) =>  setPuerto(event.target.value)}
            sx={{ width: '100%' }}
          />
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Ubicacion"
              value={ubicacion}
              onChange={(event) => setUbicacion(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Aforo"
              value={aforo}
              onChange={(event) => setAforo(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              id="fecha"
              label="Fecha"
              type="date"
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
          <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            label="Hora"
            type="hora"
            value={hora}
            onChange={(event) => setHora(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            label="Precio"
            type="precio"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
            <Button variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>Modificar</Button>
      </FormControl>
      </form>
    </Box>
  </Box>
);
};
