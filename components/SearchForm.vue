<template>
  <div>
    <div v-if="mq == 'mobile'" class="grid grid-cols-2">
      <button
        class="btn-base border border-line rounded flex items-center pl-15 w-full h-50 col-span-2"
        @click="
          mobStep = 1
          $modal.show('date-modal')
        "
      >
        <svg-icon name="search" class="fill-current text-black h-25 w-25 flex-shrink-0"></svg-icon>
        <div class="px-15 w-full inline-block truncate text-left">
          {{ mobSearchButtonText }}
        </div>
      </button>
      <Button
        v-if="showFilter"
        text
        bold
        size="sm"
        color="primary"
        class="text-base h-50"
        @click="$emit('toggle-map', !isMapOpen)"
      >
        <svg-icon
          :name="isMapOpen ? 'list' : 'map'"
          class="w-20 h-20 fill-current mr-10"
        ></svg-icon>
        <span>{{ isMapOpen ? 'Show list' : 'On map' }}</span>
      </Button>
      <Button
        v-if="showFilter"
        text
        bold
        size="sm"
        color="primary"
        class="text-base h-50"
        @click="openFiltersModal()"
      >
        <svg-icon name="filter" class="w-20 h-20 fill-current mr-10"></svg-icon>
        <span>More Filters</span>
      </Button>
    </div>

    <form v-else class="md:flex" @submit.prevent="submit">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-15 pr-10 xl:pr-15 mb-15 md:mb-0 w-full"
      >
        <client-only>
          <Dropdown :on-close="onSpacesDropdownClose" :on-open="onSpacesDropdownOpen">
            <TextField
              placeholder="All spaces"
              label="Type of place"
              readonly
              class="w-full"
              :field-classes="['cursor-pointer']"
              :value="selectedTypesString"
            />
            <template v-slot:dropdown="{ closeDropdown }">
              <div class="pt-20 w-800 lg:w-950 xl:w-1100">
                <div class="px-30 pb-30 grid grid-cols-4">
                  <ul class="col-count-2 lg:col-count-2 col-span-2">
                    <li
                      :class="[
                        'py-8 w-full inline-block',
                        { 'pointer-events-none': tempSelectedAllSpaces },
                      ]"
                    >
                      <Checkbox v-model="tempSelectedAllSpaces" :value="'all'" class="text-primary">
                        All spaces
                      </Checkbox>
                    </li>
                    <li v-for="typ in type_" :key="typ.id" class="py-8 w-full inline-block">
                      <Checkbox v-model="tempSelectedTypes" :value="typ.id">
                        {{ typ.title }}
                      </Checkbox>
                    </li>
                  </ul>
                  <!-- -->
                  <div
                    class="absolute top-0 right-0 bottom-0 mb-75 w-1/4 pt-25 border-l border-line pl-20 flex flex-col"
                  >
                    <div class="mb-25 font-medium text-lg flex-shrink-0">Features</div>
                    <ul class="grid grid-cols-1 gap-16 overflow-y-auto pr-20">
                      <li v-for="amenity in amenitiesAll" :key="amenity.id" >
                        <Checkbox v-model="amenities" :value="amenity.id">
                          {{ amenity.title }}
                        </Checkbox>
                      </li>
                      <div class="h-20 flex-shrink-0"></div>
                    </ul>
                  </div>
                </div>
                <div class="border-t border-gray-300 border-opacity-10 py-15 flex pr-30">
                  <Button
                    v-if="tempSelectedTypes.length"
                    text
                    size="md"
                    color="primary"
                    @click="
                      clearSpaces()
                      closeDropdown()
                    "
                  >
                    Clear ({{ tempSelectedTypes.length }})
                  </Button>
                  <Button
                    size="md"
                    color="primary"
                    class="ml-auto"
                    @click="
                      confirmSpaces()
                      closeDropdown()
                    "
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </template>
          </Dropdown>
          <!-- @See https://github.com/sagalbot/vue-select/issues/1245  -->
          <v-select
            v-model="selectedAddress"
            placeholder="Nearby"
            :options="cities"
            :label="'description'"
            :no-drop="cities.length ? false : true"
            @search="debounceFetchAddress"
          >
            <template #no-options>
              <div class="text-left w-full px-20">Address not found</div>
            </template>
          </v-select>

          <date-picker
            v-model="date"
            placeholder="Tomorrow"
            format="MM-DD-YYYY"
            value-type="MM-DD-YYYY"
            input-class="text-field text-field-border"
            :append-to-body="false"
            :popup-class="'search-popup'"
            :disabled-date="date => date < new Date()"
          >
            <i slot="icon-calendar"></i>
          </date-picker>
        </client-only>
      </div>
      <Button v-if="!showFilter" type="submit" color="primary" size="md" class="w-full md:w-auto">
        Search
      </Button>
      <Button v-if="showFilter" color="primary" size="md" @click="openFiltersModal()">
        <span>{{ mq == 'desktop' ? 'More Filters' : 'Filters' }}</span>
      </Button>
    </form>

    <modal
      v-if="mq == 'mobile'"
      name="date-modal"
      :width="'100%'"
      :scrollable="false"
      :adaptive="true"
      :height="'100%'"
      :focus-trap="true"
      :classes="['shadow', 'flex', 'flex-col', 'h-full']"
    >
      <div class="h-full flex flex-col items-stretch overflow-hidden">
        <div
          class="window-header flex justify-between items-center flex-shrink-0 px-25 md:px-50 py-20 border-b border-line"
        >
          <div class="text-lg md:text-xl font-medium">
            <span v-if="mobStep == 1">Select date</span>
            <span v-if="mobStep == 2">Select location</span>
            <span v-if="mobStep == 3">Select type of space</span>
          </div>
          <Button
            rounded
            icon
            color="black"
            size="sm"
            class="-mr-15"
            aria-label="Close"
            @click="$modal.hide('date-modal')"
          >
            <svg-icon name="close" class="h-12 w-12 fill-current" />
          </Button>
        </div>

        <div class="pt-20 lg:pt-50 px-15 md:px-50 overflow-hidden h-full flex flex-col">
          <date-picker
            v-if="mobStep == 1"
            v-model="date"
            placeholder="Tomorrow"
            format="MM-DD-YYYY"
            :inline="true"
            value-type="MM-DD-YYYY"
            input-class="text-field text-field-border"
            :disabled-date="date => date < new Date()"
            @pick="mobStep++"
          >
            <i slot="icon-calendar"></i>
          </date-picker>

          <template v-if="mobStep == 2">
            <TextField
              ref="addressSearch"
              v-model="addressSearch"
              placeholder="Search"
              class="mb-10"
              slot-prefix-classes="border-r-0 pl-10 pr-0 -mr-5"
              :loading="mobSearchLoading"
              @input="debounceFetchAddress(addressSearch, setMobSearchLoading)"
            >
              <svg-icon
                slot="prefix"
                name="search"
                class="w-20 h-20 fill-current text-black"
              ></svg-icon>
            </TextField>
            <ul>
              <li class="border-b border-line">
                <Button
                  text
                  block
                  size="md"
                  color="primary"
                  class="px-0 py-25 justify-between"
                  @click="mobStep++"
                >
                  <span>Nearby</span>
                  <svg-icon name="arrow-right" class="h-12 w-12 fill-current text-gray"></svg-icon>
                </Button>
              </li>
              <template v-for="city in cities">
                <li v-if="city.title" :key="city.place_id" class="border-b border-line">
                  <Button
                    text
                    block
                    size="md"
                    color="black"
                    class="px-0 py-25 justify-between whitespace-normal"
                    @click="
                      selectedAddress = city
                      mobStep++
                    "
                  >
                    <span>{{ city.title }}</span>
                    <svg-icon
                      name="arrow-right"
                      class="h-12 w-12 fill-current text-gray"
                    ></svg-icon>
                  </Button>
                </li>
              </template>
            </ul>
          </template>
          <template v-if="mobStep == 3">
            <TextField
              ref="addressSearch"
              v-model="typeSearch"
              placeholder="Search"
              class="mb-10"
              slot-prefix-classes="border-r-0 pl-10 pr-0 -mr-5"
            >
              <svg-icon
                slot="prefix"
                name="search"
                class="w-20 h-20 fill-current text-black"
              ></svg-icon>
            </TextField>
            <ul class="h-full overflow-y-auto -mr-15 pr-15">
              <li class="py-8 w-full inline-block">
                <Checkbox v-model="selectedAllSpaces" :value="'all'" class="text-primary">
                  All spaces
                </Checkbox>
              </li>
              <li v-for="type in searchedTypes" :key="type.id" class="py-8 w-full inline-block">
                <Checkbox v-model="selectedTypes" :value="type.id">
                  {{ type.title }}
                </Checkbox>
              </li>
              <!-- <li class="border-b border-line">
                <Button
                  text
                  block
                  size="md"
                  color="primary"
                  class="px-0 py-25 justify-between"
                  @click="
                    selectedTypes = []
                    submit()
                  "
                >
                  <span>All spaces</span>
                  <svg-icon name="arrow-right" class="h-12 w-12 fill-current text-gray"></svg-icon>
                </Button>
              </li>
              <li v-for="type in searchedTypes" :key="type.name" class="border-b border-line">
                <Button
                  text
                  block
                  size="md"
                  color="black"
                  class="px-0 py-25 justify-between whitespace-normal"
                  @click="
                    selectedTypes = [type.id]
                    submit()
                  "
                >
                  <span>{{ type.title }}</span>
                  <svg-icon name="arrow-right" class="h-12 w-12 fill-current text-gray"></svg-icon>
                </Button>
              </li> -->
            </ul>
          </template>
        </div>

        <div
          class="grid grid-cols-2 md:gap-0 md:flex justify-end border-t border-line px-25 lg:px-50 py-8 lg:py-30"
        >
          <Button
            v-if="mobStep == 1"
            outlined
            color="primary"
            size="md"
            class="col-start-2"
            @click="mobStep = 2"
          >
            Skip
          </Button>
          <Button v-if="mobStep == 2" text color="primary" size="md" @click="mobStep = 1">
            Back
          </Button>
          <Button v-if="mobStep == 2" color="primary" size="md" @click="mobStep = 3"> Skip </Button>

          <Button v-if="mobStep == 3" text color="primary" size="md" @click="mobStep = 2">
            Back
          </Button>
          <Button v-if="mobStep == 3" color="primary" size="md" @click="submit()"> Apply </Button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import debounce from 'debounce'
  import Dropdown from '../components/base/Dropdown'
  import TextField from '../components/base/TextField'
  import Checkbox from '../components/base/Checkbox'
  import FilterModal from '~/components/FilterModal'
  import Button from '~/components/base/Button/Button'
  export default {
    name: 'SearchForm',
    props: {
      showFilter: Boolean,
      isMapOpen: Boolean,
    },
    components: {
      Dropdown,
      TextField,
      Checkbox,
      Button,
    },
    data() {
      return {
        amenities: [],
        amenitiesAll: [],
        type_: [],
        date: null,
        mobStep: 1,
        showAllTypes: false,
        filterByNumberGuests: false,
        filterByHours: false,
        selectedTypes: [],
        tempSelectedAllSpaces: 1,
        tempSelectedTypes: [],
        searchAddressQuery: '',
        selectedAddress: null,
        selectedPlace: null,
        selectedAllSpaces: true,
        cities: [],
        addressSearch: '',
        mobSearchLoading: false,
        typeSearch: '',
        place_id: '',
        place_title: '',
        priceFrom: 0,
        priceTo: 0,
        priceMin: 0,
        priceMax: 0,
        mobFormIsOpen: false,
      }
    },
    computed: {
      ...mapState({
        // types: 'types',
        mq: 'mq',
        currentLocation: 'currentLocation',
        search: 'search',
        config: 'config',
      }),
      debounceFetchAddress() {
        return debounce(this.fetchAddress, 500)
      },
      mobSearchButtonText() {
        return this.selectedPlace || this.selectedTypesString || this.date
          ? `${this.selectedTypesString || 'All spaces'} in ${
              this.selectedPlace?.title || 'nearby'
            } for ${this.date || 'tomorrow'}`
          : 'Search'
      },
      selectedTypesString() {
        // const type__ = this.type_
          const type__ = this.type_
          .filter(type => this.selectedTypes.includes(type.id))
          .map(type => type.title)
          .join(', ')
          console.log('this.types', type__)
          return type__
      },
      searchedTypes() {
        console.log('typeSearch', this.typeSearch)
        if (!this.typeSearch) {
          return this.type_
        } else {
          return this.type_.filter(type =>
            type.title.toLowerCase().includes(this.typeSearch.toLowerCase())
          )
        }
      },
      typesList() {
        return this.showAllTypes ? this.type_ : this.type_.slice(0, 5)
      },
    },
    watch: {
      selectedAddress(val) {
        this.fetchPlace(val?.place_id)
      },
      selectedAllSpaces(val) {
        val && this.clearSpaces()
      },
      tempSelectedAllSpaces(val) {
        val && this.clearSpaces(false)
        this.fetchAmenities(() => {
          this.amenities = this.amenitiesAll
            .filter(a => this.amenities.includes(a.id))
            .map(a => a.id)
        })
      },
      selectedTypes(list) {
        this.selectedAllSpaces = list.length ? 0 : 1
        this.fetchAmenities()
      },
      tempSelectedTypes(list) {
        this.tempSelectedAllSpaces = list.length ? 0 : 1
        this.fetchAmenities()
      },

      selectedPlace() {
        this.showFilter &&
          this.updateData({
            place: true,
          })
      },
      date() {
        this.showFilter && this.updateData()
      },
    },
    mounted() {
      this.fetchAmenities()
      this.fetchTypes()
      this.amenities = this.search.amenities
      if (this.showFilter) {
        this.selectedTypes = this.search.types

        this.tempSelectedTypes = [...this.selectedTypes]
        this.date = this.search.date
        this.place_id = this.search.place_id
        if (this.search.place_title) {
          this.place_title = this.search.place_title
          this.selectedAddress = {
            description: this.search.place_title,
            place_id: this.search.place_id,
          }
          this.cities = [
            {
              description: this.search.place_title,
              place_id: this.search.place_id,
            },
          ]
          this.addressSearch = this.search.place_title
        }
      }
    },
    methods: {
      fetchAmenities(after) {
        this.$axios
          .$get(`https://api.staymenity.com/public/api/amenities?${this.tempSelectedTypes?.map(id => `type_id[]=${id}`).join('&')}`)
          .then(data => {
            this.amenitiesAll = data
            after && after()
          })
      },
       fetchTypes(after) {
         // console.log('after', after)
         this.$axios.$get('https://api.staymenity.com/public/api/amenities/get')
          .then(response => {
            this.type_ = response
            after && after()
          })
      },
      clearSearchOnBlur() {
        return true
      },  
      onSpacesDropdownOpen() {
        console.log('open')
        this.amenities = this.search.amenities
      },
      onSpacesDropdownClose() {
        console.log('close')

        setTimeout(() => {
          this.tempSelectedTypes = [...this.selectedTypes]
        }, 300)
      },
      setMobSearchLoading(s) {
        this.mobSearchLoading = s
      },
      clearSpaces(confirmSpaces = true) {
        this.tempSelectedTypes = []
        if (confirmSpaces) {
          this.selectedTypes = []
          this.selectedAnimities = []
          this.confirmSpaces()
        }
      },
      confirmSpaces() {
        this.selectedTypes = [...this.tempSelectedTypes]
        this.updateData()
      },
      updateData(params = {}) {
        const push = params.push || this.showFilter
        const data = {
          types: this?.selectedTypes,
          amenities: this.amenitiesAll.filter(a => this.amenities.includes(a.id)).map(a => a.id),
          place_id: this?.selectedAddress?.place_id || this.place_id || '',
          place_title: this?.selectedAddress?.description || '',
          date: this?.date,
          page: 1,
        }
        // console.log('selectedTypes', this?.selectedTypes)
        // console.log('amenitiesAll', this.amenitiesAll)
        // console.log('selectedAddress', this?.selectedAddress?.place_id)
        // console.log('description', this?.selectedAddress?.description)
        // console.log('date', this?.date)
        console.log('data', data)
        if (params.place) {
          data.location = {
            latitude:
              this?.selectedPlace?.coordinates.latitude ||
              this.currentLocation?.latitude ||
              this.config.LOCATION_DEFAULT.latitude,
            longitude:
              this?.selectedPlace?.coordinates.longitude ||
              this.currentLocation?.longitude ||
              this.config.LOCATION_DEFAULT.longitude,
          }
        }
        //  console.log('location', data.location)
        if (data.place_id && data.date) {
          console.log('data', data)
          console.log('push', push)
          console.log('params.reset', params.reset)
          this.$store.dispatch('search/set', { data, push, reset: params.reset })
        }
      },
      submit() {
        this.$modal.hide('date-modal')
        this.updateData({
          push: true,
          place: true,
          reset: true,
        })
        // this.$router.push({
        //   path: '/search',
        //   query: data,
        // })
      },
      openFiltersModal() {
        this.$modal.show(
          FilterModal,
          {},
          {
            width: 700,
            scrollable: true,
            adaptive: true,
            height: '100%',
            focusTrap: true,
            classes: ['shadow', 'h-full', 'overflow-visible'],
          }
        )
      },
      fetchPlace(place_id) {
       // console.log('test')
        this.place_id = place_id
        if (place_id) {
          this.$axios.$get(`/search/place?q=${place_id}`).then(r => {
            this.selectedPlace = r.data
          })
        } else {
          this.selectedPlace = null
        }
      },
      fetchAddress(search, loading) {
        // console.log('search', search)
        if (search) {
          // const axios = require('axios')

          // const config = {
          //   method: 'get',
          //   url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=AIzaSyBmOdhkcNpA_vwoV4SKm_ixSkIjNqzgQ4E',
          //   headers: { },
          // }

          // axios(config)
          // .then(function (response) {
          //   console.log('cities', JSON.stringify(response.data))
          // })
          // .catch(function (error) {
          //   console.log(error)
          // })
          loading(true)
          this.$axios
            .$get(`/search/address?q=${search}`)
            .then(r => {
              this.searchAddressQuery = search
              this.cities = r.data
              loading(false)
            })
            .catch(error => {
              console.log(error)
              loading(false)
            })
        }
      },
    },
  }
</script>
