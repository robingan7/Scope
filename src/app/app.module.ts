import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingC} from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoutloginComponent } from './scoutlogin/scoutlogin.component';
import { AuthGuard } from './auth.guard';
import { ScoutloginServiceService } from './scoutlogin-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ScoutloginComponent,
    routingC
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard,ScoutloginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
