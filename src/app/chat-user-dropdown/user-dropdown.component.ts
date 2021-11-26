import { Component, OnInit } from '@angular/core';
import { AppStateChangeService } from '../app-state-change.service';
import { userOption } from '../type-lib';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {

  userOptions!: Array<userOption>;
  
  selectedUser!: string;

  constructor(private appStateChangeService: AppStateChangeService) { }

  ngOnInit(): void {
    this.userOptions = this.appStateChangeService.userOptions;
    this.selectedUser = this.userOptions[0].user!;
    this.onUserChange();
  }

  onUserChange() {
    this.appStateChangeService.selectedUser = this.selectedUser;
    this.appStateChangeService.userChangeEvent.emit();
  }

}
