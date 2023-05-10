import { FanInputComponent } from './fan-input/fan-input.component';
import { DebugComponent } from './modules/debug/debug.component';
import { PitListComponent } from './modules/pit-list/pit-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AdminComponent } from './modules/admin/admin.component';
import { PitComponent } from './modules/pit/pit.component';
import { Level2Component } from './modules/level2/level2.component';
import { Level1Component } from './modules/level1/level1.component';
import { Level2ListComponent } from './modules/level2-list/level2-list.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [{
      path: '',
      component: HomeComponent
  }, {
    path: 'level1',
    component: Level1Component
  }, {
    path: 'level1/:match',
    component: Level1Component
  },{
    path: 'level2list',
    component: Level2ListComponent
  },{
    path: 'level2',
    component: Level2Component    
  },{ 
    path: 'level2/:alliance/:scouter',
    component: Level2Component    
  },{
    path: 'pitlist',
    component: PitListComponent
  },{
    path: 'pit',
    component: PitComponent    
  },{
    path: 'pit/:team/:scouter',
    component: PitComponent    
  },{
    path: 'admin',
    component: AdminComponent
  },{
    path: 'debug',
    component: DebugComponent
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'fan',
    component: FanInputComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
