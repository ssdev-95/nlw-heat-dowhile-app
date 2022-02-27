<template>
  <div class="home">
    <Badge v-if="badge.isOpen" />
    <Header />
    <Messages v-if="hasMessages.value" />
    <div v-else class="empty-messages">
      <p>No messages yet</p>
    </div>
    <MessageBox />
    <Modal :isOpen="modal.isOpen" />
  </div>
</template>

<script setup lang="ts">
import { reactive, provide, onBeforeMount, watchEffect } from "vue";

import { useStore } from "vuex";

import Badge from "@/components/badge.vue";
import Header from "@/components/header.vue";
import MessageBox from "@/components/message.vue";
import Modal from "@/components/modal.vue";
import Messages from "@/components/message.list.vue";

import { api } from "@/api";
import {
  IUser,
	IMessage,
	IMessageResponse as MessageResponse,
	key
} from "@/types";

const store = useStore(key);

interface IMessageResponse {
  data: MessageResponse[];
}

let hasMessages = reactive({value: false});

const endpoint = "messages/last_3";
onBeforeMount(async () => {
  const { data: msgs } = await api
    .get<IMessageResponse[]>(endpoint)
    .catch((err) => console.log(err));

  let messages: IMessage[] = [];

  msgs.forEach((msg: MessageResponse) => {
    api
      .get<IUser>("messages", { params: { author: msg.user_id } })
      .then(({ data: user }) => {
        const updated = { ...msg, user };
        messages.push(updated);
      })
      .catch((err) => console.log(err));
  });
  
  store.dispatch("retrieveMessagesFromDb", { messages });
  setTimeout(()=> { hasMessages.value = true }, 2000)
//});

	const code = window.location.search.replace('?code=', '')

	if (!!code.length) {
		history.replaceState('', document.title, '/#/')

	  const social = JSON.parse(String(localStorage.getItem('@DoWhile:user-social-media')))
		const data = JSON.parse(JSON.stringify({code, social}))

	  const { data: authResponse } = await api
		  .post('authenticate', data)
			.catch(err => alert(err.message))
		// console.log(authResponse.token)
	}
});

const badge = reactive({ isOpen: false });
const modal = reactive({ isOpen: false });

function toggleBadge(user: IUser) {
	const stringified = JSON.stringify(user)
	localStorage.setItem('@DoWhile:user-badge', stringified)

	setTimeout(() => {
		const state = !badge.isOpen;
		badge.isOpen = state;
	}, 1000)
}

function toggleModal() {
  const state = !modal.isOpen;
  modal.isOpen = state;
}

provide("toggleBadge", toggleBadge);
provide("toggleModal", toggleModal);
</script>

<style lang="scss">
@import "../assets/colors.scss";
.home {
  background: $BLACK;
  height: 100vh;
  width: 100vw;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & > .message-list {
    display: flex;
    width: 100%;
    height: calc(88vh);
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    padding: 2rem;
  }

  & > .empty-messages {
    display: flex;
    width: 100%;
    height: calc(88vh);
    justify-content: center;
    align-items: center;

    & > p {
      font-weight: 500;
      font-size: 2rem;
      color: $YELLOW;
    }
  }
}

.message-form {
  width: 100%;
  height: 15rem;
  padding: 0 2rem 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.35rem;

  justify-self: flex-end;

  & > textarea {
    width: 100%;
    background: $GRAY400;
    flex: 4;
    border-radius: 0.5rem;
    border: 0;
    outline: 0;
    padding: 0.25rem;
    color: $GRAY100;

    &::placeholder {
      color: $GRAY100;
    }

    &:focus {
      background: $GRAY400;
      color: $PINK;
    }
  }

  & > button {
    width: 100%;
    flex: 2;
    border-radius: 0.5rem;
    border: 0;
    background: $YELLOW;
  }
}

.message-card {
  width: 18rem;
  word-wrap: break-word;
  padding: 0.45rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  color: $WHITE;
  border-bottom: 1px solid $YELLOW;
  border-radius: 0.5rem;

  &:nth-child(2) {
    align-self: flex-end;
  }

  & > p {
    text-align: justify;
    text-justify: inter-word;
  }

  & > div {
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;

    color: $GRAY100;

    & > img {
      height: 1.7rem;
      width: 1.7rem;
      border-radius: 100%;
      position: relative;

      &::after {
        content: "";
        width: 2rem;
        height: 2rem;
        position: absolute;
      }
    }
  }
}

.login-button {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  height: 3rem;
  padding: 0.5rem;
  width: 12rem;
  background: $PINK;
  border: 0;
  border-radius: 0.5rem;

  transform: translateY(-2.5rem);

  & > span {
    color: $WHITE;
    font-size: 1rem;
  }
}
</style>
