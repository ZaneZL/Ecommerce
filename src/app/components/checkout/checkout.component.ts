import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCaradYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  //intitialize stripe api
  stripe = Stripe(environment.stripePublishableKey);
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  constructor(private formBuilder: FormBuilder,
    private ShopFormservice: ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.setupStripePaymntForm();
    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      BillingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        // cardType:[''],
        // cnameOnCard:[''],
        // cardNumber:[''],
        // SecurityCode:[''],
        // expirationMonth: [''],
        // expirationYear: ['']
      })
    });
    // //populate credit card months and years
    // const startMonth: number = new Date().getMonth() + 1;
    // console.log(startMonth);
    // this.ShopFormservice.getCreditCardMonths(startMonth).subscribe(
    //   data=>{
    //     console.log("retrived credit card months: " + JSON.stringify(data));
    //     this.creditCardMonths=data;
    //   }
    // )
    // this.ShopFormservice.getCreditCardYears().subscribe(
    //   data=>{
    //     console.log("retrived credit card years: " + JSON.stringify(data));
    //     this.creditCaradYears=data;
    //   }
    // );

    //populate countries
    this.ShopFormservice.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
  }
  setupStripePaymntForm() {
    //get a handle to stripe elements
    var elements = this.stripe.elements();
    //create a card element
    this.cardElement = elements.create('card', { hidePostalCode: true });
    //add an instnace of card ui component into the card-element div
    this.cardElement.mount('#card-element');
    //add event binding for the change event on the card elemet
    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";

      }
      else if (event.error) {
        this.displayError.textContent = event.error.message;
      }
    });
  }
  reviewCartDetails() {
    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    //subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  }

  onSubmit() {
    // console.log("Handling the submit button");
    // console.log(this.checkoutFormGroup.get('customer')?.value);
    // console.log("the shipping address is "+ this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    // console.log("the shipping address is "+ this.checkoutFormGroup.get('shippingAddress')?.value.state.name);

    //set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    //get cart
    const cartItems = this.cartService.cartItems;
    //create orderitems from caritems
    //long way
    // let orderItems: OrderItem[]=[];
    // for(let i=0;i<cartItems.length;i++)
    // {
    //   orderItems[i]=new OrderItem(cartItems[i]);
    // }
    // or 
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    let purchase = new Purchase();
    //set up purchase
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populate purchase shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
    if (purchase.shippingAddress) {
      purchase.shippingAddress.state = shippingState.name;
      purchase.shippingAddress.country = shippingCountry.name;
    }
    //billing address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
    if (purchase.shippingAddress) {
      purchase.shippingAddress.state = billingState.name;
      purchase.shippingAddress.country = billingCountry.name;
    }
    //populate purchase order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    //compute payment info
    this.paymentInfo.amount = this.totalPrice * 100;
    this.paymentInfo.currency = "USD";
    //@TODO validation
    //!this.checkoutFormGroup.invalid && 
    if ( this.displayError.textContent === "") {
      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method:
              {
                card: this.cardElement
              }
            }, { handleActions: false })
            .then((result: any) => {
              if (result.error) {
                alert(`There was an Error: ${result.error.message}`);
              } else {
                this.checkoutService.placeOrder(purchase).subscribe({
                  next: (response: any) => {
                    alert(`Your order has been recieved. \n Order tracking number: ${response.orderTrackingNumber}`);
                    this.resetCart();
                  },
                  error: (err: any) => {
                    alert(`There was an Errr: ${err.message}`);
                  }
                });
              }
            })
        }
      );
    }



    // //call rest api
    // this.checkoutService.placeOrder(purchase).subscribe(
    //   {
    //     next: response=>{
    //       alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`)
    //       this.resetCart();
    //     },
    //     error: err=>
    //     {
    //       alert(`Problem when placing order: ${err.message}`);
    //     }
    //   }
    // );
  }
  resetCart() {
    //reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //reset the form
    this.checkoutFormGroup.reset();
    //navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndyears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentyear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;
    if (currentyear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.ShopFormservice.getCreditCardMonths(startMonth).subscribe
      (
        data => {
          this.creditCardMonths = data;
        }
      );
  }
  getStates(FormGroupName: string) {
    const FormGroup = this.checkoutFormGroup.get(FormGroupName);
    const countryCode = FormGroup?.value.country.code;
    const countryName = FormGroup?.value.country.name;
    console.log(`${FormGroupName} country code: ${countryCode}`);
    console.log(`${FormGroupName} country code: ${countryName}`);

    this.ShopFormservice.getState(countryCode).subscribe(
      data => {
        if (FormGroupName === "shippingAddress") {

          this.shippingAddressStates = data;
        }
        else if (FormGroupName === "BillingAddress") {

          this.billingAddressStates = data;
        }
        else {

        }

        FormGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}
