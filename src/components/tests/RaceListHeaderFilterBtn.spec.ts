import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceListHeaderFilterBtn from '@/components/RaceListHeaderFilterBtn.vue'

const details = 
                {
                  category: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
                  title: "Greyhounds",
                  icon: "/img/greyhound.svg",
                  active: true,
                };

describe("RaceListHeaderFilterBtn.vue", () => {
  test('Renders filter button', () => {
    const wrapper = mount(RaceListHeaderFilterBtn, {
      props: { details },
    });
    expect(wrapper.findComponent(RaceListHeaderFilterBtn).exists()).toBe(true)
  });

  test('Tests if an event is emitted', async () => {
    const wrapper = mount(RaceListHeaderFilterBtn, {
      props: { details },
    });
    await wrapper.trigger("click");
    const filterEvent = wrapper.emitted('filter-changed');
    expect(filterEvent).toHaveLength(1)
    expect(filterEvent[0]).toEqual(["9daef0d7-bf3c-4f50-921d-8e818c60fe61"]) 
  });

});
