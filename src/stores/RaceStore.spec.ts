import { describe, expect, test } from 'vitest'
import { createPinia } from 'pinia'
import { useRaceStore, Category, RaceDetails } from '@/stores/RaceStore'

describe('Race Store testing', () => {

  const store = useRaceStore(createPinia());
  var loadedCat = '';

  test('Test loading data from the API', async () => {
    expect(store.ListOfRaces).toHaveLength(0);
    await store.loadRaces();
    expect(store.ListOfRaces).toHaveLength(10);
  })

  test('Test filter races by a category', async () => {
    loadedCat = store.ListOfRaces[2].category_id;
    store.filterRaces(loadedCat);
    expect(store.FilteredRaces.filter( (race: typeof RaceDetails) => race.category_id === loadedCat)).toHaveLength(0);
    expect(store.Categories.filter( (cat: typeof Category) => cat.category === loadedCat && cat.active)).toHaveLength(0); // category state changed
  })

  test('Test filter races by a category- toggleback to previous value', async () => {
    store.filterRaces(loadedCat);
    expect(store.FilteredRaces.filter( (race: typeof RaceDetails) => race.category_id === loadedCat).length).toBeGreaterThan(0);
    expect(store.Categories.filter( (cat: typeof Category) => cat.category === loadedCat && cat.active).length).toBeGreaterThan(0); // category state changed
  })

  test('Test filter races by the current filter', () => {
    // Set filter first
    const category = store.Categories.find((cat: typeof Category) => cat.category === loadedCat);
    expect(category).toBeDefined;
    expect(category.category).toBe(loadedCat)
    const nbRacesBefore = store.FilteredRaces.length;
    category.active = false;
    store.filterRaces();
    expect(store.FilteredRaces.filter( (race: typeof RaceDetails) => race.category_id == loadedCat)).toHaveLength(0);
    expect(store.FilteredRaces.length).toBeLessThan(nbRacesBefore);
  })

})