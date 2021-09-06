/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Bookmarked, NotBookmarked } from '../Bookmark';
import { Prioritized, NotPrioritized } from '../Priority';

const List = (props:any) => {
    const [reset, useReset] = useState(false);

    function Render() {
        useReset(!reset);
    }

    return (
        <div className="list-group">
            {
                props.val.map((task:any) => (
                    <div
                        key={task._id}
                        className="input-group mb-3"
                        draggable="true"
                        onDragStart={(e) => {
                            e.dataTransfer.setData('id', task._id);
                            e.dataTransfer.setData('category', props.category);
                        }}
                    >
                        <div className="input-group-text">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    defaultChecked={task.completed}
                                    onClick={() => { props.toggleCompleted(task._id); }}
                                />
                            </div>
                        </div>
                        <input type="text" readOnly className="form-control" value={task.name} onClick={() => props.infoOnTask(task._id)} />
                        <button title="Priority" type="submit" className="btn" disabled={task.completed} onClick={() => { props.togglePriority(task._id); Render(); }}>
                            {task.completed ? <NotPrioritized /> : task.priority ? <Prioritized /> : <NotPrioritized />}
                        </button>
                        <button title="Bookmark" type="submit" className="btn" onClick={() => { props.toggleBookmark(task._id); Render(); }}>
                            {task.bookmarked ? <Bookmarked /> : <NotBookmarked />}
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

export default List;
