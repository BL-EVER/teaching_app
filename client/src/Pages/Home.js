import React from 'react';
import {useKeycloak} from "@react-keycloak/web";

const Home = () => {
    const { keycloak, initialized } = useKeycloak();
    if(!initialized) return(<></>);
    console.log(keycloak?.tokenParsed);
    return (
        <div>
            <h1>Home</h1>
            {keycloak.hasResourceRole("user") ? <p>You are a user</p> : <p>You are not a user</p>}
        </div>
    );
};

export default Home;