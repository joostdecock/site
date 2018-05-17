<template>
  <div class="consent-info">
    <v-divider />
    <p class="subheading mt-2 mb-1"><v-icon color="primary" class="mr-2">account_circle</v-icon>{{ $t('txt-consentModelQuestionWhat') }}</p>
    <p class="body-1 mb-1" v-html="$t('txt-consentModelAnswerWhat')"></p>
    <p class="muted body-1" v-html="$t('txt-consentModelAnswerWhatOptional')"></p>
    <v-divider />
    <p class="subheading mt-2 mb-1"><v-icon color="primary" class="mr-2">help</v-icon>{{ $t('txt-consentProfileQuestionWhy') }}</p>
    <p class="body-1" v-html="$t('txt-consentModelAnswerWhy')"></p>
    <v-divider />
    <p class="subheading mt-2 mb-1"><v-icon color="primary" class="mr-2">access_time</v-icon>{{ $t('txt-consentProfileQuestionTiming') }}</p>
    <p class="body-1" v-html="$t('txt-consentProfileAnswerTiming')"></p>
    <v-divider />
    <p class="subheading mt-2 mb-1"><v-icon color="primary" class="mr-2">share</v-icon>{{ $t('txt-consentProfileQuestionShare') }}</p>
    <p class="body-1" v-html="$t('txt-consentProfileAnswerShare')"></p>
    <p class="body-1">
      {{ $t('txt-consentModelObjectNote') }}
      <a @click="$emit('object')" small flat outline>{{ $t('youHaveTheRightToObjectToThis') }}</a>
    </p>
    <v-divider />
 </div>
</template>

<style scoped>
p.subheading {
  margin-left: 0;
}
p {
  margin-left: 32px;
}
.muted {
  color: #646464;
}
</style>
