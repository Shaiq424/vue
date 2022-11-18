<template>
  <form novalidate @submit.prevent="submit">
    <Title size="lg" class="mb-25"> Log in </Title>
    <div class="grid grid-flow-row gap-8 text-left">
      <TextField
        v-model="email"
        type="email"
        label="Email"
        placeholder="Email"
        required
        :has-error="showErrors && !email"
      />
      <TextField
        v-model="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        required
        :has-error="showErrors && !password"
      />
    </div>

    <Button :loading="loading" type="submit" color="primary" size="md" class="mt-30 w-230">
      Log in
    </Button>

    <div v-if="emailError" class="text-red mt-20">
      {{ emailError }}
    </div>
    <div v-if="passwordError" class="text-red mt-20">
      {{ passwordError }}
    </div>

    <div class="mt-20 -mb-10">
      <Button
        text
        size="md"
        color="black"
        class="underline hover:no-underline h-40"
        @click="changeStep('reset-password', true)"
      >
        Forgot password?
      </Button>
      <Button
        text
        size="md"
        color="black"
        class="underline hover:no-underline h-40"
        @click="changeStep('login', true)"
      >
        Other login options
      </Button>
    </div>
  </form>
</template>

<script>
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'LoginEmailForm',
    props: {
      insideModal: Boolean,
    },
    components: {
      TextField,
      Button,
    },
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        showErrors: false,
        emailError: '',
        passwordError: '',
      }
    },
    computed: {
      step() {
        return this.$store.state.authForm.step
      },
      role() {
        return this.$store.state.authForm.role
      },
    },
    methods: {
      changeStep(step, changeRouter = false) {
        this.$store.dispatch('authForm/set', { step })
        if (!this.insideModal && changeRouter) {
          this.$router.push(`/${step}`)
        }
      },
      async submit() {
        // console.log('this.$auth', this.$auth)
        if (!this.email || !this.password || this.loading) {
          this.showErrors = true
          return
        }
        this.emailError = ''
        this.passwordError = ''
        this.loading = true
        try {
          await
          this.$auth
            .loginWith('local', {
              data: {
                email: this.email,
                password: this.password,
              },
            }).then(res => {
                const user = res.data // getting user (yours can be different)
                if (res.data === 0) {
                  this.passwordError = 'Invalid Credentials'
                  return false
                } else if (res.data !== '0') {
                  this.$auth.setUser({
                    email: this.email,
                    password: this.password,
                  })

                  this.$auth.$storage.setUniversal('user', user, true) // setting user in Vuex, cookies and localstorage
                  // const user_ = this.$auth.$storage.getUniversal('user') // getting user (you can use it anywhere in your app)
                  this.$auth.$storage.getUniversal('user')
                  // console.log('user 2', user_) // checking user
                  this.$emit('close')
                  this.$router.push('/')
                  // // this.$auth.$state.loggedIn = true
                  // console.log('Auth Success')
                  // console.log(this.$auth)
                  // console.log(this.$auth.strategy.token)
                  // console.log(this.$auth.$state.loggedIn)
                  // this.$emit('close')
                  // this.$router.push('/')
                  // if (!this.insideModal) {
                    // this.$router.push('/')
                  // }
                }
            })
          // this.$axios
          // .$post('https://api.staymenity.com/public/api/login', { email: this.email, role: this.role, password: this.password })
          //   .then(r => {
          //     this.$emit('close')
              /// this.$auth.dispatch('logedIn')
              // if (!this.insideModal) {
              //   console.log( 'insise')

              //   // console.log('auth', this.$auth)
              //   // this.$store.dispatch('logedIn', 2)
              //   // console.log('logedIn', this.$store.logedIn)
              //   this.$router.push('/')
              // }
            // })
        } catch (error) {
           this.error = error
          // this.emailError = error.response.data?.errors?.email || false
          // this.passwordError = error.response.data?.errors?.password || false
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
