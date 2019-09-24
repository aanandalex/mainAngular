import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  success: number;
  crowdfunding: number;
  total: number;
  title = 'Crowd Funded Projects';
  type = 'PieChart';
  data = [
    ['Success', 75],
    ['CrowdFunding', 25]
  ];


  columnNames = ['Projects', 'Percentage'];
  options = {};
  width = 550;
  height = 440;

  constructor(private dashService: DashService) { }

  isLoading = false;


  ngOnInit() {
    this.isLoading = true;
    this.dashService.crowdFunding().subscribe((Response: Array<Object>) => {
      this.isLoading = false;
      this.crowdfunding = Response.length;
    })

    this.isLoading = true;
    this.dashService.projectSuccess().subscribe((Response: Array<Object>) => {
      this.isLoading = false;
      this.success = Response.length;
    })

    this.isLoading = true;
    this.dashService.totalNoOfProject().subscribe((Response: Array<Object>) => {
      this.isLoading = false;
      this.total = Response.length;
    })
  }

}
