<template>
  <div class="headline">
    <div class="title">
      Next To Go - RACING
    </div>
    <div class="head-filters">
      <RaceListHeaderFilterBtn
        v-for="cat in Categories"
        :key="cat.category"
        :details="cat"
        @filter-changed="filterRacesClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RaceListHeaderFilterBtn from '@/components/RaceListHeaderFilterBtn.vue';
import { useRaceStore } from '@/stores/RaceStore'
import { storeToRefs } from 'pinia'

const store = useRaceStore();
const { filterRaces } = store;

const { Categories }: any = storeToRefs(store)

const filterRacesClick = (filterBy: String) => { filterRaces(filterBy) }

</script>


<style scoped>
img {
    cursor: pointer;
    margin: 5px;
    width: 32px;
    height: 32px;
}
div {
    height: 45px;
}
.headline {
    font-weight: bold;
    background-color:bisque;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding: 5px;
}

.title {
    padding-top: 20px;
}

</style>
