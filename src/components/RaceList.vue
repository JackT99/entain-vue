<template>
  <div>
    <RaceListItem
      v-for="race in FilteredRaces.slice(0,5)" 
      :key="race.race_id" 
      :race-details="race" 
      :current-tick="currTick"
      class="bands"
      @expire-race="expireRace(race.race_id)"
    />
  </div>
</template>

<script setup lang="ts">
import RaceListItem from '@/components/RaceListItem.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRaceStore } from '@/stores/RaceStore'
import { storeToRefs } from 'pinia'

const store = useRaceStore();

const { expireRace } = store;
const { FilteredRaces }: any = storeToRefs(store)

const currTick = ref(0);
var interval: NodeJS.Timeout =null;

const updateCountdown = () => { currTick.value = Number((Math.floor(Date.now() / 1000))) }

onMounted( () => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
}
)

onUnmounted( () =>  clearInterval(interval) )

</script>

<style scoped>
.bands {
    display: inline-table;
}
.bands:nth-child(odd){
    background-color:lightyellow;
}
</style>