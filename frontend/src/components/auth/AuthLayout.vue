<template>
  <div class="auth-layout row align-content--center">
    <div class="flex xs12 mt-5">
      <div class="d-flex justify--center align-items--center">
        <va-card class="auth-layout__card">
          <va-tabs
            v-model="tabIndex"
            center
          >
            <va-tab>{{ $t('auth.login') }}</va-tab>
            <va-tab>{{ $t('Registro') }}</va-tab>
          </va-tabs>

          <va-separator/>

          <div class="loginForm pa-3">
            <router-view/>
          </div>

          <router-link class="py-2 flex-center" to="/">
            <va-icon name="va-icon fa fa-group" style="font-size: 50px;" />
          </router-link>

        </va-card>
        <img src="/img/portal-digemig.png" width="28%">
      </div>
    </div>
  </div>
</template>

<script>
import VaIconVuestic from '../../iconset/VaIconVuestic'

const tabs = [
  'login',
  'signup',
]

export default {
  name: 'AuthLayout',
  components: { VaIconVuestic },
  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
}
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  background-image: linear-gradient(#fdfeff, #b9dbdb);

  &__card {
    width: 23%;
    max-width: 600px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}

.loginForm {
  margin-top: 10%;
}

</style>
