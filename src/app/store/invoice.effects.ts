import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as InvoiceActions from '../store/invoice.actions';
import { InvoiceService } from '../services/invoice.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { Store } from '@ngrx/store';

@Injectable()
export class InvoiceEffects {
  private actions$ = inject(Actions);
  constructor(private invoiceService: InvoiceService, private store: Store) {}

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap(() =>
        this.invoiceService.getInvoices().pipe(
          map((invoices: Invoice[]) =>
            InvoiceActions.loadInvoicesSuccess({ invoices })
          ),
          catchError((error) =>
            of(InvoiceActions.loadInvoicesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.addInvoice),
      mergeMap((action) =>
        this.invoiceService.addInvoice(action.invoice).pipe(
          map((invoice: Invoice) =>
            InvoiceActions.addInvoiceSuccess({ invoice })
          ),
          catchError((error) =>
            of(InvoiceActions.addInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateInvoiceStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoiceStatus),
      mergeMap((action) =>
        this.invoiceService.updateStatus(action.id, action.status).pipe(
          map((updatedInvoice: Invoice) =>
            InvoiceActions.updateInvoiceStatusSuccess({
              invoice: updatedInvoice,
            })
          ),
          catchError((error) =>
            of(
              InvoiceActions.updateInvoiceStatusFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.deleteInvoice),
      mergeMap((action) =>
        this.invoiceService.deleteInvoice(action.id).pipe(
          map(() => InvoiceActions.deleteInvoiceSuccess({ id: action.id })),
          catchError((error) =>
            of(InvoiceActions.deleteInvoiceFailure({ error }))
          )
        )
      )
    )
  );
}
