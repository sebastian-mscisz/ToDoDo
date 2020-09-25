import React, { useState } from "react";

const newTask = (props) => {
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const handleToggleVisibility = () => {
    setToggleVisibility((prevValue) => !prevValue);
  };

  return (
    <>
      <p onClick={handleToggleVisibility}>Dodaj task'a</p>
      {toggleVisibility && (
        <div>
          <form onSubmit={props.handleAddTask}>
            <label className="form-check-label" htmlFor="taskId">
              Nazwa:
            </label>
            <input
              onChange={props.handleInputChange}
              type="text"
              name="taskNameInput"
              id="taskId"
              value={props.name}
            />
            <label className="form-check-label" htmlFor="dateDueId">
              Termin:
            </label>
            <input
              onChange={props.handleInputChange}
              type="date"
              name="dateDueInput"
              id="dateDueId"
              value={props.dueDate}
            />
            <label className="form-check-label" htmlFor="tagsId">
              Tags
            </label>

            <button type="submit">Dodaj!</button>
          </form>
          <div className="input-tag">
            <ul className="input-tag__tags">
              {props.tags.map((tag, i) => (
                <li key={tag}>
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
                <input type="text" onKeyDown={props.inputKeyDown} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default newTask;
