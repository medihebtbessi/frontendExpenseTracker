import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { NgStyle } from '@angular/common';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DemoNgZorroAntdModule, NgStyle],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  stats: any;
  expenses: any;
  incomes: any;

  gridStyle = {
    with: '25%',
    textAlign: 'center'
  };

  @ViewChild('incomeLineChartRef') private incomeLineChartRef: ElementRef;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef: ElementRef;

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
  }

  ngAfterViewInit() {
    
    this.createLineChart();
  }

  createLineChart() {
    if (this.incomeLineChartRef && this.expenseLineChartRef) {
      const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
      new Chart(incomeCtx, {
        type: 'line',
        data: {
          labels: this.incomes.map(income => income.date),
          datasets: [{
            label: 'Income',
            data: this.incomes.map(income => income.amount),
            borderWidth: 1,
            backgroundColor: 'rgb(80,200,120)',
            borderColor: 'rgb(0,100,0)',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
      new Chart(expenseCtx, {
        type: 'line',
        data: {
          labels: this.expenses.map(expense => expense.date),
          datasets: [{
            label: 'Expense',
            data: this.expenses.map(expense => expense.amount),
            borderWidth: 1,
            backgroundColor: 'rgb(80,200,120)',
            borderColor: 'rgb(0,100,0)',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  getStats() {
    this.statsService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe(res => {
      if (res.expenseList != null && res.incomeList != null) {
        this.incomes = res.incomeList;
        this.expenses = res.expenseList;
       
        this.createLineChart();
      }
    });
  }
}
