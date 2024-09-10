import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../services/income/income.service';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { NgFor } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-update-income',
  standalone: true,
  imports: [DemoNgZorroAntdModule,NgFor,ReactiveFormsModule],
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.css'
})
export class UpdateIncomeComponent {
  incomeForm!:FormGroup;
  id!:number;
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
    private incomeService:IncomeService,
    private activated:ActivatedRoute
  ){
  }
  ngOnInit(): void {
    this.id=+this.activated.snapshot.params['id'];
      this.incomeForm=this.fb.group({
        title:[null,Validators.required],
        amount:[null,Validators.required],
        date:[null,Validators.required],
        category:[null,Validators.required],
        description:[null,Validators.required],
      });
      this.getIncomeById();
  }

  getIncomeById(){
    this.incomeService.getIncomeById(this.id).subscribe(res=>{
      this.incomeForm.patchValue(res);
      
    },error=>{
      this.message.error("Some thing went wrong",{nzDuration:5000});
    })
  }

  submitForm(){
    this.incomeService.updateIncome(this.id,this.incomeForm.value).subscribe(res=>{
      this.message.success("Income updated successfully",{nzDuration:5000});
      this.router.navigateByUrl("/income");
    },error=>{
      this.message.error("Error while updating income",{nzDuration:5000});
    })
  }
}
