import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>()
  totalQuantity: Subject<number> = new Subject<number>()

  constructor() { }

  addToCart(cartItem: CartItem) {
    // check if we already have item in our cart
    let alreadyExistsInCart: boolean = false 
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0 ){
      // find item in the cart based on item id
      existingCartItem = this.cartItems.find (tempCartItem => tempCartItem.id === cartItem.id) 

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined)
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++
    }
    else {
      // add items to cartItems array
      this.cartItems.push(cartItem)
    }

    // compute cart total price and product quantity
    this.computeCartTotal()

  }

  computeCartTotal() {
    let totalPriceValue: number = 0
    let totalQuantityValue: number = 0

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice
      totalQuantityValue += currentCartItem.quantity 
    }

    // publish new values .. all subscribers will receive the new data

    this.totalPrice.next(totalPriceValue)
    this.totalQuantity.next(totalQuantityValue)
  }

  decrementQuantity(cartItem: CartItem) {

    cartItem.quantity--

    if (cartItem.quantity === 0) {
      this.remove(cartItem)
    }
    else {
      this.computeCartTotal()
    }
    
  }

  remove(cartItem: CartItem) {
    // get index of item in array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id)

    // if found, remove the item from the array at the given index

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1)

      this.computeCartTotal()
    }
  }
}
