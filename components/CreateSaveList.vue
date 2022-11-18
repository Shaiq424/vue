<template>
  <form class="flex flex-col h-full overflow-hidden w-full" @submit.prevent="submit">
    <div
      class="window-header flex justify-between items-center flex-shrink-0 px-40 py-20 border-b border-line"
    >
      <div class="text-lg md:text-xl font-medium">
        Name the list
      </div>
      <Button
        rounded
        icon
        color="black"
        size="sm"
        class="-mr-15"
        aria-label="Close"
        @click="$emit('close')"
      >
        <svg-icon name="close" class="h-12 w-12 fill-current" />
      </Button>
    </div>

    <div class="px-40 py-30">
      <TextField
        v-model="title"
        type="text"
        label="Name"
        :label-visible="true"
        required
        placeholder="Enter name"
      ></TextField>
    </div>

    <div
      class="grid grid-cols-2 gap-15 md:gap-0 md:flex justify-between border-t border-line px-40 py-20 lg:py-30"
    >
      <Button
        disabled-opacity
        type="submit"
        :loading="loading"
        :disabled="!title.trim()"
        color="primary"
        size="md"
        class="w-150"
      >
        Create
      </Button>
    </div>
  </form>
</template>

<script>
  import TextField from '~/components/base/TextField'
  import Button from '~/components/base/Button/Button'
  const modalParams = {
    width: 480,
    scrollable: true,
    height: 'auto',
    adaptive: true,
    'focus-trap': true,
    classes: 'shadow',
  }
  export default {
    name: 'CreateSaveList',
    props: {
      onSaved: {
        type: Function,
        default: Function,
      },
    },
    components: {
      TextField,
      Button,
    },
    data() {
      return {
        title: '',
        loading: false,
      }
    },
    methods: {
      submit(e) {
        this.loading = true
        this.$axios
          // .$post('/user/saves', {
          .$post('https://api.staymenity.com/public/api/user/save', {
            title: this.title,
            id: this.$auth.user.id,
          })
          .then(r => {
            this.loading = false
            this.onSaved()
            this.$emit('close')
          })
      },
      getModalParams() {
        return modalParams
      },
    },
  }
</script>
