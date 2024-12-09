import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useRaceStore } from "@/stores/RaceStore";
import { createTestingPinia } from '@pinia/testing'
import RaceListHeader from '@/components/RaceListHeader.vue';
import RaceListHeaderFilterBtn from '@/components/RaceListHeaderFilterBtn.vue';

describe("RaceListHeader.vue", () => {

    test('Renders header with a button for each category', () => {
        const wrapper = mount(RaceListHeader, {
            global: {
                plugins: [
                    createTestingPinia({
                      createSpy: vi.fn,
                    }),
                  ]
            },            
        });
        const mockRaceStore = useRaceStore();
        expect(wrapper.findComponent(RaceListHeader).exists()).toBe(true);
        const buttons = wrapper.findComponent(RaceListHeader).findAllComponents(RaceListHeaderFilterBtn);
        expect(buttons).toHaveLength(mockRaceStore.Categories.length);
    });

})