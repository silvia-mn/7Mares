import * as React from 'react';
import { Box, TextField, Button, FormControl, Alert, InputAdornment } from '@mui/material';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'

export default function RegistrationFormP() {
  const [nombre, setNombre] = React.useState('');
  const [responsable, setResponsable] = React.useState('');
  const [puerto, setPuerto] = React.useState('');
  const [cif, setCif] = React.useState('');
  const [euros, setEuros] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const promoter = {
      nombre,
      responsable,
      puerto,
      email,
      cif,
      euros,
      telefono,
      password
    };
    const data = { promoter };
    axios
      .post('http://localhost:8080/registrarEmpresa', data)
      .then((response) => {
        navigate('/inicio')
      })
      .catch((error) => {
        setErrorMessage("Se ha producido un error");
        setError(true);
      });
};

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
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%'}}>
          <TextField
            required
            label="Nombre de la empresa"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
          <TextField
            required
            label="Encargado"
            value={responsable}
            onChange={(event) => setResponsable(event.target.value)}
            sx={{ width: '100%' }}
          />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Puerto principal"
              required
              value={puerto}
              onChange={(event) => setPuerto(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="CIF"
              required
              value={cif}
              onChange={(event) => setCif(event.target.value)}
              sx={{ width: '100%' }}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
              label="Capital social"
              required
              value={euros}
              onChange={(event) => setEuros(event.target.value)}
              sx={{ width: '100%' }}
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
