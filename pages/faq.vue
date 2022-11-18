<template>
  <div class="pb-50 sm:pb-80 lg:pt-50">
    <Loading v-if="itemsLoading && isMobile" class="w-50 h-50 fill-black fixed-center"></Loading>
    <MobPageHeader v-if="isMobile" title="FAQ" back="" back-history />
    <div class="w-600 max-w-full mx-auto">
      <div v-if="!isMobile" class="mb-20 flex items-center">
        <h1 class="text-xl font-medium">Your questions, answered</h1>
        <Loading v-if="itemsLoading" class="w-20 h-20 ml-15 text-black"></Loading>
      </div>
      <Accordion v-if="items.length" :items="items" />
      <section v-if="!itemsLoading" class="mt-50 lg:mt-90">
        <h2 class="text-xl font-medium mb-20">Contact us</h2>
        <div class="sm:text-lg mb-40">
          <p>
            If you did’t find answer to your question feel free to contact us! We will be back
            shortly to help you with any question or issue. hello
          </p>
        </div>
        <Button color="primary" size="md" @click="showFeedbackModal">Contact us</Button>
      </section>
    </div>
  </div>
</template>

<script>
  import FeedbackModal from '~/components/FeedbackModal'
  import Accordion from '~/components/base/Accordion'

  export default {
    name: 'Faq',
    components: {
      Accordion,
    },
    data() {
      return {
        itemsLoading: false,
        items: [],
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.isMobile
      },
    },
    mounted() {
      this.itemsLoading = true
      this.$axios.$get('https://api.staymenity.com/api/faqs/get')
      .then(response => {
          console.log('response', response)
          this.items = response
          this.itemsLoading = false
       })
      // this.$axios.$get('https://api.staymenity.com/api/faqs/get').then(({ data }) => {
      //   this.items = data
      //   console.log('this.items', data)
      //   this.itemsLoading = false
      // })
    },
    methods: {
      showFeedbackModal() {
        this.$modal.show(FeedbackModal, {}, FeedbackModal.methods.getModalParams())
      },
    },
  }
</script>
