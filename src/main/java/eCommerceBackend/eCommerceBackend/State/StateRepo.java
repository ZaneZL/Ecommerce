package eCommerceBackend.eCommerceBackend.State;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import eCommerceBackend.eCommerceBackend.Country.Country;
import java.util.List;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(path="states")
public interface StateRepo extends JpaRepository<State, Integer>{

    List<State> findByCountryCode(@Param("code") String code);
}
