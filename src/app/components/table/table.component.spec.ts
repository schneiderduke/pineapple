import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DeviceTable } from 'src/app/models/device-table.model';
import { Device } from 'src/app/models/device.model';
import { DemoMaterialModule } from 'src/app/modules/material.module';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { DeviceService } from 'src/app/services/device.service';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockService: jasmine.SpyObj<DeviceService>;
  const devicesFixture: Device[] = [
    {
      device_category: 'Wand',
      group: 'Unicorn Hair',
      model: 'Ash',
      person: 'Cedric Diggory'
    },
    {
      device_category: 'Wand',
      group: 'Pheonix Feather',
      model: 'Holly',
      person: 'Harry Potter'
    },
    {
      device_category: 'Wand',
      group: 'Thestral Hair',
      model: 'Elder wood',
      person: 'Albus Dumbledore'
    }
  ];

  const devicesTableFixture: DeviceTable = {
    collection_entries: devicesFixture.length,
    headers: [
      'model',
      'group',
      'device_category',
      'person'
    ],
    id: 'devices',
    rows: devicesFixture,
    title: 'Devices'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TableComponent, 
        FilterPipe
      ],
      imports: [
        DemoMaterialModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: DeviceService,
         useValue: jasmine.createSpyObj('DeviceService', ['getAll'])
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    mockService = TestBed.get(DeviceService);
    mockService.getAll.and.returnValue(of(devicesTableFixture));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set deviceTable to response from service', () => {
      component.deviceTable = null;
      component.deviceFilter = "";
      component.ngOnInit();
      expect(component.deviceTable).toEqual(devicesTableFixture);
    });
  });
});
