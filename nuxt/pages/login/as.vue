<template>
  <section class="on-splash fs-m600 pt-4">
    <fs-wrapper-admin-required>
    <div>
      <div>
        <h1 class="mt-5">{{ $t('logInAs') }}</h1>
        <v-form v-model="valid" class="mt-4">
          <v-text-field
            :label="$t('username')"
            v-model="username"
            required
            prepend-icon="perm_identity"
            :autofocus="(true)"
          >
          </v-text-field>
            <v-btn @click="submit" color="primary" large class="mt-3 mb-4">
              <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
              <v-icon v-else class="mr-3">vpn_key</v-icon>
              {{ $t('logInAs') }}
            </v-btn>
        </v-form>
      </div>
    </div>
    </fs-wrapper-admin-required>
  </section>
</template>

<script>
import FsWrapperAdminRequired from '~/components/stateless/FsWrapperAdminRequired'
export default {
  auth: false,
  layout: 'splash',
  components: {
    FsWrapperAdminRequired
  },
  data () {
    return {
      username: '',
      valid: false,
      loading: false,
      error: false,
    }
  },
  methods: {
    submit: function() {
      this.loading = true;
      this.$fs.loginAs(this.username)
      .then((result) => {
        this.loading = false
        this.$router.push(this.$fs.path('/account'))
      })
      .catch((result) => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>

<style scoped>
.on-splash {
  background: #ffffffdd;
  padding: 0 40px 5px;
  text-align: center;
  border-radius: 5px;
}
</style>
