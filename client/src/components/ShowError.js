import React from "react";
import  Container  from "../components/Container";
// import Jumbotron from "../components/Jumbotron";

function ShowError({message, page}) {
  return (
    <Container>

      <h1 className={page==="signup" ? "text-white" : "text-danger"}>{message}</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
   
    </Container>
  );
}

export default ShowError;
