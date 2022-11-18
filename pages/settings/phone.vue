<template>
  <div class="lg:w-600 max-w-full">
    <MobPageHeader v-if="mq == 'mobile'" title="Phone" back="/account">
      <template v-slot:right>
        <Button
          text
          :color="saved ? 'green' : 'primary'"
          size="sm"
          :loading="loading"
          @click="save"
        >
          {{ saved ? 'Saved' : 'Save' }}
        </Button>
      </template>
    </MobPageHeader>

    <Title size="lg" tag="h2" class="mb-30 flex items-center"> Phone </Title>

    <PhoneVerify
      type="change"
      :error="phoneError"
      :save-after-verify="true"
      @verified-changed="setVerified"
      @phone-changed="setPhone"
    />

    <div v-if="mq !== 'mobile'" class="flex mt-60">
      <Button size="md" :color="saved ? 'green' : 'primary'" :loading="loading" @click="save">
        {{ saved ? 'Saved' : 'Save' }}
      </Button>
      <Button size="md" class="underline text-gray-300" to="/account"> Cancel </Button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'SettingsPhone',
    // layout: 'dashboard',
    components: {
      Button,
    },
    data() {
      return {
        loading: false,
        phone: '',
        phoneError: '',
        saved: false,
        is_phone_verified: this.$auth.is_phone_verified ? 1 : 0,
      }
    },
    computed: mapState({
      mq: 'mq',
    }),

    methods: {
      setPhone(phone) {
        this.phone = phone
      },
      // setVerified(is_phone_verified) {
      //   this.is_phone_verified = is_phone_verified
      // },
      async save() {
        this.showErrors = true
        this.phoneError = ''
        if (!this.phone) {
          this.phoneError = 'The phone number is required'
          return
        }
        this.loading = true
        this.saved = false
        try {
          await this.$axios
            .$put('https://api.staymenity.com/public/api/userPhone', {
              phone: this.phone,
              phone_verified: 1,
              id: this.$auth.user.id,
            })
            .then(resp => {
              // console.log(resp)
              this.saved = true
              // if (resp.data.success) {
              // }
            })
        } catch (error) {
          const errors = error.response.data.errors
          this.phoneError = errors?.phone || ''
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
