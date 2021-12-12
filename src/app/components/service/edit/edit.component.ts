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
    id: '',
    name: '',
    startDate: ''
  };

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
    let serviceId = this.route.snapshot.paramMap.get('id') || '';
    this.serviceObj = this.service.getService(serviceId);
    this.form = this.formBuilder.group({
      id: [this.serviceObj ? this.serviceObj.id : ''],
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
    this.service.updateService(this.form.value);
    this.router.navigate(['service', 'details', this.form.value.id]);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  createFormGroup() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      startDate: new FormControl('')
    });
  }

  back() {
    this.location.back();
  }
}
