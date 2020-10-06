import React from "react";

const SortFinishedTasks = (props) => {
  return (
    <>
      <label className="tasks__sort__label" htmlFor="finishedTasks">
        Sortuj po:&nbsp;
      </label>
      <select
        className="tasks__sort__select tasks__sort__select--finished"
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
