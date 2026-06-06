"use client";
import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import { headerLinks } from "@/utils/headerLinks";
import HeaderArrowIcon from "../../Icons/HeaderArrowIcon";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';

function DesktopNavbar(props) {
  const [showMenu, setShowMenu] = useState(-1);
  const menuRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setShowMenu(-1)
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])

  const menuItems = headerLinks.map((item, index) => {
    const isOpen = showMenu === index;

    return (
      <Box
        className="link"
        component="li"
        key={index}
        ref={menuRef}
        sx={{ color: "white", display: "block", position: "relative" }}
        onMouseEnter={() => setShowMenu(index)}
        onMouseLeave={() => setShowMenu(-1)}
      >
        <Box
          className="nav-trigger"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {!item.subLinks ? (
            <Link
              href={item.url}
            >
              <Typography component="span" variant="body1" align="center">
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography
              component="span"
              variant="body1"
              align="center"
              className="nav-parent"
            >
              {item.label}
            </Typography>
          )}

          {item.subLinks && (
            <HeaderArrowIcon className={`arrow ${isOpen ? "rotate" : ""}`} />
            // <KeyboardArrowDownRoundedIcon

            // />
          )}
        </Box>

        {item.subLinks && (
          <Paper
            component="ul"
            variant="outlined"
            className="sublinks-container"
            sx={
              {
                gridTemplateColumns: item.gridTemplateColumn || "1fr",
                width: item.width || "auto",
                pointerEvents: isOpen ? 'auto' : 'none',
                transform: isOpen ? 'scaleY(1)' : 'scaleY(0)', 
                opacity: isOpen ? 1 : 0
              }
            }
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link
                  href={subLink.url}
                  passHref
                  onClick={() => setTimeout(() => setShowMenu(-1), 200)}
                >
                  {subLink.graphic && (
                    <Image
                      className="icon-wrapper border-radius-8"
                      src={subLink.graphic}
                      alt={subLink.label}
                      width="48"
                      height="48"
                      quality={100}
                    />
                  )}
                  <div className="label-wrapper">
                    <Typography
                      className="subLink"
                      component="span"
                      variant="subtitle1"
                    >
                      {subLink.label}
                    </Typography>
                    <Typography
                      className="subLink"
                      component="span"
                      variant="body2"
                    >
                      {subLink.subtitle}
                    </Typography>
                  </div>
                </Link>
              </li>
            ))}
          </Paper>
        )}
      </Box>
    );
  });

  return (
    <ElevationScroll {...props}>

    <AppBar
     className="desktop-navbar"
   
      sx={{
        display: { xs: "none", lg: "block" },
        background: "var(--light-surface-container-low)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className={"grid-links-wrapper"} sx={{minHeight: "58px !important"}}>
          {/* Logo */}
          <Link href="/">
                    <Image
          src="/logo.png"
          width={64 *2}
          height={21 * 2}
          alt="Logo"
          style={{ cursor: "pointer" }}
          quality={100}
          priority
          />
          </Link>

          {/* Navigation */}
          <div className="links-wrapper">
            <Box
              component="ul"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                margin: 0,
              }}
            >
              {menuItems}
            </Box>
            <Link href="/">
              <Button size="large" variant="contained">
                GET FREE QUOTE
              </Button>
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
    </ElevationScroll>
  );
}

export default DesktopNavbar;


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
