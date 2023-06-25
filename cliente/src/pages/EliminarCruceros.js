import { useEffect, useState } from "react";
import axios from "axios";
import TablaSimpleCruceros from "../components/TablaSimpleCruceros";

export default function EliminarCruceros(){
    const [data,setData] = useState([]);
    const [cargado,setCargado] = useState(false);

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
            axios({
                url:"http://localhost:8080/borrarCrucero",
                method:"POST",
                withCredentials:true,
                data : {
                    id : id
                }
            }).then(()=> setData(data.filter(it=>it.id!==id))).
            catch(err=>console.log(err))
        }}/>}
    </>

}