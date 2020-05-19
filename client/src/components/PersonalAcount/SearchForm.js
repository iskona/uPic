import React from "react";
import "../../Style/NavBar.css"

function SearchForm() {
  return (
    <div className="searchbox d-flex justify-content-center">
      <form className="form-inline">
      <input
          className="form-control mr-sm-2 navBarSearch my-lg-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
        
        />
       
      </form>
    </div>
  );
}
export default SearchForm;