import React, { Component } from "react";
import NewTask from "./NewTask";
import EditTask from "./EditTask";
import CurrentTaskList from "./CurrentTaskList";
import FinishedTaskList from "./FinishedTaskList";

class ListView extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      name: "",
      dueDate: date.toISOString().slice(0, 10),
      tags: ["Tags", "Input"],
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

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  editRemoveTag = (i) => {
    const newTags = [...this.state.edit.tags];
    newTags.splice(i, 1);
    let edit = this.state.edit;
    edit["tags"] = newTags;
    this.setState({ edit });
  };

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
    const currentTasks = this.props.tasks.filter((task) => task.finished === 0);
    const finishedTasks = this.props.tasks.filter(
      (task) => task.finished === 1
    );
    let edit;
    if (this.state.edit.state === true) {
      edit = (
        <EditTask
          handleEditSubmit={this.handleEditSubmit}
          editedTask={this.state.edit}
          editInputKeyDown={this.editInputKeyDown}
          handleInputChange={this.handleInputChange}
          editRemoveTag={this.editRemoveTag}
          cancelEdit={this.cancelEdit}
        />
      );
    }
    return (
      <>
        {edit}
        <p>Dodaj task'a</p>
        <NewTask
          name={this.state.name}
          dueDate={this.state.dueDate}
          tags={this.state.tags}
          removeTag={this.removeTag}
          inputKeyDown={this.inputKeyDown}
          handleInputChange={this.handleInputChange}
          handleAddTask={this.handleAddTask}
        />
        <p>Lista Tasków</p>
        <p>Bieżące</p>
        <CurrentTaskList
          tasks={currentTasks}
          deleteTask={this.props.deleteTask}
          toggleFinishTask={this.props.toggleFinishTask}
          handleEditTask={this.handleEditTask}
        />
        <p>Skończone</p>
        <FinishedTaskList
          tasks={finishedTasks}
          deleteTask={this.props.deleteTask}
          toggleFinishTask={this.props.toggleFinishTask}
          handleEditTask={this.handleEditTask}
        />
      </>
    );
  }
}

export default ListView;
