import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

function auth(to, from, next) {
    if (!store.getters.checkAuth) next({ name: 'login' })
    else next()

}

function guest(to, from, next) {
    if (store.getters.checkAuth) next({ name: 'home' })
    else next()
}

const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: [auth]

    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("../views/AboutView.vue"),
        beforeEnter: [auth]

    },
    {
        path: "/profile",
        name: "profile",
        component: () =>
            import ("../views/auth/Profile.vue"),
        beforeEnter: [auth]

    },
    {
        path: "/sign-up",
        name: "signup",
        component: () =>
            import ('@/views/auth/Signup.vue'),
        beforeEnter: [guest]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ('@/views/auth/Login.vue'),
        beforeEnter: [guest]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// router.beforeEach((to, from, next) => {

//     if (to.name !== 'login') next({ name: 'login' })
//     else next()

//     return next({ name: 'home' });
// });
export default router;