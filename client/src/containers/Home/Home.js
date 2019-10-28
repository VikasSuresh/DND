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
                if(task.cat){
                    tasks.c.push(
                        <div key={task._id}
                            draggable
                            onDragStart={(e)=>this.props.list.dragStart(e,task._id)}
                            className='draggable'
                            style={{color:'green'}}
                        >
                            {task.name} 
                            <span onClick={(e)=>this.props.list.del(e,task._id)} style={{float:"right",color:"black"}}>x</span>
                        </div>)
                }else{
                    tasks.nc.push(
                        <div key={task._id}
                            draggable
                            onDragStart={(e)=>this.props.list.dragStart(e,task._id)}
                            className='draggable'
                            style={{color:'red'}}
                        >
                            {task.name}
                            <span onClick={(e)=>this.props.list.del(e,task._id)} style={{float:"right",color:"black"}}>x</span>
                        </div>
                    )
                }
            });            
            return(
                <div className='container'>
                    <h2 className="header" style={{textAlign:"center"}}>DRAG & DROP</h2> 
                    <Add add={this.props.list.addTask} />
                    <div className='row'>                       
                        <div className='col-sm-6 NotCompleted'
                            onDragOver={(e)=>e.preventDefault()}
                            onDrop={(e)=>this.props.list.drop(e,false)} 
                            style={{textAlign:"center"}}                         
                        >
                            <span className='task-header'>Todo</span>
                            {tasks.nc}
                        </div>
                        <div className='col-sm-6 Completed'
                            onDragOver={(e)=>e.preventDefault()}
                            onDrop={(e)=>this.props.list.drop(e,true)} 
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