import React from "react";
import { Helmet } from "react-helmet";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import ButtonFilled from "./components/ButtonFilled";
import ButtonOutline from "./components/ButtonOutline";
import Input from "./components/Input";
import Link from "./components/Link";
import LinkIcon from "./components/LinkIcon";
import Column from "./components/Column";
import SignUp from "./SignUp";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Row from "./components/Row";
import LogIn from "./LogIn";
import { useTheme } from "emotion-theming";
import { Theme } from "./Theme";

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
    }
  }
`;

const App: React.FC = () => {
  const theme = useTheme<Theme>();
  const [isOpenSignUp, setIsOpenSignUp] = React.useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);
  function logout() {
    localStorage.removeItem("token");
    refetch();
  }
  function onLogInSuccess(token: string) {
    localStorage.setItem("token", token);
    setIsOpenLogIn(false);
    refetch();
  }
  function onSignUpSuccess(token: string) {
    localStorage.setItem("token", token);
    setIsOpenSignUp(false);
    refetch();
  }
  return (
    <Column css={{ backgroundColor: "lightgrey", minHeight: "100vh" }}>
      <Helmet>
        <title>Online Courses - Learn Anything, Anywhere | Udemy</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.udemy.com/staticx/udemy/images/v6/favicon-196x196.png"
          sizes="196x196"
        ></link>
      </Helmet>
      <Column
        css={{
          backgroundColor: "white",
          height: "64px",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          padding: "10px 20px",
          boxSizing: "border-box"
        }}
      >
        <Column css={{ marginRight: "16px" }}>
          <img
            src="https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg"
            alt="Udemy"
            width="110"
            height="100%"
            data-purpose="udemy-brand-logo"
          ></img>
        </Column>
        <Row
          css={{
            flexGrow: 1,
            alignItems: "stretch",
            backgroundColor: "#f2f3f5",
            border: "1px solid transparent",
            borderRadius: "2px",
            boxSizing: "border-box",
            "&:focus-within": {
              border: "1px solid #686f7a",
              backgroundColor: "transparent"
            }
          }}
        >
          <Input
            placeholder="Search for anything"
            css={{
              padding: "10px 12px",
              boxSizing: "border-box",
              fontSize: "14px",
              flexGrow: 1,
              border: 0,
              backgroundColor: "transparent"
            }}
          />
          <Column
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "stretch",
              color: theme.colors.primary,
              "&:hover": {
                color: "white",
                backgroundColor: theme.colors.primary
              },
              padding: "0 14px"
            }}
          >
            <FaSearch size={"1em"} />
          </Column>
        </Row>
        <Link css={{ marginLeft: "15px" }}>Teams and Enterprises</Link>
        <Link css={{ marginLeft: "3px" }}>Teach on Udemy</Link>
        <LinkIcon css={{ margin: "0 12px" }}>
          <FaShoppingCart size={"1.1em"} />
        </LinkIcon>
        {!loading && !error && !data.currentUser && (
          <Row>
            <ButtonOutline
              css={{ marginLeft: "4px" }}
              onClick={setIsOpenLogIn.bind(null, true)}
            >
              Log In
            </ButtonOutline>
            <ButtonFilled
              css={{ marginLeft: "4px" }}
              onClick={setIsOpenSignUp.bind(null, true)}
            >
              Sign Up
            </ButtonFilled>
          </Row>
        )}
        {!loading && !error && data.currentUser && (
          <Row css={{ alignItems: "center" }}>
            {data.currentUser.name}
            <ButtonFilled css={{ marginLeft: "12px" }} onClick={logout}>
              Log Out
            </ButtonFilled>
          </Row>
        )}
      </Column>
      {isOpenSignUp && (
        <SignUp
          onClose={setIsOpenSignUp.bind(null, false)}
          onSuccess={onSignUpSuccess}
        />
      )}
      {isOpenLogIn && (
        <LogIn
          onClose={setIsOpenLogIn.bind(null, false)}
          onSuccess={onLogInSuccess}
        />
      )}
    </Column>
  );
};

export default App;
