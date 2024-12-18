<template>
  <div class="header text-white">
    <div class="top-bar layout-padding flex justify-center w-full bg-primary-red border-b-white border-b-1px">
      <div class="max-width">
        <div class="flex items-center">
          <div class="brand flex-1">
            <nuxt-link
              to="/"
              @click="openMenu = false"
            >
							<!-- <nuxt-img :src="logoPng" class="w-220px" /> -->
            </nuxt-link>
          </div>
          <div
            class="toggle-btn"
            @click="openMenu = !openMenu"
            :class="{ show: openMenu }"
          >
            <div class="line top-line"></div>
            <div class="line center-line"></div>
            <div class="line bottom-line"></div>
          </div>
          <div
            class="nav"
            :class="{ show: openMenu }"
            :style="{ 'height': windowWidth < 1180 ? menuHeight : '' }"
          >
            <div class="nav-menu">
              <q-separator
                vertical
                class="bg-white"
              />
              <template
                v-for="(item, index) in data"
                :key="item"
              >
                <nuxt-link :to="{ name: item.link }">
                  <q-btn
										class="min-w-6rem"
                    :label="item.name"
                    flat
                    @click="openMenu = false"
                  ></q-btn>
                </nuxt-link>
                <q-separator
                  vertical
                  class="bg-primary-white"
                ></q-separator>
                <!-- <nuxt-link :to="{ path: '/', hash: item.link }" :external="true">
									<q-btn :label="item.name" flat @click="openMenu = false"></q-btn>
								</nuxt-link> -->
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';

const { width: windowWidth, height: windowHeight } = useWindowSize()

const menuHeight = computed(() => {
  return `${windowHeight.value - 40}px`
})

const openMenu = ref(false)

const socialRef = ref<HTMLElement>()
const { width } = useElementSize(socialRef)

const data = computed(() =>
  [
    {
      name: '首頁',
      link: 'index'
    },
  ]
)

</script>

<style scoped lang="sass">
.header
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	position: fixed
	width: 100vw
	z-index: 9999 !important
	top: 0 !important
	left: 0
	right: 0
	.top-bar
		box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, .05)
	.bottom-bar
		width: 100%
		display: flex
		justify-content: center
		color: #fff
		.max-width
			.normal-padding
				display: flex
				align-items: center
				justify-content: flex-end
				gap: 10px
				font-weight: 400
				svg
					height: 15px
	.max-width
		.normal-padding
			padding-top: 0px
			padding-bottom: 0px
			display: flex
			align-items: center
			justify-content: space-between
	.brand
		display: flex
		margin: 5px 0px
		cursor: pointer

	.toggle-btn
		height: 34px
		width: 34px
		border-radius: 3px
		justify-content: space-between
		align-items: center
		flex-direction: column
		display: none
		position: relative
		cursor: pointer
		.line
			width: 100%
			position: absolute
			transform-origin: center
			transition-duration: .5s
			opacity: 1
			border-top: solid 3px #fff
	.toggle-btn.show
		.top-line
			top: 15px
			transform: rotate(45deg)
		.center-line
			top: 15px
			opacity: 0
		.bottom-line
			top: 15px
			transform: rotate(-45deg)
	.toggle-btn:not(.show)
		.top-line
			top: 6px
		.center-line
			top: 15px
		.bottom-line
			top: 24px
	.nav
		display: flex
		height: 100%
		.nav-menu
			display: flex
			font-weight: 400
			justify-content: center
			align-items: center
			gap: 0.5rem 0rem
			.q-btn
				padding: 8px 15px
				font-size: 16px
				cursor: pointer
				white-space: nowrap
				border-radius: 0px
	.auth
		background-color: green
		color: #fff
		font-weight: 700
		padding: 3px 20px
		border-radius: 30px
		&:before
			box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0) !important
		&:hover
			background-color: #fff
.desktop
	display: flex
.mobile
	display: none
@media (max-width: 1180px)
	.desktop
		display: none !important
	.mobile
		display: flex
	.header
		.max-width
			.normal-padding
				flex-wrap: wrap
				justify-content: space-between
		.toggle-btn
			display: flex
		.nav
			width: 100%
			overflow: hidden
			transition-duration: .5s
			display: flex
			justify-content: center
			align-items: center
			.nav-menu
				flex-direction: column
				.q-btn
					padding: 8px 30px
					border-radius: 0.5rem
				.item
					margin: 20px
		.nav:not(.show)
			height: 0 !important
	.header-space
		height: 73px
@media (max-width: 350px)
	.address
		font-size: 13px
</style>
