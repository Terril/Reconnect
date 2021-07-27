import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SplashComponent } from './splash.component';

export const routes: Routes = [
    {
        path:"",
        component:SplashComponent
    }
]
@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule],
 
})
export class SplashPageRoutingModule {}