import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoNgZorroAntdModule } from "./DemoNgZorroAntdModule";
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n";
import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { RouterLink } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";




@NgModule({
    declarations:[
        
    ],
    imports: [
        AppComponent,
        RouterLink,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        DemoNgZorroAntdModule
        
    ],
    providers:[
        {provide:NZ_I18N,useValue:en_US}
    ],
    bootstrap:[]
})
export class AppModule{

}