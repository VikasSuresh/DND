/* eslint-disable no-param-reassign */
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
            bookmarked: computed,
            fetch: action,
            addToDo: action,
            toggleToDo: action,
            toggleBookmark: action,
            togglePriority: action,
        });
    }

    fetch() {
        this.todos.push({
            _id: 1,
            task: 'A',
            bookmarked: false,
            completed: true,
            priority: true,
        }, {
            _id: 2,
            task: 'B',
            bookmarked: true,
            completed: false,
            priority: false,
        });
    }

    addToDo(task) {
        this.todos.push({
            _id: this.todos.length + 1,
            ...task,
            bookmarked: false,
            completed: false,
            priority: false,
        });
    }

    toggleToDo(id) {
        this.todos.map((el) => {
            if (el._id.toString() === id.toString()) el.completed = !el.completed;
            return el;
        });
    }

    toggleBookmark(id) {
        this.todos.map((el) => {
            if (el._id.toString() === id.toString()) el.bookmarked = !el.bookmarked;
            return el;
        });
    }

    togglePriority(id) {
        this.todos.map((el) => {
            if (el._id.toString() === id.toString()) el.priority = !el.priority;
            return el;
        });
    }

    get completed() {
        return this.todos.filter((el) => el.completed);
    }

    get notCompleted() {
        return this.todos.filter((el) => !el.completed);
    }

    get bookmarked() {
        return this.todos.filter((el) => el.bookmarked);
    }
}

export default new ToDo();
