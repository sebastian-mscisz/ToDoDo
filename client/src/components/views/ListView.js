import React, { Component } from "react";
import NewTask from "./NewTask";
import TaskList from "./TaskList";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dueDate: "",
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
    this.setState({
      name: "",
      dueDate: "",
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
    return (
      <>
        <p>Dodaj task'a</p>
        <NewTask
          tags={this.state.tags}
          removeTag={this.removeTag}
          inputKeyDown={this.inputKeyDown}
          handleInputChange={this.handleInputChange}
          handleAddTask={this.handleAddTask}
        />
        <p>Lista Tasków</p>
        <TaskList tasks={this.props.tasks} />
      </>
    );
  }
}

export default ListView;
