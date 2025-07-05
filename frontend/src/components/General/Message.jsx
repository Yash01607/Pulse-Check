import React from "react";

const Message = ({ children, success, error, key }) => {
  return (
    <>
      {error && (
        <div
          key={key || 1}
          className="alert alert-danger alert-dismissible mt-3 pt-3"
        >
          {children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {success && (
        <div
          key={key || 1}
          className="alert alert-success alert-dismissible pt-3 mt-3"
        >
          {children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
};

export default Message;
