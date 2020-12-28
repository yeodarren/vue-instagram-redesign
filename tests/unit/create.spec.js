import { shallowMount,createLocalVue } from '@vue/test-utils'
import Create from '../../src/views/Create.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Create.vue', () => {
    let store
    let getters
    let actions

    const userProfile = {
        name: "test"
    }

    beforeEach(() => {
        actions = {
            createPost: jest.fn()
        }

        getters = {
            getUser: () => userProfile
        }

        store = new Vuex.Store({
            modules:{
                auth: {
                    namespaced: true,
                    getters
                },
                posts: {
                    namespaced: true,
                    actions
                }
            }
        })
    })

    it('renders form', () => {
        const wrapper = shallowMount(Create, { store, localVue })
        expect(wrapper.find('[data-test-id="form"]').exists()).toBe(true)
    })

    it('sets the caption', async () => {
        const wrapper = shallowMount(Create, { store, localVue })
        const caption = wrapper.find('[data-test-id="caption"]')
        await caption.setValue('Default')

        expect(caption.element.value).toMatch('Default')
    })

    it('returns to the homepage', async () => {
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Create, { store, localVue, mocks: { $router: mockRouter } })

        const returnButton = wrapper.find('[data-test-id="returnButton"]')
        await returnButton.trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith('/')
    })

    it('submits the post and returns to the homepage', async () => {
        const mockRouter = {
            push: jest.fn()
        }
        const wrapper = shallowMount(Create, { store, localVue, mocks: { $router: mockRouter } })

        const form = wrapper.find('[data-test-id="form"]')
        await form.trigger('submit')

        expect(actions.createPost).toHaveBeenCalled()
    })
})