import React from "react";
import { Bookmarked, NotBookmarked } from "../Bookmark";

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
                        {task.bookmarked
                        ?<Bookmarked/>
                        :<NotBookmarked/>}
                    </li>
                </div>
            )
           )
        }
    </ul>
);

export default List