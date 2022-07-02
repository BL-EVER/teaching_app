import { ReactKeycloakProvider } from "@react-keycloak/web";
import {Route, Routes} from "react-router-dom";
import keycloak from "./keycloak";
import Header from "./Layout/Header";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <ReactKeycloakProvider authClient={keycloak} onTokens={(tokens)=>console.log(tokens)}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/download" element={<PrivateRoute allowedRoles={["admin", "user"]}><DownloadPage /></PrivateRoute>} />*/}
        </Routes>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
