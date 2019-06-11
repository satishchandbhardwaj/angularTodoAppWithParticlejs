import { Component, OnInit } from '@angular/core';
import{ TodoService } from '../services/todo.service';

import { DatePipe } from '@angular/common';



import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']  
})
export class AddtodoComponent implements OnInit {
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: false
	}

  textname = '';
  todoarr;
  todoarrnew:any = [];
  updatebtn = false;
  showundo = true;
  selectdate:string;
  showseldate = true;

  currentdate;

  constructor(private gettodo:TodoService) { }

  ngOnInit() {
    this.gettodo.getusers().subscribe(
      res => {
        this.todoarr = res;
        this.todoarrnew = this.todoarr;

        let today = new Date();
        this.currentdate = today;
    this.filterfundata(today);
   
      }
    )
    
  }
  addtodo(getinput){
    this.showundo = true;
    this.showseldate = true;
    if(this.textname !== ''){
      let tododata = {
          "name":getinput.value,
          "description":"todo",
          "date":this.currentdate
      };
      console.log(tododata);
      this.gettodo.addtodo(tododata).subscribe(
        res => {
          this.todoarr = res;
          this.filterfundata(this.currentdate); 
        }
      )
      this.textname = ''; 
    }
    
  }

  onKeydown(event) {
    this.showundo = true;
    this.showseldate = true;
    //console.log(event.target.value);
    if (event.key === "Enter") {
      if(this.textname !== ''){
        let tododata = {
            "name":event.target.value,
            "description":"todo",
            "date":this.currentdate
        };
        this.gettodo.addtodo(tododata).subscribe(
          res => {
            this.todoarr = res;
            this.filterfundata(this.currentdate);
          }
        )
        this.textname = '';  
      }
    }
  }

  deletelist(id){
    this.showundo = true;
    this.showseldate = true;
    this.gettodo.deleteusers(id).subscribe(
      res => {
        this.todoarr = res;
        this.filterfundata(this.currentdate);
        console.log('Delete successfully');
      }
    )
  }

  editlist(id, i){
    this.showundo = true;
    this.showseldate = true;
    //this.updatebtn = true;
    console.log(id);
    document.getElementById("id"+i).style.display = "block";
    document.getElementById("input"+i).focus();

  }
  updatelist(id, i){
    this.showundo = true;
    this.showseldate = true;
    console.log(id);
    let getdata =  document.getElementById("input"+i);
    let editdata = {
      "name":getdata.value,
      "description":"todo"
    }

    this.gettodo.edittodo(editdata, id).subscribe(
      res => {
        this.todoarr = res;
        this.filterfundata(this.currentdate);
      }
    )
    document.getElementById("id"+i).style.display = "none";
  }

  onDateSelect(event){
    this.currentdate = event;
    console.log(this.currentdate);
    // let datePipe = new DatePipe("en-US");
    // let caldate = datePipe.transform(event, 'dd/MM/yyyy');
    // //console.log(test);
    // //this.todoarr = [];
    // this.todoarrnew = this.todoarr.filter( t => {
    //   let calgetdate = datePipe.transform(t.date, 'dd/MM/yyyy');
    //  // console.log(caldate);
    //  // console.log(calgetdate);
    //  return calgetdate == caldate;
    // });
    // this.selectdate = event;
    // this.showundo = true;
    // this.showseldate = true;
    // console.log(this.todoarrnew);

    this.filterfundata(this.currentdate);
  }

  undolist(){
    this.todoarrnew = this.todoarr;
    this.showundo = false;
    this.showseldate = false;
  }

  filterfundata(event){
   // console.log(event);
    
    
    let datePipe = new DatePipe("en-US");
    let caldate = datePipe.transform(event, 'dd/MM/yyyy');

    this.todoarrnew = this.todoarr.filter( tt => {
      let calgetdate = datePipe.transform(tt.date, 'dd/MM/yyyy');
     // console.log(caldate);
     // console.log(calgetdate);
     return calgetdate == caldate;
    });
    this.selectdate = event;
    this.showundo = true;
    this.showseldate = true;
  }
 
 

}
