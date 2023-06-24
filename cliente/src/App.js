

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegistroClienteForm from './components/RegistroClienteForm';
import RegistroEmpresaForm from './components/RegistroEmpresaForm';

import Inicio from "./pages/Inicio"
import Encabezado from "./components/Encabezado";

import { createContext, useEffect, useState } from 'react';
import {tema} from './tema';
import Login from "./components/LoginForm";

import axios from "axios"

export const TemaContext = createContext(tema)
export const LoginContext = createContext({email: "", rol:""})


function App() {
  const [rol,setRole] = useState("no");
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
        }).catch(err=>{
          setCarga(true);
          setRole('no');
        })
    }
  },[carga,rol])

  return (
    <LoginContext.Provider value={{rol,carga,setCarga}}>
    <TemaContext.Provider value={tema}>
    <Encabezado/>
    <Router>
      <Routes>

        <Route path="/registrar/usuario" index element={<RegistroClienteForm/>}/>
        <Route path="/registrar/empresa" index element={<RegistroEmpresaForm/>}/>
        <Route path="/inicio" index element={<Inicio/>}/>
        <Route path="/login" index element={<Login/>}/>
      </Routes>  
    </Router>
    </TemaContext.Provider>
    </LoginContext.Provider>
  )
}

export default App;
