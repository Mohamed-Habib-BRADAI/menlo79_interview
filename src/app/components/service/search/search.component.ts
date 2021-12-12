import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModel } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private service: ServiceService, private router: Router) {}
  dataSource: ServiceModel[] = [];
  columnsToDisplay: string[] = [];

  ngOnInit(): void {
    this.service.getServices().subscribe((services) => {
      this.dataSource = services;
    });
    this.columnsToDisplay = Object.keys(new ServiceModel());
  }
  getdetails(service: ServiceModel) {
    this.router.navigate(['service', 'details', service.id]);
  }
  create() {
    this.router.navigate(['service', 'edit', '0']);
  }
}
