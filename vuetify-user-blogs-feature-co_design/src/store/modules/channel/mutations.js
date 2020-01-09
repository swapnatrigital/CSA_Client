import { SET_CART, SET_CHANNELS} from './type'
const mutations = {
    [SET_CHANNELS](state, payload) {
        state.channels = payload
    },
    [SET_CART](state, payload) {
        state.cart = payload
    },
}

export default mutations;