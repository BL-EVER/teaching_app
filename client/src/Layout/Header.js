import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useKeycloak} from "@react-keycloak/web";

const Header = () => {
    const { keycloak, initialized } = useKeycloak();

    if(!initialized) return(<>{JSON.stringify(initialized)}</>);
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Education Platform
                    </Typography>
                    {!keycloak.authenticated && (
                        <>
                            <Button
                                variant="contained"
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
                            onClick={() => keycloak.logout()}
                        >
                            Logout ({keycloak.tokenParsed.preferred_username})
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;