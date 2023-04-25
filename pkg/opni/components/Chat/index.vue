<script>
import Vue from 'vue';
import { TextAreaAutoGrow } from '@components/Form/TextArea';
import { marked } from 'marked';
import { sendMessage } from '../../utils/requests/chat';

export default Vue.extend({
  components: { TextAreaAutoGrow },
  layout:     'plain',

  data() {
    return {
      message:  '',
      messages: [
        {
          sender:  'Assistant',
          message: `You can begin our conversation by entering and sending me messages below.`
        }
      ],
      waiting: false
    };
  },

  methods: {
    async sendMessage(ev) {
      ev.preventDefault();

      this.messages.push({
        sender:   'You',
        message: this.message
      });
      const currentMessage = this.message;

      await this.$set(this, 'message', '');
      await this.$set(this, 'waiting', true);

      const newMessage = await sendMessage(currentMessage);

      this.messages.push({
        sender:   'Assistant',
        message: newMessage
      });
      await this.$set(this, 'waiting', false);
    },
    marked
  },

  computed: {},
});
</script>
<template>
  <div class="chat">
    <div class="messages">
      <div v-for="(m, i) in messages" :key="i" class="message" :class="{user: m.sender === 'You', assistant: m.sender === 'Assistant' }">
        <div class="sender">
          {{ m.sender }}
        </div>
        <div class="body" v-html="marked(m.message)" /> <!--eslint-disable-line vue/singleline-html-element-content-newline -->
      </div>
      <div v-if="waiting" class="message assistant">
        <div class="sender">
          Assistant
        </div>
        <div class="body">
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-input m-10">
      <TextAreaAutoGrow v-model="message" placeholder="Type your message here..." style="padding-top: 10px; min-height: 42px;" @keyup.enter.native="sendMessage" />
      <button class="btn bg-primary ml-10" @click="sendMessage">
        Send
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.chat {
    display: flex;
    flex-direction: column;

    .messages {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .message {
        display: inline-block;
        margin: 10px;
        margin-bottom: 0;
        padding: 10px;
        max-width: 75%;

        border-radius: var(--border-radius);
        position: relative;

        color: #000;
        .body > * {
          background: none;
        }
        pre {
          background: none;
          padding: 0;
          margin: 0;

          code {
            padding: 8px;
            color: #FFF;
            background-color: rgba(20, 20, 25, 0.9);
          }
        }

        a {
          color: #FFF;
        }

        &.assistant {
            background-color: var(--primary);
            align-self: flex-start;
        }

        &.user {
            background-color: var(--darker);
            align-self: flex-end;
        }

        .sender {
            margin-bottom: 2px;
            font-weight: 800;
        }

        .dots {
          margin-top: -4px;
        }

        $dotSize: 4px;
        .dot {
          display: inline-block;
          width: $dotSize;
          height: $dotSize;
          border-radius: 50%;
          background-color: #000;

          margin-left: 3px;
        }

        .dots .dot:nth-last-child(1) {
          animation: jumpingAnimation 0.8s 0.1s ease-in infinite;
        }
        .dots .dot:nth-last-child(2) {
          animation: jumpingAnimation 0.8s 0.2s ease-in infinite;
        }
        .dots .dot:nth-last-child(3) {
          animation: jumpingAnimation 0.8s 0.4s ease-in infinite;
        }

        @keyframes jumpingAnimation {
          0% {
            transform: translate3d(0, 0,0);
          }
          50% {
            transform: translate3d(0, calc($dotSize/1.5),0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
    }

    .user-input {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
