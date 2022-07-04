import React from "react";

export const EditBtn = (props) => {
  return (
    <div className="button is-small" {...props}>
      <i className="fas fa-edit"></i>
    </div>
  );
};
export const CreateBtn = (props) => {
  return (
    <div className="button is-small is-success" {...props}>
      <i className="fas fa-plus"></i>
    </div>
  );
};

export const DeleteBtn = (props) => {
  return (
    <a className="button is-danger is-light" {...props}>
      Delete
    </a>
  );
};

export const SubmitBtn = (props) => {
  return (
    <div className="button is-info" {...props}>
      Submit
    </div>
  );
};

export const CancelBtn = (props) => {
  return (
    <button className="button" {...props}>
      Cancel
    </button>
  );
};
