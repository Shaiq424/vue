<template>
  <div class="lg:w-600 max-w-full">
    <MobPageHeader v-if="isMobile" title="Connected accounts" back="/account" />
    <ul>
      <!-- $auth.user.social_accounts -->
      <template v-for="(account, i) in accounts">
        <li :key="account.name">
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-semibold text-base lg:text-lg">{{ account.title }}</h2>
            <Button
              v-if="account.connected"
              color="primary"
              size="sm"
              text
              :alpha-bg="!isMobile && account.can_disconnect"
              :disabled="!account.can_disconnect"
              :loading="loading == account.name"
              class="text-base -mr-15 lg:mr-0"
              @click="disconnect(account.name)"
            >
              Disconnect
              <Loading v-if="isLoading(account.name)" class="w-15 h-15 ml-5"></Loading>
            </Button>
            <Button
              v-else
              color="primary"
              size="sm"
              text
              :alpha-bg="!isMobile"
              class="text-base -mr-15 lg:mr-0"
              @click="loginBy(account.name)"
            >
              Connect
              <Loading v-if="isLoading(account.name)" class="w-15 h-15 ml-5"></Loading>
            </Button>
          </div>
          <div v-if="!isMobile">{{ account.connected ? 'Connected' : 'Not connected' }}</div>
          <div v-if="getError(account.name)" class="text-red mt-10">
            {{ getError(account.name) }}
          </div>
          <Divider
            v-if="i !== $auth.user.social_accounts.length - 1"
            class="my-10 sm:my-35 lg:my-50"
          ></Divider>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import Dropdown from '~/components/base/Dropdown'
  // import Avatar from '~/components/base/Avatar'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'SettingsConnectedAccounts',
    // layout: 'dashboard',
    components: {
      Button,
    },
    data() {
      return {
        accounts: [],
        loading: false,
        isAppleReady: false,
        isFBReady: false,
        googleLoading: false,
        googleError: '',
        facebookLoading: false,
        facebookError: '',
      }
    },
    computed: mapGetters({
      isMobile: 'isMobile',
    }),
    watch: {
      isAppleReady() {
        this.initApple()
      },
    },
    mounted() {
      this.isFBReady = window.FB !== undefined
      window.addEventListener('fb-sdk-ready', this.onFBReady)
      this.fetchAccounts()
    },
    beforeDestroy() {
      window.removeEventListener('fb-sdk-ready', this.onFBReady)
    },
    methods: {
      fetchAccounts() {
        this.$axios
          .$get('https://api.staymenity.com/public/api/user/Acct').then(r => {
            this.accounts = r
          })
      },
      initApple() {
        window.AppleID.auth.init({
          clientId: 'WebServiceID',
          usePopup: true,
          state: 'origin:web',
          scope: 'name email',
          redirectURI: 'https://staymenity.com',
        })
      },
      isLoading(name) {
        return this[name + 'Loading']
      },
      getError(name) {
        return this[name + 'Error']
      },
      disconnect(provider) {
        this.loading = provider
        this.$axios.$delete(`/user/social/${provider}`).then(r => {
          if (r.success) {
            this.$auth.fetchUser().then(resp => {
              this.loading = false
            })
          } else {
            this.loading = false
          }
        })
      },
      onFBReady() {
        this.isFBReady = true
      },
      loginBy(name) {
        if (name === 'google') {
          this.loginGoogle()
        }
        if (name === 'facebook') {
          this.loginFacebook()
        }
        if (name === 'apple') {
          this.loginApple()
        }
      },
      async loginApple() {
        this.appleLoading = true
        try {
          const data = await window.AppleID.auth.signIn()
          this.$axios
            .$get('/auth/socialite/apple/callback', {
              params: {
                access_token: data.authorization.id_token,
                role: this.$auth.user.current_role,
                user_id: this.$auth.user.id,
              },
            })
            .then(resp => {
              if (resp.data.token) {
                this.logout(() => {
                  this.$auth.setUserToken(resp.data.token)
                  this.appleLoading = false
                })
              }
            })
            .catch(error => {
              this.appleError = error.response.data.message
              this.appleLoading = false
            })
        } catch (error) {
          this.appleLoading = true
          // handle error.
        }
      },
      loginGoogle() {
        this.googleLoading = true
        this.googleError = ''
        this.$gAuth.signIn().then(res => {
          this.$axios
            .$get('/auth/socialite/google/callback', {
              params: {
                access_token: res.getAuthResponse().access_token,
                role: this.$auth.user.current_role,
                user_id: this.$auth.user.id,
              },
            })
            .then(resp => {
              if (resp.data.token) {
                this.logout(() => {
                  this.$auth.setUserToken(resp.data.token)
                  this.googleLoading = false
                })
              }
            })
            .catch(error => {
              this.googleError = error.response.data.message
              this.googleLoading = false
            })
        })
      },
      loginFacebook() {
        if (this.isFBReady) {
          this.facebookLoading = true
          this.facebookError = ''
          window.FB.login(
            res => {
              this.$axios
                .$get('/auth/socialite/facebook/callback', {
                  params: {
                    access_token: res?.authResponse?.accessToken,
                    role: this.$auth.user.current_role,
                    user_id: this.$auth.user.id,
                  },
                })
                .then(resp => {
                  if (resp.data.token) {
                    this.logout(() => {
                      this.$auth.setUserToken(resp.data.token)
                      this.facebookLoading = false
                    })
                  }
                })
                .catch(error => {
                  this.facebookError = error.response.data.message
                  this.facebookLoading = false
                })
            },
            { scope: 'public_profile,email' }
          )
        }
      },
      async logout(after) {
        try {
          await this.$auth.logout()
          after()
        } catch (error) {
          console.log(error)
        } finally {
        }
      },
    },
    head() {
      return {
        script: [
          {
            hid: 'appleid',
            src:
              'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
            defer: true,
            callback: () => {
              this.isAppleReady = true
            },
          },
        ],
      }
    },
  }
</script>
