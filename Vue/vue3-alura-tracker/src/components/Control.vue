<template>
  <button class="button" @click="finalizar" :disabled="isDisable">
      <span class="icon">
        <i class="fas" :class="icon"></i>
      </span>
      <span>{{ text }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Control',
  props: {
    text: {
      type: String,
      default: '',
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isDisable: {
      type: Boolean,
      default: false,
    }
  }
})
</script>


<style>

</style>