<template>
  <slot :bind="bind"></slot>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  startPosition?: string;
  delay?: number;
  translateY?: number;
}
const props = withDefaults(defineProps<Props>(), {
  startPosition: '80%',
  delay: 0,
  translateY: 15
});

const el = ref<Element|ComponentPublicInstance>()
function bind (ref: Element|null|ComponentPublicInstance) {
  if(!ref) return
  el.value = ref
}

let gsapTriggerObj: globalThis.ScrollTrigger;
let tl:gsap.core.Timeline;

const gsapInit = (el: Element) => {
  gsapTriggerObj = ScrollTrigger.create({
    trigger: el,
    start: `top top+=${props.startPosition}`,
    invalidateOnRefresh: true,
    onEnter: () => {
      tl.play();
    }
  })
}

watch(()=>[el], () => {
  if (!el.value) return
  tl = gsap.timeline({ paused: true, defaults: { ease: "power1.out" } });
  if(el.value instanceof Element) {
    tl.from(el.value, { autoAlpha: 0, y: props.translateY, duration: 1, delay: props.delay }, 0)
    gsapInit(el.value)
    return
  }
  tl.from(el.value.$el, { autoAlpha: 0, y: props.translateY, duration: 1, delay: props.delay }, 0)
  gsapInit(el.value.$el)
  
},{
  deep: true
})

onUnmounted(() => {
  gsapTriggerObj.kill()
})
</script>
