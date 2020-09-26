import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddComponent } from './components/add/add.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { EditComponent } from './components/edit/edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import {AngularFireDatabaseModule} from '@angular/fire/database';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    AgGridModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatSelectModule,
    MatOptionModule

  ],
  providers: [BnNgIdleService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
