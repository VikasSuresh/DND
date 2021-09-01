import React from "react";
import { Bookmarked, NotBookmarked } from "../Bookmark";

const List = (props:any)=>(
    <div className="list-group">
        {
            props.val.map((task:any)=> (
                <div key={task._id} className="input-group mb-3">
                    <div className="input-group-text">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" 
                            defaultChecked={task.completed}
                            onClick={()=>{props.toggleCompleted(task._id)}}
                            />
                        </div>
                    </div>
                    <input type="text" readOnly={true} className="form-control" defaultValue= {task.task}/>
                    <button type="submit" className="btn" onClick={()=>{props.toggleBookmark(task._id)}} > 
                        {task.bookmarked?<Bookmarked/>:<NotBookmarked/>}
                    </button>
                </div>
                )
            )
        }
    </div>
)   

export default List