import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import SignOut from "../account/SignOut";
import SignIn from "../account/SignIn";
import { AuthContext, STATUS } from "../account/AuthContext";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { LevelContext } from "../account/LevelContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function AppMenu() {
  const authContext = useContext(AuthContext); //利用useContext hook取得AuthContext裡的值
  const levelContext = useContext(LevelContext);
  const fonttheme = createTheme({
    typography: {
      htmlFontSize: 15,
      // Tell MUI what's the font-size on the html element is.
    }
  });
  const darkTheme = createTheme({
    palette: {
      color: "blue",
      primary: {
        main: '#7D7DFF',
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" >
        <Toolbar>
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/product" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>產品</strong></Typography>
              </ThemeProvider>
            </Button>
          ) : (
            ""
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/account" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>用戶</strong></Typography>
              </ThemeProvider>
            </Button>
          ) : (
            ""
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/umbrella" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>雨傘</strong></Typography>
              </ThemeProvider>
            </Button>
          ) : (
            <Button component={Link} to="/umbrella" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>雨傘</strong></Typography>
              </ThemeProvider>
            </Button>
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/machine" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>機台</strong></Typography>
              </ThemeProvider>
            </Button>
          ) : (
            <Button component={Link} to="/machine" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>機台</strong></Typography>
              </ThemeProvider>
            </Button>
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/renter" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>租借雨傘</strong></Typography>
              </ThemeProvider>
            </Button>
          ) : (
            <Button component={Link} to="/renter" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography><strong>租借雨傘</strong></Typography>
              </ThemeProvider>
            </Button>
          )}
          {/* <Button component={Link} to='/admin' color="inherit">admin</Button> //這個我不知道是殺小先註解掉 */}
          {/* <Button component={Link} to='/' color="inherit">index</Button> //這個我不知道是殺小先註解掉 */}
          {authContext.status === "signOut" ? ( //查看預設狀態
            <SignOut />
          ) : (
            ""
          )}
          {authContext.status === "signOut" ? (
            <Avatar sx={{ bgcolor: deepOrange[50] }}><img src="https://anitar.dev/get/r" width="45" height="45" alt="Anitar" /></Avatar> //頭像Avatar 位置有點怪 帶修正
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
