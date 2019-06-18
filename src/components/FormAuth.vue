<template>
  <q-card class="column" :flat="flat" id="authForm">
    <q-card-section class="row items-center">
      <div class="title text-h6" :class="[cardState]">{{ title }}</div>
      <q-space></q-space>
      <slot name="close"></slot>
    </q-card-section>
    <q-card-section class="col">
      <div class="loginForm" v-if="['Login', 'Register', 'Reset Password'].includes(cardState)">
        <form @submit.prevent="formGo()">
          <q-input
            ref="email"
            type="email"
            v-model="email"
            autofocus="autofocus"
            filled="filled"
            label="Email *"
            @keyup.enter="$refs.password.focus()"
          >
            <template v-slot:prepend>
              <q-icon name="email"></q-icon>
            </template>
          </q-input>
          <q-input
            v-if="cardState !== 'Reset Password'"
            type="password"
            ref="password"
            v-model="password"
            filled="filled"
            label="Password *"
            @keyup.enter="formGo()"
          >
            <template v-slot:prepend>
              <q-icon name="lock"></q-icon>
            </template>
          </q-input>
          <q-toggle v-if="cardState === 'Register'" v-model="accept">
            <span>
              I agree to the
              <a @click.prevent="openTerms" target="_blank" href="#">terms of service</a>
            </span>
            <br>
            <span>
              and
              <a @click.prevent="openPrivacy" target="_blank" href="#">privacy policy</a>.
            </span>
          </q-toggle>
        </form>
        <q-card-actions align="around">
          <q-btn
            flat="flat"
            color="grey"
            v-if="cardState !== 'Register'"
            @click="newState('Register')"
            tabindex="-1"
          >Register</q-btn>
          <q-btn
            flat="flat"
            color="grey"
            v-if="cardState !== 'Login'"
            @click="newState('Login')"
            tabindex="-1"
          >Login</q-btn>
          <q-btn
            flat="flat"
            color="grey"
            v-if="cardState !== 'Reset Password'"
            @click="newState('Reset Password')"
            tabindex="-1"
          >Forgot</q-btn>
          <q-btn
            type="submit"
            ref="submit"
            color="primary"
            :label="cardState"
            @click="formGo()"
            @keyup.enter="formGo()"
          ></q-btn>
        </q-card-actions>
      </div>
      <div class="verifyEmail" v-if="cardState === 'Verify Email'">
        <div class="verifying" v-if="!verifyState">
          <q-chip color="info" text-color="white" icon="alarm">Verifying...</q-chip>
        </div>
        <div class="verified" v-else-if="verifyState ==='verified'">
          <q-chip color="positive" text-color="white" icon="alarm">Success!</q-chip>
          <p>Close this tab to continue!</p>
        </div>
        <div class="error" v-else>
          <q-chip color="red" text-color="white" icon="alarm">Snap!</q-chip>
          <p>{{ verifyState }}</p>
          <q-btn color="primary" @click="$router.push({ name:'profile' });">Visit your profile</q-btn>
          <p>to send a new verification email</p>
        </div>
      </div>
      <div class="resetPassword" v-if="cardState === 'Change Password'">
        <div class="resetting" v-if="!resetState">
          <q-input
            type="password"
            ref="password"
            v-model="password"
            filled="filled"
            label="New Password *"
            @keyup.enter="formGo()"
          >
            <template v-slot:prepend>
              <q-icon name="lock"></q-icon>
            </template>
          </q-input>
          <q-btn color="primary" @click="formGo()">Set new password</q-btn>
        </div>
        <div class="reset" v-else-if="resetState ==='reset'">
          <q-chip color="positive" text-color="white" icon="alarm">Success!</q-chip>
          <p>Close this tab to continue!</p>
        </div>
        <div class="error" v-else>
          <q-chip color="red" text-color="white" icon="alarm">Snap!</q-chip>
          <p>{{ resetState }}</p>
          <q-btn color="primary" @click="$router.push({ name:'profile' });">Try again</q-btn>
        </div>
      </div>
      <div class="loggedIn" v-if="cardState === 'Logged In'">
        <p>{{ currentUser.email }} for the win!</p>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <slot @next="$emit('next')" @prev="$emit('prev')"></slot>
    </q-card-actions>
  </q-card>
</template>

<script>
/**
 * Login/register/forgotpassword
 */
import { openURL } from 'quasar'

export default {
  props: {
    flat: {
      default: function () {
        return false
      }
    },
    startState: {
      default: function () {
        return 'Register'
      }
    }
  },
  data () {
    return {
      cardState: '', // "Login", "Register", "Reset Password", "Change Password", "Verify Email", "Logged In"
      verifyState: false,
      resetState: false,
      email: '',
      password: '',
      accept: false
    }
  },
  computed: {
    currentUser () {
      return this.$auth.currentUser()
    },
    title () {
      return this.cardState
    },
    closeMe () {
      return this.$route.name === 'verify-email'
    }
  },
  mounted () {
    // Get previous email if present and set login form state accordingly
    this.email = this.$auth.rememberMe()

    // Initialize the state of the card.
    this.cardState = this.startState
    if (['Login', 'Register'].includes(this.cardState)) {
      this.cardState = this.email ? 'Login' : 'Register'
    }

    // Change the UI based on cardState
    switch (this.cardState) {
      // verify form
      case 'Verify Email':
        this.$account
          .verifySignupLong(this.$route.query.token)
          .then(success => {
            this.verifyState = 'verified'
          })
          .catch(error => {
            let message = error.message
            if (error.className === 'bad-request') { message = 'This link has expired or was already used.' }
            this.verifyState = message
          })
        break
      default:
        setTimeout(() => {
          if (this.email && this.$refs.password) this.$refs.password.focus()
        }, 100)
    }
  },
  methods: {
    // Change to a new state and handle any UI sugar
    newState (state) {
      this.cardState = state
      if (this.currentUser) {
        this.cardState = 'Logged In'
      } else if (this.email && this.$refs.password) {
        this.$refs.password.focus()
      } else if (this.$refs.email) {
        this.$refs.email.focus()
      }
    },

    // Process a form submit
    formGo () {
      let self = this
      function loginSuccess (email) {
        // Rememberme happens automatically
        self.$notify.success(`Welcome ${email}!`)
        self.email = ''
        self.password = ''
        self.$emit('logged-in', true)
      }

      function forgotSuccess () {
        // TODO FIXME.  This UI doesn't create value.  It should show a message.
        self.cardState = 'Login'
        if (self.$refs.password) self.$refs.password.focus()
        self.$notify.success('Please check your email and click the link')
      }

      function formError (error) {
        // Set focus to email to start over
        self.$refs.email.focus()
        // If the user was registering, offer to login

        let msg = error.message
        switch (error.className) {
          // user already registered
          case 'conflict':
            if (self.cardState === 'Register') self.cardState = 'Login'
            msg = 'This email is already registered.'
            break
            // Resend the verification link.  TODO FIXME BROKEN
          case 'bad-request':
            msg = 'Click the verification link, then come back and reset your password.'
            // This is part of an error where the account is expected to have verified before it can "forgot"
            self.$account.resendVerifySignup({ email: self.email })
            break
        }
        self.$notify.error(msg)
      }

      switch (this.cardState) {
        case 'Login':
          this.$auth
            .login({
              email: this.email,
              password: this.password
            })
            .then(() => { loginSuccess(this.email) })
            .catch(formError)
          break
        case 'Register':
          if (!this.accept) {
            this.$notify.error('Please accept the terms of service.')
          } else {
            this.$auth
              .register({
                email: this.email,
                password: this.password
              })
              .then(() => { loginSuccess(this.email) })
              .catch(formError)
          }
          break
        case 'Reset Password':
          this.$auth
            .forgot({ email: this.email })
            .then(forgotSuccess)
            .catch(formError)
          break
        case 'Change Password': // this is the response page to "Reset Password"
          this.$account
            .resetPwdLong(this.$route.query.token, this.password)
            .then(success => {
              this.resetState = 'reset'
            })
            .catch(error => {
              let message = error.message
              if (error.className === 'bad-request') { message = 'This link has expired or was already used.' }
              this.resetState = message
            })
          break
      }
    },
    openTerms () {
      openURL(this.$config.urlTOS)
    },
    openPrivacy () {
      openURL(this.$config.urlPP)
    }
  }
}
</script>

<style lang="stylus">
#authForm {
  max-width: 95vw;

  .title {
    text-transform: capitalize;
  }
}
</style>
