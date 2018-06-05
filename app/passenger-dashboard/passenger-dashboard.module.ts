
// Common Module allows us to have some additional helpers like ngIf and ngFor
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router'

// State-full components
import { PassengerDashboardComponent } from './components/passenger-dashboard/passenger-dashboard.component';
import { PassengerViewerComponent } from './components/passenger-viewer/passenger-viewer.component';

// Dumb components
import { PassengerDetailComponent } from './dumbComponents/passenger-detail/passenger-detail.component';
import { PassengerCountComponent } from './dumbComponents/passenger-count/passenger-count.component';
import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';

// Services
import { PassengerDashboardService } from './passenger-dashboard.service';


const routes: Routes = [
    {
        path: "passengers",
        children: [
            {path: '', component: PassengerDashboardComponent},
            {path: ':id', component: PassengerViewerComponent}
        ],
    }
]


@NgModule({
    declarations: [
        // State-full
        PassengerDashboardComponent,
        PassengerViewerComponent,
        //Dummie
        PassengerCountComponent,
        PassengerDetailComponent,
        PassengerFormComponent
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        PassengerDashboardService
    ]
})

export class PassengerDashboardModule {}