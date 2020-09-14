import React from "react";
const FinishedTaskList = (props) => {
  let taskList;
  if (props.tasks != undefined) {
    taskList = props.tasks.map((item) => {
      let date = new Date(item.finishDate);
      let finishDate = date.toISOString().slice(0, 10);
      let finishTime =
        date.getHours() + 2 + ":" + date.getMinutes() + ":" + date.getSeconds();
      return (
        <li key={item.id}>
          {item.name} - {finishDate} - {finishTime} - {item.tags}
          <button onClick={() => props.toggleFinishTask(item.id, 0)}>
            Uncomplete!
          </button>
          <button onClick={() => props.deleteTask(item.id)}>Delete!</button>
          <button>Edit!</button>
        </li>
      );
    });
  }
  return <p>{taskList}</p>;
};

export default FinishedTaskList;
