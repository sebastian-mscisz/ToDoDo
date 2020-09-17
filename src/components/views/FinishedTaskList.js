import React from "react";
const FinishedTaskList = (props) => {
  let taskList;
  if (props.tasks != undefined) {
    taskList = props.tasks.map((item) => {
      let finishDate = new Date(item.finishDate);
      let dueDate = new Date(item.dueDate);
      let finishTime =
        finishDate.getHours() +
        ":" +
        finishDate.getMinutes() +
        ":" +
        finishDate.getSeconds();
      dueDate =
        dueDate.getFullYear() +
        "-" +
        (dueDate.getMonth() + 1) +
        "-" +
        dueDate.getDate();
      finishDate =
        finishDate.getFullYear() +
        "-" +
        (finishDate.getMonth() + 1) +
        "-" +
        finishDate.getDate();
      return (
        <li key={item.id}>
          {item.name} - Due: {dueDate} / Finished: {finishDate} - {finishTime} -{" "}
          {item.tags}
          <button onClick={() => props.toggleFinishTask(item.id, 0)}>
            Uncomplete!
          </button>
          <button onClick={() => props.deleteTask(item.id)}>Delete!</button>
          <button onClick={() => props.handleEditTask(item.id)}>Edit!</button>
        </li>
      );
    });
  }
  return <p>{taskList}</p>;
};

export default FinishedTaskList;
