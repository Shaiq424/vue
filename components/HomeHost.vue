<template>
  <div class="home-host">
    <div class="home-host-main-section">
      <div class="home-host-main-section-ills">
        <div
          class="section-ill section-ill-1"
          data-aos="show-in-left"
          data-aos-duration="2000"
          data-aos-delay="200"
        >
          <div
            class="rounded-xl shadow-border"
            style="background-image: url(/img/ill-1-1.jpg)"
          ></div>
        </div>
        <div
          class="section-ill section-ill-2"
          data-aos="show-in-right"
          data-aos-duration="2000"
          data-aos-delay="300"
        >
          <div
            class="rounded-xl shadow-border"
            style="background-image: url(/img/ill-1-2.jpg)"
          ></div>
        </div>
        <div
          class="section-ill section-ill-4"
          data-aos="show-in-left"
          data-aos-duration="2000"
          data-aos-delay="400"
        >
          <div
            class="rounded-xl shadow-border"
            style="background-image: url(/img/ill-1-4.jpg)"
          ></div>
        </div>
        <div
          class="section-ill section-ill-3"
          data-aos="show-in-right"
          data-aos-duration="2000"
          data-aos-delay="500"
        >
          <div
            class="rounded-xl shadow-border"
            style="background-image: url(/img/ill-1-3.jpg)"
          ></div>
        </div>
      </div>

      <div class="container container--tiny">
        <div data-aos="fade-in" data-aos-delay="0" data-aos-duration="2000">
          <div class="text-big lg:text-2xl font-semibold text-primary mb-20 lg:mb-40">
            Own a great place?
          </div>
          <!-- <svg-icon
            class="logo mb-30 sm:mb-80 transform -translate-x-15 w-200 h-35"
            name="logo"
          ></svg-icon> -->
        </div>
      </div>
      <div class="relative sm:pb-30 sm:pt-0">
        <div class="container container--tiny relative z-3">
          <h1
            class="text-mob-2xl lg:text-3xl font-semibold mb-20 sm:mb-75 text-black relative z-2 -mx-10"
            data-aos="fade-in"
            data-aos-delay="200"
            data-aos-duration="2000"
          >
            Turn your unused space<br />
            into real money
          </h1>
          <div data-aos="fade-in" data-aos-delay="400" data-aos-duration="2000">
            <Button tag="a" @click="scrollMeTo('request-form-section')" color="primary" size="md">
              Become a host
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="container container--tiny relative z-2">
      <div class="arrow-1">
        <div
          data-aos="fade-in"
          data-aos-offset="-240"
          data-aos-delay="600"
          data-aos-duration="2000"
        >
          <div class="text-ill">
            Curious how<br />
            it works?
          </div>

          <div class="arrow-wrapper sm:hidden" style="width: 19.1rem; height: 15rem" data-line>
            <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>

            <svg
              class="arrow-wrapper__path"
              width="191"
              height="150"
              viewBox="0 0 191 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="sm:hidden"
                stroke="#5D44F6"
                stroke-dasharray="5 5"
                d="M66.5 0.5C19 85.5 165.099 74 165.099 141.682"
              />
            </svg>
          </div>

          <div
            class="arrow-wrapper hidden sm:block"
            style="width: 19.1rem; height: 15rem"
            data-line
          >
            <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>
            <svg
              class="arrow-wrapper__path"
              width="191"
              height="150"
              viewBox="0 0 191 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class=""
                stroke="#5D44F6"
                stroke-dasharray="5 5"
                d="M26.5 0.5C19 85.5 165.099 74 165.099 141.682"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="shadow-border bg-white pt-30 pb-15 px-30 sm:px-50 mx-auto max-w-xs sm:max-w-sm rounded-lg text-center"
        data-aos="fade-in"
        data-aos-offset="0"
      >
        <div class="text-big leading-tight font-medium mb-15">List your space</div>
        <div id="animation-list" class="animation-list">
          <ul>
            <li>Waterview</li>
            <li>Private lake</li>
            <li>Pool</li>
            <li>Hot Tub</li>
            <li>Backyard</li>
            <li>Tennis court</li>
            <li>Firepit</li>
            <li>Barbeque</li>
            <li>Rooftop</li>
            <li>Outdoor bar</li>
            <li>Chef’s Kitchen</li>
            <li>Mansion</li>
            <li>Movie theatre</li>
            <li>Bowling alley</li>
            <li>Farm</li>
            <li>Garden</li>
            <li>Home office</li>
            <li>Playground</li>
            <li>Guest House</li>
            <li class="font-semibold">And much more</li>
          </ul>
        </div>
        <button
          id="animation-list-btn"
          class="btn btn--md text-gray rounded-full mt-15 hover:text-black transform translate-z-0 overflow-hidden"
        >
          <span style="will-change: transform" class="block">
            <svg-icon name="view" class="w-20 h-10 inline-block mr -mt-2 fill-current"></svg-icon>

            View more
          </span>
          <span
            style="will-change: transform"
            class="opacity-0 transform translate-y-full absolute inset-0 flex items-center justify-center"
          >
            <svg-icon
              name="collapse"
              class="w-8 h-17 inline-block mr-5 -mt-2 fill-current"
            ></svg-icon>

            Collapse
          </span>
        </button>
      </div>

      <div class="overflow-hidden -mx-20 relative">
        <div
          class="arrow-wrapper mx-auto mt-20 mb-10"
          style="width: 1.2rem; height: 14.7rem"
          data-line
        >
          <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>

          <svg
            class="arrow-wrapper__path"
            width="12"
            height="147"
            viewBox="0 0 12 147"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L6.00001 139"
              stroke="#5D44F6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="5 5"
            />
          </svg>
        </div>

        <div class="relative">
          <div>
            <div id="lottie" class="lottie-animation z-0"></div>
          </div>
          <div
            class="shadow-border bg-white py-35 px-35 mx-auto max-w-xs sm:max-w-sm rounded-lg text-center text-big font-medium relative z-10"
            data-aos="fade-in"
          >
            Guest’s enjoy<br />
            their time
          </div>
        </div>

        <div
          class="arrow-wrapper mx-auto mt-20 mb-10"
          style="width: 1.2rem; height: 14.7rem"
          data-line
        >
          <div>
            <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>
          </div>
          <svg
            class="arrow-wrapper__path"
            width="12"
            height="147"
            viewBox="0 0 12 147"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L6.00001 139"
              stroke="#5D44F6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="5 5"
            />
          </svg>
        </div>
      </div>

      <div
        class="shadow-border py-35 px-35 mx-auto max-w-xs sm:max-w-sm rounded-lg text-center text-big font-medium"
        data-aos="fade-in"
      >
        Earn extra<br />
        income
      </div>
      <div class="relative h-100 mb-100 sm:mb-160 mr-10 sm:mr-30 mt-10">
        <div
          class="arrow-wrapper mx-auto my-20 hidden sm:block absolute bottom-0 right-0 trasform left-1/2 -translate-x-1/2"
          style="width: 25.8rem; height: 48rem"
          data-line
          data-duration="8000"
        >
          <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>
          <svg
            class="arrow-wrapper__path"
            width="258"
            height="480"
            viewBox="0 0 258 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- <path d="M156 5.87434L164.811 0.787039L164.811 10.9616L156 5.87434Z" fill="#5D44F6"/> -->
            <path
              d="M1 405V459C1 467.284 7.71573 474 16 474H128.5H242C250.284 474 257 467.284 257 459V21C257 12.7157 250.284 6 242 6H158"
              stroke="#5D44F6"
              stroke-dasharray="5 5"
            />
          </svg>
        </div>

        <div
          class="arrow-wrapper sm:hidden absolute bottom-0 right-0 -mr-15 sm:-mr-10 mb-55 sm:mb-25 trasform left-1/2 -translate-x-1/2"
          style="width: 17.1rem; height: 42.1rem"
          data-line
          data-duration="8000"
        >
          <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>
          <svg
            class="arrow-wrapper__path"
            width="171"
            height="421"
            viewBox="0 0 171 421"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- <path d="M144.114 6.511L153.881 0.872324L153.881 12.1497L144.114 6.511Z" fill="#5D44F6"/>
                  <path d="M110.584 413.511L100.818 419.15L100.818 407.872L110.584 413.511Z" fill="#5D44F6"/> -->
            <path
              d="M0.5 380.15V399C0.5 407.284 7.21573 414 15.5 414H113.634H154.607C162.891 414 169.607 407.284 169.607 399L169.607 266.012V21.6504C169.607 13.3661 162.891 6.65039 154.607 6.65039H146.331"
              stroke="#5D44F6"
              stroke-dasharray="5 5"
            />
          </svg>
        </div>

        <div class="text-ill absolute right-0 bottom-0 -mb-40 sm:-mb-70 mr-30">
          Book another stay,<br />
          Rent out again.
        </div>
      </div>
    </div>

    <div class="host-advantages">
      <div class="container">
        <div
          class="text-xl sm:text-2xl font-semibold mb-40 sm:mb-80 w-800 max-w-full mx-auto text-center"
        >
          We aim to enhance, optimize<br class="hidden sm:block" />
          and deliver the perfect travel,<br class="hidden sm:block" />
          work and life experiences for you to enjoy.
        </div>
        <ul class="host-banners">
          <li>
            <div class="host-banner">
              <img src="/img/host-banner-1.jpg" loading="lazy" alt="Work" />
              <div class="host-banner__title">Work</div>
            </div>
          </li>
          <li>
            <div class="host-banner">
              <img src="/img/host-banner-2.jpg" loading="lazy" alt="Play" />
              <div class="host-banner__title">Play</div>
            </div>
          </li>
          <li>
            <div class="host-banner">
              <img src="/img/host-banner-3.jpg" loading="lazy" alt="Swim" />
              <div class="host-banner__title">Swim</div>
            </div>
          </li>
          <li>
            <div class="host-banner">
              <img src="/img/host-banner-4.jpg" loading="lazy" alt="Capture" />
              <div class="host-banner__title">Capture</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="pt-60 sm:pt-100 sm:pb-40 text-center relative z-3 hidden">
      <div class="container container--tiny">
        <h2 class="text-mob-2xl sm:text-2xl mb-15 font-semibold" data-aos="fade-in">
          What people say about&nbsp;us
        </h2>
        <p class="text-base lg:text-big" data-aos="fade-in">
          And why our rental marketplace<br />
          is a revolution
        </p>
      </div>
      <div class="relative">
        <swiper
          ref="swiperReviews"
          :options="swiperReviewsOptions"
          class="container--tiny relative px-20 sm:px-0 slider-reviews w-full sm:-mt-20"
          :cleanup-styles-on-destroy="false"
        >
          <swiper-slide>
            <div
              class="max-w-lg rounded-lg text-left mx-auto bg-white shadow-border overflow-hidden"
            >
              <div class="review-slide-inner">
                <div
                  class="px-40 sm:px-60 py-20 border-b border-solid border-black border-opacity-10 flex items-center"
                >
                  <img
                    loading="lazy"
                    class="w-50 h-50 sm:w-70 sm:h-70 rounded-full object-cover object-center mr-15"
                    src="img/review-1.jpg"
                    alt=""
                  />
                  <div>
                    <div class="text-lg font-medium leading-tiny">Joy Horton</div>
                    <div class="text-gray-light">San Antonio, TX</div>
                  </div>
                </div>
                <div class="px-40 sm:px-60 pt-25 pb-30 text-gray sm:text-lg">
                  <p>
                    “Finally I can rent out my saltwater pool on a trusted platform that is safe and
                    secure”
                  </p>
                  <!-- <p class="uppercase text-sm font-semibold mt-20 sm:mt-35">Rents out his rooftop using craigslist</p> -->
                </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div
              class="max-w-lg rounded-lg text-left mx-auto bg-white shadow-border overflow-hidden"
            >
              <div class="review-slide-inner">
                <div
                  class="px-40 sm:px-60 py-20 border-b border-solid border-black border-opacity-10 flex items-center"
                >
                  <img
                    class="w-50 h-50 sm:w-70 sm:h-70 rounded-full object-cover object-center mr-15"
                    src="img/review-2.jpg"
                    alt=""
                  />
                  <div>
                    <div class="text-lg font-medium leading-tiny">Alex Wang</div>
                    <div class="text-gray-light">Los Angeles, CA</div>
                  </div>
                </div>
                <div class="px-40 sm:px-60 pt-25 pb-30 text-gray sm:text-lg">
                  <p>“This is going to be amazing! I can’t wait to share my private beach.”</p>
                  <!-- <p class="uppercase text-sm font-semibold mt-20 sm:mt-35">Rents out his rooftop using craigslist</p> -->
                </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div
              class="max-w-lg rounded-lg text-left mx-auto bg-white shadow-border overflow-hidden"
            >
              <div class="review-slide-inner">
                <div
                  class="px-40 sm:px-60 py-20 border-b border-solid border-black border-opacity-10 flex items-center"
                >
                  <img
                    class="w-50 h-50 sm:w-70 sm:h-70 rounded-full object-cover object-center mr-15"
                    src="img/review-3.jpg"
                    alt=""
                  />
                  <div>
                    <div class="text-lg font-medium leading-tiny">Frederick Nielsen</div>
                    <div class="text-gray-light">New Orleans, LA</div>
                  </div>
                </div>
                <div class="px-20 sm:px-60 pt-25 pb-30 text-gray sm:text-lg">
                  <p>
                    “Super pumped for this launch - I can’t wait to build out my lakefront property
                    listing in under 5 minutes.”
                  </p>
                  <!-- <p class="uppercase text-sm font-semibold mt-20 sm:mt-35">Rents out his rooftop using craigslist</p> -->
                </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div
              class="max-w-lg rounded-lg text-left mx-auto bg-white shadow-border overflow-hidden"
            >
              <div class="review-slide-inner">
                <div
                  class="px-40 sm:px-60 py-20 border-b border-solid border-black border-opacity-10 flex items-center"
                >
                  <img
                    class="w-50 h-50 sm:w-70 sm:h-70 rounded-full object-cover object-center mr-15"
                    src="img/review-4.jpg"
                    alt=""
                  />
                  <div>
                    <div class="text-lg font-medium leading-tiny">Cora Robertson</div>
                    <div class="text-gray-light">Phoenix, AZ</div>
                  </div>
                </div>
                <div class="px-40 sm:px-60 pt-25 pb-30 text-gray sm:text-lg">
                  <p>
                    “The built in messaging platform will make it easy for me to communicate with
                    guests!”
                  </p>
                  <!-- <p class="uppercase text-sm font-semibold mt-20 sm:mt-35">Rents out his rooftop using craigslist</p> -->
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div
          class="swiper-arrows slider-reviews-arrows absolute top-1/2 inset-x-0 transform -translate-y-1/2 z-10"
        >
          <div class="container container--tiny w-750 max-w-full flex justify-between">
            <button
              data-slider-arrow-prev
              aria-label="Previous slide"
              class="p-10 sm:p-15 focus:text-primary focus:outline-none text-black hover:text-opacity-50"
              @click="prevSlide"
            >
              <svg-icon
                name="arrow-left"
                class="w-20 h-20 sm:w-25 sm:h-25 fill-current transition duration-150"
              ></svg-icon>
            </button>
            <button
              data-slider-arrow-next
              aria-label="Next slide"
              class="p-10 sm:p-15 focus:text-primary focus:outline-none text-black hover:text-opacity-50"
              @click="nextSlide"
            >
              <svg-icon
                name="arrow-right"
                class="w-20 h-20 sm:w-25 sm:h-25 fill-current transition duration-150"
              ></svg-icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-section rounded-section--top-hidden pt-50 pb-200 sm:pt-75 text-center">
      <div class="container container--tiny">
        <h2
          class="text-mob-2xl sm:text-2xl font-semibold mb-15 sm:mb-25 relative"
          data-aos="fade-in"
        >
          Your questions, answered
        </h2>
      </div>
      <div class="container container--tiny w-830 sm:px-40">
        <div v-if="faqItemsLoading" class="flex items-center justify-center">
          <Loading class="w-20 h-20 text-black"></Loading>
        </div>
        <ul
          v-if="!faqItemsLoading"
          class="tablist tablist--faq text-left mt-20 sm:text-lg pb-60 sm:pb-30"
          role="tablist"
          data-aos="fade-in"
          data-status="disabled"
        >
          <li
            v-for="(item, index) in faqItems"
            :key="index"
            class="tablist__item"
            data-aos="fade-in"
          >
            <button class="tablist__tab" role="tab">
              <span>{{ item.title }}</span>
              <span class="tablist__tab-arrow">
                <svg-icon name="plus"></svg-icon>
                <svg-icon name="minus"></svg-icon>
              </span>
            </button>
            <div class="tablist__panel" role="tabpanel">
              <div class="tablist__panel-inner text-black text-opacity-75">
                <ul>
                  <li v-html="item.description"></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      ref="request-form-section"
      class="container container--tiny pt-60 pb-60 sm:pt-100 lg:pb-100 relative z-2 -mt-130"
    >
      <div class="arrow-2 z-10">
        <div data-aos="fade-in" data-aos-offset="0">
          <div class="text-ill">We have launched! 🚀</div>

          <div class="arrow-wrapper sm:hidden" style="width: 19.1rem; height: 15rem" data-line>
            <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>
            <svg
              class="arrow-wrapper__path"
              width="191"
              height="150"
              viewBox="0 0 191 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="sm:hidden"
                stroke="#5D44F6"
                stroke-dasharray="5 5"
                d="M66.5 0.5C19 85.5 165.099 74 165.099 141.682"
              />
            </svg>
          </div>

          <div
            class="arrow-wrapper hidden sm:block"
            style="width: 21.9rem; height: 19rem"
            data-line
          >
            <svg-icon class="arrow-wrapper__arrow" name="dir-arrow"></svg-icon>
            <svg
              class="arrow-wrapper__path"
              width="191"
              height="150"
              viewBox="0 0 219 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.3916 38.5605C37.1253 122.935 176.404 77.3438 192.348 143.122"
                stroke="#5D44F6"
                stroke-dasharray="5 5"
              />
            </svg>
          </div>
        </div>
      </div>

      <form
        id="request-form"
        data-aos="fade-in"
        novalidate
        class="bg-white shadow-border pt-50 sm:pt-70 pb-50 sm:pb-55 px-30 sm:px-90 mx-auto mb-20 rounded-lg text-center"
      >
        <svg-icon
          class="logo transform -translate-x-5 sm:-translate-x-15 mb-5"
          name="logo"
        ></svg-icon>

        <div class="host-form-title">Join us today!</div>
        <div class="host-form-desc">Fill out a simple form and we will be&nbsp;back shortly</div>
        <label>
          <span class="sr-only">Name</span>
          <input required class="form-control mb-30" name="name" type="text" placeholder="Name" />
        </label>
        <label>
          <span class="sr-only">Email</span>
          <input
            required
            class="form-control mb-30"
            name="email"
            type="email"
            placeholder="Email"
          />
        </label>
        <label>
          <span class="sr-only">City, State, ZIP</span>
          <input
            required
            class="form-control mb-30"
            name="city"
            type="text"
            placeholder="City, State, ZIP"
          />
        </label>
        <label>
          <span class="sr-only">Type of space</span>
          <input
            required
            class="form-control mb-30"
            name="type"
            type="text"
            placeholder="Type of space"
          />
        </label>
        <Button type="submit" color="primary" size="md" class="mt-10 sm:mt-30 max-w-sm w-full">
          Become a host
        </Button>
        <div class="text-primary mt-15">or</div>
        <Button
          type="submit"
          outlined
          color="primary"
          size="md"
          class="mt-15 max-w-sm w-full"
          @click.prevent="isMobile ? $router.push('login') : showAuth('login')"
        >
          Continue as a Guest
        </Button>
        <div data-form-result  class="mt-20"></div>
      </form>
    </div>
  </div>
</template>

<script>
  import Toggle from 'assets/js/toggle.js'

  import anime from 'animejs/lib/anime.es.js'
  import Bouncer from 'formbouncerjs'
  import smoothscroll from 'smoothscroll-polyfill'
  import lottie from 'lottie-web'
  import Loading from '~/components/base/Loading'
  import Button from '~/components/base/Button/Button'
  import AuthForm from '~/components/auth/AuthForm'

  export default {
    name: 'HomeHost',
    data() {
      return {
        swiperReviews: null,
        swiperGallery: null,
        swiperReviewsOptions: {
          loop: true,
          centeredSlides: true,
          slidesPerView: 1,
          spaceBetween: 40,
          speed: 700,
          keyboard: true,
          init: false,
          breakpoints: {
            // when window width is >= 320px
            768: {
              slidesPerView: 'auto',
              spaceBetween: 210,
            },
          },
        },
        components: {
          Loading,
          Button,
        },
        swiperGalleryOptions: {
          loop: true,
          slidesPerView: 1,
          allowTouchMove: false,
          speed: 1000,
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
          },
          autoplay: {
            delay: 2000,
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          init: false,
        },
        faqItems: [],
        faqItemsLoading: false,
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.isMobile
      },
    },
    updated() {
      this.updateSliderReviews()
      this.updateSliderGallery()
    },
    mounted() {
      const self = this
      this.updateSliderReviews()
      this.updateSliderGallery()

      // kick off the polyfill!
      smoothscroll.polyfill()

      document.querySelectorAll('[href^="#"]:not([href="#"])').forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault()
          const target = document.querySelector(link.hash)
          if (!target || target.hasAttribute('data-toggle-target')) {
            return
          }
          target.scrollIntoView({ block: 'start', behavior: 'smooth' })
        })
      })

      const form = document.getElementById('request-form')
      const validate = new Bouncer()

      const validateForm = function () {
        return validate.validateAll(form)
      }

      let formLoading = false
      form.addEventListener('submit', e => {
        e.preventDefault()

        if (formLoading) {
          return
        }

        form.removeEventListener('input', validateForm)
        const invalids = validateForm()

        const result = form.querySelector('[data-form-result]')
        const submitBtn = form.querySelector('[type="submit"]')

        result.hidden = true
        result.innerHTML = ''

        if (invalids.length) {
          form.addEventListener('input', validateForm)
          form.classList.add('shake')
          form.addEventListener(
            'animationend',
            e => {
              form.classList.remove('shake')
            },
            { once: true }
          )
        } else {
          const formData = new FormData(form)
          submitBtn.disabled = true
          formLoading = true
          fetch('https://api.staymenity.com/public/api/host-request/insert', {
            method: 'POST',
            body: formData,
          })
            .then(r => r.json())
            .then(data => {
              console.log('complete', data)
              formLoading = false
              submitBtn.disabled = false
              result.innerHTML = data
              result.hidden = false
              result.classList.add('text-green')
              result.classList.remove('text-red')
              form.reset()
              // if (data.success) {
              //   result.classList.add('text-green')
              //   result.classList.remove('text-red')
              //   form.reset()
              // } else {
              //   result.classList.add('text-red')
              //   result.classList.remove('text-green')
              // }
            })
        }
      })

      lottie.loadAnimation({
        container: document.querySelector('#lottie'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../lottie/FINAL.json', // the path to the animation json
      })

      Toggle.initAll()

      function initArrowsAnimation() {
        document.querySelectorAll('[data-line]:not(.init)').forEach(elem => {
          if (!elem.offsetHeight) {
            return
          }

          elem.classList.add('init')

          const path = anime.path(elem.querySelector('.arrow-wrapper__path path[stroke]'))
          const duration = +elem.dataset.duration || 2500
          anime({
            targets: elem.querySelector('.arrow-wrapper__arrow'),
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            opacity: [
              { value: [0, 1], duration: 250 },
              { value: 1, duration: duration - 250 * 2 },
              { value: 0, duration: 250 },
            ],
            easing: 'linear',
            duration,
            loop: true,
          })
        })
      }
      initArrowsAnimation()
      window.addEventListener('resize', initArrowsAnimation)

      const animationList = document.querySelector('#animation-list')
      if (animationList) {
        const animationButton = document.querySelector('#animation-list-btn')
        const animationItems = animationList.querySelectorAll('li:not(:last-child)')

        const animation = anime({
          targets: animationItems,
          delay: anime.stagger(1900, { start: -1100 }),
          keyframes: [
            { translateY: '100%', opacity: 0, duration: 800 },
            { translateY: '0%', opacity: 1, duration: 800 },
            { translateY: '-100%', opacity: 0, duration: 600, delay: 1200 },
          ],
          loop: true,
          easing: 'easeInOutCubic',
          endDelay: -300,
        })

        animationButton.addEventListener('click', e => {
          if (animationList.classList.contains('expanded')) {
            anime({
              targets: animationList,
              height: 0,
              easing: 'easeInOutCubic',
              // endDelay: 200,
              duration: 700,
              complete(anim) {
                animationList.classList.remove('expanded')

                animation.play()

                anime({
                  targets: animationButton.querySelector('span:last-child'),
                  translateY: [0, '-25%'],
                  opacity: [1, 0],
                  easing: 'easeInOutCubic',
                  // endDelay: 200,
                  duration: 300,
                })
                anime({
                  targets: animationButton.querySelector('span:first-child'),
                  translateY: ['25%', 0],
                  opacity: [0, 1],
                  delay: 100,
                  easing: 'easeInOutCubic',
                  // endDelay: 200,
                  duration: 300,
                })

                anime({
                  targets: animationList,
                  height: [0, animationList.scrollHeight],
                  easing: 'easeInOutCubic',
                  duration: 500,
                })
              },
            })
          } else {
            animation.pause()

            anime({
              targets: animationList,
              height: 0,
              easing: 'easeInOutCubic',

              duration: 500,
              complete(anim) {
                animationList.classList.add('expanded')

                animationItems.forEach(el => (el.style = ''))

                anime({
                  targets: animationButton.querySelector('span:first-child'),
                  translateY: [0, '-25%'],
                  opacity: [1, 0],
                  easing: 'easeInOutCubic',

                  duration: 300,
                })
                anime({
                  targets: animationButton.querySelector('span:last-child'),
                  translateY: ['25%', 0],
                  opacity: [0, 1],
                  delay: 100,
                  easing: 'easeInOutCubic',

                  duration: 300,
                })

                anime({
                  targets: animationList,
                  height: [0, animationList.scrollHeight],
                  easing: 'easeInOutCubic',
                  duration: 500,
                })
              },
            })
          }
        })
      }
      //
      this.faqItemsLoading = true

      this.$axios.$get('https://api.staymenity.com/api/faqs/get')
      .then(response => {
          console.log('response', response)
          this.faqItems = response
          this.faqItemsLoading = false
          self.$nextTick(() => self.initTabListAnimation())
       })
    },
    methods: {
      scrollMeTo(refName) {
        const element = this.$refs[refName]
        element.scrollIntoView()
        element.scrollIntoView(false)
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      },
      initTabListAnimation() {
        const ID = function () {
          // Math.random should be unique because of its seeding algorithm.
          // Convert it to base 36 (numbers + letters), and grab the first 9 characters
          // after the decimal.
          return Math.random().toString(36).substr(2, 9)
        }

        document.querySelectorAll('[role="tablist"]').forEach(tablist => {
          tablist.id = tablist.id || 'tablist-' + ID()
          tablist.querySelectorAll('[role="tab"]').forEach(tab => {
            return new Toggle({
              target: tab.nextElementSibling,
              togglers: [tab],
              groupId: tablist.id,
              setHeight: true,
            })
          })
        })
      },
      prevSlide() {
        if (this.swiperReviews.isBeginning) {
          this.swiperReviews.slideTo(this.items.length - 1)
        } else {
          this.swiperReviews.slidePrev()
        }
      },
      nextSlide() {
        if (this.swiperReviews.isEnd) {
          this.swiperReviews.slideTo(0)
        } else {
          this.swiperReviews.slideNext()
        }
      },
      updateSliderReviews() {
        if (this.$refs.swiperReviews) {
          this.swiperReviewsOptions.init = true
          this.$refs.swiperReviews.initSwiper()
          this.swiperReviews = this.$refs.swiperReviews.$swiper
        }
      },
      updateSliderGallery() {
        if (this.$refs.swiperGallery) {
          this.swiperGalleryOptions.init = true
          this.$refs.swiperGallery.initSwiper()
          this.swiperGallery = this.$refs.swiperGallery.$swiper
        }
      },
      changeStep(step) {
        this.$store.dispatch('authForm/set', { step })
      },
      showAuth(step, params = {}) {
        this.changeStep(step)
        this.$modal.show(
          AuthForm,
          params, // { message },
          AuthForm.methods.getModalParams({
            'click-to-close': this.step !== 'verify',
          })
        )
      },
    },
  }
</script>

<style lang="postcss"></style>
