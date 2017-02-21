import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TaskComponent} from './index';
import {StateComponent} from './index';
import {TaskFormComponent} from './index';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, TaskComponent, StateComponent, TaskFormComponent],
  exports: [HomeComponent],
})
export class HomeModule {
}
