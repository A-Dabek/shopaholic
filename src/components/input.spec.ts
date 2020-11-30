import { fireEvent, render } from '@testing-library/vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { expect } from 'chai';
import Vue from 'vue';
import CustomInput from './Input.vue';

Vue.use(VueCompositionAPI);

describe('Input component', () => {
    let component: Wrapper<Vue>;
    beforeEach(() => {
        component = shallowMount(CustomInput, {
            stubs: ['fa-i']
        });
    });

    it('should emit submit on click', async () => {
        const input = component.find('input');
        await input.setValue('newValue  ');

        const icon = component.find('.icon');
        await icon.trigger('click');

        expect((component.emitted('submit') || [])[0]).to.include('newvalue');
    });

    it('should emit submit on click', async () => {
        const component = render(CustomInput,
            {
                props: { placeholder: 'placeholder' },
                stubs: ['fa-i']
            });

        const input = component.queryByPlaceholderText('placeholder') as HTMLInputElement;
        await fireEvent.update(input, 'newValue ');

        const icon = await component.findByRole('button');
        await fireEvent.click(icon);

        expect(component.emitted()['submit'][0][0]).to.eq('newvalue');
    });
});