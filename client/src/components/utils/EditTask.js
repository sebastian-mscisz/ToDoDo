import React from "react";
const EditTask = (props) => {
  return (
    <>
      <h2 className="tasks__header">Edytuj zadanie</h2>
      <div className="tasks__container">
        <form
          id="edit-task"
          className="tasks__form"
          onSubmit={props.handleEditSubmit}
        >
          <div className="tasks__row">
            <label className="tasks__label" htmlFor="editDateId">
              Nazwa:
            </label>
            <input
              className="tasks__input"
              onChange={props.handleInputChange}
              type="text"
              name="editTaskNameInput"
              id="editTaskId"
              value={props.editedTask.name}
            />
          </div>
          <div className="tasks__row">
            <label className="tasks__label" htmlFor="editDateId">
              Termin:
            </label>
            <input
              className="tasks__input"
              onChange={props.handleInputChange}
              type="date"
              name="editTaskDateInput"
              id="editDateId"
              value={props.editedTask.date}
            />
          </div>
        </form>
        <div className="tasks__row">
          <div className="input-tag">
            <ul className="input-tag__tags input-tag__tags--edit">
              {props.editedTask.tags.map((tag, i) => {
                if (tag != "") {
                  return (
                    <li
                      className="input-tag__tags__tag input-tag__tags__tag--edit"
                      key={tag}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          props.editRemoveTag(i);
                        }}
                      >
                        +
                      </button>
                    </li>
                  );
                }
              })}
              <li className="input-tag__tags__input">
                <input
                  className="input-tag__input"
                  type="text"
                  placeholder="Tagi..."
                  onKeyDown={props.editInputKeyDown}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="tasks__row">
          <button
            className="tasks__button tasks__button--edit"
            type="submit"
            form="edit-task"
          >
            Zatwierdź!
          </button>
          <button
            className="tasks__button tasks__button--edit"
            onClick={props.cancelEdit}
          >
            Anuluj!
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTask;
