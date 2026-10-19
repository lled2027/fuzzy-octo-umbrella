<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:9090')

const messages = ref([])
const input = ref('')
const userId = localStorage.getItem('user_id') || crypto.randomUUID()
localStorage.setItem('user_id', userId)

onMounted(() => {
  socket.on('history', (msgs) => {
    messages.value = msgs
  })
  socket.on('message', (msg) => {
    messages.value.push(msg)
  })
})

onUnmounted(() => {
  socket.off('history')
  socket.off('message')
})

function send() {
  if (!input.value.trim()) return
  socket.emit('message', { userId, text: input.value })
  input.value = ''
}
</script>

<template>
  <div class="chat">
    <div class="messages">
      <div v-for="m in messages" :key="m.id" class="msg">
        <span class="user">{{ m.userId?.slice(0, 8) }}</span>
        <span class="text">{{ m.text }}</span>
        <span class="time">{{ m.timestamp?.split('T')[1]?.slice(0, 5) }}</span>
      </div>
    </div>
    <div class="input-row">
      <input
        v-model="input"
        @keyup.enter="send"
        placeholder="Type a message..."
      />
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<style scoped>
.chat { max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 8px; }
.messages { height: 400px; overflow-y: auto; padding: 1rem; }
.msg { margin-bottom: 0.5rem; }
.user { font-size: 0.7rem; color: #666; margin-right: 0.5rem; }
.time { font-size: 0.7rem; color: #888; float: right; }
.input-row { display: flex; gap: 0.5rem; padding: 0.5rem; border-top: 1px solid #eee; }
input { flex: 1; padding: 0.5rem; }
</style>   