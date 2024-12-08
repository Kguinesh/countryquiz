import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ButtonComp from '@/components/ButtonComp.vue';

describe('ButtonComp.vue', () => {
  it('renders the label correctly', () => {
    const wrapper = mount(ButtonComp, {
      props: {
        label: 'Next',
        buttonType: 'next',
      },
    });
    expect(wrapper.text()).toContain('Next');
  });

  it('emits a click event when clicked', async () => {
    const wrapper = mount(ButtonComp);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('applies the correct class based on buttonType', () => {
    const wrapper = mount(ButtonComp, {
      props: { buttonType: 'options' },
    });
    expect(wrapper.classes()).toContain('text-optiontext');
  });

  it('applies the disabled state when isDisabled is true', () => {
    const wrapper = mount(ButtonComp, {
      props: { isDisabled: true },
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('pointer-events-none');
  });
});
