import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'


const Login: NextPage = () => {
  const [user, setUser] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter()
    const handleLogin = async() => {
      let res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ user, password }),
        headers:
        {
            "Content-Type":
            "application/json",
        },
    });
    const data = await res.json();
    console.log(data);
      if (data.result) {
        router.push('/main');
      }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
          <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              Login
            </IconButton>
          </Toolbar>
      </AppBar>
      <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:10}}>
      <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">UserName</InputLabel>
          <OutlinedInput
            id="UserName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            aria-describedby="Input UserName"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        
        <Button sx={{width:200,marginTop:5}} onClick={handleLogin} variant="contained"> Login </Button>
     
      </Box>

    </div>
  )
}

export default Login