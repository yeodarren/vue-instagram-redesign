import { shallowMount, createLocalVue } from "@vue/test-utils";
import Post from "../../src/components/Post.vue";
import Vuex from "vuex";

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Post.vue', () => {
    let store
    let actions

    const postData = {
        imageURL: 'default'
    }

    beforeEach(() => {
        actions = {
            setSelectedPost: jest.fn(),
            viewPost: jest.fn()
        }
        store = new Vuex.Store({
            modules: {
                posts: {
                    namespaced: true,
                    actions
                }
            }
        })
    })
    it('renders image and dispatches actions when clicked', async () => {
        const wrapper = shallowMount(Post, { store, localVue, propsData: { post: postData } })
        await wrapper.find('[data-test-id="image"]').trigger('click')

        expect(wrapper.find('[data-test-id="image"]').exists()).toBe(true)
        expect(actions.viewPost).toHaveBeenCalled()
        expect(actions.setSelectedPost).toHaveBeenCalled()
    })
})