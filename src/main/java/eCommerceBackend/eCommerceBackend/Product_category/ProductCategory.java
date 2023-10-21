package eCommerceBackend.eCommerceBackend.Product_category;


import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import eCommerceBackend.eCommerceBackend.Product.*;
@Entity
@Table(name="productcategory")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name="category_id")
    private Integer id;

     //foreign key being referenced
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productcategory")
    private Set<Product> Product;
    
    @Column(name="categoryName")
    private String category_name;

    

    public ProductCategory(){}
    public ProductCategory(Integer id, String category_name) {
        this.id = id;
        this.category_name = category_name;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getCategory_name() {
        return category_name;
    }
    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }
}
