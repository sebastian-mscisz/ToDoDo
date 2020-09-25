import React from "react";

const SortCurrentTasks = (props) => {
  return (
    <>
      <label htmlFor="currentTasks">Sort</label>
      <select
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
