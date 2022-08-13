export const auth = {
    state: () => ({
        auth_token: localStorage.getItem("user-token") || null,
        auth_user: localStorage.getItem("user-data") || null,
    }),
    mutations: {
        setAuthToken(state, payload) {
            localStorage.setItem("user-token", payload.token);
            state.auth_token = payload.token;
        },
        setUserData(state, payload) {
            localStorage.setItem("user-data", JSON.stringify(payload.user));
            state.auth_user = JSON.stringify(payload.user);
        },
        logout(state) {
            localStorage.removeItem("user-data");
            localStorage.removeItem("user-token");
            state.auth_token = null;
            state.auth_user = null;

        }
    },
    getters: {
        getToken(state) {
            return state.auth_token;
        },
        getUserData(state) {
            return state.auth_user ? JSON.parse(state.auth_user) : null;
        },

        checkAuth(state, getters) {

            if (state.auth_token == null || state.auth_token == 'null') {
                return false;
            }
            return true;
        },
        checkGuest(state, getters) {
            return !getters.checkAuth;

        }

    },
    actions: {
        setToken({ commit }, payload) {
            commit('setAuthToken', payload);
        },

        setUserData({ commit }, payload) {
            commit('setUserData', payload);
        },
        logout({ commit }) {
            commit('logout');
        }
    }
};