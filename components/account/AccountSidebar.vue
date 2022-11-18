<template>
  <div class="col-span-4">
    <div class="shadow-lg px-25 py-40 rounded sticky top-20 text-center">
      <div class="relative inline-block mb-35">
        <Avatar size="w-130 h-130" class="relative" :loading="loading" :src='this.$auth.user.images ? this.$auth.user.images : "https://images.staymenity.com/img/default/user.png"'></Avatar>
        <input
          v-if="allowEdit"
          ref="uploadFile"
          type="file"
          accept="image/*;capture=camera"
          class="sr-only"
          @change="saveImage"
        />
        <div
          v-if="allowEdit"
          class="absolute bottom-0 right-0 border-2 border-solid border-white rounded-full mb-5 mr-5"
        >
          <Dropdown position="center" class="flex">
            <Button color="primary" fab rounded size="sm">
              <svg-icon name="plus-bold" class="w-12 h-12 fill-current text-white"></svg-icon>
            </Button>
            <div slot="dropdown" class="py-10">
              <Button
                v-if="user.has_image"
                text
                block
                start
                tile
                alpha-bg
                color="black"
                size="sm"
                class="whitespace-no-wrap px-25 close-dropdown"
                @click="deleteAvatar"
              >
                Delete a Photo
              </Button>
              <Button
                text
                block
                start
                tile
                alpha-bg
                color="black"
                size="sm"
                class="whitespace-no-wrap px-25 close-dropdown"
                @click="changeAvatar"
              >
                {{ user.has_image ? 'Change' : 'Upload' }} a Photo
              </Button>
            </div>
          </Dropdown>
        </div>
      </div>

      <div class="px-20">
        <div class="flex items-center">
          <svg-icon name="star-line" class="fill-current h-22 w-22 -mt-3"></svg-icon>
          <span class="font-semibold pl-15">Reviews ({{ user.reviews_length ? user.reviews_length : '0' }})</span>
        </div>
      </div>
      <Divider
        v-if="user.is_phone_verified || user.is_email_verified || user.is_email_verified"
        class="my-20"
      />
      <div
        v-if="user.is_phone_verified || user.is_email_verified || user.is_identity_verified"
        class="px-20"
      >
        <div class="text-lg font-semibold mb-20 text-left">{{ user.first_name }} confirmed</div>
        <div class="grid grid-flow-row gap-15">
          <IconText v-if="user.is_phone_verified" icon="checked"> Phone number </IconText>
          <IconText v-if="user.is_email_verified" icon="checked"> Email address </IconText>
          <IconText v-if="user.is_identity_verified" icon="secure" size="w-18 h-18 -ml-2">
            Identity verified
          </IconText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Dropdown from '~/components/base/Dropdown'
  import Avatar from '~/components/base/Avatar'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'AccountSidebar',
    components: {
      Dropdown,
      Avatar,
      Button,
    },
    props: {
      user: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        photo: this.$auth?.user?.images, // this.user.image,
        loading: false,
      }
    },
    computed: {
      allowEdit() {
        return this.user.id === this.$auth?.user?.id
      },
    },
    mounted() {
      this.getuserImg()
    },
    methods: {
      getuserImg() {
        this.$axios
        .$get('https://api.staymenity.com/public/api/user/Image', {
          params: {
            id: this.$auth?.user?.id,
          },
        })
        .then(user => {
          // console.log('data', this.$auth.fetchUser())
          this.$auth.$storage.setUniversal('user', user, true) // setting user in Vuex, cookies and localstorage
          // // const user_ = this.$auth.$storage.getUniversal('user') // getting user (you can use it anywhere in your app)
          this.$auth.$storage.getUniversal('user')
          console.log('data', user)
          this.$forceUpdate()
          // return r.images
        })
      },
      deleteAvatar() {
        this.loading = true
        this.$axios.delete('/user/image').then(resp => {
          this.$auth.fetchUser().then(resp => {
            this.loading = false
            this.$refs.uploadFile.value = ''
          })
        })
      },
      changeAvatar() {
        this.$refs.uploadFile.click()
      },
      saveImage({ target }) {
        if (!target.files[0]) {
          return
        }
        console.log('image', target.files[0].name)
        this.loading = true
        const params = new FormData()
        params.append('image', target.files[0])
        params.append('id', this.$auth.user.id)
        this.$axios({
          method: 'POST',
          url: 'https://api.staymenity.com/public/api/userImg',
          //  url: '/user',
          headers: {
            Authorization:
              localStorage.getItem('auth._token.local') ||
              `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          data: params,
        }).then(resp => {
          // this.$auth.fetchUser().then(resp => {
            this.loading = false
            // this.$axios.post('file-upload', target.files[0])
          // })
          if (resp.data.success) {
          }
        })
      },
    },
  }
</script>

<style></style>
