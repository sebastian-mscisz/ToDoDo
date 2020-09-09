import React from "react";
import RegisterSuccess from "./RegisterSuccess";

const RegisterView = () => {
  let registerSuccess = false;
  let content;
  if (registerSuccess === false) {
    content = (
      <>
        <p>Zarejestruj</p> <button>Zarejestruj!</button>
      </>
    );
  } else if (registerSuccess === true) {
    content = (
      <>
        <RegisterSuccess />
      </>
    );
  }
  return <>{content}</>;
};

export default RegisterView;
