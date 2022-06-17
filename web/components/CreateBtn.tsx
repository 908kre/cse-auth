import React from "react";

export default function CreateBtn(props) {
  return (
    <div className="button is-small is-success" {...props}>
      <i className="fas fa-plus"></i>
    </div>
  );
}