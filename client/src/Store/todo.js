import {
    makeObservable, observable, computed, action,
} from 'mobx';

const axios = require('axios').default;
const moment = require('moment');

class ToDo {
    queryString = '';

    search = '';

    sort = '';

    page={
        currentPage: 0,
        totalPageCount: 0,
    };

    month=true;

    current='';

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
            search: observable,
            month: observable,
            todos: observable,
            todo: observable,
            aToDo: computed,
            completed: computed,
            notCompleted: computed,
            completedBookmark: computed,
            notcompletedBookmark: computed,
            stateUpdate: action,
            fetch: action,
            fetchOne: action,
            fetchEvents: action,
            addToDo: action,
            updateOne: action,
            updateDate: action,
            toggleToDo: action,
            toggleBookmark: action,
            togglePriority: action,
            updateDueDate: action,
            setSearch: action,
            setSort: action,
            setPage: action,
            setMonth: action,
        });
    }

    stateUpdate({
        value, values, add, pageInfo,
    }) {
        if (pageInfo) {
            this.page.totalPageCount = pageInfo.totalPages;
        }
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

    async getAxiosCall(uri) {
        const { data: { value: { values, pageInfo } } } = await axios.get(uri, {
            withCredentials: true,
        });

        this.stateUpdate({ values, pageInfo });
    }

    async fetch(path) {
        if (path === 'bookmarks') {
            this.queryString = '&filter=bookmarked';
        } else if (path === 'today') {
            const date = moment(new Date());

            this.queryString = `&filter=dueDate:gte:${date.startOf('D').valueOf()},dueDate:lte:${date.endOf('D').valueOf()}`;
        }
        this.getAxiosCall(`${process.env.REACT_APP_SERVER_API}/tasks?page=${this.page.currentPage}&search=${this.queryString}`);
    }

    async fetchOne(id) {
        const { data: { value } } = await axios.get(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, {
            withCredentials: true,
        });

        this.stateUpdate({ value });
    }

    async fetchEvents(timespan) {
        // eslint-disable-next-line no-param-reassign
        timespan = `${timespan.startStr}|${timespan.endStr}`;
        if (this.current !== timespan) {
            this.current = timespan;
            const { data: { value: { values } } } = await axios.get(`${process.env.REACT_APP_SERVER_API}/tasks`, {
                params: {
                    duration: timespan,
                },
                withCredentials: true,
            });

            this.stateUpdate({ values });
        }
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

    async updateDate(task) {
        const { data: { value } } = await axios.put(`${process.env.REACT_APP_SERVER_API}/tasks/${task._id}`, {
            start: task.start,
            dueDate: task.dueDate,
        }, {
            withCredentials: true,
        });

        this.stateUpdate({
            value,
            values: this.todos.map((el) => (el._id.toString() === value._id.toString() ? value : el)),
        });
    }

    async setSearch(search) {
        this.search = search;
        if (!search) {
            this.getAxiosCall(`${process.env.REACT_APP_SERVER_API}/tasks?page=${this.page.currentPage}&search=${this.queryString}`);
        } else {
            this.getAxiosCall(`${process.env.REACT_APP_SERVER_API}/tasks?page=${this.page.currentPage}&search=${search}${this.queryString}`);
        }
    }

    async setSort(sort) {
        this.sort = sort;
        this.getAxiosCall(`${process.env.REACT_APP_SERVER_API}/tasks?page=${this.page.currentPage}&search=${this.search}${this.queryString}&sort=${this.sort}`);
    }

    async setPage(page) {
        this.page.currentPage = page;
        this.getAxiosCall(`${process.env.REACT_APP_SERVER_API}/tasks?page=${this.page.currentPage}&search=${this.search}${this.queryString}&sort=${this.sort}`);
    }

    async setMonth(bool) {
        this.month = bool;
    }

    get completed() {
        return this.todos.filter((el) => el.completed);
    }

    get notCompleted() {
        return this.todos.filter((el) => !el.completed);
    }

    get completedBookmark() {
        return this.todos.filter((el) => el.completed && el.bookmarked);
    }

    get notcompletedBookmark() {
        return this.todos.filter((el) => !el.completed && el.bookmarked);
    }

    get aToDo() {
        return this.todo;
    }
}

export default new ToDo();
