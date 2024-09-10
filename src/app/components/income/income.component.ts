import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { NgFor } from '@angular/common';
import { IncomeService } from '../../services/income/income.service';
import { error } from 'console';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [DemoNgZorroAntdModule,ReactiveFormsModule,NgFor,RouterLink],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{
  incomeForm!:FormGroup;
  listOfCategory=[
    "Salary",
    "Freelancing",
    "Investments",
    "Stocks",
    "Bitcoin",
    "Bank transfer",
    "Youtube",
    "Other"
  ];
  incomes:any;

  constructor(private fb:FormBuilder
    ,private message:NzMessageService,
    private router:Router,
    private incomeService:IncomeService
  ){
  }
  ngOnInit(): void {
      this.getAllIncomes();
      this.incomeForm=this.fb.group({
        title:[null,Validators.required],
        amount:[null,Validators.required],
        date:[null,Validators.required],
        category:[null,Validators.required],
        description:[null,Validators.required],
      })
  }

  submitForm(){
    this.incomeService.postIncome(this.incomeForm.value).subscribe(res=>{
     this.getAllIncomes();
      this.incomeForm.reset();
    this.message.success("Income posted successfully",{nzDuration:5000});
    },error=>{
      this.message.error("Error while posting income",{nzDuration:5000});
    })
  }

  getAllIncomes(){
    this.incomeService.getAllIncome().subscribe(res=>{
      this.incomes=res;
      console.log(this.incomes);
      
    },error=>{
      this.message.error("Error fetching income",{nzDuration:5000});
    })
  }

  deleteIncome(id:number){
    this.incomeService.deleteIncome(id).subscribe(res=>{
      this.message.success("Income deleted successfully",{nzDuration:5000});
      this.getAllIncomes();
    },error=>{
      this.message.error("Error while deleting income",{nzDuration:5000});
    })
  }
}
