import { ModalWindow } from "./ModalWindow";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ModalWindowCreate = ({ active, setActive, onClose }) => {

  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);


  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    onClose(true)
    sentSaveItemRequest();
  };

  const sentSaveItemRequest = async () => {
    const giftCertificateName = document.querySelector("#giftCertificateName");
    const description = document.querySelector('#description');
    const price = document.querySelector("#price");
    const duration = document.querySelector("#duration");

    const reqBody = {
      giftCertificateName: giftCertificateName.value,
      description: description.value,
      price: price.value,
      duration: duration.value
    };

    let headers = new Headers();
    console.log(reqBody)
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer_" + localStorage.getItem("token"));

    const response = await fetch(
      "http://localhost:8085/module2/gift_certificates",
      {
        headers,
        method: "post",
        body: JSON.stringify(reqBody),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      console.log("Saved!");
    } else {
      setError(data.exceptionMessage);
    }
  };

  return (
    <ModalWindow active={active} setActive={setActive}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add new certificate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
              <label htmlFor="giftCertificateName">Name</label>
              <input
                type="text"
                className="form-control"
                id="giftCertificateName"
                {...register("giftCertificateName", {
                  required: "Name cannot be empty!",
                  minLength: {
                    value: 6,
                    message: "Minimum name length is 6",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum name length is 30",
                  },
                })}
              />
            </div>
            <div className="errorMSG">
              {errors?.giftCertificateName && (
                <p>{errors?.giftCertificateName?.message || "Error!"}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="2"
                {...register("description", {
                  required: "Description cannot be empty!",
                  minLength: {
                    value: 12,
                    message: "Minimum description length is 12",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Maximum description length is 1000",
                  },
                })}
              ></textarea>
            </div>
              <div className="errorMSG">
              {errors?.description && (
                <p>{errors?.description?.message || "Error!"}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                {...register("price", {
                  required: "Price cannot be empty!",
                  min: {
                    value: 1.0,
                    message: "Minimum price is 1.0",
                  },
                })}
              />
            </div>
            <div className="errorMSG">
              {errors?.price && (
                <p>{errors?.price?.message || "Error!"}</p>
              )}
              </div>
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                {...register("duration", {
                  required: "Duration cannot be empty!",
                  min: {
                    value: 1,
                    message: "Minimum duration is 1",
                  },
                })}
              />
            </div>
            <div className="errorMSG">
              {errors?.duration && (
                <p>{errors?.duration?.message || "Error!"}</p>
              )}
              </div>
            <div>
              <label>Tags</label>
              <TagsInput
                value={selected}
                onChange={setSelected}
                placeHolder="enter certificate tags"
              />
            </div>
            <div className="buttonGroup">
              <Button variant="primary" type="submit" disabled={!isValid}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => onClose(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </ModalWindow>
  );
};
