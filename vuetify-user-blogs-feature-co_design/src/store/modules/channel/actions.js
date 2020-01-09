import * as types from "./type"

export default {
    setChannel({ commit }, data) {
        commit(types.SET_CHANNELS, data)
    },
    setCart({ commit }, data) {
        commit(types.SET_CART, data)
    },
}