import { shallowMount, createLocalVue } from "@vue/test-utils";
import PostModal from "../../src/components/PostModal.vue";
import Vuex from "vuex";

const localVue = createLocalVue()
localVue.use(Vuex)

const transitionStub = () => ({
    render: function(h) {
      return this.$options._renderChildren;
    },
  });

describe('PostModal.vue', () => {
    let store
    let actions
    let getters

    const userProfile = {
        name: 'test'
    }

    const selectedPost = {
        imageURL: "default",
        caption: "default"
    }

    beforeEach(() => {
        actions = {
            viewPost: jest.fn(),
            addComment: jest.fn(),
            getComments: jest.fn()
        }
        getters = {
            viewPost: () => true,
            getSelectedPost: () => selectedPost,
            getComments: () => [],
            getUser: () => userProfile
        }
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    getters
                },
                posts: {
                    namespaced:true,
                    actions,
                    getters
                }
            }
        })
    })

    it('renders post modal', () => {
        const wrapper = shallowMount(PostModal, { store, localVue, stubs: {transition: transitionStub()} })
        expect(wrapper.find('[data-test-id="backdrop"]').exists()).toBe(true)
        expect(wrapper.find('[data-test-id="postModal"]').exists()).toBe(true)
    })

    it('closes post modal', async () => {
        const wrapper = shallowMount(PostModal, { store, localVue, stubs: {transition: transitionStub()} })
        const closeButton = wrapper.find('[data-test-id="closeButton"]')
        await closeButton.trigger('click')

        expect(actions.viewPost).toHaveBeenCalled()
    })

    it('sets the comment', async () => {
        const wrapper = shallowMount(PostModal, { store, localVue, stubs: {transition: transitionStub()} })
        const comment = wrapper.find('[data-test-id="comment"]')
        await comment.setValue('Default')

        expect(comment.element.value).toMatch('Default')
    })

    it('add comment to comment section', async () => {
        const wrapper = shallowMount(PostModal, { store, localVue, stubs: {transition: transitionStub()} })
        await wrapper.find('[data-test-id="commentForm"]').trigger('submit')

        expect(actions.addComment).toHaveBeenCalled()
    })
})