import React from "react";
const CurrentTaskList = (props) => {
  let taskList;
  if (props.tasks != undefined) {
    taskList = props.tasks.map((item) => {
      let date = new Date(item.dueDate);
      let dueDate = date.toISOString().slice(0, 10);
      return (
        <li key={item.id}>
          {item.name} - {dueDate} - {item.tags}
          <button onClick={() => props.toggleFinishTask(item.id, 1)}>
            Complete!
          </button>
          <button onClick={() => props.deleteTask(item.id)}>Delete!</button>
          <button>Edit!</button>
        </li>
      );
    });
  }
  return <p>{taskList}</p>;
};

export default CurrentTaskList;
