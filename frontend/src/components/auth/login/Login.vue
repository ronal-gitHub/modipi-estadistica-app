<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="username"
      type="text"
      :label="$t('email')"
      :error="!!usernameErrors.length"
      :error-messages="usernameErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import config from '@/config'
axios.defaults.baseURL = config.API_URL
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      usernameErrors: [],
      passwordErrors: [],
    }
  },
  computed: {
    formReady () {
      return !this.usernameErrors.length && !this.passwordErrors.length
    },
  },
  mounted() {
    this.check_token()
  },
  methods: {
    onsubmit () {
      this.usernameErrors = this.username ? [] : ['Username is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      axios
          .post('/signin', {username: this.username, password: this.password})
          .then((response) => {
            if (response.data.invalid === 1) {
              alert('Invalid Credentials.')
              localStorage.removeItem('token')
            }
            else {
              console.log(response.data.email.slice(0, response.data.email.indexOf('@')))
              localStorage.token = response.data.token
              localStorage.uid = response.data.email.slice(0, response.data.email.indexOf('@'))
              this.$router.replace('/admin/page01')
            }
          })
    },
    check_token : function () {
      const ddd = {
        username: localStorage.uid
      }
      if (localStorage.token != null) {
        axios
          .post('/check_token/', ddd, { 'headers': { 'Authorization': localStorage.token } })
          .then((response) => {
            if (response.data.invalid != 1) {
              this.$router.replace('/admin/page01')
            }
          })
          .catch((error) => {
          })
      } 
    },
  },
}
</script>

<style lang="scss">
</style>
