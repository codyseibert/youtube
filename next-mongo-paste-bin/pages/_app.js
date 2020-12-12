import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar } from "react-bootstrap";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar className="mb-4" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          Paste Bucket
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Button href="/create" variant="primary">
            + Create Snippet
          </Button>
        </Nav>
      </Navbar>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
