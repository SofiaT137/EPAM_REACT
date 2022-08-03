import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { ModalWindowCreate } from "././ModalWindow/ModalWindowCreate";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import useData from './../hooks/useData';

export const Header = () => {

  const [modalActive, setModalActive] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [forced, setForced] = useState(false);
  const [pageQty, certificates] = useData(query,page,forced);
  const navigate = useNavigate();

  const closeWindow = async (update) => {
      if(update){
      await new Promise(r => setTimeout(r, 2000));
      setForced(!forced);
      setModalActive(false);
      navigate("/certificates")
    }
    setModalActive(false);
  }

  let login = localStorage.getItem("login");

  function logout() {
    localStorage.removeItem("login");
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Admin UI</Navbar.Brand>
        <Nav className="me-auto">
          {" "}
          {login ? (
            <>
              <Button variant="primary" onClick={() => setModalActive(true)}>
                Add new
              </Button>
            </>
          ) : (
            <></>
          )}
        </Nav>
        <Nav className="ms-auto">
          {" "}
          {login ? (
            <>
              <NavDropdown title={login}>
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <></>
          )}
        </Nav>
      </Container>
      < ModalWindowCreate active={modalActive} setActive={setModalActive} onClose={closeWindow}/>
      </Navbar>
  );
};
