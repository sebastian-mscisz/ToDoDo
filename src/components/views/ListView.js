import React, { Component } from "react";
import NewTask from "../utils/NewTask";
import EditTask from "../utils/EditTask";
import CurrentTaskList from "../utils/CurrentTaskList";
import FinishedTaskList from "../utils/FinishedTaskList";
import { CSSTransition } from "react-transition-group";

class ListView extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      sortCurrent: "earliest",
      sortFinished: "earliest",
      name: "",
      dueDate: date.toISOString().slice(0, 10),
      tags: [],
      edit: {
        state: false,
        id: null,
        name: "",
        date: "",
        tags: [],
        finished: false,
      },
    };
  }

  // -- for handling task editing cancellation  -- //
  cancelEdit = () => {
    this.setState({
      edit: {
        state: false,
        id: null,
        name: "",
        date: "",
        tags: [],
        finished: false,
      },
    });
  };

  // -- for handling task sorting by name, due date and finish date  -- //
  sortTaskLists = (taskList, value) => {
    switch (value) {
      case "earliest":
        taskList.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        break;
      case "latest":
        taskList.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
        break;
      case "earliestFinished":
        taskList.sort((a, b) => a.finishDate.localeCompare(b.finishDate));
        break;
      case "latestFinished":
        taskList.sort((a, b) => b.finishDate.localeCompare(a.finishDate));
        break;
      case "A-Z":
        taskList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        taskList.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  };

  handleSortSelect = (e, type) => {
    if (type === "current") {
      this.setState({
        sortCurrent: e.target.value,
      });
    } else if (type === "finished") {
      this.setState({
        sortFinished: e.target.value,
      });
    }
  };

  // -- for handling task editing  -- //
  handleEditTask = (id) => {
    const editedTask = this.props.tasks.filter((task) => task.id === id);
    let editedDate;
    if (editedTask[0].finished === 1) {
      editedDate = editedTask[0].finishDate;
    } else {
      editedDate = editedTask[0].dueDate;
    }
    this.setState({
      edit: {
        state: true,
        id: editedTask[0].id,
        name: editedTask[0].name,
        date: editedDate.slice(0, 10),
        tags: editedTask[0].tags.split(","),
        finished: editedTask[0].finished,
      },
    });
  };

  // -- for handling task editing submit -- //
  handleEditSubmit = (e) => {
    e.preventDefault;
    this.props.editTask(
      this.state.edit.id,
      this.state.edit.name,
      this.state.edit.date,
      this.state.edit.tags
    );

    this.cancelEdit();
  };

  // -- function used to handle user changes in inputs, both from adding task and editing  -- //
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "taskNameInput") {
      this.setState({
        name: value,
      });
    } else if (name === "dateDueInput") {
      this.setState({
        dueDate: value,
      });
    } else if (name === "editTaskNameInput") {
      let edit = this.state.edit;
      edit["name"] = value;
      this.setState({
        edit,
      });
    } else if (name === "editTaskDateInput") {
      let edit = this.state.edit;
      edit["date"] = value;
      this.setState({
        edit,
      });
    }
  };

  // -- for handling task adding -- //
  handleAddTask = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.name, this.state.dueDate, this.state.tags);
    const date = new Date();
    this.setState({
      name: "",
      dueDate: date.toISOString().slice(0, 10),
      tags: [],
    });
  };

  // -- for removing a tag from currently created task -- //
  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  // -- for removing a tag from currently edited task -- //
  editRemoveTag = (i) => {
    const newTags = [...this.state.edit.tags];
    newTags.splice(i, 1);
    let edit = this.state.edit;
    edit["tags"] = newTags;
    this.setState({ edit });
  };

  // -- for handling tag adding and deleting from currently created task -- //
  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (
        this.state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase())
      ) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val] });
      e.target.value = null;
    } else if (e.key === "Backspace" && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  };

  // -- for handling tag adding and deleting from currently edited task -- //
  editInputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (
        this.state.edit.tags.find(
          (tag) => tag.toLowerCase() === val.toLowerCase()
        )
      ) {
        return;
      }
      let edit = this.state.edit;
      let editTags = [...this.state.edit.tags, val];
      edit["tags"] = editTags;
      this.setState({ edit });
      e.target.value = null;
    } else if (e.key === "Backspace" && !val) {
      this.editRemoveTag(this.state.edit.tags.length - 1);
    }
  };

  render() {
    let currentTasks = this.props.tasks.filter((task) => task.finished === 0);
    let finishedTasks = this.props.tasks.filter((task) => task.finished === 1);
    this.sortTaskLists(currentTasks, this.state.sortCurrent);
    this.sortTaskLists(finishedTasks, this.state.sortFinished);
    return (
      <div className="list-view">
        <h1 className="list-view__header">Lista zadań</h1>
        {this.state.edit.state && (
          <CSSTransition
            in={this.state.edit.state}
            timeout={300}
            classNames="tasks__visibility"
            appear
          >
            <div className="tasks tasks--edit">
              <EditTask
                handleEditSubmit={this.handleEditSubmit}
                editedTask={this.state.edit}
                editInputKeyDown={this.editInputKeyDown}
                handleInputChange={this.handleInputChange}
                editRemoveTag={this.editRemoveTag}
                cancelEdit={this.cancelEdit}
              />
            </div>
          </CSSTransition>
        )}
        <div className="tasks tasks--add">
          <NewTask
            name={this.state.name}
            dueDate={this.state.dueDate}
            tags={this.state.tags}
            removeTag={this.removeTag}
            inputKeyDown={this.inputKeyDown}
            handleInputChange={this.handleInputChange}
            handleAddTask={this.handleAddTask}
          />
        </div>
        <div className="tasks tasks--current">
          <CurrentTaskList
            tasks={currentTasks}
            deleteTask={this.props.deleteTask}
            toggleFinishTask={this.props.toggleFinishTask}
            handleEditTask={this.handleEditTask}
            handleSortSelect={this.handleSortSelect}
          />
        </div>
        <div className="tasks tasks--finished">
          <FinishedTaskList
            tasks={finishedTasks}
            deleteTask={this.props.deleteTask}
            toggleFinishTask={this.props.toggleFinishTask}
            handleEditTask={this.handleEditTask}
            handleSortSelect={this.handleSortSelect}
          />
        </div>
      </div>
    );
  }
}

export default ListView;
