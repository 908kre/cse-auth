import React from "react";
import { SubmitBtn, CancelBtn } from "@csea/web/components/buttons";

export const ConfirmModal = (props: {
  isActive?: boolean;
  message?: string;
  title?: string;
  onSubmit?: VoidFunction;
  onClose?: VoidFunction;
}) => {
  return (
    <div className={`modal ${props.isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={props.onClose} />
      <div
        style={{
          position: "relative",
          overflow: "scroll",
        }}
      >
        <div className="modal-card">
          <header className="modal-card-head">{props.title}</header>
          <section className="modal-card-body">{props.message}</section>
          <footer
            className="modal-card-foot"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <SubmitBtn
              onClick={() => {
                props.onSubmit?.();
                props.onClose?.();
              }}
            />
            <CancelBtn onClick={() => props.onClose?.()} />
          </footer>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.onClose}
      />
    </div>
  );
};
