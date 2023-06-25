import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";

import foto from '../imagenes/crucero.jpg';

import { TemaContext,LoginContext } from "../App";


export default function Inicio(){

    const tema = useContext(TemaContext);
    const {rol,carga} = useContext(LoginContext);

    return <Box
        sx={{
            minWidth:"100vw",
            minHeight:"100vh",
            display:"flex",
        flexDirection:"column",
        alignItems: "center",
        textAlign:"center",
        backgroundColor: tema.secondary,
        padding: 0
        }}
    >
        <Box sx={{display: "flex", flexDirection:"column",justifyContent:"space-between", width:"70%"}}>
 
            {!!carga && rol==='no' &&
            <Typography variant="body1" sx={{color:tema.text, fontWeight:"bold"}}>
                Registrate para descubrir  las mejores ofertas en cruceros
            </Typography>}

            {!!carga && rol==='admin' && <>
            <Typography variant="h3" sx={{color:tema.text, fontWeight:"bold"}}>
                Opciones de administrador
            </Typography>
            <Box sx={{
                display :"flex",
                direction: "row",
                width:"100%"
            }}>
                <Button component={Link} to='/borrarEmpresas' variant="contained" sx={{flexGrow:0.5}}>Eliminar Empresas</Button>
                <Button component={Link} to='/validarEmpresas' variant="contained" sx={{flexGrow:0.5}}>Validar Empresas</Button>
            </Box></>}


        <Box sx={{display: "flex", flexDirection:"column",justifyContent:"space-between", width:"60%", marginTop: 3, alignItems: "center",
        textAlign:"center"}}>
        <img src={foto} alt="crucero" style={{width:'100%', height: '400px'}}/>
        <Typography variant="body1" sx={{color:tema.text, fontWeight:"bold"}}>
            Registrate para descubrir las mejores ofertas en cruceros
        </Typography>
        </Box>
        </Box>
}