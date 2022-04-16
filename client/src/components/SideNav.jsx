import React, { Fragment,useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import { AuthContext } from '../context/AuthContext';



let anchor = "left"




const SideNav = () => {
    const [state, setState] = React.useState({left: false});
    const {user , isLoggedIn , dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      

      const handleLogInClick = async() =>{
        try {
          navigate('/login');
        } catch (error) {
          alert('something went wrong:' + error)
        }
      }
       
      const handleLogout = async() =>{
        try {
          dispatch({type:"LOGOUT"});
          window.location.reload();
        } catch (error) {
          alert('something went wrong:' + error)
        }
      }
      
    
      const list = (anchor) => (
        <Box
          sx={{ width: 250,  color:"",backgroundColor:"#222831", height:"100%" }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
  
           <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(anchor, true)}
            > 
            <ArrowBackIosIcon  sx={{color:"white"}} />
          </IconButton>

          <List sx={{padding:"5px",marginTop:"10px"}}>
          <Link to="/" className='links'>
             <ListItem button sx={{marginTop:"10px"}}>
              <ListItemIcon>
                  <HomeRoundedIcon sx={{color:"#00FFF5"}}/>
                </ListItemIcon>
                <ListItemText primary="Home"  sx={{color:"white"}} />
               
             </ListItem>
            </Link>  

            <Link to="/watchlist" className='links'>
            
              <ListItem button sx={{marginTop:"10px"}}>
                <ListItemIcon>
                    <PlaylistAddCheckRoundedIcon  sx={{color:"#00FFF5"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Watchlist"  sx={{color:"white"}} />
              </ListItem>
            </Link>
              
              
            <Link to="/news" className='links'>  
              <ListItem button sx={{marginTop:"10px"}}>
                <ListItemIcon>
                  <NewspaperRoundedIcon  sx={{color:"#00FFF5"}}/>
                </ListItemIcon>
                <ListItemText primary="News"  sx={{color:"white"}} />
               </ListItem>
            </Link> 
              
            
          </List>
          
        </Box>
      );
    


    return (
        <Fragment>
        
          <div className='top-nav' >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 2 }}
            onClick={toggleDrawer(anchor, true)}
          > 
            <MenuIcon fontSize='inherit' sx={{color:"#393E46"}} />
          </IconButton>
          {isLoggedIn ? 
          <div className='user-details'>
            <div className='user-name'>
                <AccountCircleIcon sx={{mr:1.2}}/>
                <p>{user.username}</p>
            </div>
            <Button size='small' onClick={handleLogout} sx={{borderColor:"#222831", color:"#222831"}} variant="outlined">
            Log Out
            </Button>
          </div> 
           : 
            <Button size='small' onClick={handleLogInClick} sx={{borderColor:"#222831", color:"#222831"}}  variant="outlined">
              Log In
            </Button> }
          </div>
          
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
        
        
    
    )
}

export default SideNav
