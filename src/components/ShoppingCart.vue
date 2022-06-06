<template>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.title">
        {{ product.title }} - ${{ product.price }} - {{product.quantity}}
      </li>
    </ul>
    <h4>Total - ${{total.toFixed(2)}}</h4>
    <button @click="$store.dispatch('checkout')" v-if="total">Checkout</button>
    <p>{{cartStatus}}</p>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    }),
    ...mapState({
      cartStatus: 'cartStatus'
    })
  }
}
</script>
