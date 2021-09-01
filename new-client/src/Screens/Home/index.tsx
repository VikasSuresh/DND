import React, { useState,useEffect } from "react";
import { observer } from "mobx-react-lite";
import Store from "../../Store";
import {AddTask,ListTask} from "../../Components";

interface Task {
    task: string,
    completed: boolean
}

export const Home = observer(() => {
    // const [todos, setToDo] = useState<Task[]>([{
    //     task:"A",
    //     completed:false
    // }]);

    // useEffect(()=>{
    //     setToDo((state)=>([
    //         ...state,
    //         {
    //             task:"B",
    //             completed:false
    //         }
    //     ]))
    // },[])

     useEffect(()=>{
        Store.fetch()
    },[])

    function submit(task:string) {
        if(task){
            Store.addToDo({
                task
            })      
        }
    }

    function toggleCompleted(id:number) {
        Store.toggleToDo(id);
    }

    function toggleBookmark(id:number) {
        console.log(id)
        Store.toggleToBookmark(id);
    }

    let not = Store.notCompleted

    let done = Store.completed;

    console.log(not,done)

    return(
        <div>
           <AddTask addToDo = {submit.bind(this)}/>
           <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Not Completed
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body">
                        <ListTask val ={not} toggleCompleted= {toggleCompleted.bind(this)} toggleBookmark= {toggleBookmark.bind(this)} ></ListTask>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Completed
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div className="accordion-body">
                        <ListTask val ={done} toggleCompleted={toggleCompleted.bind(this)} toggleBookmark={toggleBookmark.bind(this)} ></ListTask>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
