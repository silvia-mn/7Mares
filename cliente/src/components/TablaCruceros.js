import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import foto from '../imagenes/crucero2.jpg';
import InfoIcon from '@mui/icons-material/Info';
import { CircularProgress } from '@mui/material';


const ListSubheader = styled('div')(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  padding: theme.spacing(2),
}));

export default function TablaCruceros() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [existen, setExisten] = useState(false)

  useEffect(() => {
    if(!loaded){
    axios
      .get('http://localhost:8080/crucerosDisponibles', { withCredentials: true })
      .then((response) => {
        console.log(response);
        setExisten(true);
        const data = response.data.map((item) => ({
          img: foto,
          title: item.nombre,
          author: item.puerto,
          route: `/crucero/${item.id}`, 
        }));
        setItems(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setLoaded(true);
      });
    }
  }, [loaded]);

  

  return (<>
    {loaded ? (
      existen?(
    <ImageList sx={{ width: "100%", height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Cruceros Disponibles</ListSubheader>
      </ImageListItem>
      {items.map((item) => (
        <ImageListItem key={item.img}>
          <a href={item.route}>
            <img
              src={item.img}
              alt={item.title}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </a>
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={<InfoIcon />}
          />
        </ImageListItem>
      ))}
    </ImageList>
      ):(
        <Box>
                <Typography variant="h3"> No hay cruceros cargados en la aplicación </Typography>
            </Box>
       )

    ):
      <CircularProgress/>}
  </>);
      
}

