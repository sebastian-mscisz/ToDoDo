import React, { useState } from "react";
import SortCurrentTasks from "./SortCurrentTasks";

const CurrentTaskList = (props) => {
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
      let date = new Date(item.dueDate);
      let dueDate =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      return (
        <li className="tasks__item" key={item.id}>
          <div className="tasks__row">
            <div className="tasks__item__name">
              <p className="tasks__item__paragraph">
                {item.name ? item.name : "*Brak nazwy*"}
              </p>
            </div>
            <div className="tasks__item__date">
              <p className="tasks__item__paragraph">
                <span className="fas fa-clock"> </span>&nbsp;
                {dueDate}
              </p>
            </div>
          </div>
          <div className="tasks__row">
            <div className="tasks__item__tags">{tags}</div>
            <div className="tasks__item__buttons">
              <button
                className="tasks__icon"
                onClick={() => props.toggleFinishTask(item.id, 1)}
              >
                <span className="fas fa-check"></span>
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
        Bieżące: {taskList.length}
      </h2>
      {toggleVisibility && (
        <div className="tasks__container">
          <div className="tasks__sort">
            <SortCurrentTasks handleSortSelect={props.handleSortSelect} />
          </div>
          <ul className="tasks__list">{taskList}</ul>
        </div>
      )}
    </>
  );
};

export default CurrentTaskList;
