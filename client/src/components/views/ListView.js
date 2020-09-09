import React from "react";

const ListView = (props) => {
  const taskList = props.tasks.map((item) => (
    <li key={item.id}>
      {item.name} - {item.id}
    </li>
  ));
  return (
    <>
      <p>Lista Tasków</p>
      {taskList}
    </>
  );
};

export default ListView;
