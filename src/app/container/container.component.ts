
import { Component } from "@angular/core";

@Component({
  selector : 'app-container',
  templateUrl : './container.component.html',
  styleUrls : ['./container.component.css',]
})

export class ContainerComponent{

  inputValue : string ="";
  err : string = "";
  isEdit: boolean = false;
  todoArray : {title :string,id:number, checked :boolean}[] = [];
  selectedFilterOption : string ='All'
  editId : number = NaN;
  ngOnInit(){
    const data = localStorage.getItem('todoArray')
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
    this.isEdit = true;
    this.editId = id;
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

  filterItems(e : string){
    this.selectedFilterOption = e
  }
  

  updateTodo(){
    const data = this.todoArray.map(item=>{
      if(item.id == this.editId){
        item.title = this.inputValue
        return item
      }else{
        return item
      }
    })
    localStorage.setItem('todoArray' , JSON.stringify(data))
    this.todoArray = data;
    this.isEdit = false;
    this.inputValue = ""
    this.editId = NaN;
  }

}