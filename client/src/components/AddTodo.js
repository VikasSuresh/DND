import React from "react";  

class Add extends React.Component{
    state={
        input:''
    }
    handleChange=(e)=>{        
       this.setState({
           input:e.target.value
       })
    }
    submit=(e)=>{
        console.log(this.state.input)
        this.props.add(this.state.input)
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
            <input type='text' onChange={this.handleChange}/>        
            <button type='submit' onClick={this.submit}>ADD</button>
            </div>
        )
    }
}

export default Add;