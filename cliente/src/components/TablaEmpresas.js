import { Button } from "@mui/material";
import { TemaContext } from "../App";
import { useContext } from "react";

import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TablaEmpresas({data,setData,url,text='¿Eliminar?'}){

    const tema = useContext(TemaContext);

    return <TableContainer component={Paper}>
    <Table sx={{backgroundColor:tema.secondary}}>
        <TableHead>
          <TableRow>
          <TableCell>Nombre</TableCell>
            <TableCell>Puerto</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>{text}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {data.map(row=><TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
            <TableCell>{row.puerto}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell><Button onClick={() => {
                axios({
                    url:url,
                    method:"POST",
                    withCredentials:true,
                    data : {
                        id : row.email
                    }
                }).then(()=> setData(data.filter(it=>it.email!==row.email))).
                catch(err=>console.log(err))}
            }>X</Button></TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
    </TableContainer>
}