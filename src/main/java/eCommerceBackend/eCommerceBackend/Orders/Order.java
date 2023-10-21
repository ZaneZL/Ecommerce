package eCommerceBackend.eCommerceBackend.Orders;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.ManyToAny;
import org.hibernate.annotations.UpdateTimestamp;

import eCommerceBackend.eCommerceBackend.Address.Address;
import eCommerceBackend.eCommerceBackend.Customer.Customer;
import eCommerceBackend.eCommerceBackend.OrderItem.OrderItem;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    @Column(name="orderTrackingNumber")
    private String orderTrackingNumber;
    @Column(name="totalPrice")
    private BigDecimal totalPrice;
    @Column(name="totalQuantity")
    private int totalQuantity;
    @Column(name="status")
    private String status;
    @Column(name="date_created")
    @CreationTimestamp
    private LocalDate dateCreated;
    @Column(name="last_created")
    @UpdateTimestamp
    private LocalDate lastUpdated;



    @OneToMany(cascade= CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();
    @ManyToOne
    @JoinColumn(name="customer_id", referencedColumnName="id")
    private Customer customer;
    
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="shipping_address_id", referencedColumnName="id")
    private Address shippingAddress;
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="billing_address_id", referencedColumnName="id")
    private Address BillingAddress;



    public void add(OrderItem item)
    {
        if(item != null)
        {
            if (orderItems == null)
            {
                orderItems = new HashSet<>();
            }
            orderItems.add(item);
            item.setOrder(this);
        }
    }
}
