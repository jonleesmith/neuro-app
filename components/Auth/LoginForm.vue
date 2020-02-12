<template>
  <form method="post" action="#" @submit.prevent="submit">
    <div
      class="mb-8 p-6 bg-red-300 text-red-600"
      v-if="errors.has('message')"
    >{{ errors.get('message') }}</div>
    <div class="form-row">
      <label for="email" class="label">Email</label>
      <input
        type="text"
        class="input"
        autofocus
        autocomplete="email"
        :class="{ 'border-red-500': errors.has('uid') }"
        v-model="form.email"
      />
      <p class="help error" v-if="errors.has('uid')">{{ errors.get('uid') }}</p>
    </div>

    <div class="form-row">
      <label for="password" class="label">Password</label>
      <input
        type="password"
        class="input"
        autocomplete="password"
        :class="{ 'border-red-500': errors.has('password') }"
        v-model="form.password"
      />
      <p class="help error" v-if="errors.has('password')">{{ errors.get('password') }}</p>
    </div>

    <div class="form-row text-right flex justify-between items-center">
      <button class="py-3 bg-green-500 rounded px-3 text-white hover:bg-green-700 w-2/3">
        <span v-if="busy">Please wait...</span>
        <span v-else>Login</span>
      </button>
      <nuxt-link class :to="{ name: 'auth-forgot-password' }">Forgot password?</nuxt-link>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      busy: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      this.busy = true;
      setTimeout(async () => {
        try {
          await this.$auth.login({
            data: {
              email: this.form.email.toLowerCase(),
              password: this.form.password
            }
          });
          this.$router.replace({
            name: "index"
          });
        } catch (err) {
          this.busy = false;
        }
      }, 800);
    }
  }
};
</script>
<style scoped>
form {
  @apply bg-white p-12 rounded shadow;
}
</style>
