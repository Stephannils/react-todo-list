import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import './NewTodoForm.css';

class NewTodoForm extends Component {
  state = {
    taskName: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    if (this.state.taskName !== '') {
      const newTodo = { ...this.state, id: uuid() };
      this.props.createTodo(newTodo);
      this.setState({
        taskName: '',
      });
    } else {
      alert('Please enter task');
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className="NewTodoForm">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="taskName"
            placeholder="New Todo"
            value={this.state.taskName}
            onChange={this.handleChange}
          ></input>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default NewTodoForm;
