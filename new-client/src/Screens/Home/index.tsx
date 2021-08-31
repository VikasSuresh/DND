import React, { useState,useEffect } from "react";
import { observer } from "mobx-react-lite";
import Store from "../../Store";
import {AddTask} from "../../Components";

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

    let not = Store.notCompleted

    let done = Store.completed;

    return(
        <div>
           <AddTask addToDo = {submit.bind(this)}/>
           <h1>Pending:{not}</h1>
           <h1>Completed:{done}</h1>
        </div>
    )
})
