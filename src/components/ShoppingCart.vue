<template>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.title">
        {{ product.title }} - ${{ product.price }} - {{product.quantity}}
      </li>
    </ul>
    <h4>Total - ${{total.toFixed(2)}}</h4>
    <button @click="$store.dispatch('checkout')" v-if="total">Checkout</button>
    <p>{{$store.state.cartStatus}}</p>
</template>
<script>

export default {
  name: 'ShoppingCart',
  computed: {
    products () {
      return this.$store.getters.cartProducts
    },
    total () {
      return this.$store.getters.cartTotal
    }
  }
}
</script>
