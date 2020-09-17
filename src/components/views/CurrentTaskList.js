import React from "react";
const CurrentTaskList = (props) => {
  let taskList;
  if (props.tasks != undefined) {
    taskList = props.tasks.map((item) => {
      let date = new Date(item.dueDate);
      let dueDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      return (
        <li key={item.id}>
          {item.name} - Due date:{dueDate} - {item.tags}
          <button onClick={() => props.toggleFinishTask(item.id, 1)}>
            Complete!
          </button>
          <button onClick={() => props.deleteTask(item.id)}>Delete!</button>
          <button onClick={() => props.handleEditTask(item.id)}>Edit!</button>
        </li>
      );
    });
  }
  return <p>{taskList}</p>;
};

export default CurrentTaskList;
