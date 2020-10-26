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
    this.saveToLocalStorage(updatedTodoList);
  };

  create = (newTodo) => {
    this.setState({
      todoList: [...this.state.todoList, newTodo],
    });
    this.saveToLocalStorage([...this.state.todoList, newTodo]);
  };

  remove = (id) => {
    const updatedTodoList = this.state.todoList.filter(
      (todo) => todo.id !== id
    );
    this.setState({
      todoList: updatedTodoList,
    });
    this.saveToLocalStorage(updatedTodoList);
  };

  toggleCompletion = (id) => {
    const updatedTodoList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({
      todoList: updatedTodoList,
    });
    this.saveToLocalStorage(updatedTodoList);
  };

  initLocalStorage = () => {
    let tasks;
    if (localStorage.getItem('todoList') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('todoList'));
    }
    return tasks;
  };

  saveToLocalStorage = (todoList, newTodo) => {
    localStorage.setItem('todoList', JSON.stringify(todoList, newTodo));
  };

  getTodos = () => {
    const tasks = this.initLocalStorage();
    this.setState({
      todoList: tasks,
    });
  };

  componentDidMount = () => {
    this.getTodos();
  };

  render() {
    const list = this.state.todoList.map((todo) => (
      <li key={todo.id}>
        <Todo
          taskName={todo.taskName}
          key={todo.id}
          id={todo.id}
          completed={todo.completed}
          removeTodo={this.remove}
          updateTodo={this.update}
          completeTodo={this.toggleCompletion}
        />
      </li>
    ));
    return (
      <div className="TodoList">
        <h1>
          React todo List <span>Getting stuff done</span>
        </h1>
        <ul className="TodoList-Tasks">{list}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}

export default TodoList;
