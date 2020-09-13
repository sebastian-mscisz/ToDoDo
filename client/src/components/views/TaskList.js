import React from "react";
const TaskList = (props) => {
  let taskList;
  if (props.tasks != undefined) {
    taskList = props.tasks.map((item) => (
      <li key={item.id}>
        {item.name} - {item.id}
      </li>
    ));
  }
  return <p>{taskList}</p>;
};

export default TaskList;
