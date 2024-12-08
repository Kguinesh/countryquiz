import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ResultScreen from '@/components/ResultScreen.vue';
import ButtonComp from '@/components/ButtonComp.vue';

describe('ResultScreen.vue Integration Test', () => {
  it('renders the score and interacts with the ButtonComp correctly', async () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 5 }, //5 is an arbitrary test value to verify that the score prop works dynamically.
      global: {
        components: { ButtonComp },
      },
    });

    // Checks if the score is rendered correctly
    expect(wrapper.text()).toContain('You got 5 correct answers.');

    // Simulating a click on the Try Again button
    const button = wrapper.findComponent(ButtonComp);
    expect(button.exists()).toBe(true); // Ensuring ButtonComp renders correctly
    await button.trigger('click');

    // Checking if the parent emitted the event correctly
    expect(wrapper.emitted('restart-quiz')).toBeTruthy();
  });

  it('renders ButtonComp with correct props', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 5 },
      global: {
        components: { ButtonComp },
      },
    });

    const button = wrapper.findComponent(ButtonComp);
    expect(button.props('buttonType')).toBe('try-again');
  });
});
