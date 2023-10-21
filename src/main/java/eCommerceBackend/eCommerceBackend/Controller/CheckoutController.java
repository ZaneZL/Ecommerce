package eCommerceBackend.eCommerceBackend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import eCommerceBackend.eCommerceBackend.Service.CheckoutService;
import eCommerceBackend.eCommerceBackend.dto.PaymentInfo;
import eCommerceBackend.eCommerceBackend.dto.Purchase;
import eCommerceBackend.eCommerceBackend.dto.PurchaseResponse;



@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService)
    {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase)
    {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentinfo) throws StripeException
    {
        PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentinfo);
         String paymentStr= paymentIntent.toJson();
         return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }
}
