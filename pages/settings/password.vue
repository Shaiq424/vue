<template>
  <div class="lg:w-600 max-w-full">
    <MobPageHeader v-if="mq == 'mobile'" title="Edit password" back="/account">
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

    <form novalidate @submit.prevent="save">
      <Title v-if="!$auth.user.is_need_password" tag="h2" size="md" class="mb-15 sm:mb-20">
        Current password
      </Title>
      <div v-if="!$auth.user.is_need_password" class="grid sm:grid-cols-2 gap-15 mb-20 sm:mb-40">
        <TextField
          v-model="currentPassword"
          required
          type="password"
          placeholder="Enter current password"
          label="Current password"
          :has-error="(showErrors && !currentPassword) || (showErrors && !!currentPasswordError)"
          :error-message="currentPasswordError"
        ></TextField>
      </div>

      <Title tag="h2" size="md" class="mb-15 sm:mb-20"> New password </Title>
      <div class="grid sm:grid-cols-2 gap-15 mb-20 sm:mb-40">
        <TextField
          v-model="newPassword"
          required
          type="password"
          placeholder="Enter new password"
          label="New password"
          :has-error="showErrors && (!newPassword || !!newPasswordError)"
          :error-message="newPasswordError"
        ></TextField>
      </div>

      <Title tag="h2" size="md" class="mb-15 sm:mb-20"> Confirm password </Title>
      <div class="grid sm:grid-cols-2 gap-15 mb-20 sm:mb-40">
        <TextField
          v-model="confirmPassword"
          required
          type="password"
          placeholder="Confirm new password"
          label="Confirm password"
          :has-error="showErrors && (!confirmPassword || !!confirmPasswordError)"
          :error-message="confirmPasswordError"
        ></TextField>
      </div>

      <div v-if="mq !== 'mobile'" class="flex mt-60">
        <Button type="submit" size="md" :color="saved ? 'green' : 'primary'" :loading="loading">
          {{ saved ? 'Saved' : 'Save' }}
        </Button>
        <Button size="md" class="underline text-gray-300" to="/account"> Cancel </Button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'SettingsPassword',
    components: {
      Button,
      TextField,
    },
    // layout: 'dashboard',
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        loading: false,
        showErrors: false,
        saved: false,
        currentPasswordError: '',
        newPasswordError: '',
        confirmPasswordError: '',
      }
    },
    computed: mapState({
      mq: 'mq',
    }),
    mounted() {
      //  this.firstName = this.$auth.user.first_name
      //  this.lastName = this.$auth.user.last_name
      //  this.birth = this.$auth.user.birthday_at
      //  this.email = this.$auth.user.email
    },
    methods: {
      async save() {
        this.showErrors = true
        this.currentPasswordError = ''
        this.newPasswordError = ''
        this.confirmPasswordError = ''

        if (!this.$auth.user.is_need_password && !this.currentPassword) {
          return
        }
        if (!this.newPassword || !this.confirmPassword) {
          return
        }

        this.saved = false
        this.loading = true

        let params
        if (this.$auth.user.is_need_password) {
          params = {
            password: this.newPassword,
            password_confirmation: this.confirmPassword,
          }
        } else {
          params = {
            current_password: this.currentPassword,
            new_password: this.newPassword,
            new_password_confirmation: this.confirmPassword,
            id: this.$auth.user.id,
          }
        }
        console.log('params', params)

        try {
          await this.$axios.$put('https://api.staymenity.com/public/api/userPass', params).then(resp => {
            console.log('this.currentPasswordError', resp)
            // this.$auth.fetchUser().then(resp => {
              this.loading = false
              this.currentPassword = ''
              this.newPassword = ''
              this.confirmPassword = ''
              this.saved = true
              this.showErrors = false
            // })

            // if (resp.data.success) {

            // }
          })
        } catch (error) {
          const errors = error.response.data.errors
          this.currentPasswordError = errors.current_password || ''
          this.newPasswordError = errors.new_password || ''
          this.confirmPasswordError = errors.new_password_confirmation || ''
          this.loading = false
        }
      },
    },
  }
</script>
