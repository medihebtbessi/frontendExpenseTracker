import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';

export const routes: Routes = [
    {path:'expense',component:ExpenseComponent},
    {path:'expense/:id/edit',component:UpdateExpenseComponent},
];
@NgModule({
    
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}