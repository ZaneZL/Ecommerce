package eCommerceBackend.eCommerceBackend.Config;
import eCommerceBackend.eCommerceBackend.Product_category.*;
import eCommerceBackend.eCommerceBackend.State.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import eCommerceBackend.eCommerceBackend.Country.Country;
import eCommerceBackend.eCommerceBackend.Product.*;

@Configuration
public class RestConfig implements RepositoryRestConfigurer{

    
    private EntityManager entityManager;

    //diable http methods forproductcategory:put,post,delete
    HttpMethod[] theUnsupportedActions={HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};
    @Autowired
    public RestConfig(EntityManager theEntityManager)
    {
        entityManager=theEntityManager;
    }
    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theunsupportedHttpMethods)
    {
        config.getExposureConfiguration()
            .forDomainType(theClass)
            .withItemExposure((metdata,httpMethods)->httpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metdata,httpMethods)->httpMethods.disable(theUnsupportedActions));
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors)
    {
        disableHttpMethods(Product.class, config, theUnsupportedActions);
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(State.class, config, theUnsupportedActions);
            
        //expose the id
        expose(config);
    }

    private void expose(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
        List<Class> entityClasses=new ArrayList<>();
        for(EntityType tempEntityType: entities)
        {
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
