import { createStore } from 'vuex'
import shop from '@/api/shop'

export default createStore({
  state: {
    products: []
  },
  getters: {
    availableProducts (state) {
      return state.products.filter(prod => prod.inventory > 0)
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      shop.getProducts((products) => {
        commit('setProducts', products)
      })
    }
  },
  modules: {
  }
})
