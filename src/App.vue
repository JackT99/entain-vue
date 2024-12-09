<template>
  <div class="maincont">
    <RaceListHeader />
    <RaceList />       
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRaceStore } from '@/stores/RaceStore'

import RaceListHeader from '@/components/RaceListHeader.vue';
import RaceList from '@/components/RaceList.vue';

const { loadRaces } = useRaceStore()

onMounted( () => {
    loadRaces()
})

</script>

<style scoped>
.maincont {
    width: 50%;
    margin:auto;
    font-family: 'Open Sans', Roboto, sans-serif;
    border: 1px solid red;
    padding: 5px;
}

</style>