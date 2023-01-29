import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AdminComponent } from './modules/admin/admin.component';
import { PitComponent } from './modules/pit/pit.component';
import { Level2Component } from './modules/level2/level2.component';
import { Level1Component } from './modules/level1/level1.component';

const routes: Routes = [{
      path: '',
      component: HomeComponent
  }, {
    path: 'level1',
    component: Level1Component
  }, {
    path: 'level1/:match',
    component: Level1Component
  }, {
    path: 'level2',
    component: Level2Component    
  },{ 
    path: 'level2/:match',
    component: Level2Component    
  },{
    path: 'pit',
    component: PitComponent    
  },{
    path: 'pit/:team',
    component: PitComponent    
  },{
    path: 'admin',
    component: AdminComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
