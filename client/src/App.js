import { ReactKeycloakProvider } from "@react-keycloak/web";
import {Route, Routes} from "react-router-dom";
import keycloak from "./keycloak";
import Header from "./Layout/Header";
import Home from "./Pages/Home";
import CreateTest from "./Pages/CreateTest";
import PrivateRoute from "./utils/PrivateRoute";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ViewTests from "./Pages/ViewTests";
import TakeTest from "./Pages/TakeTest";
import HelpPage from "./Pages/HelpPage";

function App() {
  return (
    <div>
      <ReactKeycloakProvider authClient={keycloak} onTokens={(tokens)=>{}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/create-test" element={<PrivateRoute allowedRoles={["admin"]}><CreateTest /></PrivateRoute>} />
          <Route path="/view-tests" element={<PrivateRoute allowedRoles={["admin"]}><ViewTests /></PrivateRoute>} />
          <Route path="/take-test" element={<PrivateRoute allowedRoles={["user"]}><TakeTest /></PrivateRoute>} />
          <Route path="/take-test/:bundle" element={<PrivateRoute allowedRoles={["user"]}><TakeTest /></PrivateRoute>} />
        </Routes>
        <ToastContainer />
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
