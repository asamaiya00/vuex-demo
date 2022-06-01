<template>
  <div>
    <h1>Product list</h1>
    <ul>
      <li v-for="product in products" :key="product.title">
        {{ product.title }} - {{ product.price }}
        <button @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  computed: {
    products () {
      return this.$store.getters.availableProducts
    }
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
