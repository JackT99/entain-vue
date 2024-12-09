<template>
  <div class="myrow">
    <div class="item iconic">
      <img :src="Categories.filter(cat => cat.category == props.raceDetails.category_id)[0].icon">
    </div>
    <div class="item">
      {{ props.raceDetails.meeting_name }} R{{ props.raceDetails.race_number }}
    </div>
    <div class="item cdown">
      {{ getCountdown }}
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { useRaceStore } from '@/stores/RaceStore'
    import { storeToRefs } from 'pinia'

    const { Categories }: any = storeToRefs(useRaceStore())

    const emits = defineEmits({
        'expire-race': (raceId) => typeof raceId == 'string'
    })
    const props = defineProps({
        raceDetails: { type: Object, default: null },
        currentTick: { type: Number, default: 0 },
    });

    const counter = ref(0); 

    const getCountdown = computed(() => {
        updateCountdown();
        const h = Math.floor(counter.value / 3600);
        const m = Math.floor((counter.value % 3600) / 60);
        const s = Math.floor((counter.value % 3600) % 60);
        return ((0<h)?(h+"h "):"")+((0<m)?m+"m ":"")+s+"s";
    })

    const cdownColour = computed( () => counter.value < 60 ? (counter.value < 0 ? 'gray' : 'red') : 'green');

    const updateCountdown = () => {
        counter.value = Number(props.raceDetails.advertised_start.seconds - props.currentTick);
        if (counter.value < -10){
            emits('expire-race', props.raceDetails.race_id);
        }
    }
        
    onMounted( () => updateCountdown())

</script>

<style scoped>
    img {
        width: 24px;
        height: 24px;
    }
    .cdown {
        color: v-bind(cdownColour);
        float: right;
    }
    .item{
        display:table-cell;
    }
    .iconic {
        width: 5%;
        vertical-align:middle;
    }
    .myrow{
        font-size: 0.8em;
        width: 100%;
    }
</style>