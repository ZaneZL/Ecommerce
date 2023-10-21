package eCommerceBackend.eCommerceBackend.OrderItem;


import java.math.BigDecimal;

import eCommerceBackend.eCommerceBackend.Orders.Order;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="address")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    @Column(name="image_url")
    private String image_url;
    @Column(name="unit_price")
    private BigDecimal unit_price;
    @Column(name="quantity")
    private int quantity;
    @Column(name="product_id")
    private int product_id;
 
    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;

}
