import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { ViewButton } from "./ViewButton";

export const TableButtons = ({ certificate, onEditClick }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <ViewButton
        id={certificate.id}
        name={certificate.giftCertificateName}
        description={certificate.description}
        price={certificate.price}
        duration = {certificate.duration}
        createDate={certificate.createDate}
        lastUpdateDate={certificate.lastUpdateDate}
        tags={certificate.tags}
      />
      <button
        type="button"
        style={{ fontSize: "12px" }}
        className="btn btn-info"
        onClick={onEditClick}
      >
        Edit
      </button>
      <DeleteButton id={certificate.id} />
    </div>
  );
};
