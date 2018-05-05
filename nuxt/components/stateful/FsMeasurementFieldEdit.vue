<template>
  <div class="fs-edit-inline elevation-1 fs-pad">
    <p class="error--text" v-if="error"><v-icon class="mr-1" color="error">warning</v-icon> {{ $t('error-'+reason) }}</p>
    <h6>{{ title }}</h6>
    <v-text-field
      :name="field"
      :id="field"
      v-model="val"
      :label="title"
      :suffix="(model.units === 'imperial') ? $t('inch') : $t('centimeter')"
      ></v-text-field>
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
  name: 'FsMeasurementFieldEdit',
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
    model: {
      type: Object,
      required: true
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
      this.$fs.updateModel(this.model.handle, data)
      .then((res) => {
        this.updating = false
        if(res.reason === 'no_changes_made') {
          this.$emit('update', 'no_changes')
        } else {
          this.$emit('update', this.$t('measurementUpdated'))
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
