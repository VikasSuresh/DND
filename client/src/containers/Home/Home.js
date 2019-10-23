import React,{ Component } from "react";
// import {  } from "mobx";
import Add from "../../components/AddTodo";
import './Home.css';
import { observer,inject } from "mobx-react";

@inject("list")
@observer
class Home extends Component{        
    componentDidMount(){
        this.props.list.fetchData()
    }        
    render(){        
        let tasks={
            nc:[],
            c:[]
        }        
        if(this.props.list.tasks.length!==[]){
            this.props.list.tasks.forEach(task => {                
                tasks[task.cat].push(
                    <div key={task.id}
                        draggable
                        onDragStart={(e)=>this.props.list.dragStart(e,task.id)}
                        className='draggable'
                        style={task.cat==='nc'?{color:'red'}:{color:'green'}}
                    >
                        {task.name}
                    </div>
                )
            });
    
            return(
                <div className='container'>
                    <h2 className="header" style={{textAlign:"center"}}>DRAG & DROP</h2> 
                    <Add add={this.props.list.addTask} />
                    <div className='row'>                       
                        <div className='col-sm-6 NotCompleted'
                            onDragOver={(e)=>e.preventDefault()}
                            onDrop={(e)=>this.props.list.drop(e,"nc")} 
                            style={{textAlign:"center"}}                         
                        >
                            <span className='task-header'>Todo</span>
                            {tasks.nc}
                        </div>
                        <div className='col-sm-6 Completed'
                            onDragOver={(e)=>e.preventDefault()}
                            onDrop={(e)=>this.props.list.drop(e,"c")} 
                            style={{textAlign:"center"}}                                     
                        >
                            <span className='task-header'>Completed</span>
                            {tasks.c}
                        </div>
                    </div>
                </div>            
            )    
        }
        else{
            return(<div>Loading</div>)
        }        
    }
}

export default Home;