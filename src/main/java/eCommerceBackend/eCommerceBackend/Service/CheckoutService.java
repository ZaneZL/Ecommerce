package eCommerceBackend.eCommerceBackend.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import eCommerceBackend.eCommerceBackend.dto.PaymentInfo;
import eCommerceBackend.eCommerceBackend.dto.Purchase;
import eCommerceBackend.eCommerceBackend.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentinfo) throws StripeException;
}
