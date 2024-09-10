import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { NgFor } from '@angular/common';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Router } from '@angular/router';




@Component({
  selector: 'app-expense',
  standalone:true,
  imports:[DemoNgZorroAntdModule,ReactiveFormsModule,NgFor],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit{
[x: string]: any;

  expenseForm! : FormGroup ;
  listOfCategory=[
    "Education",
    "Groceries",
    "Health",
    "Subscription",
    "Takeways",
    "Clothing",
    "Travelling",
    "Other"
  ];
  expenses:any;

  constructor(private fb:FormBuilder,private expenseService:ExpenseService
    ,private message:NzMessageService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.getAllExpenses();
      this.expenseForm=this.fb.group({
        title:[null,Validators.required],
        amount:[null,Validators.required],
        date:[null,Validators.required],
        category:[null,Validators.required],
        description:[null,Validators.required],

      })
  }
  submitForm() {
   this.expenseService.postExpense(this.expenseForm.value).subscribe(res=>{
    this.message.success("Expense posted successfully",{nzDuration:5000});
   },error=>{
    this.message.error("Error while posting expense",{nzDuration:5000});
   })
  }

  getAllExpenses(){
    this.expenseService.getAllExpense().subscribe(res=>{
      this.expenses=res;
      
    })
  }
  updateExpense(id:number){
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

  deleteExppense(id:number){
    this.expenseService.deleteExpense(id).subscribe(res=>{
      this.message.success("Expense deleted successfully",{nzDuration:5000}); 
      this.getAllExpenses();
    },error=>{
      this.message.error("Error while deleting expense",{nzDuration:5000});
    })
  }
   
}
