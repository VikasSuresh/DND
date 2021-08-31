import React, { useState,useEffect } from "react";
import { observer } from "mobx-react-lite";
import Store from "../../Store";

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
       setTimeout(()=>{
        Store.fetch()
       },2000)
    },[])

    const submit = (e:any) =>{
        e.preventDefault();
        Store.addToDo({
           task:"C"
       })
    }

    let not = Store.notCompleted

    let done = Store.completed;

    return(
        <div>
           <h1>Pending:{not}</h1>
           <h1>Completed:{done}</h1>
           <button type='submit' onClick={submit}>ADD</button>
        </div>
    )
})
