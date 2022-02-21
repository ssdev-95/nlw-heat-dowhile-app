import { createStore } from 'vuex'
import { State } from '../types'

export default createStore<State>({
  state: {
		authState: false,
		user: null,
		messages: [],
  },
  mutations: {
		TOGGLE_AUTH_STATE (state) {
			const aux = !state.authState;
			state.authState = aux;
		},
		RETREIVE_MSGS_FROM_DB (state, { messages }) {
			state.messages = [...messages];
		},
		LOGIN (state, { user }) {
			state.user = user;
		},
	},
  actions: {
		toggleAuthState (ctx) {
			ctx.commit('TOGGLE_AUTH_STATE');
		},
		retrieveMessagesFromDb (ctx, payload) {
			ctx.commit('RETREIVE_MSGS_FROM_DB', payload);
		},
		login (ctx, payload) {
			ctx.commit('LOGIN', payload);
		},
	},
  getters: {
		user (state) {
			return state.user
		},
		messages (state) {
			return state.messages
		},
		auth_state (state) {
			return state.authState;
		},
  },
})
