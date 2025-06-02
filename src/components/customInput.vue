<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'c-input-item w-full',
        name ? '!pl-[40px]' : '',
      ]"
    />
    <component 
      v-if="setIcon" 
      :is="setIcon" 
      :size="20" 
      class="absolute left-2 top-[16px]" 
      :color="color"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import * as icons from "lucide-vue-next";
const props = defineProps({
  name: {
    type: String,
  },
  size: Number,
  color: {
    type : String,
    default : 'white'
  },
  strokeWidth: Number,
  defaultClass: String,
  placeholder : String,
  modelValue : [String, Number],
  type : {
    type : String,
    default : 'text'
  }
})

defineEmits(['update:modelValue'])
const setIcon = computed(() => icons[props.name]);
</script>

<style scoped>

</style>