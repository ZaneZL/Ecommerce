package eCommerceBackend.eCommerceBackend.dto;

import java.util.Set;

import eCommerceBackend.eCommerceBackend.Address.Address;
import eCommerceBackend.eCommerceBackend.Customer.Customer;
import eCommerceBackend.eCommerceBackend.OrderItem.OrderItem;
import eCommerceBackend.eCommerceBackend.Orders.Order;
import lombok.Data;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
