import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  CssBaseline,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import logo from "./images.jpeg";

import NotFound from "./NotFound.jsx";
import styles from "./App.module.css";
import { AuthContext } from "./AuthProvider.jsx";
import { useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);

    return (
      <>
        <AppBar
  position="static"
  sx={{
    backgroundColor: "linear-gradient(90deg, #003973 0%, #E5E5BE 100%)",  
    boxShadow: 3,
  }}
>

{/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <img
    src={logo}
    alt="Logo"
    style={{ width: 40, height: 40, borderRadius: 4 }}
  />

  <Typography
    variant="h6"
    component="div"
    sx={{ fontWeight: "bold", fontSize: "1.4rem", color: "white" }}
  >
    Revature
  </Typography>
</Box> */}


          <Toolbar sx={{ justifyContent: "space-between" }}>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <img
    src={logo}
    alt="Logo"
    style={{ width: 40, height: 40, borderRadius: 4 }}
  />

  <Typography
    variant="h6"
    component="div"
    sx={{ fontWeight: "bold", fontSize: "1.4rem", color: "white" }}
  >
    Revature
  </Typography>
</Box>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
             
              <Tooltip
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <IconButton
                  onClick={() => setDarkMode((prev) => !prev)}
                  sx={{
                    color: darkMode ? "#FFD700" : "inherit",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>

              
              {isLogged ? (
                <>
                  <Button
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="outlined"
                  >
                    Home
                  </Button>

                  <Button
                    component={Link}
                    to="/about"
                    color="inherit"
                    variant="outlined"
                  >
                    About
                  </Button>

                  <Button
                    component={Link}
                    to="/does-not-exist"
                    color="inherit"
                    variant="outlined"
                  >
                    404 Test
                  </Button>

                  <Button
                    onClick={logout}
                    color="error"
                    variant="contained"
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "25px",
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={login}
                  variant="contained"
                  color="success"
                  sx={{
                    fontWeight: "bold",
                    borderRadius: "25px",
                  }}
                >
                  Login with ServiceNow
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <Container
  maxWidth={false}      
  disableGutters       
  sx={{
    mt: 10,
    px: 0,
    py: 0,
    width: "100%",     
    minHeight: "100vh",
  }}
>
  <Outlet />
</Container>

      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
