import { PassengerDashboardService } from './../../passenger-dashboard.service';
import { Passenger } from './../../models/passenger.interface';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
        <div>
        <passenger-count
        [items]='passengers'>

        </passenger-count>
        
        <div *ngFor="let passenger of passengers">
            {{ passenger.fullname }}
        </div>

        <passenger-detail
          *ngFor="let passenger of passengers"
          (view)="handleView($event)"
          [detail]="passenger"
          (remove)="handleRemove($event)"
          (edit)="handleEdit($event)"
          >
          
        </passenger-detail>
      

        </div>
    `
})


export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) { }
  ngOnInit() {
    console.log('ngOnInit')
    this.passengerService.getPassengers()
    // Subscribe is similar to .then, it's angular's way of doing the same thing.
    .subscribe((data: Passenger[]) => {
      console.log('Data', data)
      this.passengers = data
    });
  }

  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger
        })
      })
  }

  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id
        })
      })
      console.log(event)
  }

  handleView(event: Passenger){
      this.router.navigate(['/passengers', event.id])
  }
}