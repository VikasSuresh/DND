/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import {
    makeObservable, observable, computed, action,
} from 'mobx';

class ToDo {
    todos = [];

    todo = {
        _id: 0,
        name: '',
    };

    constructor() {
        makeObservable(this, {
            todos: observable,
            todo: observable,
            aToDo: computed,
            completed: computed,
            notCompleted: computed,
            bookmarked: computed,
            fetchOne: action,
            addToDo: action,
            updateOne: action,
            toggleToDo: action,
            toggleBookmark: action,
            togglePriority: action,
        });
    }

    fetch() {
        this.todos.push({
            _id: 1,
            name: 'A',
            bookmarked: false,
            completed: true,
            priority: true,
        }, {
            _id: 2,
            name: 'B',
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

    updateOne(task) {
        this.todos = this.todos.map((el) => (el._id === task._id ? { ...el, ...task } : el));
        this.fetchOne(task._id);
    }

    fetchOne(id) {
        this.todo = {
            ...this.todos.reduce((a, c) => (!a && c._id === id ? c : a), null),
        };
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

    get aToDo() {
        return { ...this.todo };
    }
}

export default new ToDo();
