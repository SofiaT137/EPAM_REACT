import { useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { ModalWindowDelete } from "./../ModalWindow/ModalWindowDelete";
import useData from "./../../hooks/useData";

export const DeleteButton = ({id}) => {

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [forced, setForced] = useState(false);

    const [pageQty, certificates] = useData(query, page, forced);

    const [modalDelete, setModalDelete] = useState(false);
    const BASE_URL = "http://localhost:8085/module2/gift_certificates/";

    const areUSureDelete = (choose) => {
        const headers = {
          Authorization: "Bearer_" + localStorage.getItem("token"),
        };
        if (choose) {
          axios
            .delete(BASE_URL + id, { headers })
            .then((response) => console.log(response.status))
            .catch((error) => {
              console.error("There was an error!", error);
            });
          setModalDelete(false);
          setForced(!forced);
        } else {
          setModalDelete(false);
        }
      };

    const handleDelete = () => {
        setModalDelete(true);
    }

    return (<>
    <Button title="Delete" className="btn-light" onClick={handleDelete}></Button>
    <ModalWindowDelete
        active={modalDelete}
        setActive={setModalDelete}
        certificateId={id}
        onDialog={areUSureDelete}
      />
    </>)
}