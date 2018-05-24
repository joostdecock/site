<template>
  <section :class="(signup) ? '' : 'on-splash fs-m800'">
    <div v-if="deleteProfileConfirmation || deleteModelConfirmation">
      <blockquote class="error">
        <h4>Are you 100% sure about this?</h4>
        <p v-if="deleteModelConfirmation">{{ $t('txt-warningModelData') }}</p>
        <p v-if="deleteProfileConfirmation">{{ $t('txt-warningProfileData') }}</p>
        <p>{{ $t('thereIsNoWayBackFromThis') }}</p>
        <p class="text-xs-right">
        <v-btn flat outline color="white" v-if="deleteProfileConfirmation" @click="save({profileConsent: false}); $fs.logout()">
          <v-icon class="mr-3">delete</v-icon>
          {{ $t('removeAllMyData') }}
        </v-btn>
        <v-btn flat outline color="white" v-if="deleteModelConfirmation" @click="save({modelConsent: false})">
          <v-icon class="mr-3">delete</v-icon>
          {{ $t('removeAllMyModelData') }}
        </v-btn>
        <v-btn flat outline color="white" @click="deleteProfileConfirmation=false; deleteModelConfirmation=false">
          <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
        </v-btn>
        </p>
      </blockquote>
    </div>
    <div v-else>
      <div v-if="profileConsentOnLoad && profile" class="mb-4">
        <blockquote class="success">
          <h3 class="fs-white">{{ $t('consentForProfileData') }}</h3>
          <ul><li>{{ $t('consentGiven') }}</li></ul>
          <fs-message-consent-profile v-if="profileDetails" :dark="(true)" />
          <p class="text-xs-right">
          <v-btn color="white" class="mt-3" flat outline @click="profileDetails = !profileDetails">
            <v-icon class="mr-3">info_outline</v-icon>
            {{ (profileDetails) ? $t('hideDetails') : $t('showDetails') }}
          </v-btn>
          <v-btn color="error" class="mt-3" v-if="profileDetails" @click="deleteProfileConfirmation=true">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
            <v-icon class="mr-3" v-else>error_outline</v-icon>
            {{ $t('revokeConsent') }}
          </v-btn>
          </p>
        </blockquote>
      </div>
      <div v-if="modelConsentOnLoad" class="mb-4">
        <blockquote class="success">
          <h3 class="fs-white">{{ $t('consentForModelData') }}</h3>
          <ul>
            <li>{{ $t('consentGiven') }}</li>
            <li v-if="objectsToOpenData">{{ $t('youObjectToSharingAnonymizedDataForResearch') }}</li>
            <li v-else>{{ $t('youDoNotObjectToSharingAnonymizedDataForResearch') }}</li>
          </ul>
          <fs-message-consent-model v-if="modelDetails" :dark="(true)" />
          <p class="text-xs-right">
          <v-btn color="white" class="mt-3" flat outline @click="modelDetails = !modelDetails">
            <v-icon class="mr-3">info_outline</v-icon>
            {{ (modelDetails) ? $t('hideDetails') : $t('showDetails') }}
          </v-btn>
          <v-btn color="white" class="mt-3" flat outline @click="save({objectsToOpenData: false}); objectsToOpenData=false; objectsToOpenDataOnLoad=false" v-if="modelDetails && objectsToOpenData">
            <v-icon class="mr-3">thumb_up</v-icon>
            {{ $t('stopObjecting') }}
          </v-btn>
          <v-btn color="warning" class="mt-3" @click="save({objectsToOpenData: true}); objectsToOpenData=true; objectsToOpenDataOnLoad=true" v-if="modelDetails && !objectsToOpenData">
            <v-icon class="mr-3">pan_tool</v-icon>
            {{ $t('object') }}
          </v-btn>
          <v-btn color="error" class="mt-3" v-if="modelDetails" @click="deleteModelConfirmation=true">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
            <v-icon class="mr-3" v-else>error_outline</v-icon>
            {{ $t('revokeConsent') }}
          </v-btn>
          </p>
        </blockquote>
      </div>
      <div v-if="intro && (!profileConsentOnLoad || !modelConsentOnLoad)" class="mb-4">
        <h2>{{ $t('weNeedYourConsent') }}</h2>
        <p>{{ $t('txt-gdpr-1') }}</p>
        <p>{{ $t('txt-gdpr-2') }}</p>
        <p>{{ $t('txt-gdpr-3') }}</p>
        <fs-link-learn-more to="/privacy"> {{ $t('privacyNotice') }}</fs-link-learn-more>
      </div>

      <div v-if="profile && !profileConsentOnLoad">
        <h3>{{ $t('consentForProfileData') }}</h3>
        <fs-message-consent-profile />
          <h4>{{ $t('txt-consentProfile') }}</h4>
          <v-switch v-model="profileConsent" color="success" :label= "profileConsent ? $t('yesIDo') : $t('noIDoNot')"></v-switch>
          <v-btn color="success" class="mb-5" :disabled="!profileConsent" @click="(signup) ? $emit('consent') : save({profileConsent: true})">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
            <div v-else>
              <v-icon class="mr-3" v-if="signup">check_circle</v-icon>
              <v-icon class="mr-3" v-else>save</v-icon>
            </div>
            <span v-if="signup">{{ $t('createMyAccount') }}</span>
            <span v-else>{{ $t('save') }}</span>
          </v-btn>
          <v-btn color="error" class="mb-5" :disabled="profileConsent" @click="(signup) ? $emit('noconsent') : deleteProfileConfirmation=true">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
            <v-icon class="mr-3" v-else>cancel</v-icon>
            {{ $t('removeAllMyData') }}
          </v-btn>
      </div>
      <div v-if="model && !modelConsentOnLoad">
        <h3>{{ $t('consentForModelData') }}</h3>
        <fs-message-consent-model v-on:object="object=!object" />
          <h4>{{ $t('txt-consentModel') }}</h4>
          <v-switch v-model="modelConsent" color="success" :label= "modelConsent ? $t('yesIDo') : $t('noIDoNot')"></v-switch>
          <div v-if="object">
            <h5>{{ $t('txt-doYouObject') }}</h5>
            <p>{{ $t('txt-consentModelObjectWhy') }}</p>
            <v-switch v-model="objectsToOpenData" color="error" :label= "objectsToOpenData ? $t('yesIDoObject') : $t('noIDoNotObject')"></v-switch>
          </div>
          <v-btn color="success" class="mb-5" :disabled="!modelConsent" @click="save({modelConsent: true, objectsToOpenData: objectsToOpenData})">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
            <v-icon class="mr-3" v-else>save</v-icon>
            {{ $t('save') }}
          </v-btn>
          <v-btn color="error" class="mb-5" :disabled="modelConsent" @click="deleteModelConfirmation=true">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
            <v-icon class="mr-3" v-else>cancel</v-icon>
            {{ $t('removeAllMyModelData') }}
          </v-btn>
      </div>
      <div v-if="(model || profile)">
        <p class="body-1 mt-5 mb-4">
        {{ $t('txt-gdprCompliant') }}
        <nuxt-link :to="$fs.path('/privacy')" class="ml-3">{{ $t('privacyNotice')}}</nuxt-link>
        </p>
      </div>
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
    },
    signup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    let profileConsent = false
    let modelConsent = false
    let objectsToOpenData = false
    let profileConsentOnLoad = false
    let modelConsentOnLoad = false
    let objectsToOpenDataOnLoad = false
    try {
      if(this.$store.state.user.account.consent.profile == '1') {
        profileConsent = true
        profileConsentOnLoad = true
      }
    } catch (e){}
    try{
      if(this.$store.state.user.account.consent.model == '1') {
        modelConsent = true
        modelConsentOnLoad = true
      }
    } catch (e){}
    try {
      if(this.$store.state.user.account.consent.objectsToOpenData == '1') {
        objectsToOpenData = true
        objectsToOpenDataOnLoad = true
      }
    } catch (e){}
    return {
      loading: false,
      error: false,
      success: false,
      reason: '',
      profileConsent,
      modelConsent,
      objectsToOpenData,
      profileConsentOnLoad,
      modelConsentOnLoad,
      objectsToOpenDataOnLoad,
      deleteModelConfirmation: false,
      deleteProfileConfirmation: false,
      object: false,
      modelDetails: false,
      profileDetails: false
    }
  },
  methods: {
    save: function(data) {
      this.updating = true
      this.error = false
      this.$fs.updateAccount(data)
      .then((res) => {
        this.updating = false
        if(res.reason !== 'no_changes_made') {
          this.$emit('update')
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

<style scoped>
.on-splash {
  background: #ffffffdd;
  padding: 10px 40px 5px;
  margin-top: 50px;
  border-radius: 5px;
}
</style>
