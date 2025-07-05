import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/General/Footer";
import Header from "./components/General/Header";
import HomeScreen from "./Screens/General/Home";
import IncidentScreen from "./Screens/Incidents/Incident";
import OrganisationScreen from "./Screens/Organisation/Organisations";
import LoginScreen from "./Screens/User/Login";
import RegisterScreen from "./Screens/User/Register";

function App() {
  return (
    <>
      <Header />
      <Container>
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            <Route
              exact
              path="/login"
              element={<LoginScreen />}
            />
            <Route
              exact
              path="/signup"
              element={<RegisterScreen />}
            />
            <Route
              exact
              path="/organisation/create"
              element={<OrganisationScreen />}
            />
            <Route
              exact
              path="/organisation/:id"
              element={<OrganisationScreen />}
            />
            <Route
              exact
              path="/incident/:id"
              element={<IncidentScreen />}
            />

            <Route
              exact
              path="/"
              element={<HomeScreen />}
            />
          </Routes>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
