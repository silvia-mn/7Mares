

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegistroClienteForm from './components/RegistroClienteForm';
import RegistroEmpresaForm from './components/RegistroEmpresaForm';
import TablaCruceros from './components/TablaCruceros.js';
import RegistroCruceroForm from "./components/RegistroCruceroForm";
import CruceroData from "./components/CruceroData";

import Inicio from "./pages/Inicio"
import Encabezado from "./components/Encabezado";

import { createContext, useEffect, useState } from 'react';
import {tema} from './tema';
import Login from "./components/LoginForm.js";

import axios from "axios"
import EliminarEmpresas from "./pages/EliminarEmpresas";
import ValidarEmpresas from "./pages/ValidarEmpresas";
import EliminarCruceros from "./pages/EliminarCruceros";
import ModificarCruceroForm from "./components/ModificarCrucero";
import ModificarCruceros from "./pages/ModificarCruceros";
import Pago from "./components/Pago";

export const TemaContext = createContext(tema)
export const LoginContext = createContext({email: "", rol:""})


function App() {
  const [rol,setRole] = useState("no");
  const [verificado,setVerificado] = useState(false);
  const  [carga,setCarga] = useState(false);

  useEffect(()=>{
    console.log(rol)
    if(!carga){
      axios({url:"http://localhost:8080/user",
      method: "GET",
      withCredentials: true}).then(r => 
        {
          setCarga(true);
          setRole(r.data.rol);
          if (r.data.rol==="empresa") setVerificado(true);
        }).catch(err=>{
          setCarga(true);
          setRole('no');
        })
    }
  },[carga,rol])

  return (
    <LoginContext.Provider value={{rol,carga,setCarga,verificado}}>
    <TemaContext.Provider value={tema}>
    <Encabezado/>
    <Router>
      <Routes>

        <Route path="/registrar/usuario" index element={<RegistroClienteForm/>}/>
        <Route path="/registrar/empresa" index element={<RegistroEmpresaForm/>}/>
        <Route path="/registrar/crucero" index element={<RegistroCruceroForm/>}/>
        <Route path="/modificarCrucero/:id" index element={<ModificarCruceroForm/>}/>
        
        <Route path="/inicio" index element={<Inicio/>}/>

        <Route path="/cruceros" index element={<TablaCruceros/>}/>
        <Route path={`/crucero/:id`} index element={<CruceroData/>}/>
        <Route path="/borrarCruceros" index element={<EliminarCruceros/>}/>
        <Route path="/modificarCruceros" index element={<ModificarCruceros/>}/>
        <Route path="/" index element={<Pago id={2} num={1} precio={2}/>}/>

        <Route path="/login" index element={<Login/>}/>
        <Route path="/validarEmpresas" index element={<ValidarEmpresas/>}/>
        <Route path="/borrarEmpresas" index element={<EliminarEmpresas/>}/>
      </Routes>  
    </Router>
    </TemaContext.Provider>
    </LoginContext.Provider>
  )
}

export default App;
