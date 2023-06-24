import { useEffect, useState } from "react";
import axios from "axios";

export default function EliminarEmpresa(){
    const [data,setData] = useState([]);
    const [cargado,setCargado] = useState(false);
    useEffect(()=>{
        if(!cargado){
            axios({
                url:"http://localhost:8080/empresas",
                method: "GET",
                withCredentials:true
            })
        }
    })
}