import * as types from "./type"

export default {
    setUser({ commit }, data) {
        commit(types.SET_USER, data);
    }, 
}
