import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './tasks/task.service';


@NgModule({
  declarations: [
    TasksComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
