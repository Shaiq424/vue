<template>
  <div>
    <MobPageHeader v-if="isMobile && !loading" title="Contacts" back="" back-history />
    <Loading v-if="loading" class="w-50 h-50 text-black fixed-center"></Loading>
    <div v-if="!loading" class="pt-10 lg:pt-50 pb-50 lg:pb-80">
      <h1 class="text-xl lg:text-2xl font-semibold lg:font-medium mb-20 lg:mb-40">Contacts</h1>
      <div class="prose" v-html="description"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContactsPage',
    data() {
      return {
        description: '',
        loading: true,
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.isMobile
      },
    },
    mounted() {
      this.loading = true
      this.$axios.$get('https://api.staymenity.com/public/api/contact/title/get').then(data => {
        this.description = data[0].description
        this.loading = false
      })
    },
  }
</script>

<style></style>
