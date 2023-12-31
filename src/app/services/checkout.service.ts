import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl='http://localhost:8080/api/checkout/purchase';
  
  private purchasetUrl = environment.yagachickapiUrl +'/checkout/purchase';

  private paymentIntentUrl = environment.yagachickapiUrl +'/checkout/payment-intent';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>
  {
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl,paymentInfo);
  }
}
