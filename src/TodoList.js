import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';

class TodoList extends Component {
  state = {
    todoList: [],
  };

  update = (id, updatedTodo) => {
    const updatedTodoList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, taskName: updatedTodo };
      }
      return todo;
    });
    this.setState({
      todoList: updatedTodoList,
    });
  };

  create = (newTodo) => {
    this.setState({
      todoList: [...this.state.todoList, newTodo],
    });
  };

  remove = (id) => {
    this.setState({
      todoList: this.state.todoList.filter((todo) => todo.id !== id),
    });
  };

  render() {
    const list = this.state.todoList.map((i) => (
      <li key={i.id}>
        <Todo
          taskName={i.taskName}
          key={i.id}
          id={i.id}
          removeTodo={this.remove}
          updateTodo={this.update}
        />
      </li>
    ));
    return (
      <div className="TodoList">
        <h1>To-Do List</h1>
        <NewTodoForm createTodo={this.create} />
        {this.state.todoList.length > 0 && (
          <ul className="TodoList-Tasks">{list}</ul>
        )}
      </div>
    );
  }
}

export default TodoList;
