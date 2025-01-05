import React from "react";
import { Form } from "react-bootstrap";

const SearchBox = () => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      className="my-auto position-absolute w-25"
      onSubmit={handleSearchSubmit}
    >
      <div className="input-group">
        <input className="form-control rounded-0 border-end-0 border" />
        <span className="">
          <button
            className="btn btn-outline-secondary bg-white border-start-0 border rounded-0 ms-n5"
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </span>
      </div>
    </Form>
  );
};

export default SearchBox;
