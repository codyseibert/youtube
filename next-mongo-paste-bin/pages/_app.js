import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import {
  Container,
  Button,
  Navbar,
  Nav,
  Row,
  Col,
} from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Paste Bucket</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Button
            href="/create-snippet"
            variant="outline-info"
          >
            Create a Snippet
          </Button>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyApp;
