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

  render() {
    let result;
    if (this.state.isUpdating) {
      result = (
        <div>
          <form onSubmit={this.handleUpdate}>
            <input
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
              type="text"
            ></input>
            <button>Edit</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div>
          <button className="Todo-x" onClick={this.handleRemove}>
            X
          </button>
          <button className="Todo-edit" onClick={this.toggleUpdate}>
            edit
          </button>
          {this.props.taskName}
        </div>
      );
    }
    return <div className="Todo">{result}</div>;
  }
}

export default Todo;
