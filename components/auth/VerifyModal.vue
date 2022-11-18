<template>
  <div class="px-50 pt-25 pb-40 text-center">
    <Button
      icon
      rounded
      alpha-bg
      size="sm"
      color="black"
      class="absolute top-0 right-0 mt-15 mr-15"
      aria-label="Close"
      @click="$emit('close')"
    >
      <svg-icon name="close" class="fill-current h-12 w-12" />
    </Button>
    <Title size="lg" class="mb-25"> Verify your phone number </Title>
    <form class="flex flex-col items-center" novalidate @submit.prevent="submit">
      <p class="text-gray-300 text-opacity-60 -mt-20">
        Please enter the code we sent to<br />
        {{ phone }}
      </p>
      <TextField
        v-model="code"
        required
        type="number"
        :has-error="(showCodeErrors && !code) || codeError"
        class="mx-auto my-25 code-field"
        align="center"
        :error-message="codeError || 'Please enter the code'"
      />
      <!-- <div v-if="codeError" class="text-red text-sm -mt-10 mb-10">{{ codeError }}</div> -->
      <Button
        :disabled="!!resendTime"
        disabled-opacity
        type="button"
        class="link text-black"
        @click="getCode"
      >
        {{ resendTime ? `Send again in 00:${String(resendTime).padStart(2, '0')}` : 'Send again' }}
        <Loading
          v-if="resendLoading"
          class="w-20 h-20 text-black inline-block align-middle ml-10 -mt-2"
        ></Loading>
      </Button>
      <Button
        :type="allowClose ? 'button' : 'submit'"
        :loading="verifyLoading"
        color="primary"
        size="md"
        class="mt-30"
      >
        Verify
      </Button>
    </form>
  </div>
</template>

<script>
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  // import Cookies from 'js-cookie'
  const modalParams = {
    width: 400,
    scrollable: true,
    height: 'auto',
    adaptive: true,
    'focus-trap': true,
    'click-to-close': true,
    classes: 'shadow',
  }
  export default {
    name: 'VerifyForm',
    components: {
      TextField,
      Button,
    },
    props: {
      type: {
        type: String,
        default: '',
      },
      onSuccess: {
        type: Function,
        default: Function,
      },
    },
    data() {
      return {
        code: '',
        codeError: '',
        showCodeErrors: false,
        verifyLoading: false,
        resendLoading: false,
        resendTime: 0,
        interval: null,
        allowClose: false,
        userId: null,
      }
    },
    computed: {
      role() {
        return this.$store.state.authForm.role
      },
      step() {
        return this.$store.state.authForm.step
      },
      config() {
        return this.$store.state.config
      },
      phone() {
        return this.$store.state.authForm.phone
      },
    },
    mounted() {
      this.resendTime = this.config.VERIFICATION_LIFETIME
      this.resetTimer()
      if (this.$auth.loggedIn) {
        this.userId = this.$auth.user.id
      }
    },
    methods: {
      getModalParams(opts) {
        return Object.assign(modalParams, opts)
      },
      resetTimer() {
        clearInterval(this.interval)
        const startTime = new Date()
        this.interval = setInterval(() => {
          const resendTime = (
            (this.config.VERIFICATION_LIFETIME * 1000 - (new Date() - startTime)) /
            1000
          ).toFixed(0)
          this.resendTime = resendTime
          if (this.resendTime <= 0) {
            this.resendTime = 0
            clearInterval(this.interval)
          }
        }, 50)
      },
      changeStep(step, changeRouter = false) {
        this.$store.dispatch('authForm/set', { step })
        if (!this.insideModal && changeRouter) {
          this.$router.push(`/${step}`)
        }
      },
      submit() {
        if (this.verifyLoading || !this.code) {
          this.showCodeErrors = true
          return
        }
        this.codeError = ''
        this.verifyLoading = true
        const params = { code: this.code, phone: this.phone }
        if (this.userId) {
          params.user_id = this.userId
        }
        if (this.type) {
          params.type = this.type
        }
        if (this.role) {
          params.role = this.role
        }
        console.log('params', params)
        this.$axios
          .$post('https://api.staymenity.com/public/api/phone/registered/code', params)
          .then(resp => {
            this.verifyLoading = false

            this.$store.dispatch('authForm/set', {
              phone: this.phone,
              phone_verified: 1,
            })
            if (resp === 'success') {
              console.log('check')
              this.onSuccess(resp)
              // console.log('this.onSuccess(resp)', this.onSuccess(resp))
              this.$emit('close')
            }
          })
          .catch(res => {
            this.codeError = res.response.data.message
            this.verifyLoading = false
          })
      },
      getCode() {
        this.codeError = ''
        this.resendLoading = true

        this.$axios
          .$post('/auth/phone/code', { phone: this.phone, type: this.type })
          .then(resp => {
            this.resendLoading = false
            this.resetTimer()
          })
          .catch(error => {
            this.resetTimer()
            this.resendLoading = false
            const errors = error.response.data.errors
            this.loading = false
            if (error.response.data.message) {
              this.codeError = error.response.data.message
            }
            if (errors && errors.phone) {
              this.phoneError = errors.phone
            }
          })
      },
    },
  }
</script>

<style lang="postcss">
  .code-field {
    width: 16rem;
    text-align: center;
    .text-field {
      width: 13rem;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
</style>
