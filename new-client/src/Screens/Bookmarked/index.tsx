import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../../Store";
import {AddTask,ListTask} from "../../Components";


class Bookmark extends Component {
    componentDidMount(){
        Store.fetch()
    }
    
    componentDidUpdate(){

    }

    submit=(task:string)=>{
        if(task){
            Store.addToDo({
                task
            })      
        }
    }

    toggleCompleted=(id:number)=>{
        Store.toggleToDo(id);
    }

    toggleBookmark=(id:number)=>{
        Store.toggleToBookmark(id);
    }

    render(){
        const bookmared = Store.bookmarked;
        return(
            <div>
               <AddTask addToDo = {this.submit}/>
               <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Not Completed
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <ListTask val ={bookmared.filter(el=>!el.completed)} toggleCompleted={this.toggleCompleted} toggleBookmark={this.toggleBookmark} ></ListTask>
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
                            <ListTask val ={bookmared.filter(el=>el.completed)} toggleCompleted={this.toggleCompleted} toggleBookmark={this.toggleBookmark} ></ListTask>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(Bookmark);
