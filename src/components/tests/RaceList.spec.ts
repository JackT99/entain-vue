import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useRaceStore } from "@/stores/RaceStore";
import { createTestingPinia } from '@pinia/testing'
import RaceList from '@/components/RaceList.vue';
import RaceListItem from '@/components/RaceListItem.vue';

describe("RaceList.vue", () => {
    let mockRaceStore = null;
    let wrapper = null;
    let races = null;

    beforeEach(() => {
      wrapper = mount(RaceList, {
            global: {
                plugins: [
                    createTestingPinia({
                      createSpy: vi.fn,
                      initialState: {
                        RaceStore: {
                          FilteredRaces: [
                            {
                                category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
                                race_id: "1111111-1111-1111-1111-11111111111",
                                meeting_name: "First Race",
                                race_number: 1,
                                advertised_start: {
                                  seconds: function() {return Number((Math.floor(Date.now() / 1000))) + 50},
                                }
                            },
                            {
                                category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
                                race_id: "2222222-2222-2222-2222-22222222222",
                                meeting_name: "Second Race",
                                race_number: 2,
                                advertised_start: {
                                  seconds: function() {return Number((Math.floor(Date.now() / 1000))) + 100},
                                }
                            }
                        ],                          
                        },
                      },
                    }),
                  ]
              }
            })
          mockRaceStore = useRaceStore();            
          races = wrapper.findComponent(RaceList).findAllComponents(RaceListItem);
    });

    afterEach(() => {
        wrapper.unmount();
      })
      
      
    test('Renders list of races', () => {
        expect(wrapper.findComponent(RaceList).exists()).toBe(true);
        expect(mockRaceStore.FilteredRaces.length).toBe(2);
        expect(races).toHaveLength(2);
    });

    test('Expire race event triggers a store action', async () => {
      wrapper.findComponent(RaceListItem).vm.$emit('expire-race');
      expect(mockRaceStore.expireRace).toHaveBeenCalled();
      expect(mockRaceStore.expireRace).toHaveBeenCalledWith('1111111-1111-1111-1111-11111111111');
  });

})