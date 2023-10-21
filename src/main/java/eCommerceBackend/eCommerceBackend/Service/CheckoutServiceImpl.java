package eCommerceBackend.eCommerceBackend.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import eCommerceBackend.eCommerceBackend.Customer.Customer;
import eCommerceBackend.eCommerceBackend.Customer.CustomerRepo;
import eCommerceBackend.eCommerceBackend.OrderItem.OrderItem;
import eCommerceBackend.eCommerceBackend.Orders.Order;
import eCommerceBackend.eCommerceBackend.dto.PaymentInfo;
import eCommerceBackend.eCommerceBackend.dto.Purchase;
import eCommerceBackend.eCommerceBackend.dto.PurchaseResponse;

import jakarta.transaction.Transactional;


@Service
public class CheckoutServiceImpl implements CheckoutService{
    
    private CustomerRepo customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepo customerRepository,
                               @Value("${stripe.key.secret}") String secretKey)
    {
        this.customerRepository=customerRepository;
        //inject stripe api with secret key
        Stripe.apiKey=secretKey;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // @TODO 
        //retireve the order info from dto
        Order order=purchase.getOrder();
        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach((item->order.add(item)));
        //populate order with bvillingaddress nad shipping address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        //populate customer iwth order save to the database
        Customer customer = purchase.getCustomer();
        customer.add(order);
        //return a response
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }
    private String generateOrderTrackingNumber()
    {
        //generate a random uuid number
        return UUID.randomUUID().toString();
        
    }
    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentinfo) throws StripeException {
       List<String> paymentMethodTypes = new ArrayList<>();
       paymentMethodTypes.add("card");

       Map<String,Object> params  = new HashMap<>();
       params.put("amount", paymentinfo.getAmount());
       params.put("currency", paymentinfo.getCurrency());
       params.put("payment_method_types", paymentMethodTypes);
       return PaymentIntent.create(params);
       
    }
}
