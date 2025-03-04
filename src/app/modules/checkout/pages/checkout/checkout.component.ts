import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { CartService } from 'src/app/core/services/cart.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false,
})
export class CheckoutComponent {
  userData: User = {
    name: '',
    lastName: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      country: 'Colombia'
    },
    cardDetails: {
      cardNumber: '',
      cvc: '',
      expirationDate: ''
    }
  };

  total = 0;

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
    });
  }  

  async processPayment() {
    const toast = await this.toastController.create({
      message: 'Procesando pago...',
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    await toast.present();
  
    const loading = await this.loadingController.create({
      message: 'Procesando...',
      duration: 3000
    });
    await loading.present();
  
    await loading.onDidDismiss();
  
    const finalTotal = this.total;
  
    this.cartService.clearCart();
  
    this.router.navigate(['/checkout/summary'], {
      state: {
        userData: { ...this.userData },
        total: finalTotal 
      }
    });
  }
  
}
