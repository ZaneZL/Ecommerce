package eCommerceBackend.eCommerceBackend.Product;


import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;




//repositoryRestResource 1.json entry 2.path
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(path="products")//collectionResourceRel = "product",
public interface ProductRepo extends JpaRepository<Product,Integer> {
    
   @Query(nativeQuery = true, value="SELECT * FROM product WHERE category_id = :id")
   Page<Product> findBycategoryId(@Param("id") Integer id, Pageable pageable);
   
   //query in sql to retrieve all product containing str
   @Query(nativeQuery = true, value="SELECT * FROM product WHERE product.product_name LIKE CONCAT('%', :name, '%') ")
   Page<Product> findByNameContaining(@Param("name") String product_name, Pageable page);

}
