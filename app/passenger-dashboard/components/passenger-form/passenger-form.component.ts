import { Baggage } from './../../models/baggage.interface';
import { Passenger } from './../../models/passenger.interface';
import { Component, Input, Output, EventEmitter} from '@angular/core';
// import { EventEmitter } from '@angular/forms/src/facade/async';




@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
        <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
            
            
            {{detail | json}}
            <div>
               Passenger name: 
               <input
                    type='text'
                    name='fullname'
                    required
                    minlength="2"
                    #fullname="ngModel"
                    [ngModel]="detail?.fullname"
                    >

                    <!-- 'dirty' is checking to see if the form value has changed
                            so, if the user has deleted the name then the error message will populate,
                            but if the form loaded with no name (meaning the user has not interacted with the form yet), then do not show the error message -->

                <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
                    Passenger name is required
                </div>
                <div *ngIf="fullname.errors?.minlength && fullname.dirty" class="error">
                    Minimum length is 1
                </div>
            </div>
            <div>
               Passenger id: 
               <input
                    type='number'
                    name='id'
                    required
                    #id="ngModel"
                    [ngModel]="detail?.id">

                <div *ngIf="id.errors?.required && id.dirty" class="error">
                    Passenger id is required
                </div>
            </div>

            <div>
                <!-- Radio Button EXAMPLE -->

                <!--

                <label>
                    <input
                        type="radio"
                        name="checkedIn"
                        [value]="true"
                        [ngModel]="detail?.checkedIn"
                        (ngModelChange)="toggleCheckIn($event)"
                    >
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="checkedIn"
                        [value]="false"
                        [ngModel]="detail?.checkedIn"
                        (ngModelChange)="toggleCheckIn($event)"
                    >
                    No
                 </label>  

                 -->

                 <!-- CHECK BOX EXAMPLE -->
                <label>
                    <input
                        type="checkbox"
                        name="checkedIn"
                        [ngModel]="detail?.checkedIn"
                        (ngModelChange)="toggleCheckIn($event)"
                    >
                </label>

            </div>

            <div *ngIf="form.value.checkedIn">
                Check In Date:
                <input
                    type="number"
                    name="checkInDate"
                    [ngModel]="detail?.checkInDate"
                >
            </div>

            <div>
                Luggage: 

                <!-- 
                    Two Ways to do this...
                    The first: uses [value] and [selected] to match the data for the select option

                    The second: uses only [ngValue] to do the same.

                    *Both work the same
                -->


                <!-- uses [value] and [selected] -->
                <select
                    name="baggage"
                    [ngModel]="detail?.baggage"
                >
                    <option
                        *ngFor="let item of baggage"
                        [value]="item.key"
                        [selected]="item.key === detail?.baggage"
                    >
                        {{item.value}}
                    </option>
                </select>

                <!-- uses [ngValue] 
                <select
                    name="baggage"
                    [ngModel]="detail?.baggage"
                >
                    <option
                        *ngFor="let item of baggage"
                        [ngValue]="item.key"
                    >
                        {{item.value}}
                    </option>
                </select>

                -->
            </div>
            
            <button type='submit' [disabled]="form.invalid"> 
                Update passenger 
            </button>
            <br>

            <div>{{form.value | json}}</div>
            <div>Valid: {{form.valid | json}}</div>
            <div>Invalid: {{form.invalid | json}}</div>
        </form>
    `
})

export class PassengerFormComponent {

    @Input()
    detail: Passenger;
  
    @Output()
    update: EventEmitter<Passenger> = new EventEmitter<Passenger>();
  
    baggage: Baggage[] = [{
      key: 'none',
      value: 'No baggage'
    },{
      key: 'hand-only',
      value: 'Hand baggage'
    },{
      key: 'hold-only',
      value: 'Hold baggage'
    },{
      key: 'hand-hold',
      value: 'Hand and hold baggage'
    }];
  
    toggleCheckIn(checkedIn: boolean) {
      if (checkedIn) {
        this.detail.checkInDate = Date.now();
      }
    }
  
    handleSubmit(passenger: Passenger, isValid: boolean) {
      if (isValid) {
        this.update.emit(passenger);
      }
    }
  
  }




