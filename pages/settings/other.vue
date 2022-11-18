<template>
  <div class="lg:w-500 max-w-full">
    <MobPageHeader v-if="mq == 'mobile'" title="Other settings" back="/account" />

    <Title tag="h2" size="lg" class="mb-10 lg:mb-20"> Delete account </Title>
    <div class="text-gray lg:text-black">
      Account deletion is final. There will be no way to restore your account or data.
    </div>
    <div class="flex mt-20 lg:mt-40 justify-center lg:justify-start">
      <Button
        :outlined="mq !== 'mobile'"
        :text="mq === 'mobile'"
        size="md"
        color="red"
        @click="showDeleteAccountModal"
      >
        Delete account
      </Button>
    </div>
  </div>
</template>

<script>
  import ConfirmModal from '~/components/ConfirmModal'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'SettingsOther',
    components: {
      Button,
    },
    // layout: 'dashboard',
    data() {
      return {}
    },
    computed: {
      mq() {
        return this.$store.state.mq
      },
    },
    mounted() {},
    methods: {
      showDeleteAccountModal() {
        this.$modal.show(
          ConfirmModal,
          {
            title: 'Delete account',
            description: 'Are you sure you want to delete the account?',
            actionText: 'Delete',
            onSuccess: (modal, loading) => {
              loading(true)
              this.submit(modal, loading)
            },
          },
          ConfirmModal.methods.getModalParams()
        )
      },
      async submit(modal, loading) {
        this.loading = true
        try {
          // await this.$axios.$delete('/user')
          await this.$axios.$delete('https://api.staymenity.com/public/api/user/delete/', {
            params: { id: this.$auth.user.id },
          })
          await this.logout()
          this.$auth.setUserToken(false)
          loading(false)
          modal.$emit('close')
        } catch (error) {
          loading(false)
          modal.$emit('close')
          this.$noty.error(error.response.data.message)
        }
      },
      async logout() {
        try {
          this.loading = true
          await this.$auth.logout()
          this.$router.push('/')
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
          this.$emit('close')
        }
      },
    },
  }
</script>
