import { observable, action } from "mobx";

class List{
    
    id=Math.random();
    @observable cat='NC';
    @observable name='Vikas'

    constructor(name,cat){
        this.name=name;
        this.cat=cat;
    }

    @action 
    fetchData(){
        fetch('http://localhost:1000/')
            .then(({result})=>{
                console.log(result)
            })
            .catch(err=>console.log(err))
    }
}

export default List;