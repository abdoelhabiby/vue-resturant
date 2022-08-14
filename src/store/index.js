import { createStore } from "vuex";

import router from "@/router/index.js";
import { auth } from "@/store/modules/auth.js"
export default createStore({
    state: {
        base_url: "http://localhost:3000",
    },
    getters: {
        getBaseUrl(state) {
            return state.base_url;
        },
    },
    mutations: {
        redirect(state, payload) {
            router.push({ name: payload.name, params: payload.params, query: payload.query });
        },

    },
    actions: {
        redirect({ commit }, payload) {
            commit('redirect', payload);
        },
    },
    modules: {
        auth
    },
});