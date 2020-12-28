import { shallowMount,createLocalVue } from '@vue/test-utils'
import ResetPassword from '../../src/views/ResetPassword.vue'
import Vuelidate from 'vuelidate'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuelidate)

describe('ResetPassword.vue', () => {
  it('renders reset password form', () => {
    const wrapper = shallowMount(ResetPassword, { localVue })
    
    expect(wrapper.find('[data-test-id="form"]').exists()).toBe(true)
  })

  it('returns to login page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(ResetPassword, { localVue, mocks: { $router: mockRouter } })
    
    const returnButton = wrapper.find('[data-test-id="returnButton"]')
    await returnButton.trigger('click')

    expect(mockRouter.push).toHaveBeenCalled()
  })

  it('submits reset password request', async () => {
    const wrapper = shallowMount(ResetPassword, { localVue })
    
    const form = wrapper.find('[data-test-id="form"]')
    await form.trigger('submit')

    await flushPromises()
    expect(wrapper.vm.$data.showSuccess).toBe(true)
  })
})