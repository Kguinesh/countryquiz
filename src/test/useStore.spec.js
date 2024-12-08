import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useStore } from '@/store/useStore.js';

describe('useStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes score to 0', () => {
    const store = useStore();
    expect(store.score).toBe(0);
  });

  it('increments the score correctly', () => {
    const store = useStore();
    store.incrementScore();
    expect(store.score).toBe(1);
  });

  it('resets the score correctly', () => {
    const store = useStore();
    store.incrementScore();
    store.resetScore();
    expect(store.score).toBe(0);
  });
});
