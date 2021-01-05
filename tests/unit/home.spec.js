import { shallowMount, createLocalVue } from "@vue/test-utils";
import Navigation from "../../src/components/Navigation.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
  let store;
  let actions;
  let getters;

  const userProfile = {
    name: "test",
  };

  beforeEach(() => {
    actions = {
      logout: jest.fn(),
      getPosts: jest.fn(),
    };
    getters = {
      getUser: () => userProfile,
      getPosts: () => [],
    };
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          actions,
          getters,
        },
        posts: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });
  });

  it("renders navbar", () => {
    const wrapper = shallowMount(Navigation, { store, localVue });

    expect(wrapper.find('[data-test-id="navbar"]').exists()).toBe(true);
  });

  it("shows navigation drawer", async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });

    const wrapper = shallowMount(Navigation, {
      store,
      localVue,
      stubs: { transition: transitionStub() },
    });

    const menu = wrapper.find('[data-test-id="menu"]');
    await menu.trigger("click");

    expect(wrapper.find('[data-test-id="navigationDrawer"]').exists()).toBe(
      true
    );
  });

  it("routes to create page", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(Navigation, {
      store,
      localVue,
      mocks: { $router: mockRouter },
    });

    const createButton = wrapper.find('[data-test-id="create"]');
    await createButton.trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith("/create");
  });

  it("log user out", async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = shallowMount(Navigation, {
      store,
      localVue,
      stubs: { transition: transitionStub() },
    });

    const menu = wrapper.find('[data-test-id="menu"]');
    await menu.trigger("click");

    const logoutButton = wrapper.find('[data-test-id="logoutButton"]');
    await logoutButton.trigger("click");

    expect(actions.logout).toHaveBeenCalled();
  });
});
