import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ResultScreen from '@/components/ResultScreen.vue';
import ButtonComp from '@/components/ButtonComp.vue';

describe('ResultScreen.vue', () => {
  it('renders the score correctly', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 5 },
    });
    expect(wrapper.text()).toContain('You got 5 correct answers.');
  });

  it('emits "restart-quiz" when Try Again button is clicked', async () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 5 },
    });
    const button = wrapper.findComponent(ButtonComp);
    await button.trigger('click');
    expect(wrapper.emitted('restart-quiz')).toBeTruthy();
  });
});
