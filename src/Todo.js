import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  state = {
    isUpdating: false,
    task: this.props.taskName,
  };

  handleRemove = () => {
    this.props.removeTodo(this.props.id);
  };

  toggleUpdate = () => {
    this.setState({
      isUpdating: !this.state.isUpdating,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUpdate = (e) => {
    this.props.updateTodo(this.props.id, this.state.task);
    this.toggleUpdate();
    e.preventDefault();
  };

  handleComplete = (e) => {
    this.props.completeTodo(this.props.id);
  };

  render() {
    let result;
    if (this.state.isUpdating) {
      result = (
        <div>
          <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
            <input
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
              type="text"
            ></input>
            <button className="Todo-update">Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="Todo-buttons">
          <button className="Todo-edit" onClick={this.toggleUpdate}>
            <i className="fas fa-pen"></i>
          </button>
          <button className="Todo-x" onClick={this.handleRemove}>
            <i className="fas fa-trash"></i>
          </button>
          <div
            className={
              this.props.completed ? 'Todo-task Todo-completed' : 'Todo-task'
            }
            onClick={this.handleComplete}
          >
            {this.props.taskName}
          </div>
        </div>
      );
    }
    return <div className="Todo">{result}</div>;
  }
}

export default Todo;
