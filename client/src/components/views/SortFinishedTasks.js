import React from "react";

const SortFinishedTasks = (props) => {
  return (
    <>
      <label htmlFor="finishedTasks">Sort</label>
      <select
        onChange={(e) => props.handleSortSelect(e, "finished")}
        id="finishedTasks"
        name="finishedTasks"
      >
        <option value="earliest">Najwcześniejsze</option>
        <option value="latest">Najpóźniejsze</option>
        <option value="earliestFinished">Najwcześniej ukończone</option>
        <option value="latestFinished">Najpóźniej ukończone</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </>
  );
};

export default SortFinishedTasks;
