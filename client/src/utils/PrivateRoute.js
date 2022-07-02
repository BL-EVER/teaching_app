import { useKeycloak } from "@react-keycloak/web";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({ allowedRoles = [], children }) => {
    const { keycloak } = useKeycloak();

    if(!keycloak.authenticated) return <Navigate to="/" replace={true} />
    if(allowedRoles === []) return children;
    for(const role of allowedRoles) {
        console.log(role)
        console.log(keycloak.hasResourceRole(role))
        if(keycloak.hasResourceRole(role)) return children;
    }
    return <Navigate to="/" replace={true} />
};

export default PrivateRoute;