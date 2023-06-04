import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import Tools from "./Tools";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Logo = styled.img`
  margin-right: 10px;
  margin-left: 2rem;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    transition-delay: 0.1s;
    transition-duration: 0.3s;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const [showTools, setShowTools] = useState(false);

  const toggleTools = () => {
    setShowTools(!showTools);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background:
              "linear-gradient(90deg, rgba(48,68,140,1) 0%, rgba(4,78,188,1) 59%, rgba(4,142,192,1) 100%)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <Logo
                src="/src/assets/logo.svg"
                alt="Logo"
                style={{ height: 30 }}
              />
            </Link>
            <Button
              component={Link}
              to="/Tools"
              color="inherit"
              sx={{
                marginLeft: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-outall 0.3s ease-in-out",
                },
              }}
            >
              All Tools
            </Button>
          </Box>
          <Box>
            <Box sx={{ display: { sm: "flex", md: "flex", xs: "none" } }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  marginLeft: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease-in-outall 0.3s ease-in-out",
                  },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{
                  marginLeft: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease-in-outall 0.3s ease-in-out",
                  },
                }}
              >
                About
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{
                  marginLeft: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease-in-outall 0.3s ease-in-out",
                  },
                }}
              >
                Contact
              </Button>
              <Button
                color="inherit"
                href="https://github.com/madani-anes-dev/pfe-ffmpeg"
                target="_blank"
                rel="noopener"
                sx={{
                  marginLeft: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease-in-outall 0.3s ease-in-out",
                  },
                }}
              >
                <GitHubIcon sx={{ margin: 0.5 }} alt="github" />
                GitHub
              </Button>
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                display: { sm: "none" },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-outall 0.3s ease-in-out",
                },
              }}
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* For the mobile menu */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          background:
            "linear-gradient(90deg, rgba(4,78,188,1) 0%, rgba(4,142,192,1) 100%)",
          display: open ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        }}
      >
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            m: 1,
            width: "80%",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={handleToggle}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{
            m: 1,
            width: "80%",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={handleToggle}
        >
          About
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          sx={{
            m: 1,
            width: "80%",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={handleToggle}
        >
          Contact
        </Button>
        <Button
          color="inherit"
          href="https://github.com/madani-anes-dev/pfe-ffmpeg"
          target="_blank"
          rel="noopener"
          sx={{
            m: 1,
            width: "80%",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={handleToggle}
        >
          <GitHubIcon sx={{ margin: 0.5 }} alt="github" />
          GitHub
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
