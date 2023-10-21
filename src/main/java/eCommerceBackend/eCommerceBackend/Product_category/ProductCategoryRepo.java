package eCommerceBackend.eCommerceBackend.Product_category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
//repositoryRestResource
@RepositoryRestResource(path="productcategorys")//collectionResourceRel = "productCateroy",
public interface ProductCategoryRepo extends JpaRepository<ProductCategory, Integer> {
    
}
