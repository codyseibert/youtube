import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AppStateContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [appState, setAppState] = useState({
    isAdmin: true,
    successText: "",
    password: "123456",
  });

  const [searchText, setSearchText] = useState();

  return (
    <AppStateContext.Provider value={[appState, setAppState]}>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand href="/">Web Dev Junkie</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="/">Posts</Nav.Link>
          {appState.isAdmin && (
            <Nav.Link href="/admin">Admin Dashboard</Nav.Link>
          )}
        </Nav>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?title=${searchText}`);
          }}
          inline
        >
          <FormControl
            type="text"
            placeholder="Search by keywords"
            className="mr-sm-2"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="submit" variant="outline-info">
            Search
          </Button>
        </Form>
      </Navbar>

      <Component {...pageProps} />
    </AppStateContext.Provider>
  );
}

export default MyApp;
