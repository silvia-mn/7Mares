import { Box,FormControl, Typography,TextField,Button, InputLabel,CircularProgress } from "@mui/material"
import { useState } from "react";
import CryptoES from 'crypto-es';
import axios from "axios";
import QRCode from "react-qr-code";

export default function Pago({id,precio,num}){

    console.log({precio,num})

    const [numerotarjeta, setNumeroTarjeta] = useState('');
    const [cvv, setCVV] = useState('');
    const [fecha, setFecha] = useState('');
    const [cargado,setCargado] = useState(true);
    const [idPago,setIdPago] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setCargado(false);
        const data = {
            cruceroId : Number(id),
            cantidadBilletes: num,
            datosTarjeta:{
                cardNumber : numerotarjeta,
                cvv : cvv,
                expiresOn: fecha
            }
        }
        const encriptado=CryptoES.AES.encrypt(JSON.stringify(data),"secreto").toString();
        axios({
            url:'http://localhost:8080/comprarBilletes',
            method: 'POST',
            withCredentials: true,
            data : {encriptado},
          }).then((response)=>{
            setCargado(true);
            if(response.data?.success){
                setIdPago(response.data._id);
                console.log(response.data._id);
            }
          }).catch((err)=>{
            console.log(err);
            setCargado(true);
          });
    }

    return <Box sx={{ width: '400px', p: 2 }}>
        {!cargado && <CircularProgress/>}
        {cargado && idPago==='' &&
        <>
        <Typography>
            Total compra : {precio * num}
        </Typography>
        <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
            required
            label="Numero de tarjeta"
            value={numerotarjeta}
            onChange={(event) => setNumeroTarjeta(event.target.value)}
            sx={{ width: '100%' }}
            />
        </FormControl>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
            required
            label="CVV"
            value={cvv}
            onChange={(event) => setCVV(event.target.value)}
            sx={{ width: '100%' }}
            />
        </FormControl>
        <InputLabel>Fecha de expiración</InputLabel>
        <FormControl variant="outlined" required fullWidth sx={{ mb: 2, width: '100%' }}>
            <TextField
            required
            value={fecha}
            label={'mm/yyyy'}
            onChange={(event) => setFecha(event.target.value)}
            sx={{ width: '100%' }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <Button variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>Comprar</Button>
        </FormControl>
        </form>
        </>
        }
        {cargado && idPago!=='' && <QRCode value={idPago}/>}
     </Box>
}