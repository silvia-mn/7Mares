import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid} from '@mui/material';
import axios from 'axios';
import { CircularProgress, Button,Alert } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import foto from '../imagenes/crucero2.jpg';
import { TextField } from '@mui/material';
import Pago from './Pago';


export default function CruceroData(){
const [crucero, setCrucero] = useState(null);
const [loaded, setLoaded] =useState(false);
const [ticketCount, setTicketCount] = useState(1);
const [price,setPrice]=useState(-1);
const [error,setError] = useState(false);
const [errorMessage,setErrorMessage] = useState("");
const [pay,setPay] = useState(false);
const {id}=useParams();

const onClose = ()=>{
  setError(false);
}

useEffect(()=>{
    if(!loaded){
        axios.get('http://localhost:8080/crucero/'+id).then(response=>{
          setCrucero(response.data);
          setLoaded(true);  
        })
        .catch(error=>{
            setLoaded(true);
            console.error(error);
        });
    }
}, [loaded]);

const existen = !!crucero;
const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };

  const handlePay = () => {
    if(loaded){
        if (crucero.aforo > 0 && ticketCount<crucero.aforo){
          if (ticketCount<=0){
            setError(true);
            setErrorMessage('Introduzca una cantidad de tickets válida por favor.');  
          }else{
          setPrice(crucero.price);
          setPay(true);
          }
        }else{
          setError(true);
          setErrorMessage('No quedan camarotes disponibles en el barco. Lo sentimos.');
        }
        
      }
    console.log(`Paying for ${ticketCount} tickets`);
  };


return(<>
{
          error &&
            <Alert severity="error" onClose={onClose}>{errorMessage}</Alert>
        }
{
!pay &&
<Container sx={{minHeight:750}}>
    {loaded ? (
        existen ? (
            <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              '& > :nth-of-type(1)': {
                order: { xs: 2, sm: 1 },
              },
              '& > :nth-of-type(2)': {
                order: { xs: 1, sm: 2 },
              },
            }}
          >
            <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item sm={6} alignItems="center">
                  <Box display="flex" justifyContent="start" alignItems="center" flexDirection="column" sx={{padding: 3}}>
                    <img src={foto} alt="Foto" style={{ maxWidth: '300px', marginBottom: '20px' }} />
                    <Typography variant="h1" align="center">{crucero.nombre}</Typography>
                  </Box>
                  <Box marginBottom="10px">
                    <Typography variant="h3">Puerto:</Typography>
                    <Typography variant="h6" align="start">{crucero.puerto}</Typography>
                  </Box>
                  <Box marginBottom="10px">
                    <Typography variant="h3">Ubicacion:</Typography>
                    <Typography variant="h6" align="start">{crucero.ubicacion}</Typography>
                  </Box>
                  <Box marginBottom="10px">
                    <Typography variant="h3">Aforo:</Typography>
                    <Typography variant="h6" align="start">{crucero.aforo}</Typography>
                  </Box>
                  <Box marginBottom="10px">
                    <Typography variant="h3">Descripcion:</Typography>
                    <Typography variant="h6" align="start">{crucero.descripcion}</Typography>
                  </Box>
                  <Box marginBottom="10px">
                    <Typography variant="h3">Fecha:</Typography>
                    <Typography variant="h6" align="start">{`${new Date(crucero.fecha).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric'
                    })} - ${new Date(crucero.fecha).toLocaleTimeString('en-US')}`}</Typography>
                  </Box>
                  <Box marginBottom="10px">
                    <Typography variant="h3">Precio:</Typography>
                    <Typography variant="h6" align="start">{crucero.precio+'€'}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid item sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ padding: 2,  marginLeft:8}}>
                    <Typography variant="h3">Número de tickets:</Typography>
                    <TextField
                      type="number"
                      value={ticketCount}
                      onChange={handleTicketCountChange}
                      inputProps={{ min: 1 }}
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ padding:1, marginLeft:14}}>
                    <Button variant="contained" color="primary" onClick={handlePay}>
                      Pagar
                    </Button>
                  </Box>
                </Grid>
          </Grid>
          </Grid>
        ):(
            <Box>
                <Typography variant="h3"> No hay datos disponibles a cerca de este crucero</Typography>
            </Box>
            )
    ):(<CircularProgress/>)}
</Container>}
{pay && <Pago id={id} num={ticketCount} precio={crucero.precio}/>}
</>
)


}