/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Todo as Store } from '../../Store';
import { AddTask, ListTask } from '../../Components';

// interface Task {
//     task: string,
//     completed: boolean
// }

// eslint-disable-next-line import/prefer-default-export
export const Home = observer((props:any) => {
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

    useEffect(() => {
        Store.fetch();
    }, []);

    function submit(name:string) {
        if (name) {
            Store.addToDo({
                name,
            });
        }
    }

    function infoOnTask(id:string) {
        props.handleDrawerOpen(id);
    }

    function toggleCompleted(id:string) {
        Store.toggleToDo(id);
    }

    function toggleBookmark(id:string) {
        Store.toggleBookmark(id);
    }

    function togglePriority(id:string) {
        Store.togglePriority(id);
    }

    const onDrop = (e:any, to:string) => {
        const id = e.dataTransfer.getData('id');
        const from = e.dataTransfer.getData('category');

        if (from !== to) {
            Store.toggleToDo(id);
        }
    };

    let not = Store.notCompleted;

    let done = Store.completed;

    if (props.path === 'bookmarks') {
        not = Store.notCompleted.filter((el) => el.bookmarked);
        done = Store.completed.filter((el) => el.bookmarked);
    }

    return (
        <div>
            <AddTask addToDo={submit.bind(this)} />
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, 'Not')}>
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                        >
                            Not Completed
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <ListTask
                                val={not}
                                category="Not"
                                toggleCompleted={toggleCompleted.bind(this)}
                                toggleBookmark={toggleBookmark.bind(this)}
                                togglePriority={togglePriority.bind(this)}
                                infoOnTask={infoOnTask.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="accordion-item" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, 'Done')}>
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                        >
                            Completed
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <ListTask
                                val={done}
                                category="Done"
                                toggleCompleted={toggleCompleted.bind(this)}
                                toggleBookmark={toggleBookmark.bind(this)}
                                togglePriority={togglePriority.bind(this)}
                                infoOnTask={infoOnTask.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
