import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import {useState,useEffect,useContext} from 'react';
import {CircularProgress} from '@mui/material';
import { TemaContext } from '../App';
import axios from 'axios';

function renderRow(props) {
  const { index, style, data} = props;
  const item = data[index];
  console.log(data);

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText />
        {item.nombre}
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const tema = useContext(TemaContext);
  const [loaded,setLoaded] = useState(false);
  const [hasItems,setHasItems] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/crucerosDisponibles',{withCredentials:true})
    .then((response)=>{
        setLoaded(true);
        if (response.data.length===0){
            setHasItems(false);
            setLoaded(true);
            
        }else{
            setHasItems(true);
            setRows(response.data.map(item => ({
                    nombre: item.nombre,
                    puerto: item.puerto,
                    ubicacion: item.ubicacion,
                    fecha: item.fecha,
                    hora: item.hora,
                    precio: item.precio
                }))
                );
            setLoaded(true);
        }
    })
    .catch((err)=>{
        setLoaded(true);
        setHasItems(false);
    })
},[])

  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
    {(!!loaded)?  
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={rows.length}
        itemData={rows}
      >
        {renderRow}
      </FixedSizeList>
      :
      <CircularProgress sx={{color:tema.primary}}/>
    }
    </Box>
  );
}