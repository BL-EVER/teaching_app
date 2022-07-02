import React, {useState} from 'react';
import {AppBar, Button, IconButton, Modal, Toolbar} from "@mui/material";
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Header = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    if(!initialized) return(<></>);
    return (
        <div style={{marginBottom: "20px"}}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Button variant="contained" onClick={() => navigate('/')}> Education Platform</Button>
                    {!keycloak.authenticated && (
                        <>
                            <Button
                                variant="contained"
                                style={{marginLeft: 'auto'}}
                                onClick={() => keycloak.login()}
                            >
                                Login
                            </Button>
                            {/*<Button
                                variant="contained"
                                onClick={() => keycloak.register()}
                            >
                                Register
                            </Button>*/}
                        </>
                    )}

                    {!!keycloak.authenticated && (
                        <Button
                            variant="contained"
                            style={{marginLeft: 'auto'}}
                            onClick={() => keycloak.logout()}
                        >
                            Logout ({keycloak.tokenParsed.preferred_username})
                        </Button>
                    )}
                    <IconButton onClick={() => navigate('/help')} style={{color: 'white', marginLeft: '10px'}}><HelpOutlineIcon/></IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;