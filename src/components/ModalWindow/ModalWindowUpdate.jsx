import { ModalWindow } from "./ModalWindow";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalWindowUpdate = ({active, setActive, duration, onClose}) => {
    return (
        <ModalWindow active={active} setActive={setActive}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Edit certificate with ID = {id}</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <p>Are you sure id={id}</p>
            <p>id={duration}</p>
          </Modal.Body>

          <Modal.Footer>
          <Button variant="primary" onClick={() => onDialog(true)}>Save</Button>
          <Button variant="secondary" onClick={() => onDialog(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal.Dialog>
        </ModalWindow>
    );
};