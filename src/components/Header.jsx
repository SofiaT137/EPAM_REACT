import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { ModalWindow } from "./ModalWindow";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export const Header = () => {
  const [modalActive, setModalActive] = useState(false);

  const navigate = useNavigate();

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
      <ModalWindow active={modalActive} setActive={setModalActive}>
      <h3 id="form__head" className="mb-3">Add new item</h3>
        <form>
          <div className="form-group">
            <label htmlFor="intutTitle">Input</label>
            <input type="text" className="form-control" id="intutTitle" />
          </div>
          <div className="form-group">
            <label htmlFor="formControlTextarea">
              Description
            </label>
            <textarea
              className="form-control"
              id="formControlTextarea"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input type="number" className="form-control" id="duration" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" className="form-control" id="price" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalWindow>
    </Navbar>
  );
};
