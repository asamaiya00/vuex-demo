<template>
  <div>
    <h1>Product list</h1>
    <ul>
      <li v-for="product in products" :key="product.title">
        {{ product.title }} - ${{ product.price }} - {{product.inventory}}
        <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'ProductList',
  computed: {
    ...mapState({
      products: 'products'
    }),
    ...mapGetters({
      productIsInStock: 'productIsInStock'
    })
  },
  methods: {
    addProductToCart (product) {
      this.$store.dispatch('addProductToCart', product)
    }
  },
  mounted () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
