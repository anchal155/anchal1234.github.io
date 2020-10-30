import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedOptionIndType = '1';
  selectedOptionGstReg = '1';
  selectedOptionState = '1';
  selectedOptionCountry = '1';
  selectedOptionCity = '1';

  constructor() { }

  ngOnInit(): void {
  }

 

}
