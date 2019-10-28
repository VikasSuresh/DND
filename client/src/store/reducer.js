import { observable, action } from "mobx";
import axios from "axios";
const API='http://localhost:1000/'

class List{
    @observable tasks=[]    

    @action 
    fetchData(){
        fetch(API)
            .then((result)=>{
                return result.json()
            }).then(({result})=>{                
                result.forEach(element => {
                    this.tasks.push(element)    
                });            
            })     
            .catch(err=>console.log(err))
    }
    
    
    @action
    addTask=(name)=>{        
        axios.post(`${API}add`,{name:name})
            .then(({data})=>{
                this.tasks.push(data.todo)
            })
            .catch(err=>console.log(err))  
    }
    @action
    dragStart=(e,id)=>{                 
        e.dataTransfer.setData('id',id)
    }
    @action
    drop=(e,cat)=>{        
        let id=e.dataTransfer.getData('id')            
        this.tasks.filter(t=>{
            if(t._id===id && t.cat!==cat){                
                axios.put(`${API}edit`,{id:id,cat:cat})
                    .catch(err=>console.log(err))                        
                t.cat=cat                
            }               
            return t         
        })                        
    }  
    @action
    del=(e,id)=>{        
        axios.delete(`${API}del`,{data:{id:id}})
            .then(()=>{
                this.tasks.forEach((a,i)=>{
                    if(a._id===id){
                        this.tasks.splice(i,1)
                    }
                })
            })
            .catch(err=>console.log(err))        
                
    }  
    
}

const list=new List();
export default list;