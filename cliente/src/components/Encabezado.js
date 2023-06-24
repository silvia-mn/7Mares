import {AppBar,Typography} from "@mui/material"
import {Menu,MenuItem, MenuList} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState,useContext } from "react";
import { TemaContext } from "../App";
import PersonIcon from '@mui/icons-material/Person';

export default function Encabezado(){

    const tema = useContext(TemaContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <AppBar position="sticky" sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor : tema.primary,
        padding:3,
        position: "relative"
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{
            position: "absolute",
            bottom: 0,
            left:0,
            width:"100%",
            height: "150%"
        }} 
            ><path fill={tema.textSecondary} fill-opacity="1" d="M0,128L40,149.3C80,171,160,213,240,234.7C320,256,400,256,480,234.7C560,213,640,171,720,138.7C800,107,880,85,960,74.7C1040,64,1120,64,1200,85.3C1280,107,1360,149,1400,170.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
        <MenuList>
            <MenuItem onClick={handleClose}><Typography variant="h5">Login</Typography></MenuItem>
            <MenuItem onClick={handleClose}><Typography variant="h5">Test</Typography></MenuItem>
        </MenuList>
      </Menu>
      
        <Typography variant = "h2"
        sx = {{
            color: tema.secondary,
            fontWeight:"bold",
            fontFamily: 'Retro Delight'
        }}> 7Mares</Typography>
        <IconButton sx={{marginLeft:"auto"}}>
        Identificate <PersonIcon/>  
      </IconButton>
    </AppBar>
}