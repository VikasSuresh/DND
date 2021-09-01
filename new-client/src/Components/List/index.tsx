import React from "react";

const List = (props:any)=>(
    <ul className="list-group">
        {
            props.val.map((task:any)=> (
                <div key={task._id} className="form-check form-switch">
                    <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" 
                    defaultChecked={task.completed}
                    onClick={()=>{props.toggle(task._id)}}
                    />
                        {task.task}
                    </li>
                </div>
            )
           )
        }
    </ul>
);

export default List