import { InjectionKey } from 'vue';
import { Store } from 'vuex';

export interface ISocial {
  linkedin: string|null;
	instagram: string|null;
	zap: string|null;
	mail: string|null;
 	twitter: string|null;
  rocket: string|null;
}

export interface IUser {
	id?: number;
	github_id: number;
	login: string;
  name?: string;
 	avatar_url: string;
	bio?: string;
  social?: ISocial;
}

export interface IMessage {
	id: number;
	text: string;
	user: IUser;
	created_at: string;
}

export interface State {
  authState: boolean;
  user: IUser;
	messages: IMessage[];
}

export const key:InjectionKey<Store<State>> = Symbol();
