import { createStore } from 'vuex'
import shop from '@/api/shop'

export default createStore({
  state: {
    products: [],
    cart: [],
    cartStatus: null
  },
  getters: {
    availableProducts (state) {
      return state.products.filter((prod) => prod.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find((prod) => prod.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      )
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
    },
    emptyCart (state) {
      state.cart = []
    },
    changeCartStatus (state, status) {
      state.cartStatus = status
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
    },
    checkout ({ commit }) {
      shop.buyProducts(this.state.cart, () => {
        commit('emptyCart')
        commit('changeCartStatus', 'success')
      }, () => {
        commit('changeCartStatus', 'failed')
      })
    }
  },
  modules: {}
})
