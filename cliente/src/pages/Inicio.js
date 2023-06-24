import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { TemaContext } from "../App";
import foto from '../imagenes/crucero.jpg';



export default function Inicio(){

    const tema = useContext(TemaContext);

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
        <Box sx={{display: "flex", flexDirection:"column",justifyContent:"space-between", width:"60%", marginTop: 3, alignItems: "center",
        textAlign:"center"}}>
        <img src={foto} alt="crucero" style={{width:'100%', height: '400px'}}/>
        <Typography variant="body1" sx={{color:tema.text, fontWeight:"bold"}}>
            Registrate para descubrir las mejores ofertas en cruceros
        </Typography>
        </Box>
        </Box>
}