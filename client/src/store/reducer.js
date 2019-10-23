import { observable, action } from "mobx";

class List{
    @observable tasks=[]    

    @action 
    fetchData(){
        fetch('http://localhost:1000/')
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
        this.tasks.push({
            id:Math.random(),
            name:name,
            cat:'nc'
        })
    }
    @action
    dragStart=(e,id)=>{                 
        e.dataTransfer.setData('id',id)
    }
    @action
    drop=(e,cat)=>{
        let id=e.dataTransfer.getData('id')            
        this.tasks.filter(t=>{
            if(String(t.id)===id){
                t.cat=cat
            }               
            return t         
        })                        
    }    
    
}

const list=new List();
export default list;