<template>
  <form @submit.prevent="onsubmit()">
    <label>Nombre de Usuario *</label>
    <va-input
      class="py-2"
      v-model="email"
      type="text"
      placeholder="Please enter your login here"
      :error="!!errors.length"
      :error-messages="errors"
    />

    <label>Contraseña *</label>
    <va-input
      v-if="showPassword"
      class="py-2"
      v-model="password"
      type="password"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    >
      <va-icon
        slot="append"
        name="va-icon ion ion-ios-eye"
        @click.native="handleShowPassword()"
        style="font-size: 20px;"
      />
    </va-input>

    <va-input
      v-if="!showPassword"
      class="py-2"
      v-model="password"
      type="text"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    >
      <va-icon
        slot="append"
        name="va-icon ion ion-ios-eye-off"
        @click.native="handleShowPassword()"
        style="font-size: 20px;"
      />
    </va-input>

    <div class="py-2 d-flex justify--center mt-3">
      <va-button type="submit" class="my-0" style="width: 100%;">{{ $t('auth.sign_up') }}</va-button>
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
      errors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      showPassword: true,
    }
  },
  methods: {
    handleShowPassword () {
      this.showPassword = !this.showPassword;
    },
    onsubmit () {
      this.errors = this.email ? [] : ['Usuario is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      axios
        .post('/signup', {username: this.email, password: this.password})
        .then((response) => {
          if (response.data.invalid === 1) {
            alert('Credenciales invalidas.')
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
      console.log(this.errors.length   )
      return !(this.errors.length || this.passwordErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
