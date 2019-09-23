import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  title = 'Crowd Funded Projects';
  type = 'PieChart';
  data = [
    ['Success', 25.0],
    ['Ongoing', 35.0],
    ['Failure', 40.0],
   
  ];
  columnNames = ['Projects','Percentage'];
  options = {};
  width = 550;
  height = 440;

  constructor() { }

  ngOnInit() {
  }

}
