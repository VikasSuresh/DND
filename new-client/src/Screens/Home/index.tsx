import React, { useState,useEffect } from "react";

interface Task {
    task: string,
    completed: boolean
}

export const Home = () =>{
    const [todos, setToDo] = useState<Task[]>([{
        task:"A",
        completed:false
    }]);

    useEffect(()=>{
        setTimeout(()=>{
            setToDo((state)=>([
                ...state,
                {
                    task:"B",
                    completed:false
                }
            ]))
        })
    },[])

    let render = ["loading"]

    if(todos.length>0){
        render = todos.map(el=>el.task)
    }

    const submit = (e:any) =>{
        e.preventDefault();
        setToDo((state)=>([...state,{
            task:"C",
            completed:false
        }]))
    }
    
    console.log(render)
    return(
        <div>
           <p>{render}</p>
           <button type='submit' onClick={submit}>ADD</button>
        </div>
    )
}
