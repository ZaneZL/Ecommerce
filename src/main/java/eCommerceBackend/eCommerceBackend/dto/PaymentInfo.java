package eCommerceBackend.eCommerceBackend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PaymentInfo {
    //in stripe the smallest units in currency is the beggining so 12.54= 1254
    private int amount;
    private String currency;
}
