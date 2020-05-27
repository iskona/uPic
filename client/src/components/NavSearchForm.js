import React, {  useState, useRef, useEffect } from "react";
import "../Style/NavBar.css"
import { Redirect } from "react-router-dom";

function NavSearchForm() {
  
  const inputRef = useRef();
 
  const [searchOn, setSearchOn] =  useState(false)
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(()=>{
    console.log("Welcome")
    //setSearchOn(false)
  });

  const serchForAcategory = (event) => {
    event.preventDefault();
    console.log("clicked")
    console.log('status '+inputRef.current.value);
    console.log("search on value "+searchOn);
    setSearchInput(inputRef.current.value.toLowerCase())
     setSearchOn(true);
  }
  return (
    <>
    <div className="searchbox d-flex justify-content-center">
      <form className="form-inline">
        <div className="input-group mx-4 ">
          <input
            className="form-control navBarSearch my-lg-0"
             ref={inputRef}
            // value={searchInput}
            // onChange={onChangeHandler}
            type="search"
            placeholder="Seach for any category"
            aria-label="Search"
          />
          <div className="input-group-append">
            <span className="input-group-text"><i className='fas fa-search' onClick={serchForAcategory}></i></span>
          </div>
        </div>
      </form>
    </div>
    {searchOn && <Redirect to={{
                pathname: '/search',
                state: { searchVal: searchInput }
            }}
            />}
    </>
  );
}
export default NavSearchForm;