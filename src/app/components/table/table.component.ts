import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { DeviceTable } from 'src/app/models/device-table.model';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterContentChecked {
  deviceFilter: string;
  deviceTable: DeviceTable;
  totalLength: number;
  filteredAmount = { count:0 };
  constructor(private deviceService: DeviceService, private cdr: ChangeDetectorRef) { }
  ngAfterContentChecked() : void {
    this.cdr.detectChanges();
  } 
  ngOnInit(): void {
    this.setupTable();
  }

  private setupTable(): void {
    this.deviceService.getAll().subscribe((data: DeviceTable) => {
      this.deviceTable = data;
      this.totalLength = this.deviceTable.rows.length;
      this.filteredAmount.count = this.totalLength;
    });
  }

  public receiveFilter(filter: string): void {
    this.deviceFilter = filter;
  }

  public orderByCategory(category: string): void {

    this.deviceTable.rows = this.deviceTable.rows
    .sort((a,b) => {
      if(a[category] > b[category] || (a[category] === ''))
      {
        return 1;
      } if (a[category] === b[category] || (b[category] === '')) {
        return 0;
      } else {
        return -1;
      }     
    })

  }
}
