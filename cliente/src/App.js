
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegistroClienteForm from './components/RegistroClienteForm';
import RegistroEmpresaForm from './components/RegistroEmpresaForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registrar/usuario" index element={<RegistroClienteForm/>}/>
        <Route path="/registrar/empresa" index element={<RegistroEmpresaForm/>}/>
      </Routes>  
    </Router>
  )
}

export default App;
