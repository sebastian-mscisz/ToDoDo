import React from "react";
const EditTask = (props) => {
  return (
    <>
      <div style={{ border: "1px solid black" }}>
        <form onSubmit={props.handleEditSubmit}>
          <label className="form-check-label" htmlFor="editTaskId">
            Nazwa:
          </label>
          <input
            onChange={props.handleInputChange}
            type="text"
            name="editTaskNameInput"
            id="editTaskId"
            value={props.editedTask.name}
          />
          <label className="form-check-label" htmlFor="editDateId">
            Termin:
          </label>
          <input
            onChange={props.handleInputChange}
            type="date"
            name="editTaskDateInput"
            id="editDateId"
            value={props.editedTask.date}
          />
          <label className="form-check-label" htmlFor="tagsId">
            Tags
          </label>

          <button type="submit">Zatwierdź!</button>
        </form>
        <button onClick={props.cancelEdit}>Anuluj!</button>
        <div className="input-tag">
          <ul className="input-tag__tags">
            {props.editedTask.tags.map((tag, i) => (
              <li key={tag}>
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
            ))}
            <li className="input-tag__tags__input">
              <input type="text" onKeyDown={props.editInputKeyDown} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default EditTask;
