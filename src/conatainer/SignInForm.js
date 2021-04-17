import Navbar from '../components/Navbar'
import "../App.css";

import { Avatar, Box, Button, Container, CssBaseline, Grid, Typography, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BlurredImage from '../assets/img/BlurredImage.png';
import { makeStyles } from '@material-ui/styles';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    base: {},
    root:{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(205, 205, 255, 0.8)',        
        backgroundImage: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255))',
        backdropFilter: 'blur(7px)',
        borderRadius: '20px',
        borderTop: '2px solid #fffff0',
        borderLeft: '2px solid #fffff0'
    }

}));

const theme = createMuiTheme({
    palette: {
    //   primary: {
    //     light: purple[300],
    //     main: purple[500],
    //     dark: purple[700]
    //   },
    //   secondary: {
    //     light: green[300],
    //     main: green[500],
    //     dark: green[700]
    //   },
      background: {
        default: "#000000"
      }
    }
  });


const SignInForm = () => {

    const classes = useStyle();

    return (
        <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
            <CssBaseline />
                    
                {/* form header lock icon */}
                <Avatar spacing={1} style={{ backgroundColor: '#f48fb1', color: '#000'  }} >
                    <LockOutlinedIcon />
                </Avatar>
                
                {/* form header */}
                <Typography component="h1" variant="h4" style={{fontWeight: '600'}}> Sign In</Typography>

                {/* signin form */}
                <Grid item xs={10} md={6} lg={4}>
                    <Box>
                        <form>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus

                            type="email"
                            id="email"

                            />

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            autoComplete="current-password"

                            id="password"
                            type="password"
                            
                            />

                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                            style={{
                                margin: '24px 0px 16px'
                            }}
                            
                            >
                            Sign In
                            </Button>
                            
                            <div>
                            <Typography variant='p' align='center'>
                                {/* {authError ? <p>{authError}</p> : null} */}
                                error
                            </Typography>
                            </div>
                        </form>
                    </Box>
                </Grid>
        </div>
        </MuiThemeProvider>
    )
}

export default SignInForm
