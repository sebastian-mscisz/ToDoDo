import React, { Component } from "react";
import NewTask from "./NewTask";
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
    };
  }

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

  render() {
    const currentTasks = this.props.tasks.filter((task) => task.finished === 0);
    const finishedTasks = this.props.tasks.filter(
      (task) => task.finished === 1
    );
    return (
      <>
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
        <CurrentTaskList
          tasks={currentTasks}
          deleteTask={this.props.deleteTask}
          toggleFinishTask={this.props.toggleFinishTask}
        />
        <FinishedTaskList
          tasks={finishedTasks}
          deleteTask={this.props.deleteTask}
          toggleFinishTask={this.props.toggleFinishTask}
        />
      </>
    );
  }
}

export default ListView;
