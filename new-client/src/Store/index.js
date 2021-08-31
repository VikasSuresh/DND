import { makeObservable, observable, computed, action, flow } from "mobx"

class ToDo {
    todos=[];

    constructor(){
        makeObservable(this,{
            todos: observable,
            completed: computed,
            notCompleted: computed,
            fetch: action,
            addToDo: action,
            toggleToDo: action,
        })
    }

    fetch() {
        this.todos.push({
            task:"A",
            completed:true,
        },{
            task:"B",
            completed:false,
        })
    }

    addToDo(task) {
        this.todos.push({
            _id:this.todos.length+1,
            ...task,
            completed:false,
        })
    }

    toggleToDo(id) {
        this.todos.map(el=>{
            if(el._id===id) el.completed=!el.completed
            return el;
        })
    }

    get completed(){
        return this.todos.filter(el=>el.completed).map(el=>el.task)
    }

    get notCompleted(){
        return this.todos.filter(el=>!el.completed).map(el=>el.task)
    }
}

export default new ToDo();