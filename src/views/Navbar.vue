<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Resturant</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="checkGuest">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sign-up" class="nav-link">sign up</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="checkAuth">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ getUserData?.name }}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" @click.prevent="handelLogout()">logout</a> -->
            <Logout class="nav-link"></Logout>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import Logout from "@/components/auth/Logout";
export default {
  methods: {
  },
  computed: {
    ...mapGetters(["getUserData", "checkAuth", "checkGuest"]),
  },

  watch: {},
  mounted() {},
  components: {
    Logout,
  },
};
</script>

<style>
</style>