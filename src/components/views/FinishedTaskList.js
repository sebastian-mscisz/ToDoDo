import React, { useState } from "react";
import SortFinishedTasks from "./SortFinishedTasks";

const FinishedTaskList = (props) => {
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const handleToggleVisibility = () => {
    setToggleVisibility((prevValue) => !prevValue);
  };

  let taskList;
  if (props.tasks != undefined) {
    taskList = props.tasks.map((item) => {
      let tags = item.tags.split(",").map((tag) => {
        if (tag != "")
          return <span className="tasks__item__tags__tag">#{tag}</span>;
      });
      let finishDate = new Date(item.finishDate);
      let dueDate = new Date(item.dueDate);
      let finishTime = finishDate.getHours() + ":" + finishDate.getMinutes();
      dueDate =
        dueDate.getDate() +
        "-" +
        (dueDate.getMonth() + 1) +
        "-" +
        dueDate.getFullYear();
      finishDate =
        finishDate.getDate() +
        "-" +
        (finishDate.getMonth() + 1) +
        "-" +
        finishDate.getFullYear();
      return (
        <li className="tasks__item" key={item.id}>
          <div className="tasks__row">
            <div className="tasks__item__name">
              <p className="tasks__item__paragraph">
                {item.name ? item.name : "*Brak nazwy*"}
              </p>
              <p className="tasks__item__paragraph tasks__item__paragraph--finish-date">
                Skończono {finishDate} o {finishTime}
              </p>
            </div>
            <div className="tasks__item__date">
              <p className="tasks__item__paragraph">
                <span className="fas fa-clock"></span>&nbsp;
                {dueDate}
              </p>
            </div>
          </div>
          <div className="tasks__row">
            <div className="tasks__item__tags">{tags}</div>
            <div className="tasks__item__buttons">
              <button
                className="tasks__icon"
                onClick={() => props.toggleFinishTask(item.id, 0)}
              >
                <span className="fas fa-undo"></span>
              </button>
              <button
                className="tasks__icon"
                onClick={() => props.deleteTask(item.id)}
              >
                <span className="fas fa-trash-alt"></span>
              </button>
              <button
                className="tasks__icon"
                onClick={() => props.handleEditTask(item.id)}
              >
                <span className="fas fa-edit"></span>
              </button>
            </div>
          </div>
        </li>
      );
    });
  }
  return (
    <>
      <h2 className="tasks__header" onClick={handleToggleVisibility}>
        Skończone: {taskList.length}
      </h2>
      {toggleVisibility && (
        <div className="tasks__container">
          <div className="tasks__sort">
            <SortFinishedTasks handleSortSelect={props.handleSortSelect} />
          </div>
          <ul className="tasks__list">{taskList}</ul>
        </div>
      )}
    </>
  );
};

export default FinishedTaskList;
