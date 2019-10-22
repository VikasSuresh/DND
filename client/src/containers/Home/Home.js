import React,{ Component } from "react";
import './Home.css';
class Home extends Component{
    state={
        tasks:[
            {
                name:'1',
                cat:'nc'
            },
            {
                name:'2',
                cat:'nc'
            },
            {
                name:'3',
                cat:'c'   
            }
        ]
    }

    dragStart=(e,name)=>{    
        e.dataTransfer.setData('name',name)
    }
    Drop=(e,cat)=>{
        let name=e.dataTransfer.getData('name')        
        let tasks=this.state.tasks.filter(t=>{
            if(t.name===name){
                t.cat=cat
            }
            return t
        })
        this.setState({
            ...this.state,
            tasks
        })
                
    }
    render(){        
        let tasks={
            nc:[],
            c:[]
        }

        this.state.tasks.forEach(task => {
            tasks[task.cat].push(
                <div key={task.name}
                    draggable
                    onDragStart={(e)=>this.dragStart(e,task.name)}
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
                <div className='row'>                       
                    <div className='col-sm-6 NotCompleted'
                        onDragOver={(e)=>e.preventDefault()}
                        onDrop={(e)=>this.Drop(e,"nc")} 
                        style={{textAlign:"center"}}                         
                    >
                        <span className='task-header'>Todo</span>
                        {tasks.nc}
                    </div>
                    <div className='col-sm-6 Completed'
                        onDragOver={(e)=>e.preventDefault()}
                        onDrop={(e)=>this.Drop(e,"c")} 
                        style={{textAlign:"center"}}                                     
                    >
                        <span className='task-header'>Completed</span>
                        {tasks.c}
                    </div>
                </div>
            </div>            
        )
    }
}

export default Home;