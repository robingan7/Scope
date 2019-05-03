import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingC} from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoutloginComponent } from './scoutlogin/scoutlogin.component';
import { AuthGuard } from './auth.guard';
import { ScoutloginServiceService } from './scoutlogin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatSidenavModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { fullWidthCellRenderer } from './full-width-col/full-width-col.component';
//import { DataTablesModule } from 'angular-datatables';
//import { DataTableComponent } from '../app/data-table/data-table.component';
@NgModule({
  declarations: [
    AppComponent,
    ScoutloginComponent,
    routingC,
    fullWidthCellRenderer
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    AgGridModule.withComponents([fullWidthCellRenderer])
  ],
  providers: [AuthGuard,ScoutloginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
