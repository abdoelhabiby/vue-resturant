<template>
  <a  @click.prevent="handelLogout()">logout</a>
</template>

<script>
export default {
  methods: {
    handelLogout() {
      this.$swal({
        text: "Are you sure? to logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "logout!",
        cancelButtonText: "cancel",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("logout");
          this.$router.push({ name: "login" });
        }
      });
    },
  },
};
</script>

<style>
</style>