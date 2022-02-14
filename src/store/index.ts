import { createStore } from 'vuex'
import { State } from '../types'

export default createStore<State>({
  state: {
		authState: false,
		user: {
			name: 'Salomaon S.',
			login: 'xSallus',
			id: 38382991923,
			github_id: 2928388457728181,
			avatar_url: 'https://github.com/xSallus.png',
			bio: 'Yet another great dev.',
			social: {
				linkedin: 'https://linkedin.com/in/salomao-vasconcelos',
				instagram: 'https://instagram.com/xSallus.dev',
				zap: 'https://wa.me/+5592994825428',
				mail: 'souza95salomao@gmail.com',
				twitter: 'https://twitter.com/xSallus_dev',
				rocket: null,
	    }
		},
		messages: [
			{
				id: 193999119343392,
				text: 'Lorem ipsum dolor sit amet, consectetur adipis cing elit. Maecenas at ornare ante.',
				user: {
					github_id: 2928388457728181,
					login: 'xSallus',
					avatar_url: 'https://github.com/xSallus.png'
				},
				created_at: '2021-05-12T10:05:00Z'
			},
			{
				id: 1999101489190392,
				text: 'Ut luctus posuere luctus. Nulla ac risus efficitur, posuere sem a, vestibulum mauris.',
				user: {
					github_id: 2928388457728181,
					login: 'xSallus',
					avatar_url: 'https://github.com/xSallus.png'
				},
				created_at: '2021-05-12T10:05:00Z'
			},
			{
				id: 19395820932643392,
				text: 'Musaarella',
				user: {
					github_id: 2928388457728181,
					login: 'xSallus',
					avatar_url: 'https://github.com/xSallus.png'
				},
				created_at: '2021-05-12T10:05:00Z'      
			}
		]
  },
  mutations: {
		TOGGLE_AUTH_STATE (state) {
			const aux = !state.authState
			state.authState = aux;
		}
	},
  actions: {
		toggleAuthState (ctx) {
			ctx.commit('TOGGLE_AUTH_STATE')
		}
	},
  getters: {
		user (state) {
			return state.user
		},
		messages (state) {
			return state.messages
		},
		auth_state (state) {
			return state.authState
		}
  }
})
