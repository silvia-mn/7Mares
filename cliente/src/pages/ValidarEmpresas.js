import { useEffect, useState } from "react";
import axios from "axios";
import TablaEmpresas from "../components/TablaEmpresas";

export default function ValidarEmpresas(){
    const [data,setData] = useState([]);
    const [cargado,setCargado] = useState(false);

    useEffect(()=>{
        if(!cargado){
            axios({
                url:"http://localhost:8080/empresasSinValidar",
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
        {!!cargado && <TablaEmpresas data={data} setData={setData} url="http://localhost:8080/validarEmpresa" text='¿Validar?'/>}
    </>

}