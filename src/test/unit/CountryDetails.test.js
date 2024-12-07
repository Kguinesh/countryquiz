import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest'; // Using vi for mocks
import CountryDetails from '@/components/CountryDetails.vue';

describe('CountryDetails.vue', () => {
  const mockCountry = {
    name: { common: 'Mozambique', official: 'Republic of Mozambique' },
    capital: ['Maputo'],
    population: 30000000,
    region: 'Africa',
    subregion: 'Southern Africa',
    currencies: { MZN: { name: 'Mozambican Metical' } },
    languages: { por: 'Portuguese' },
    flags: { png: 'flag-image.png' },
  };

  const mockSetOpenModal = vi.fn(); // Create a mock function for setOpenModal

  it('displays the correct country details', () => {
    const wrapper = mount(CountryDetails, {
      props: {
        country: mockCountry,
        openModal: true,
        setOpenModal: mockSetOpenModal,
      },
    });

    expect(wrapper.text()).toContain('Mozambique');
    expect(wrapper.text()).toContain('Maputo');
    expect(wrapper.text()).toContain('30,000,000');
    expect(wrapper.text()).toContain('Africa');
    expect(wrapper.text()).toContain('Southern Africa');
    expect(wrapper.text()).toContain('Mozambican Metical');
    expect(wrapper.text()).toContain('Portuguese');
  });

  it('renders the modal when openModal is true', () => {
    const wrapper = mount(CountryDetails, {
      props: {
        country: mockCountry,
        openModal: true,
        setOpenModal: mockSetOpenModal,
      },
    });

    expect(wrapper.classes()).toContain('fixed');
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(CountryDetails, {
      props: {
        country: mockCountry,
        openModal: true,
        setOpenModal: mockSetOpenModal,
      },
    });

    const closeButton = wrapper.find('button');
    await closeButton.trigger('click');

    // Check if close method was called (which updates the modal state)
    expect(mockSetOpenModal).toHaveBeenCalledWith(false);
  });
});
