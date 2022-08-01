import { ModalWindow } from "./ModalWindow";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalWindowCreate = ({
  active,
  setActive
}) => {
  return (
    <ModalWindow active={active} setActive={setActive}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add new item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="intutTitle">Input</label>
              <input type="text" className="form-control" id="intutTitle" />
            </div>
            <div className="form-group">
              <label htmlFor="formControlTextarea">Description</label>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => console.log(true)}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => console.log(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </ModalWindow>
  );
};
