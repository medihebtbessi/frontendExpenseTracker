import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DemoNgZorroAntdModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expenseTrackerWeb';
}
