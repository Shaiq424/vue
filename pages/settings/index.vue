<template>
  <div class="lg:w-600 max-w-full">
    <MobPageHeader v-if="mq == 'mobile'" title="Edit personal information" back="/account">
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

    <Title tag="h2" size="md" class="mb-20"> Your name </Title>
    <div class="grid sm:grid-cols-2 gap-15">
      <TextField
        v-model="firstName"
        required
        :has-error="showErrors && !firstName.trim()"
        placeholder="First name"
        label="First name"
      ></TextField>
      <TextField
        v-model="lastName"
        required
        :has-error="showErrors && !lastName.trim()"
        placeholder="Last name"
        label="Last name"
      ></TextField>
    </div>
    <Divider size="lg" />

    <Title tag="h2" size="md" class="mb-20"> Gender </Title>

    <v-select
      v-model="gender"
      placeholder="Select your gender"
      :options="genders"
      :label="'title'"
      class="sm:w-210"
      :searchable="false"
    />

    <Divider size="lg" />

    <Title tag="h2" size="md" class="mb-20"> Date of birth </Title>
    <div class="grid sm:grid-cols-2 gap-15">
      <date-picker
        v-model="birth"
        placeholder="Select date"
        format="YYYY-MM-DD"
        value-type="YYYY-MM-DD"
        input-class="text-field text-field-border"
      >
        <i slot="icon-calendar" class="block pr-5">
          <svg-icon v-if="!birth" name="calendar" class="fill-current w-15 h-15"></svg-icon>
        </i>
      </date-picker>

      <!-- <TextField
        v-model="birth"
        required
        :has-error="showErrors && !birth"
        placeholder="Select date"
        label="Date of birth"
      ></TextField> -->
    </div>

    <Divider size="lg" />

    <Title tag="h2" size="md" class="mb-20"> Email address </Title>

    <div class="grid sm:grid-cols-2 gap-15">
      <TextField
        v-model="email"
        required
        :has-error="(showErrors && !email) || emailError"
        placeholder="Email"
        label="Email"
        :error-message="emailError"
      ></TextField>
    </div>

    <Divider v-if="mq !== 'mobile'" size="lg" />

    <div v-if="mq !== 'mobile'" class="flex">
      <Button size="md" :color="saved ? 'green' : 'primary'" :loading="loading" @click="save">
        {{ saved ? 'Saved' : 'Save' }}
      </Button>
      <Button size="md" class="underline text-gray-300" to="/account"> Cancel </Button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  import Divider from '~/components/base/Divider'
  export default {
    name: 'SettingsIndex',
    // layout: 'dashboard',
    components: {
      Divider,
      Button,
      TextField,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        birth: '',
        gender: '',
        saved: false,
        genders: [
          { value: 1, title: 'Male' },
          { value: 2, title: 'Female' },
          { value: 0, title: 'Other' },
        ],
        loading: false,
        showErrors: false,
        email: '',
        emailError: '',
      }
    },
    computed: mapState({
      mq: 'mq',
    }),
    mounted() {
      this.firstName = this.$auth.user.first_name || ''
      this.lastName = this.$auth.user.last_name || ''
      this.birth = this.$auth.user.birthday_at
      this.email = this.$auth.user.email
      this.gender = this.genders.find(gender => gender.value === this.$auth.user.gender)
    },
    methods: {
      save() {
        this.showErrors = true
        this.emailError = ''

        if (!this.firstName.trim() || !this.lastName.trim() || !this.email) {
          return
        }
        console.log('this.email', this.email)
        this.saved = false
        this.loading = true
        this.$axios
          .put('https://api.staymenity.com/public/api/userPersonal', {
            first_name: this.firstName || undefined,
            last_name: this.lastName || undefined,
            birthday_at: this.birth || undefined,
            email: this.email, // !== this.$auth.user.email ? this.email : undefined,
            gender: this.gender?.value || undefined,
            id: this.$auth.user.id,
          })
          .then(resp => {
            this.$auth.fetchUser().then(resp => {
              this.loading = false

              this.saved = true
            })

            // if (resp.data.success) {

            // }
          })
          .catch(error => {
            const errors = error.response.data.errors
            this.emailError = errors.email || ''
            this.loading = false
          })
      },
    },
  }
</script>
