import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

const newTask = (props) => {
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const handleToggleVisibility = () => {
    setToggleVisibility((prevValue) => !prevValue);
  };

  return (
    <>
      <h2 className="tasks__header" onClick={handleToggleVisibility}>
        Nowe zadanie <span className="fas fa-plus"></span>
      </h2>
      <CSSTransition
        in={toggleVisibility}
        timeout={300}
        classNames="tasks__visibility"
        unmountOnExit
      >
        <div className="tasks__container">
          <form
            id="new-task"
            className="tasks__form"
            onSubmit={props.handleAddTask}
          >
            <div className="tasks__row">
              <input
                className="tasks__input"
                onChange={props.handleInputChange}
                type="text"
                name="taskNameInput"
                id="taskId"
                placeholder="Nazwa"
                value={props.name}
              />
            </div>
            <div className="tasks__row">
              <label className="tasks__label" htmlFor="dateDueId">
                Termin:
              </label>
              <input
                className="tasks__input"
                onChange={props.handleInputChange}
                type="date"
                name="dateDueInput"
                id="dateDueId"
                value={props.dueDate}
              />
            </div>
          </form>
          <div className="tasks__row">
            <div className="input-tag">
              <ul className="input-tag__tags input-tag__tags--add">
                {props.tags.map((tag, i) => (
                  <li
                    className="input-tag__tags__tag input-tag__tags__tag--add"
                    key={tag}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        props.removeTag(i);
                      }}
                    >
                      +
                    </button>
                  </li>
                ))}
                <li className="input-tag__tags__input">
                  <input
                    className="input-tag__input"
                    type="text"
                    placeholder="Tagi..."
                    onKeyDown={props.inputKeyDown}
                  />
                </li>
              </ul>
            </div>
          </div>
          <button className="tasks__button" type="submit" form="new-task">
            Dodaj!
          </button>
        </div>
      </CSSTransition>
    </>
  );
};

export default newTask;
