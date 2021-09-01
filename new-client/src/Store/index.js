/* eslint-disable no-underscore-dangle */
import {
  makeObservable, observable, computed, action,
} from 'mobx';

class ToDo {
    todos=[];

    constructor() {
      makeObservable(this, {
        todos: observable,
        completed: computed,
        notCompleted: computed,
        fetch: action,
        addToDo: action,
        toggleToDo: action,
      });
    }

    fetch() {
      this.todos.push({
        _id:1,
        task: 'A',
        bookmarked:false,
        completed: true,
      }, {
        _id:2,
        task: 'B',
        bookmarked:true,
        completed: false,
      });
    }

    addToDo(task) {
      this.todos.push({
        _id: this.todos.length + 1,
        ...task,
        bookmarked:false,
        completed: false,
      });
    }

    toggleToDo(id) {
      this.todos.map((el) => {
        if (el._id === id) el.completed = !el.completed;
        return el;
      });
    }

    get completed() {
      return this.todos.filter((el) => el.completed);
    }

    get notCompleted() {
      return this.todos.filter((el) => !el.completed);
    }
}

export default new ToDo();
