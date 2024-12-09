<template>
  <img
    :title="details.title" 
    :src="details.icon" 
    @click="emits('filter-changed', details.category)"
  >
</template>

<script setup lang="ts">

const emits = defineEmits({
  'filter-changed': (category) => typeof category == 'string'
})
  const props = defineProps({
    details: { type: Object, default: null }
  });

</script>

<style scoped>
img {
    cursor: pointer;
    margin: 5px;
    width: 32px;
    height: 32px;
    opacity: v-bind("props.details.active ? '1' : '0.5'");
}
</style>