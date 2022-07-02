import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8080/auth/",
    realm: "teaching_app",
    clientId: "frontend",
});


export default keycloak;