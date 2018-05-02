<template>
  <div class="fs-edit-inline elevation-1 fs-pad">
    <p class="error--text" v-if="error"><v-icon class="mr-1" color="error">warning</v-icon> {{ $t('error-'+reason) }}</p>
    <div v-if="field === 'password'">
      pass
    </div>
    <div v-else>
      <v-text-field :name="field" :id="field" v-model="val" :label="title"></v-text-field>
      <v-btn color="primary" @click="saveField" :disabled="updating">
        <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="updating"></v-progress-circular>
        <v-icon class="mr-3" v-else>save</v-icon>{{ $t('save') }}
      </v-btn>
      <v-btn @click="$emit('cancel')" :disbaled="updating">
        <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
      </v-btn>
      <p v-if="field === 'email'" class="mt-3">
        <v-icon class="mr-1" color="accent">error_outline</v-icon>
      {{ $t('txt-changeRequiresConfirmation') }}</p>
    </div>
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
      reason: 'unkown'
    }
  },
  methods: {
    saveField: function() {
      this.updating = true
      this.error = false
      this.$fs.updateAccount({[this.field]: this.val})
      .then((result) => {
        (result) ? this.updating = false : this.error = true
        this.updating = false
        this.$emit('cancel')
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
