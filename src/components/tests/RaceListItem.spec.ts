import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import RaceListItem from '@/components/RaceListItem.vue';
import { createTestingPinia } from '@pinia/testing'

describe("RaceListItem.vue", () => {
    let wrapper = null;
    
    beforeEach(() => {
        wrapper = shallowMount(RaceListItem, {
            propsData: {
                raceDetails: {
                    category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
                    race_id: "1111111-1111-1111-1111-11111111111",
                    meeting_name: "First Race",
                    race_number: 1,
                    advertised_start: {
                      seconds: 8000,
                    }                   
                },
                currentTick: 7999
            },
            global: {
                plugins: [
                    createTestingPinia({
                      createSpy: vi.fn,
                    })
                ]
            },
        })
    });

    afterEach(() => {
        wrapper.unmount();
      })

    test('Renders a single race', () => {
        
        const comp = wrapper.findComponent(RaceListItem);
        expect(comp.exists()).toBe(true);
        expect(wrapper.findAll('div').at(2).text()).toMatch('First Race R1')
    });

    test('Expire a race 10 seconds after its start time', async () => {

        await wrapper.setProps({ currentTick: 8011})
        const filterEvent = wrapper.emitted("expire-race");
        expect(filterEvent).toHaveLength(1);
        expect(filterEvent[0]).toContainEqual("1111111-1111-1111-1111-11111111111");
      })
})