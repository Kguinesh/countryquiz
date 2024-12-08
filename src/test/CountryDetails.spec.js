import { mount } from '@vue/test-utils';
import CountryDetails from '@/components/CountryDetails.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import { vi } from 'vitest';

describe('CountryDetails.vue Integration Test', () => {
  let wrapper;

  // Mock country data to simulate a real object being passed as a prop
  const mockCountry = {
    name: { common: 'Uganda', official: 'Republic of Uganda' },
    capital: ['Kampala'],
    population: 45741000,
    region: 'Africa',
    subregion: 'Eastern Africa',
    currencies: { UGX: { name: 'Ugandan shilling' } },
    languages: {swa:'Swahili' },
    flags: { png: 'https://flagcdn.com/w320/ug.png' },
  };

  // Mock the function to simulate closing the modal
  const mockSetOpenModal = vi.fn();

  beforeEach(() => {
    wrapper = mount(CountryDetails, {
      props: {
        country: mockCountry,
        openModal: true,
        setOpenModal: mockSetOpenModal,
      },
      global: {
        components: {
          ButtonComp,
        },
      },
    });
  });

  it('renders country details correctly', async () => {
    expect(wrapper.text()).toContain('Uganda');
    expect(wrapper.text()).toContain('Republic of Uganda');
    expect(wrapper.text()).toContain('Kampala');
    expect(wrapper.text()).toContain('45,741,000');
    expect(wrapper.text()).toContain('Africa');
    expect(wrapper.text()).toContain('Eastern Africa');
    expect(wrapper.text()).toContain('Ugandan shilling');
    expect(wrapper.text()).toContain('Swahili');
  });

  it('displays the country flag correctly', async () => {
    const flagImg = wrapper.find('img');
    expect(flagImg.exists()).toBe(true);
    expect(flagImg.attributes('src')).toBe(mockCountry.flags.png);
  });  

  it('calls setOpenModal with false when Close button is clicked', async () => {
    const closeButton = wrapper.findComponent(ButtonComp);
    await closeButton.trigger('click');
    expect(mockSetOpenModal).toHaveBeenCalledWith(false);
  });

  it('should render "N/A" if data is missing', async () => {
    const incompleteCountry = { name: { common: 'Uganda' } };
    const wrapperIncomplete = mount(CountryDetails, {
      props: {
        country: incompleteCountry,
        openModal: true,
        setOpenModal: mockSetOpenModal,
      },
    });

    expect(wrapperIncomplete.text()).toContain('Uganda');
    expect(wrapperIncomplete.text()).toContain('N/A');
  });

  it('correctly formats currencies and languages', () => {
    expect(wrapper.vm.formatCurrencies(mockCountry.currencies)).toBe('Ugandan shilling');
    expect(wrapper.vm.formatLanguages(mockCountry.languages)).toBe('Swahili');
  });
});
