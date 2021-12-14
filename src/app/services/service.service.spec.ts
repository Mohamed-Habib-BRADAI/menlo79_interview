import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import auth from '../../assets/json/auth_config.json';
import { ServiceModel } from '../models/service.model';
import { ServiceService } from './service.service';

describe('ServiceService', () => {
  let service: ServiceService;
  const servicesList = [
    {
      id: '1',
      name: 'service1',
      startDate: '2021-08-19'
    },
    {
      id: '2',
      name: 'service2',
      startDate: '2021-07-05'
    }
  ];
  let serviceObj: ServiceModel = new ServiceModel();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: auth.domain,
          clientId: auth.clientId
        })
      ]
    });
    service = TestBed.inject(ServiceService);
    serviceObj = {
      id: '3',
      name: 'service3',
      startDate: '2020-03-11'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('add a service in empty services list', () => {
    service.addService(serviceObj);
    service.services.subscribe((services) => {
      expect(services).toContain(serviceObj);
      expect(services.length).toBe(1);
    });
    expect(service).toBeTruthy();
  });
  it('add a service in services list containing values', () => {
    service.services.next(servicesList);
    service.addService(serviceObj);
    service.services.subscribe((services) => {
      expect(services).toContain(serviceObj);
      expect(services.length).toBe(servicesList.length);
    });
  });
  it('should get a service by id', () => {
    service.services.next(servicesList);
    service.addService(serviceObj);
    expect(service.getService(serviceObj.id)).toEqual(serviceObj);
  });

  it('should update a service', () => {
    service.services.next(servicesList);
    let serviceObj1 = {
      id: '1',
      name: 'updatedService1',
      startDate: '2020-09-20'
    };
    service.updateService(serviceObj1);
    service.services.subscribe((services) => {
      expect(services).toContain(serviceObj1);
    });
  });
  it('should create an id', () => {
    service.services.next(servicesList);
    expect(service.createId()).toBe(4);
  });
});
