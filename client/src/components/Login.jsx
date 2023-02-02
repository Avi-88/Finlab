import React, {Fragment, useContext, useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';


const Login = () => {
    const [isNew, setIsNew] = useState(false);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNew = () => {
        setIsNew(!isNew);
    };
 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           dispatch({type:"LOGIN_START"});
            try {
                const res = await axios.post("http://finlab-server:8000/api/auth/login", {email:email.current.value , password: password.current.value})
                if(res.status === 200){
                    navigate('/')
                };
        
                dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            } catch (error) {
                dispatch({type:"LOGIN_FAILURE", payload: error})
            }
        } catch (error) {
            alert(error);
        }
    };


    const handleRegister = async()=>{
        try {
             await axios.post('http://finlab-server:8000/api/auth/register', {})
        } catch (error) {
            
        }
    }

    return (
        <div className='container form-div'>
            <div className='form-card'>
                <div className='form-logo-div'>
                    <Avatar sx={{height:"120px", width:"120px", boxShadow:10}} alt="Remy Sharp" src="https://decadescdn.decades.com/uDZoL-1504200570-195-blog-Screen%20Shot%202017-08-31%20at%2012.21.42%20PM.jpg" />
                </div>
                <h3>{isNew ? "Join the club" : "Sign In to your Account" }</h3>
                <form >
                    <div className='form-body'>{isNew ? (
                        <Fragment>
                            <div>
                                <TextField margin="dense" id="outlined-basic" label="Name" variant="outlined" type="text" inputRef={name} fullWidth/>
                                <TextField margin="dense" id="outlined-basic" label="Email" variant="outlined" type= 'email' inputRef={email}    fullWidth/>
                                <TextField margin="dense" id="outlined-basic" label="Password" variant="outlined" type='password' inputRef={password}   fullWidth/>
                                <TextField margin="dense" id="outlined-basic" label="Confirm Password" variant="outlined"  type='password' inputRef={password} fullWidth  />
                            </div>
                            <div className='form-buttons'>
                            <Button sx={{width:"100%", my:3}} onClick={handleRegister}  variant="contained">Register</Button> 
                            <p onClick={handleNew} className='switch-link'>Already a user? Login</p> 
                            </div>
                        </Fragment>
                    ):( <Fragment>
                        <div>
                            <TextField  margin="dense" id="email" label="Email" variant="outlined" type= 'email' inputRef={email} fullWidth  />
                            <TextField margin="dense" id="password" label="Password" variant="outlined" type='password' inputRef={password} fullWidth  />
                        </div>
                        <div className='form-buttons'>
                            <Button sx={{width:"100%", my:3}} onClick={handleLogin} type='submit' variant="contained">Login</Button> 
                            <p onClick={handleNew} className='switch-link'>Sign Up</p> 
                        </div>
                        </Fragment>
                    )}
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
