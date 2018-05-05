<template>
  <div class="fs-edit-inline elevation-1 fs-pad">
    <p class="error--text" v-if="error"><v-icon class="mr-1" color="error">warning</v-icon> {{ $t('error-'+reason) }}</p>
    <div v-if="field === 'breasts'">
      <h6>{{ $t('breasts') }}</h6>
      <v-radio-group v-model="val" :disbaled="updating">
        <v-radio :label="$t('withoutBreasts')" :value="0"></v-radio>
        <v-radio :label="$t('withBreasts')" :value="1"></v-radio>
      </v-radio-group>
    </div>
    <div v-else-if="field === 'shared'">
      <h6>{{ $t('share') }}</h6>
      <v-radio-group v-model="val" :disbaled="updating">
        <v-radio :label="$t('notShared')" :value="0"></v-radio>
        <v-radio :label="$t('shared')" :value="1"></v-radio>
      </v-radio-group>
    </div>
    <div v-else>
      <h6>{{ title }}</h6>
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
  name: 'FsModelFieldEdit',
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
      type: [String, Number],
      default: ''
    },
    handle: {
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
      data[this.field] =  this.val
      this.$fs.updateModel(this.handle, data)
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
