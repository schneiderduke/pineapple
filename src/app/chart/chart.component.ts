import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Chart, registerables } from 'chart.js';

import { Device } from '../models/device.model';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  viewProviders: [MatExpansionPanel]

})
export class ChartComponent implements OnInit {
  ctx: any;
  @Input()
  data: any[] = [];
  modelMap: any = {};
  categoryMap: any = {};
  groupMap: any = {};
  myChart: Chart = null;
  graphShow: {
    devices: true,
    group: false,
    category: false,
  }
  constructor() { }

  ngOnInit(): void {
    Chart.register(...registerables);
    for(let i = 0; i < this.data.length; i++){
      if(!this.modelMap.hasOwnProperty(this.data[i].model)){
        this.modelMap[this.data[i].model] = 1;
      } else {
        this.modelMap[this.data[i].model]++;
      }
      if(!this.categoryMap.hasOwnProperty(this.data[i].category)){
        this.categoryMap[this.data[i].category] = 1;
      } else {
        this.categoryMap[this.data[i].category]++;
      }
      if(!this.groupMap.hasOwnProperty(this.data[i].group)){
        this.groupMap[this.data[i].group] = 1;
      } else {
        this.groupMap[this.data[i].group]++;
      }
    }    
    this.setupChart('model');
    
  }

  changeGraph(): void {

  }

  setupChart(type: string): void {

    if(this.myChart) {
      this.myChart.destroy();
    }
    this.ctx = document.getElementById('myChart');
    let keys;
    let values;

    if(type === 'model'){
      keys = Object.keys(this.modelMap);
      values = Object.values(this.modelMap);
    }
    if(type === 'category'){
      keys = Object.keys(this.categoryMap);
      values = Object.values(this.categoryMap);
    }
    if(type === 'group'){
      keys = Object.keys(this.groupMap);
      values = Object.values(this.groupMap);
    }

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: keys,
          datasets: [{
              label: 'Devices',
              data: values,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  }
}
