package eCommerceBackend.eCommerceBackend.HelloWorld;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import eCommerceBackend.eCommerceBackend.Product.Product;
import eCommerceBackend.eCommerceBackend.Product.ProductRepo;

@RestController
public class HelloWorld {
    
    @Autowired
    ProductRepo pr;
    @GetMapping("/HelloWorld")
    public String Hello()
    {
        return "Hello World";
    }
    // @GetMapping("/test")
    // public Set<Product> geProduct()
    // {

    //     return pr.findbypid();
    // }
}
