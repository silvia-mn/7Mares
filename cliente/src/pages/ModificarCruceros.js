import { useEffect, useState } from "react";
import axios from "axios";
import TablaSimpleCruceros from "../components/TablaSimpleCruceros";

import { useNavigate } from "react-router-dom";

export default function ModificarCruceros(){
    const [data,setData] = useState([]);
    const [cargado,setCargado] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!cargado){
            axios({
                url:"http://localhost:8080/crucerosPorEmpresa",
                method: "GET",
                withCredentials:true
            }).then(r=> {
                setData(r.data);
                setCargado(true);
            }).catch(err=>{
                console.log(err);
            });
        }
    },[cargado]);

    return <>
        {!!cargado && <TablaSimpleCruceros data={data} fun={(id)=>{
            navigate('/modificarCrucero/'+id)
        }} text='¿Modificar?'/>}
    </>

}