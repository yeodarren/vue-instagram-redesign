import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '../../src/views/Login.vue'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)

describe('Login.vue', () => {
  let store
  let actions

  beforeEach(() => {
    actions = {
      login: jest.fn(),
      register: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          actions
        }
      }
    })
  })

  it('renders logo and login form', () => {
    const wrapper = shallowMount(Login, { localVue, stubs: ['router-link'] })
    expect(wrapper.find('[data-test-id="logo"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="loginForm"]').exists()).toBe(true)
  })

  it('renders register form', async () => {
    const wrapper = shallowMount(Login, { localVue, stubs: ['router-link']})
    const toggleForm = wrapper.find('[data-test-id="toggleForm"]')
    await toggleForm.trigger('click')

    expect(wrapper.find('[data-test-id="registerForm"]').exists()).toBe(true)
  })

  it('sets the email and password', async () => {
    const wrapper = shallowMount(Login, { localVue, stubs: ['router-link']})
    const email = wrapper.find('[data-test-id="email"]')
    const password = wrapper.find('[data-test-id="password"]')
    await email.setValue('test@example.com')
    await password.setValue('Default')

    expect(email.element.value).toMatch('test@example.com')
    expect(password.element.value).toMatch('Default')
})

  it('submits login request', async () => {
    const wrapper = shallowMount(Login, { store, localVue, stubs: ['router-link']})

    const loginForm = wrapper.find('[data-test-id="loginForm"]')
    await loginForm.trigger('submit')

    expect(actions.login).toHaveBeenCalled()
  })

  it('submits register request', async () => {
    const wrapper = shallowMount(Login, { store, localVue, stubs: ['router-link']})
    const toggleForm = wrapper.find('[data-test-id="toggleForm"]')
    await toggleForm.trigger('click')

    const registerForm = wrapper.find('[data-test-id="registerForm"]')
    await registerForm.trigger('submit')

    expect(actions.register).toHaveBeenCalled()
  })
})