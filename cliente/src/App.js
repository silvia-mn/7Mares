

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegistroClienteForm from './components/RegistroClienteForm';
import RegistroEmpresaForm from './components/RegistroEmpresaForm';
import TablaCruceros from './components/TablaCruceros';
import RegistroCruceroForm from "./components/RegistroCruceroForm";

import Inicio from "./pages/Inicio"
import Encabezado from "./components/Encabezado";

import { createContext } from 'react';
import {tema} from './tema';

export const TemaContext = createContext(tema)


function App() {
  return (
    <TemaContext.Provider value={tema}>
    <Encabezado/>
    <Router>
      <Routes>

        <Route path="/registrar/usuario" index element={<RegistroClienteForm/>}/>
        <Route path="/registrar/empresa" index element={<RegistroEmpresaForm/>}/>
        <Route path="/registrar/crucero" index element={<RegistroCruceroForm/>}/>
        <Route path="/inicio" index element={<Inicio/>}/>
        <Route path="/cruceros" index element={<TablaCruceros/>}/>

      </Routes>  
    </Router>
    </TemaContext.Provider>
  )
}

export default App;
