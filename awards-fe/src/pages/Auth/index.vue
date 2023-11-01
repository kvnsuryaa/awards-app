<template>
  <div class="row justify-content-center">
    <div class="col-4 text-center">
      <img src="/awards_logo.png" alt="" />
      <h3 class="text-secondary" style="font-weight: bold">AWARDS</h3>
      <div class="text-secondary">
        Enter your email address <br />
        to sign in and continue
      </div>
      <div class="alert alert-danger p-1 mt-4" v-if="error">
        Email not found!
      </div>
      <input
        type="email"
        v-model="payload.email"
        class="form-control mt-2"
        placeholder="Email Address"
      />
      <button
        class="btn btn-secondary mt-4"
        style="width: 10rem"
        @click.prevent="login"
      >
        Sign In
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthComponent",
  data() {
    return {
      error: false,
      payload: {
        email: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/LOGIN", this.payload);
        this.error = false;
        this.$router.push("/");
      } catch (err) {
        this.error = true;
      }
    },
  },
};
</script>

<style></style>
