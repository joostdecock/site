<template>
  <section class="on-splash fs-m800">
    <div v-if="intro" class="mb-4">
      <h2>{{ $t('weNeedYourConsent') }}</h2>
      <p>{{ $t('txt-gdpr-1') }}</p>
      <p>{{ $t('txt-gdpr-2') }}</p>
      <p>{{ $t('txt-gdpr-3') }}</p>
      <fs-link-learn-more to="/docs/privacy"> {{ $t('privacyInfo') }}</fs-link-learn-more>
    </div>

    <div v-if="profile">
      <h3>{{ $t('consentForProfileData') }}</h3>
      <fs-message-consent-profile />
        <h4>{{ $t('txt-consentProfile') }}</h4>
        <v-switch v-model="consentProfile" color="success" :label= "consent ? $t('yesIDo') : $t('noIDoNot')"></v-switch>
        <v-btn color="success" class="mb-5" :disabled="!consentProfile" @click="createAccount">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <v-btn color="error" class="mb-5" :disabled="consentProfile" @click="deleteConfirmation">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>cancel</v-icon>
          {{ $t('removeAllMyData') }}
        </v-btn>
    </div>

    <div v-if="model">
      <h3>{{ $t('consentForModelData') }}</h3>
      <fs-message-consent-model v-on:object="object=!object" />
        <h4>{{ $t('txt-consentModel') }}</h4>
          <v-switch v-model="consentModel" color="success" :label= "consent ? $t('yesIDo') : $t('noIDoNot')"></v-switch>
          <div v-if="object">
          <h6>{{ $t('txt-doYouObject') }}</h6>
          <p>{{ $t('txt-consentModelWhy') }}</p>
          <v-switch v-model="objectModel" color="success" :label= "consent ? $t('yesIDo') : $t('noIDoNot')"></v-switch>
        </div>
        <v-btn color="success" class="mb-5" :disabled="!consentModel" @click="createAccount">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <v-btn color="error" class="mb-5" :disabled="consentModel" @click="deleteConfirmation">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>cancel</v-icon>
          {{ $t('removeAllMyModelData') }}
        </v-btn>
        <span v-if="object">object</span>
    </div>
    <div v-if="(model || profile)">
        <p class="body-1 mt-3">
        {{ $t('txt-gdprCompliant') }}
        <nuxt-link :to="$fs.path('/docs/privacy')" class="ml-3">{{ $t('privacyInfo')}}</nuxt-link>
        </p>
    </div>
  </section>
</template>

<script>
import FsMessageConsentProfile from '~/components/stateless/FsMessageConsentProfile'
import FsMessageConsentModel from '~/components/stateless/FsMessageConsentModel'
import FsLinkLearnMore from '~/components/stateless/FsLinkLearnMore'
export default {
  auth: false,
  layout: 'splash',
  components: {
    FsMessageConsentProfile,
    FsMessageConsentModel,
    FsLinkLearnMore
  },
  props: {
    intro: {
      type: Boolean,
      default: true
    },
    profile: {
      type: Boolean,
      default: true
    },
    model: {
      type: Boolean,
      default: true
    }
  },
  data () {
      let consentProfile = false
      let consentModel = false
      if(this.$store.state.user.account.consent.profile == '1') consentProfile = true
      if(this.$store.state.user.account.consent.model == '1') consentModel = true
    return {
      loading: false,
      error: false,
      success: false,
      reason: '',
      consentProfile,
      consentModel,
      object: false
    }
  },
  methods: {
    getHash: function() {
      let hashPosition
      if (this.$i18n.locale === this.$i18n.fallbackLocale) {
        hashPosition = 16
      } else {
        hashPosition = 19
      }
      return window.location.pathname.substr(hashPosition, 40)
    },
    deleteConfirmation: function() {
      this.$fs.api.data.delete('confirm/'+this.getHash())
      .catch((e) => {
        this.loading = false;
        this.error = true
        this.reason = e.response.data.reason
      })
      .then((i) => {
        if(!this.error) {
          this.loading = false;
          this.success = true;
          this.$router.push(this.$fs.path('/'))
        }
      })
    },
    createAccount: function() {
      // fixme
      //this.$auth.loginWith('signup', {
        //  data: {
          //    hash: this.getHash()
        //  }
      //})
      //.catch((e) => {
        //  this.loading = false;
        //  this.error = true
        //  this.reason = e.response.data.reason
      //})
      //.then((i) => {
        //  if(!this.error) {
          //    this.loading = false;
          //    this.$router.push(this.$fs.path('/account/setup'))
        //  }
      //})
    },
  }

}
</script>

<style scoped>
.on-splash {
  background: #ffffffdd;
  padding: 10px 40px 5px;
  margin-top: 50px;
  border-radius: 5px;
}
</style>
