package eCommerceBackend.eCommerceBackend.Product;



import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import eCommerceBackend.eCommerceBackend.Product_category.ProductCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import eCommerceBackend.eCommerceBackend.Product_category.*;
@Entity
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name="productId")
    private Integer productId;

    //foreign key reference
    @JoinColumn(name="category_id", nullable=false)
    @ManyToOne(fetch=FetchType.LAZY)
    private ProductCategory productcategory;

    @Column(name="sku")
    private String sku;
    @Column(name="product_name")
    private String product_name;
    @Column(name="description")
    private String description;
    @Column(name="unit_price")
    private float unit_price;
    @Column(name="image_url")
    private String image_url;
    @Column(name="active")
    private boolean active;
    @Column(name="units_in_stock")
    private Integer units_int_stock;
    @Column(name="date_created")
    @CreationTimestamp
    private LocalDate date_created;
    @Column(name="last_updated")  
    @UpdateTimestamp
    private LocalDate last_updated;

    


    public Product(Integer id, String sku, String name, String description, float unit_price, String image_url,
            boolean active, Integer units_in_stock, LocalDate date_created, LocalDate last_updated) {
        this.productId = id;
        this.sku = sku;
        this.product_name = name;
        this.description = description;
        this.unit_price = unit_price;
        this.image_url = image_url;
        this.active = active;
        this.units_int_stock = units_in_stock;
        this.date_created = date_created;
        this.last_updated = last_updated;
    }
    private Product(){}
    public Integer getProductId() {
        return productId;
    }
    public void setProductId(Integer id) {
        this.productId = id;
    }
    public String getSku() {
        return sku;
    }
    public void setSku(String sku) {
        this.sku = sku;
    }
    public String getProduct_name() {
        return product_name;
    }
    public void setProduct_name(String name) {
        this.product_name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public float getUnit_price() {
        return unit_price;
    }
    public void setUnit_price(float unit_price) {
        this.unit_price = unit_price;
    }
    public String getImage_url() {
        return image_url;
    }
    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
    public boolean getActive() {
        return active;
    }
    public void setActive(Boolean active) {
        this.active = active;
    }
    public Integer getUnits_int_stock() {
        return units_int_stock;
    }
    public void setUnits_int_stock(Integer units_in_stock) {
        this.units_int_stock = units_in_stock;
    }
    public LocalDate getDate_created() {
        return date_created;
    }
    public void setDate_created(LocalDate date_created) {
        this.date_created = date_created;
    }
    public LocalDate getLast_updated() {
        return last_updated;
    }
    public void setLast_updated(LocalDate last_updated) {
        this.last_updated = last_updated;
    }
    // public Product_category getCategory_id() {
    //     return product_category;
    // }
    // public void setCategory_id(Integer category_id) {
    //     this.product_category = product_category;
    // }
}
