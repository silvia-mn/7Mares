import * as React from 'react';
import { Box, TextField, Button,Alert, FormControl, InputAdornment } from '@mui/material';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'

export default function RegistrationFormU(props) {
  const [nombre, setNombre] = React.useState('');
  const [ apellido1,  setApellido1] = React.useState('');
  const [apellido2, setApellido2] = React.useState('');
  const [dni, setDni] = React.useState('');
  const [fechanacimiento, setFechaNacimiento] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const maxDate = new Date().toISOString().split("T")[0];

  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      nombre,
      apellido1,
      apellido2,
      email,
      dni,
      fecha : fechanacimiento,
      telefono,
      password
    };
    axios
      .post('http://localhost:8080/registrarCliente', user)
      .then((response) => {
        console.log(response.data);
        navigate('/inicio');
      })
      .catch((error) => {
        setErrorMessage(!! error?.response?.data?.mensaje ?  error.response.data.mensaje : "Se ha producido un error" );
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
            label="Primer Apellido"
            value={ apellido1}
            onChange={(event) =>  setApellido1(event.target.value)}
            sx={{ width: '100%' }}
          />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Segundo Apellido"
              value={apellido2}
              onChange={(event) => setApellido2(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="DNI"
              required
              value={dni}
              onChange={(event) => setDni(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              id="fechanacimiento"
              label="Fecha de nacimiento"
              type="date"
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: maxDate,
                },
                placeholder: "",
              }}
              fullWidth
              onChange={(event) => setFechaNacimiento(event.target.value)}
              sx={{ mb: 2 }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Telefono"
              required
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            required
            label="Email"
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
            <Button variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>Registrar </Button>
      </FormControl>
      </form>
    </Box>
  </Box>
);
};
