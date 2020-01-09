import { SET_USER } from './type';

const mutations = {
    [SET_USER] (state, payload) {
        Object.assign(state, payload);
    },
}

export default mutations;