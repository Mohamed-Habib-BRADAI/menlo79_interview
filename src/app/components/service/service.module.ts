import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service-routing.module';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [SearchComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatNativeDateModule
  ]
})
export class ServiceModule {}
