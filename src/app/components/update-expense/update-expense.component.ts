import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {  ActivatedRoute, Router } from '@angular/router';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { NgFor } from '@angular/common';
import { error } from 'console';


@Component({
  selector: 'app-update-expense',
  standalone: true,
  imports: [DemoNgZorroAntdModule,ReactiveFormsModule,NgFor],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.css'
})
export class UpdateExpenseComponent {

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
  id!:number;
  
  constructor(private fb:FormBuilder,
    private expenseService:ExpenseService
    ,private message:NzMessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ){}
 
  ngOnInit(): void {
    
   
    this.id = +this.activatedRoute.snapshot.params['id'];
      this.expenseForm=this.fb.group({
        title:[null,Validators.required],
        amount:[null,Validators.required],
        date:[null,Validators.required],
        category:[null,Validators.required],
        description:[null,Validators.required],

      });
      this.getExpenseByid();
  }
  getExpenseByid(){
    this.expenseService.getExpenseById(this.id).subscribe(res=>{
      this.expenseForm.patchValue(res);
      this.message.success("Expense posted successfully",{nzDuration:5000});
    },error=>{
      this.message.error("Error while geting expense",{nzDuration:5000});
    })
  }

  submitForm(){
    this.expenseService.updateExpense(this.id,this.expenseForm.value).subscribe(res=>{
      this.message.success("Expense updated successfully",{nzDuration:5000});
      this.router.navigateByUrl("/expense");
    },error=>{
      this.message.error("Error while updating expense",{nzDuration:5000});
    })
  }

}
