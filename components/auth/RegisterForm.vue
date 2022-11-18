<template>
  <form novalidate @submit.prevent="submit">
    <Title size="lg" class="mb-25"> Finish signing up </Title>
    <div class="grid grid-flow-row gap-8 text-left">
      <TextField
        v-model="first_name"
        name="first_name"
        label="First name"
        placeholder="First name"
        required
        :error-message="firstNameError"
        :has-error="(showErrors && !first_name) || firstNameError"
      />
      <TextField
        v-model="last_name"
        name="last_name"
        label="Last name"
        placeholder="Last name"
        description="Make sure it matches the name on your government ID."
        class="mb-20"
        required
        :error-message="lastNameError"
        :has-error="(showErrors && !last_name) || lastNameError"
      />
      <TextField
        v-model="email"
        type="email"
        :label="loginByPhone ? 'Email (optional)' : 'Email'"
        :placeholder="loginByPhone ? 'Email (optional)' : 'Email'"
        :required="!loginByPhone"
        :error-message="emailError"
        :has-error="(showErrors && !email) || emailError"
      />
      <TextField
        v-if="(loginByPhone && email) || !loginByPhone"
        v-model="password"
        name="password"
        type="password"
        label="Create password"
        placeholder="Create password"
        description="We will email you confirmations and receipts."
        required
        :error-message="passwordError"
        :has-error="(showErrors && !password) || passwordError"
      />
    </div>
    <TextField
      v-if="!phone_verified"
      v-model="localPhone"
      type="tel"
      label="Your phone number"
      placeholder="Your phone number"
      description="We will text you to confirm your number"
      class="mt-20"
      :mask="{
        numericOnly: true,
        delimiters: ['-', '-'],
        blocks: [3, 3, 4],
      }"
      :error-message="phoneError"
      :has-error="phoneError"
    >
      <span slot="prefix"> +1 </span>
    </TextField>
    <div class="text-sm text-gray mt-25 prose">
      <p>
        By selecting <b>Agree and continue</b> I agree to<br />
        Staymenity’s <a href="#">Terms of service</a>
      </p>
    </div>
    <Button :loading="loading" type="submit" color="primary" size="md" class="mt-30">
      Agree and continue
    </Button>
    <div v-if="message" class="text-red mt-15">{{ message }}</div>
  </form>
</template>

<script>
  import Title from '~/components/base/Title'
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  import VerifyModal from '~/components/auth/VerifyModal'
  export default {
    name: 'SignupForm',
    props: {
      insideModal: Boolean,
    },
    components: {
      TextField,
      Button,
      Title,
    },
    data() {
      return {
        showErrors: false,
        loading: false,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        localPhone: '',

        emailError: '',
        phoneError: '',
        passwordError: '',
        firstNameError: '',
        lastNameError: '',

        message: '',

        loginByPhone: false,
      }
    },
    computed: {
      step() {
        return this.$store.state.authForm.step
      },
      role() {
        console.log('this.$store.state.authForm.role', this.$store.state.authForm.role)
        return this.$store.state.authForm.role
      },
      phone() {
        if (this.$store.state.authForm.phone) {
          return this.$store.state.authForm.phone
        } else {
          return this.localPhone ? '+1' + this.localPhone : ''
        }
      },
      phone_verified() {
        return this.$store.state.authForm.phone_verified
      },
    },
    mounted() {
      this.loginByPhone = this.phone_verified
    },
    methods: {
      showVerifyModal(data) {
        this.$modal.show(
          VerifyModal,
          data,
          VerifyModal.methods.getModalParams({
            'click-to-close': false,
          })
        )
      },
      changeStep(step, changeRouter = false) {
        this.$store.dispatch('authForm/set', { step })
        if (!this.insideModal && changeRouter) {
          this.$router.push(`/${step}`)
        }
      },
      register() {
        this.message = ''

        const params = {
          first_name: this.first_name,
          last_name: this.last_name,
          phone_verified: this.phone_verified,
          role: this.role,
        }
        if (!this.loginByPhone || (this.loginByPhone && this.email)) {
          params.login = this.email
          params.email = this.email
          params.password = this.password
        }
        if (this.phone) {
          params.phone = this.phone
        }
        this.loading = true
        this.$axios
          // .$post('/auth/register', params) https://api.staymenity.com/public/api/user/register
          .$post('https://api.staymenity.com/public/api/user/register', params)
          .then(resp => {
            const user = resp
            console.log('resp', user)
            this.$auth.setUser(user)
            this.$auth.setUserToken(resp.remember_token).then(() => {g
              this.$emit('close')
              // this.$store.dispatch('authForm/set', {
              //   phone: '',
              //   phone_verified: 0,
              // })
              console.log('user', this.$auth.user)
              this.$store.dispatch('authForm/set', user)
              this.$router.push('/')
              this.loading = false
            })
          })
          .catch(error => {
            console.log('error', error)
            this.loading = false
            const errors = error // .response.data.errors
            if (errors) {
              this.message = errors
              // this.emailError = errors.email
              // this.phoneError = errors.phone
              // this.passwordError = errors.password
              // this.firstNameError = errors.first_name
              // this.lastNameError = errors.last_name

              // if (errors.phone) {
              //   this.message = errors.phone
              // }

              return false
            }
            // const message = error.response.data.message
            // if (message) {
            //   this.message = message
            // }
          })
      },
      submit() {
        const { first_name, last_name, email, password, loginByPhone } = this

        if (!first_name || !last_name) {
          if ((!loginByPhone && (!email || !password)) || (loginByPhone && email && !password)) {
            this.showErrors = true
            return
          }
        }

        this.emailError = ''
        this.phoneError = ''
        this.passwordError = ''
        this.firstNameError = ''
        this.lastNameError = ''

        this.loading = true
        console.log('this.localPhone', this.localPhone)
        // if (this.localPhone) {
        //   this.$axios
        //     .$post('/auth/phone/code', { phone: '+1' + this.localPhone, type: 'registration' })
        //     .then(resp => {
        //       this.$store.dispatch('authForm/set', { phone: '+1' + this.localPhone })
        //       const _this = this
        //       this.loading = false
        //       this.showVerifyModal({
        //         onSuccess: () => {
        //           _this.register()
        //         },
        //         type: 'registration',
        //       })
        //     })
        //     .catch(error => {
        //       const errors = error.response.data.errors
        //       this.loading = false
        //       if (errors.phone) {
        //         this.phoneError = errors.phone
        //       }
        //     })
        // } else {
          this.register()
        // }
      },
    },
  }
</script>
