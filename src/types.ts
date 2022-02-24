import { InjectionKey } from 'vue';
import { Store } from 'vuex';

export interface ISocial {
  linkedin: string|null;
	instagram: string|null;
	whatsapp: string|null;
	mail: string|null;
 	twitter: string|null;
  rocketseat: string|null;
}

export interface IUser {
	id: string;
	login: string;
  name: string;
 	avatar_url: string;
	bio: string;
  social: ISocial;
}

export interface IMessage {
	id: string;
	text: string;
	user: IUser;
}

export type IMessageResponse = Omit<IMessage, 'user'> & {
	user_id: string;
}

export interface State {
  authState: boolean;
  user: IUser | null;
  messages: IMessage[];
}

export const key:InjectionKey<Store<State>> = Symbol();
