import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { EditInvoiceFormComponent } from './components/edit-invoice-form/edit-invoice-form.component';



import { invoiceReducer } from './store/invoice.reducer';
import { InvoiceEffects } from './store/invoice.effects';
import { HttpClientModule } from '@angular/common/http';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    InvoiceFormComponent,
    EditInvoiceFormComponent,
    
    FilterDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ invoices: invoiceReducer }),
    EffectsModule.forRoot([InvoiceEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
