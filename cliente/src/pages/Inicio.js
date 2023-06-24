import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { TemaContext,LoginContext } from "../App";
import {ReactComponent as Crucero} from '../imagenes/cruise_ship1.svg';


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
        padding: 3
        }}
    >
        
        <Box sx={{display: "flex", flexDirection:"column",justifyContent:"space-between", width:"70%"}}>
            <Crucero alt="crucero"/>
            <Typography variant="body1" sx={{color:tema.text, fontWeight:"bold"}}>
                Registrate para descubrir  las mejores ofertas en cruceros
            </Typography>
            {!!carga && <Typography>Rol actual : {rol}</Typography>}

            <Box sx={{display: "flex", flexDirection:"row",justifyContent:"space-between", width:"70%"}}>
            <Button variant="contained" sx={{backgroundColor:tema.primary, borderRadius:8, padding:4, marginTop:3}}>
                <Typography variant="h2" sx={{color:tema.textSecondary, fontWeight:"bold"}}>REGISTRARSE</Typography>
            </Button>
            <Button variant="contained" sx={{backgroundColor:tema.primary, borderRadius:8, padding:4, marginTop:3}}>
                <Typography variant="h2" sx={{color:tema.textSecondary, fontWeight:"bold"}}>LOGIN</Typography>
            </Button>
            </Box>
        </Box>
        </Box>
}