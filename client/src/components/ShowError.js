import React from "react";
import  Container  from "../components/Container";
// import Jumbotron from "../components/Jumbotron";

function ShowError({message}) {
  return (
    <Container>
      {/* <Row>
        <Col size="md-12"> */}
          {/* <Jumbotron> */}
      <h1>{message}</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          {/* </Jumbotron> */}
        {/* </Col>
      </Row> */}
    </Container>
  );
}

export default ShowError;
