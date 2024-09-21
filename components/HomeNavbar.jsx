"use client";
import React, { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, path) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    if (path) {
      router.push(path);
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between sticky top-0 z-50 drop-shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-2xl  cursor-pointer">
          <Image
            className="h-10 inline mx-4"
            src="/logo.png" // If the logo is in the 'public' folder
            alt="Logo"
            width={40} // Set your desired width
            height={40} // Set your desired height
          />
          {/* <img className="h-10 inline" src={Logo} alt="logo" /> */}
          <a onClick={() => router.push("/")}>Glimmer</a>
        </span>

        <span
          className="text-3xl cursor-pointer mx-2 md:hidden block"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </span>
      </div>

      <ul
        className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 ${
          isMenuOpen ? "top-[80px] opacity-100" : "top-[-400px] opacity-0"
        }`}
      >
        <li className="mx-4 my-6 md:my-0">
          <button
            onClick={() => router.push("/")}
            className="text-xl hover:text-pink-400 duration-100"
          >
            HOME
          </button>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <button
            onClick={() => router.push("/women")}
            className="text-xl hover:text-pink-400 duration-100"
          >
            WOMEN
          </button>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <button
            onClick={() => router.push("/men")}
            className="text-xl hover:text-pink-400 duration-100"
          >
            MEN
          </button>
        </li>

        {/* <Dropdown/> */}
        <Stack direction="row" spacing={2}>
          <div>
            <button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className="bg-pink-400 text-white px-6 py-2 mx-4 hover:bg-pink-300 rounded"
            >
              Account
            </button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={(event) => handleClose(event, "/shop")}
                        >
                          My shop
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => handleClose(event, "/account")}
                        >
                          My account
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
      </ul>
    </nav>
  );
};

export default HomeNavbar;