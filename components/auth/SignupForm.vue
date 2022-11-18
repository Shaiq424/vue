<template>
  <RegisterForm v-if="step === 'register'" :inside-modal="insideModal" @close="$emit('close')" />
  <div v-else>
    <Title size="lg" class="mb-25"> Sign up as </Title>
    <RoleSwitcher />
    <form novalidate @submit.prevent="submit">
      <TextField
        v-model="phone"
        required
        type="tel"
        label="Your phone number"
        placeholder="Your phone number"
        description="We will text you to confirm your numberss"
        class="text-center"
        :field-classes="['text-center', 'pr-40']"
        :mask="{
          numericOnly: true,
          delimiters: ['-', '-'],
          blocks: [3, 3, 4],
        }"
        :error-message="!phone && showErrors ? 'The phone number is required' : phoneError"
        :has-error="(showErrors && !phone) || phoneError"
      >
        <span slot="prefix"> +1 </span>
      </TextField>
      <Button type="submit" :loading="loading" color="primary" size="md" class="w-full mt-20">
        Continue
      </Button>
    </form>
    <Divider class="px-20 my-35"> or continue with </Divider>
    <AuthButtons type="signup" :inside-modal="insideModal" @close="$emit('close')" />
    <div class="mt-20">
      Have an account with us already?
      <Button
        v-if="insideModal"
        text
        color="primary"
        bold
        class="px-0 py-5"
        @click="changeStep('login', true)"
      >
        Log in
      </Button>
      <Button
        v-else
        :to="`/login${$route.query.host ? '?host=1' : ''}`"
        text
        color="primary"
        bold
        class="px-0 py-5"
      >
        Log in
      </Button>
    </div>
  </div>
</template>

<script>
  import VerifyModal from '~/components/auth/VerifyModal'
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  import Divider from '~/components/base/Divider'
  import RoleSwitcher from '~/components/auth/RoleSwitcher'
  import RegisterForm from '~/components/auth/RegisterForm'
  export default {
    name: 'SignupForm',
    props: {
      insideModal: Boolean,
      host: Boolean,
    },
    components: {
      TextField,
      RoleSwitcher,
      Divider,
      RegisterForm,
      Button,
    },
    data() {
      return {
        loading: false,
        phone: '',
        showErrors: false,
        phoneError: '',
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
    mounted() {
      // this.$store.dispatch('authForm/set', { role: this.host ? 'host' : 'guest' })
    },
    methods: {
      changeStep(step, changeRouter = false) {
        this.$store.dispatch('authForm/set', { step })
        if (step === 'signup-phone-verify') {
          this.showVerifyModal()
        }
      },
      submit() {
        console.log('sign up phone')
        if (this.loading || !this.phone) {
          this.showErrors = true
          return
        }
        this.phoneError = ''
        this.loading = true
        this.$axios
          // .$post('/auth/phone/code', { phone: '+1' + this.phone, code: this.code })
          .$post('https://api.staymenity.com/public/api/phone/verify', { phone: '+1' + this.phone, type: 'login' })
          .then(resp => {
            this.loading = false
            this.$store.dispatch('authForm/set', { phone: '+1' + this.phone })
            this.changeStep('signup-phone-verify')
          })
          .catch(error => {
            const errors = error.response.data.errors
            this.loading = false
            if (errors.phone) {
              this.phoneError = errors.phone
            }
          })
      },
      showVerifyModal() {
        this.$modal.show(
          VerifyModal,
          {
            type: 'registration',
            onSuccess: () => {
              this.changeStep('register')
            },
          }, // { message },
          VerifyModal.methods.getModalParams({
            'click-to-close': false,
          })
        )
      },
    },
  }
</script>
