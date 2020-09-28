import React from "react";

const SortCurrentTasks = (props) => {
  return (
    <>
      <label className="tasks__sort__label" htmlFor="currentTasks">
        Sortuj po:&nbsp;
      </label>
      <select
        className="tasks__sort__select"
        onChange={(e) => props.handleSortSelect(e, "current")}
        id="currentTasks"
        name="currentTasks"
      >
        <option value="earliest">Najwcześniejsze</option>
        <option value="latest">Najpóźniejsze</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </>
  );
};

export default SortCurrentTasks;
