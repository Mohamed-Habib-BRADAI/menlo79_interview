import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceModel } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  serviceObj: ServiceModel | any = new ServiceModel();

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    let serviceId = this.route.snapshot.paramMap.get('id') || '';
    this.serviceObj = this.service.getService(serviceId);
  }
  edit() {
    this.router.navigate(['service', 'edit', this.serviceObj.id]);
  }
  back() {
    this.router.navigate(['service']);
  }
}
