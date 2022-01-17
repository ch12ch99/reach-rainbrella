import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import SignOut from "../account/SignOut";
import { AuthContext } from "../account/AuthContext";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { LevelContext } from "../account/LevelContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import cat from "../cat.gif";
import { getFirestore } from "@firebase/firestore";
import { collection, query, where } from "@firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { doc, updateDoc, getDocs } from "@firebase/firestore";

export const MEOW = {
  meowCount: 1,
};

export const MeowContext = React.createContext({
  meow: MEOW.meowCount,
  setMeow: (newMeow) => {
    this.meow = newMeow;
  },
});

export default function AppMenu() {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext); //利用useContext hook取得AuthContext裡的值
  const meowContext = useContext(MeowContext); //利用useContext hook取得AuthContext裡的值
  const mewoif = authContext.status;
  console.log(mewoif);
  console.log(meowContext);
  const levelContext = useContext(LevelContext);
  const fonttheme = createTheme({
    typography: {
      htmlFontSize: 15,
      // Tell MUI what's the font-size on the html element is.
    },
  });
  const darkTheme = createTheme({
    palette: {
      color: "blue",
      primary: {
        main: "#7D7DFF",
      },
    },
  });

  const meow = async function () {
    const db = getFirestore();
    const auth = getAuth();
    if (auth.currentUser != null) {
      const user = auth.currentUser;
      const u_email = user.email;
      console.log(u_email);
      const accountconn = collection(db, "account");
      const Result = query(accountconn, where("account_Email", "==", u_email));
      const q1 = await getDocs(Result);
      const put_umbrella = [];
      q1.forEach((doc) => {
        put_umbrella.push({
          id: doc.id,
          umbrella_Id: doc.data().umbrella_Id,
        });
      });
      const u_id = put_umbrella[0].id;
      const umbrella_id = put_umbrella[0].umbrella_Id;
      console.log(u_id, umbrella_id);

      if (umbrella_id != 0) {
        const machine_Id = prompt("請輸入您歸還雨傘的機臺");
        console.log(machine_Id);
        const umbrellaconn = collection(db, "umbrella");
        const umbrellaTemp = [];
        const umbrellaQuery = await getDocs(
          query(umbrellaconn, where("umbrella_Id", "==", umbrella_id))
        );
        console.log(umbrellaQuery);
        umbrellaQuery.forEach((doc) => {
          umbrellaTemp.push({
            id: doc.id,
          });
        });
        console.log(umbrellaTemp[0]);
        const random_umbrella_id = umbrellaTemp[0].id;
        await updateDoc(doc(db, "umbrella", random_umbrella_id), {
          machine_Id: machine_Id,
        });
        await updateDoc(doc(db, "account", u_id), {
          umbrella_Id: "0",
        });
        meowContext.setMeow((MEOW.meowCount += 1));
        setOpen(false);
      } else {
        var random = Math.floor(Math.random() * 50);
        alert("喵~".repeat(random));
        meowContext.setMeow((MEOW.meowCount += 1));
        console.log(meowContext);
      }
    } else {
      var random = Math.floor(Math.random() * 50);
      alert("喵~".repeat(random));
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/product" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography>
                  <strong>產品</strong>
                </Typography>
              </ThemeProvider>
            </Button>
          ) : (
            ""
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/account" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography>
                  <strong>用戶</strong>
                </Typography>
              </ThemeProvider>
            </Button>
          ) : (
            ""
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/umbrella" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography>
                  <strong>雨傘</strong>
                </Typography>
              </ThemeProvider>
            </Button>
          ) : (
            ""
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/machine" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography>
                  <strong>機台</strong>
                </Typography>
              </ThemeProvider>
            </Button>
          ) : (
            ""
          )}
          {levelContext.level === "administrator" ? (
            <Button component={Link} to="/renter" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography>
                  <strong>租借雨傘</strong>
                </Typography>
              </ThemeProvider>
            </Button>
          ) : (
            <Button component={Link} to="/renter" color="inherit">
              <ThemeProvider theme={fonttheme}>
                <Typography>
                  <strong>租借雨傘</strong>
                </Typography>
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
            <Avatar sx={{ bgcolor: deepOrange[50] }}>
              <img
                src="https://anitar.dev/get/r"
                width="45"
                height="45"
                alt="Anitar"
              />
            </Avatar> //頭像Avatar 位置有點怪 帶修正
          ) : (
            ""
          )}

          <Button onClick={() => meow()}>
            <ThemeProvider theme={fonttheme}>
              <img src={cat} />
            </ThemeProvider>
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
