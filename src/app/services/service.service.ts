import { Injectable } from '@angular/core';
import { ServiceModel } from '../models/service.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  services = new BehaviorSubject<ServiceModel[]>([]);

  constructor(private http: HttpClient) {}

  addService(service: ServiceModel) {
    let services = this.services.value;
    services.push(service);
    this.services.next(services);
  }
  getService(id: string): any {
    return this.services.value.filter((service) => service.id === id)[0];
  }
  public getServices(): Observable<ServiceModel[]> {
    if (this.services.getValue().length === 0) {
      this.loadServices();
    }
    return this.services.asObservable();
  }

  private loadServices(): void {
    this.http.get<ServiceModel[]>('../assets/json/data.json').subscribe((data) => {
      this.services.next(data);
    });
  }
  updateService(service: ServiceModel): string {
    let services = this.services.value;
    service.id = service.id ? service.id : this.createId().toString();
    let objIndex = services.findIndex((obj) => obj.id == service.id);
    if (objIndex >= 0) {
      services[objIndex] = service;
    } else {
      services.push(service);
    }
    this.services.next(services);
    return service.id;
  }
  createId() {
    let services = this.services.value;
    let max = parseInt(
      services.reduce((prev, current) => (parseInt(prev.id, 10) > parseInt(current.id, 10) ? prev : current)).id,
      10
    );
    return ++max;
  }
}
