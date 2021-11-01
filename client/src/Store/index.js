/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import {
    makeObservable, observable, computed, action,
} from 'mobx';

const axios = require('axios').default;

class ToDo {
    todos = [];

    todo = {
        _id: 0,
        name: '',
        completed: false,
        priority: false,
        bookmarked: false,
        dueDate: '',
        expired: false,
    };

    constructor() {
        makeObservable(this, {
            todos: observable,
            todo: observable,
            aToDo: computed,
            completed: computed,
            notCompleted: computed,
            bookmarked: computed,
            stateUpdate: action,
            fetch: action,
            fetchOne: action,
            addToDo: action,
            updateOne: action,
            toggleToDo: action,
            toggleBookmark: action,
            togglePriority: action,
            updateDueDate: action,
        });
    }

    stateUpdate({
        value, values, add,
    }) {
        if (values) {
            this.todos = values;
        }
        if (value) {
            this.todo = value;
        }
        if (add) {
            this.todos.push(add);
        }
    }

    async fetch() {
        const { data: { values } } = await axios.get(`${process.env.REACT_APP_SERVER_API}/tasks?all=true`, {
            withCredentials: true,
        });

        this.stateUpdate({ values });
    }

    async fetchOne(id) {
        const { data: { value } } = await axios.get(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, {
            withCredentials: true,
        });

        this.stateUpdate({ value });
    }

    async addToDo(task) {
        const { data: { value } } = await axios.post(`${process.env.REACT_APP_SERVER_API}/tasks`, task, {
            withCredentials: true,
        });

        this.stateUpdate({ add: value });
    }

    async updateOne(task) {
        const { data: { value } } = await axios.put(`${process.env.REACT_APP_SERVER_API}/tasks/${task._id}`, {
            name: task.name,
        }, {
            withCredentials: true,
        });

        this.stateUpdate({
            value,
            values: this.todos.map((el) => (el._id.toString() === value._id.toString() ? value : el)),
        });
    }

    async deleteOne(id) {
        const { data } = await axios.delete(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, {
            withCredentials: true,
        });

        if (data) {
            this.stateUpdate({ values: this.todos.filter((el) => el._id.toString() !== id.toString()) });
        }
    }

    async toggleToDo(id) {
        const completed = !this.todos.filter(({ _id }) => _id.toString() === id.toString())[0].completed;

        const { data: { value } } = await axios.put(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, {
            completed,
        }, {
            withCredentials: true,
        });

        this.stateUpdate({ value, values: this.todos.map((el) => (el._id.toString() === value._id.toString() ? value : el)) });
    }

    async toggleBookmark(id) {
        const bookmarked = !this.todos.filter(({ _id }) => _id.toString() === id.toString())[0].bookmarked;

        const { data: { value } } = await axios.put(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, {
            bookmarked,
        }, {
            withCredentials: true,
        });

        this.stateUpdate({ value, values: this.todos.map((el) => (el._id.toString() === value._id.toString() ? value : el)) });
    }

    async togglePriority(id) {
        const priority = !this.todos.filter(({ _id }) => _id.toString() === id.toString())[0].priority;

        const { data: { value } } = await axios.put(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, {
            priority,
        }, {
            withCredentials: true,
        });

        this.stateUpdate({ value, values: this.todos.map((el) => (el._id.toString() === value._id.toString() ? value : el)) });
    }

    async updateDueDate(task) {
        const { data: { value } } = await axios.put(`${process.env.REACT_APP_SERVER_API}/tasks/${task._id}`, {
            dueDate: task.dueDate,
        }, {
            withCredentials: true,
        });

        this.stateUpdate({
            value,
            values: this.todos.map((el) => (el._id.toString() === value._id.toString() ? value : el)),
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
        return this.todo;
    }
}

export default new ToDo();
