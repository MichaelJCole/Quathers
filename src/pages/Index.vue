<template>
  <q-page class="text-center">
    <div>
      <h3>Quathers = Quasar + Feathers</h3>
      <p>Hello, this is an experiment / starter project to use Quasar and Feathers together.</p>
    </div>

    <div>
      <!-- Logged in view w/ logout button -->
      <div v-if="$auth.currentUser()">
        {{ $auth.currentUser().email }}
        <code>
          <pre>{{$auth.currentUser()}}</pre>
        </code>
        <q-btn icon="logout" @click="$auth.logout()">Logout</q-btn>
      </div>
      <!-- Logged out view w/ login button -->
      <div v-else>
        You are logged out
        <q-btn color="primary" @click="showAuthModal=true">Register/Login</q-btn>
      </div>
    </div>

    <!-- Login dialog and form -->
    <q-dialog bottom v-model="showAuthModal" persistent>
      <modal-auth @closeMe="showAuthModal = false;">
        <q-btn icon="close" flat round dense v-close-popup />
      </modal-auth>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      showAuthModal: false
    }
  }
}
</script>
