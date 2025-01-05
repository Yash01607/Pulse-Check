import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/General/Footer";
import Header from "./components/General/Header";
import HomeScreen from "./Screens/General/Home";
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
