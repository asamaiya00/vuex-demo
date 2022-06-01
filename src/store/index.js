import { createStore } from 'vuex'
import shop from '@/api/shop'

export default createStore({
  state: {
    products: [],
    cart: []
  },
  getters: {
    availableProducts (state) {
      return state.products.filter((prod) => prod.inventory > 0)
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart (state, productId) {
      state.cart.push({ id: productId, quantity: 1 })
    },
    increaseItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decreaseProductInventory (state, product) {
      product.inventory--
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      shop.getProducts((products) => {
        commit('setProducts', products)
      })
    },
    addProductToCart ({ state, commit }, product) {
      if (product.inventory > 0) {
        const cartItem = state.cart.find((item) => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('increaseItemQuantity', cartItem)
        }
        commit('decreaseProductInventory', product)
      }
    }
  },
  modules: {}
})
