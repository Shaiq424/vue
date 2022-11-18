<template>
  <div class="container pt-20 md:pt-40 h-full">
    <div class="flex justify-between items-center mb-15 lg:mb-50">
      <h1 class="text-xl font-medium">Saved</h1>
      <Button class="btn--sm md:btn--md" color="primary" @click="showCreateSaveList">
        Create a list
      </Button>
    </div>

    <ResultEmpty
      v-if="!loading && !list.length"
      text="Nothing saved yet"
      icon="saved-thin"
      class="fixed-center"
    ></ResultEmpty>

    <Loading v-if="loading" class="w-50 h-50 fill-black fixed-center"></Loading>

    <swipe-list
      v-if="list.length && mq == 'mobile'"
      ref="list"
      class="-mx-container"
      :items="list"
      item-key="id"
      @swipeout:click="itemClick"
    >
      <template v-slot="{ item }">
        <!-- item is the corresponding object from the array -->
        <!-- index is clearly the index -->
        <!-- revealLeft is method which toggles the left side -->
        <!-- revealRight is method which toggles the right side -->
        <!-- close is method which closes an opened side -->
        <!-- style content how ever you like -->
        <nuxt-link :to="`/saved/${item.id}`" class="block container">
          <div class="py-17 border-b border-line pr-30 relative">
            <h2>{{ item.title }}</h2>
            <svg-icon
              name="arrow-right"
              class="h-12 w-12 fill-current text-gray absolute right-0 top-1/2 -mt-6"
            ></svg-icon>
          </div>
        </nuxt-link>
      </template>
      <!-- left swipe side template and v-slot:left="{ item }" is the item clearly -->
      <!-- remove if you dont wanna have left swipe side  -->
      <!-- right swipe side template and v-slot:right"{ item }" is the item clearly -->
      <!-- remove if you dont wanna have right swipe side  -->
      <template v-slot:right="{ item }">
        <div class="swipeout-action">
          <!-- place icon here or what ever you want -->
          <Button
            :loading="loading == item.id"
            color="red"
            tile
            class="w-70 h-full"
            @click="deleteList(item.id)"
          >
            Delete
          </Button>
        </div>
      </template>
      <template v-slot:empty>
        <div>
          <!-- change mockSwipeList to an empty array to see this slot in action  -->
          list is empty ( filtered or just empty )
        </div>
      </template>
    </swipe-list>

    <ul
      v-if="list.length && mq !== 'mobile'"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-30 gap-y-60 pb-50"
    >
      <li v-for="item in list" :key="item.id">
        <nuxt-link :to="`/saved/${item.id}`" class="saved-preview">
          <div class="saved-preview__photos">
            <img :src='"https://images.staymenity.com/img/default/default.png"' :alt="item.title" class="image-full" />
          </div>
          <div class="saved-preview__title">
            {{ item.title }}
          </div>
          <div class="saved-preview__desc">
            {{ `${item.count} ${item.count > 1 ? 'spaces' : 'space'}` }}
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import 'vue-swipe-actions/dist/vue-swipe-actions.css'
  import { SwipeList } from 'vue-swipe-actions'
  import CreateSaveList from '~/components/CreateSaveList'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'Saved',
    // layout: 'dashboard',
    middleware: 'auth',
    components: {
      SwipeList,
      Button,
    },
    data() {
      return {
        list: [],
        loading: false,
      }
    },
    computed: {
      mq() {
        return this.$store.state.mq
      },
    },
    mounted() {
      this.fetchList()
    },
    methods: {
      fetchList() {
        this.loading = true
        this.$axios
          .$get('https://api.staymenity.com/public/api/user/saveList', {
          // .$get('/user/saves', {
            params: { limit: 99, id: this.$auth.user.id },
          })
          .then(r => {
            this.list = r.data
            this.loading = false
          })
      },
      showCreateSaveList() {
        this.$modal.show(
          CreateSaveList,
          {
            onSaved: this.fetchList,
          },
          CreateSaveList.methods.getModalParams()
        )
      },
      itemClick() {},
      deleteList(listId) {
        this.loading = listId
        this.$axios.$delete(`/user/saves/${listId}`).then(r => {
          this.loading = false
          this.list = this.list.filter(item => item.id !== listId)
          this.$store.dispatch('getFavorites')
        })
      },
    },
  }
</script>

<style lang="postcss">
  .saved-preview {
    display: block;
    &__photos {
      position: relative;
      margin-bottom: 0.8rem;
      padding-bottom: calc(190 / 285 * 100%);
      &::before,
      &::after {
        @apply rounded;
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 100%;
        bottom: 0;
      }
      &::before {
        background-color: rgba(#000000, 0.1);
        width: calc(100% - 1.5rem * 2);
        transform: translate(-50%, -1.3rem);
      }
      &::after {
        background-color: #9d9d9d;
        width: calc(100% - 0.75rem * 2);
        transform: translate(-50%, -0.7rem);
      }
      img {
        @apply rounded;
        position: absolute;
        background-color: #9d9d9d;
        z-index: 3;
      }
    }
    &__title {
      @apply text-lg font-medium;
    }
  }
</style>
