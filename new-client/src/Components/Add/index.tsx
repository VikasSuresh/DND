import React, {Component} from "react";

class Add extends Component<any,any> {
    private myRef:any;

    constructor(props:any){
        super(props)
        this.state = {
            data:"",
        }
        this.myRef = React.createRef();
    }

    change = (e:any) =>{
        this.setState((state:any)=>({
            ...state,
            data:e.target.value
        }))
    }

    action = (e:any) => {
        if (e.key === 'Enter'|| e.type==="click") {
          this.props.addToDo(this.state.data)
          this.myRef.current.value = "";
          this.setState((state:any)=>({
                ...state,
                data:null
            }))
        }
    }


    render(){
        return(
        <div className="mb-3">
            <input 
                type="task" className="form-control" id="addATask" placeholder="Add a Task"
                ref = {this.myRef}
                onKeyDown = {this.action}
                onChange={this.change}
                
            />
            <button className= "form-control" type="submit" onClick = {this.action} >Add</button>
        </div>
        )
    }
}

export default Add