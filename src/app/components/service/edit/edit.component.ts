import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { ServiceModel } from 'src/app/models/service.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  serviceObj: ServiceModel | any = new ServiceModel();
  submitted = false;
  form: FormGroup;

  formErrors = {
    name: '',
    startDate: ''
  };
  serviceId: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id') || '';
    this.serviceObj = this.service.getService(this.serviceId);
    this.form = this.formBuilder.group({
      name: [
        this.serviceObj ? this.serviceObj.name : '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ],
      startDate: [this.serviceObj ? this.serviceObj.startDate : '', [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    let service = this.form.value;
    service.id = this.serviceId;
    service.startDate =
      typeof service.startDate === 'object' ? service.startDate.toISOString().split('T')[0] : service.startDate;
    this.serviceId = this.service.updateService(service);
    this.router.navigate(['service', 'details', this.serviceId]);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      startDate: new FormControl('')
    });
  }

  back() {
    this.location.back();
  }
}
