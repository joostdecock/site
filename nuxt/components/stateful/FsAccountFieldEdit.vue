<template>
  <div class="fs-edit-inline elevation-1 fs-pad">
    <p class="error--text" v-if="error"><v-icon class="mr-1" color="error">warning</v-icon> {{ $t('error-'+reason) }}</p>
    <div v-if="field === 'password'">
      <v-text-field
            :label="$t('currentPassword')"
            v-model="currentPassword"
            :append-icon="hideCurrentPassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (hideCurrentPassword = !hideCurrentPassword)"
            :type="hideCurrentPassword ? 'password' : 'text'"
            required
            prepend-icon="vpn_key"
            :hint="$t('enterYourCurrentPassword')"
            >
      </v-text-field>
      <v-text-field
            :label="$t('newPassword')"
            v-model="newPassword"
            :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (hidePassword = !hidePassword)"
            :type="hidePassword ? 'password' : 'text'"
            required
            prepend-icon="vpn_key"
            :hint="$t('enterYourNewPassword')"
            >
      </v-text-field>
    </div>
    <div v-else-if="field === 'theme'">
      <v-radio-group v-model="val" :disbaled="updating">
        <v-radio
          v-for="value in ['classic', 'paperless']" :key="value"
          :label="$t(value+'Theme')"
          :value="value"
          ></v-radio>
      </v-radio-group>
    </div>
    <div v-else-if="field === 'units'">
      <v-radio-group v-model="val" :disbaled="updating">
        <v-radio
          v-for="value in ['metric', 'imperial']" :key="value"
          :label="$t(value+'Units')"
          :value="value"
          ></v-radio>
      </v-radio-group>
    </div>
    <div v-else-if="field === 'locale'">
      <v-radio-group v-model="val" :disbaled="updating">
        <v-radio
          v-for="value in $i18n.locales" :key="value.code"
          :label="value.name"
          :value="value.code"
          ></v-radio>
      </v-radio-group>
    </div>
    <div v-else>
      <v-text-field :name="field" :id="field" v-model="val" :label="title"></v-text-field>
    </div>
    <v-btn color="primary" @click="saveField" :disabled="updating">
      <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="updating"></v-progress-circular>
      <v-icon class="mr-3" v-else>save</v-icon>{{ $t('save') }}
    </v-btn>
    <v-btn @click="$emit('cancel')" :disbaled="updating">
      <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
    </v-btn>
    <p v-if="field === 'email'" class="mt-3">
      <v-icon class="mr-1" color="accent">error_outline</v-icon>
      {{ $t('txt-changeRequiresConfirmation') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FsAccountFieldEdit',
  props: {
    field: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      val: this.value,
      updating: false,
      error: false,
      reason: 'unkown',
      hideCurrentPassword: true,
      hidePassword: true,
      newPassword: '',
      currentPassword: '',
    }
  },
  methods: {
    saveField: function() {
      this.updating = true
      this.error = false
      const data = {}
      if(this.field === 'password') {
        data.newPassword = this.newPassword
        data.currentPassword = this.currentPassword
      } else {
        data[this.field] =  this.val
      }
      this.$fs.updateAccount(data)
      .then((res) => {
        this.updating = false
        if(res.reason === 'no_changes_made') {
          this.$emit('update', 'no_changes')
        } else {
          this.$emit('update', this.$t(this.field+'Updated'))
      }
      })
      .catch((error) => {
        this.error = true
        this.updating = false
        this.reason = error.reason
      })
    }
  }
}
</script>
