import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import foto from '../imagenes/crucero2.jpg';
import InfoIcon from '@mui/icons-material/Info';


const ListSubheader = styled('div')(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  padding: theme.spacing(2),
}));

export default function TitlebarImageList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/crucerosDisponibles', { withCredentials: true })
      .then((response) => {
        const data = response.data.map((item) => ({
          img: foto,
          title: item.nombre,
          author: item.puerto,
          route: `/crucero/${item.id}`, 
        }));
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
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
  );
}
