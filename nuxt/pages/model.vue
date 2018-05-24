<template>
  <div>
    <fs-breadcrumbs>{{ $t('newModel') }}</fs-breadcrumbs>
    <h1>{{ $t('newModel') }}</h1>
    <fs-wrapper-login-required>
      <div class="fs-pad elevation-1 fs-bg-white">
        <h4>{{ $t('nameOfTheModel') }}</h4>
        <p>{{ $t('txt-newModel')}}</p>
        <v-text-field name="name" v-model="name" :label="$t('modelName')"></v-text-field>
        <h4>{{ $t('withOrWithoutBreasts') }}</h4>
        <p>{{ $t('txt-withOrWithoutBreasts')}}</p>
        <v-radio-group v-model="breasts" :hint="$t('txt-withOrWithoutBreasts-explainer')" persistent-hint>
          <v-radio :label="$t('withBreasts')" :value="(true)"></v-radio>
          <v-radio :label="$t('withoutBreasts')" :value="(false)"></v-radio>
        </v-radio-group>
        <div class="mt-3">
          <v-btn color="primary" @click="createModel(name, breasts)" :disabled="(name.length>0 && !creating) ? false : true">
            <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="creating"></v-progress-circular>
            <v-icon class="mr-3">perm_identity</v-icon>
            {{ $t('createModel') }}
          </v-btn>
          <v-btn @click="$router.go(-1)">
            <v-icon class="mr-3">cancel</v-icon>
            {{ $t('cancel') }}
          </v-btn>
        </div>
      </div>
    </fs-wrapper-login-required>
  </div>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'

export default {
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs
  },
  data () {
    return {
      name: '',
      breasts: false,
      creating: false,
      error: false
    }
  },
  methods: {
    createModel: function (name, breasts) {
      this.creating = true
      this.$fs.createModel({name, breasts})
      .then((res) => {
        if(res.result === 'ok') {
          this.$router.push(this.$fs.path('/models/'+res.handle))
        } else {
          this.error = true
        }
      })
      .catch((error) => {console.log(error)})
    }
  }
}
</script>
