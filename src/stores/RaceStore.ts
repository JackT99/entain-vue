import { defineStore } from 'pinia'
import api from '@/api/entain';

type Category = {
    category: string,
    title: string,
    icon: string,
    active: boolean
}

type State = {
    ListOfRaces: [],
    FilteredRaces: [],
    Categories: Category[]
}

export type RaceDetails = {
    race_id: string,
    race_name: string,
    race_number: number,
    meeting_id: string,
    meeting_name: string,
    category_id: string,
    advertised_start: {
        seconds: number
    },
    race_form: {
        distance: number,
        distance_type: {
            id: string,
            name: string,
            short_name: string
        },
        distance_type_id: string,
        track_condition: {
            id: string,
            name: string,
            short_name: string
        },
        track_condition_id: string,
        race_comment: string,
        additional_data: string,
        generated: number,
        silk_base_url: string,
        race_comment_alternative: string
    },
    venue_id: string,
    venue_name: string,
    venue_state: string,
    venue_country: string
}

export const useRaceStore = defineStore('RaceStore', {
    state: (): State => ({
        ListOfRaces: [],
        FilteredRaces: [],
        Categories: [
            {
                category: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
                title: "Horse racing",
                icon: "/img/horse-racing.svg",
                active: true,
            },
            {
                category: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
                title: "Greyhounds",
                icon: "/img/greyhound.svg",
                active: true,
            },
            {
                category: '161d9be2-e909-4326-8c2c-35ed71fb460b',
                title: "Harness",
                icon: "/img/harness.svg",
                active: true,
            },
        ],
    }),
  getters: {},
  actions: {
    async loadRaces () {
        const response = await api.fetchRaces();
        response.sort((a,b) => { return a.advertised_start.seconds - b.advertised_start.seconds });
        this.ListOfRaces = response;
        this.filterRaces();
    },   

    filterRaces (categoryClicked: string) {

        // Handle a filter button clicked
        if (categoryClicked){
            this.Categories.forEach((cat: Category) => { 
                if (cat.category == categoryClicked){ 
                    cat.active = !cat.active; 
                }
            });            
        }
        // Prep a simple map of current filters
        const filters = [];
        this.Categories.forEach((v: Category) => { 
            filters[v.category] = v.active;
        });

        // Filter races based on the current filter
        this.FilteredRaces = this.ListOfRaces.filter(v => 
            filters[v.category_id] == true
        );
        // Update buttons
        this.Categories.forEach( cat => {
            cat.active = this.FilteredRaces.filter( race => race.category_id == cat.category ).length > 0;
        });
    }, 
    expireRace(raceId: string){
        console.log("Expiring race "+raceId);
        this.ListOfRaces = this.ListOfRaces.filter(race => race.race_id != raceId);
        this.filterRaces();
        if (this.ListOfRaces.length < 5) {
            console.log("Reloading races");
            this.loadRaces();
        }
        
    },
  }
})