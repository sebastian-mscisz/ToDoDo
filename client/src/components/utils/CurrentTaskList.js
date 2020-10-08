import React, { useState } from "react";
import SortCurrentTasks from "./SortCurrentTasks";
import { CSSTransition } from "react-transition-group";

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
          return (
            <span className="tasks__item__tags__tag tasks__item__tags__tag--current">
              #{tag}
            </span>
          );
      });
      let date = new Date(item.dueDate);
      let dateNow = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      let dueDate =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      return (
        <CSSTransition
          in={true}
          timeout={300}
          classNames="tasks__visibility"
          unmountOnExit
          appear
        >
          <li key={item.id} className="tasks__item tasks__item--current">
            <div className="tasks__row">
              <div className="tasks__item__name">
                <p className="tasks__item__paragraph">
                  {item.name ? item.name : "*Brak nazwy*"}
                </p>
              </div>
              <div className="tasks__item__date">
                {dateNow - date > oneDay ? (
                  <p className="tasks__item__paragraph">
                    <span className="fas fa-clock"> </span>&nbsp;
                    {dueDate}&nbsp;
                    <span className="tooltip">
                      <span className="tasks__item__late-alert fas fa-exclamation-circle"></span>
                      <span className="tooltip__text">Spóźnione zadanie!</span>
                    </span>
                  </p>
                ) : (
                  <p className="tasks__item__paragraph">
                    <span className="fas fa-clock"> </span>&nbsp;
                    {dueDate}
                  </p>
                )}
              </div>
            </div>
            <div className="tasks__row">
              <div className="tasks__item__tags">{tags}</div>
              <div className="tasks__item__buttons">
                <button
                  className="tasks__icon tasks__icon--current"
                  onClick={() => props.toggleFinishTask(item.id, 1)}
                >
                  <span className="fas fa-check"></span>
                </button>
                <button
                  className="tasks__icon tasks__icon--current"
                  onClick={() => props.deleteTask(item.id)}
                >
                  <span className="fas fa-trash-alt"></span>
                </button>
                <button
                  className="tasks__icon tasks__icon--current"
                  onClick={() => props.handleEditTask(item.id)}
                >
                  <span className="fas fa-edit"></span>
                </button>
              </div>
            </div>
          </li>
        </CSSTransition>
      );
    });
  }
  return (
    <>
      <h2 className="tasks__header" onClick={handleToggleVisibility}>
        Bieżące: {taskList.length}
      </h2>
      <CSSTransition
        in={toggleVisibility}
        timeout={300}
        classNames="tasks__visibility"
        unmountOnExit
      >
        <div className="tasks__container">
          <div className="tasks__sort">
            <SortCurrentTasks handleSortSelect={props.handleSortSelect} />
          </div>
          <ul className="tasks__list">{taskList}</ul>
        </div>
      </CSSTransition>
    </>
  );
};

export default CurrentTaskList;
