
import { Component } from "@angular/core";

@Component({
  selector : 'app-container',
  templateUrl : './container.component.html',
  styleUrls : ['./container.component.css',]
})

export class ContainerComponent{

  inputValue : string ="";
  err : string = "";
  todoArray : {title :string,id:number, checked :boolean}[] = [];
  ngOnInit(){
    const data = localStorage.getItem('todoArray')
    console.log(data)
    this.todoArray = data !== null && JSON.parse(data)
  }

  onChange(e : Event){
    this.inputValue = (<HTMLInputElement>e.target).value
  }

  addTodo(){
    if(!this.inputValue.length){
      this.err = "input should contain a task"
    }else{
      this.todoArray.push({
        title : this.inputValue,
        id : this.todoArray.length + 1,
        checked : false
      })
      localStorage.setItem('todoArray' , JSON.stringify(this.todoArray))
      this.inputValue = ""
    }
  }

  onDelete(id :number){
    const arr = this.todoArray.filter((item : any)=>{
      return item.id !== id
    })
    localStorage.setItem('todoArray' , JSON.stringify(arr))
    this.todoArray=arr
  }
  onEdit(id : number){
   for(let item of this.todoArray){
    if(item.id === id){
      this.inputValue = item.title;
      break
    }
   }
  }

  checkValue(e : Event , id : number){
    const data = this.todoArray.map((item : {title :string,id:number, checked :boolean})=>{
      if(id == item.id){
        return{...item , checked : (<HTMLInputElement>e.target).checked}
      }else{
        return item
      }
    })

    localStorage.setItem('todoArray' , JSON.stringify(data))
    this.todoArray = data;
  }

  updateTodo(){}

}