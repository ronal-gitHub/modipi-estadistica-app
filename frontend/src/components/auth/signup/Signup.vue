<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
    }
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      axios
        .post('/signup', {username: this.email, password: this.password})
        .then((response) => {
          if (response.data.invalid === 1) {
            alert('Invalid Credentials.')
            localStorage.removeItem('token')
          }
          else {
            console.log(response.data.token)
            localStorage.token = response.data.token
            localStorage.uid = this.username
            this.$router.replace('/admin/page01')
          }
        })
    },
  },
  computed: {
    formReady () {
      return !(this.emailErrors.length || this.passwordErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
