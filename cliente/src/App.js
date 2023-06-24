import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
        <Route path="/inicio" index element={<Inicio/>}/>
      </Routes>  
    </Router>
    </TemaContext.Provider>
  )
}

export default App;
