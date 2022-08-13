<template>
  <section class="p-4" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>

                  <form class="mx-1 mx-md-4" @submit.prevent="signUpSubmit">
                    <div v-if="errors.length > 0">
                      <span
                        class="text-danger"
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }} </span
                      ><br />
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>

                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          v-model="name"
                          :class="[
                            'form-control',
                            v$.name.$error ? 'is-invalid' : '',
                          ]"
                          id="validationServer05"
                          aria-describedby="validationServer05Feedback"
                        />
                        <label class="form-label" for="form3Example1c"
                          >Your Name</label
                        >

                        <div
                          id="validationServer05Feedback"
                          class="invalid-feedback"
                          v-if="v$.name.$error"
                        >
                          {{ v$.name.$errors[0]?.$message }}
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          :class="[
                            'form-control',
                            v$.email.$error ? 'is-invalid' : '',
                          ]"
                          v-model="email"
                        />
                        <label class="form-label" for="form3Example3c"
                          >Your Email</label
                        >
                        <div class="invalid-feedback" v-if="v$.email.$error">
                          {{ v$.email.$errors[0]?.$message }}
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          v-model="password"
                          :class="[
                            'form-control',
                            v$.password.$error ? 'is-invalid' : '',
                          ]"
                        />
                        <label class="form-label" for="form3Example4c"
                          >Password</label
                        >
                        <div class="invalid-feedback" v-if="v$.password.$error">
                          {{ v$.password.$errors[0]?.$message }}
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4cd"
                          v-model="confirmPassword"
                          :class="[
                            'form-control',
                            v$.confirmPassword.$error ? 'is-invalid' : '',
                          ]"
                        />
                        <label class="form-label" for="form3Example4cd"
                          >Repeat your password</label
                        >
                        <div
                          class="invalid-feedback"
                          v-if="v$.confirmPassword.$error"
                        >
                          {{ v$.confirmPassword.$errors[0]?.$message }}
                        </div>
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button type="submit" class="btn btn-primary btn-lg">
                        Register
                      </button>
                      <button
                        type="button"
                        @click="$store.dispatch('redirect', { name: 'login' })"
                        class="btn btn-info btn-lg ms-2"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="
                    col-md-10 col-lg-6 col-xl-7
                    d-flex
                    align-items-center
                    order-1 order-lg-2
                  "
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {{ errors }}
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import axios from "axios";

export default {
  setup: () => ({ v$: useVuelidate() }),

  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(this.password, "password"),
      },

      password: { required },
    };
  },

  methods: {
    async signUpSubmit() {
      this.errors = [];
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

      const res = await axios
        .post("http://localhost:3000/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((success) => {
          this.name = "";
          this.email = "";
          this.password = "";
          this.$swal({
            title: "success",
            text: "success register",
            icon: "success",
            timer: 3000,
            position: "top-end",
            toast: true,
          });

          this.$store.dispatch("setToken", {
            token: success.data.accessToken,
          });

          this.$store.dispatch("setUserData", {
            user: success.data.user,
          });

          this.$store.dispatch("redirect", { name: "home" });
        })
        .catch((error) => {
          this.errors.push(error.response.data);
        });
    },
  },
};
</script>

<style>
</style>