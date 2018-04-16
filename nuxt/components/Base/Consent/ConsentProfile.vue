<template>
  <div class="text-xs-left">
    <h4>{{ $t('doYouGiveYourConsentToProcessYourProfileData') }}</h4>
    <v-divider />
    <h6>{{ $t('whatIsProfileData') }}</h6>
    <ul>
      <li class="mt-2"><b>Required</b></li>
      <li><v-icon color="primary" class="mr-1">visibility_off</v-icon><v-icon color="success" class="mr-3">lock</v-icon>Your email address</li>
      <li><v-icon color="primary" class="mr-1">visibility_off</v-icon><v-icon color="success" class="mr-3">lock</v-icon>Your password</li>
      <li><v-icon color="primary" class="mr-1">visibility</v-icon><v-icon color="warning" class="mr-3">lock_open</v-icon>Your username</li>
      <li class="mt-2"><b>Optional</b></li>
      <li><v-icon color="primary" class="mr-1">visibility</v-icon><v-icon color="warning" class="mr-3">lock_open</v-icon>A profile picture</li>
      <li><v-icon color="primary" class="mr-1">visibility</v-icon><v-icon color="warning" class="mr-3">lock_open</v-icon>Your username on GitHub, Twitter, or Instagram</li>
    </ul>
    <ul class="legend">
      <li><b>Icon legend</b></li>
      <li><v-icon color="primary" class="mr-1" small>visibility</v-icon> Can be seen by others when they visit freesewing.org</li>
      <li><v-icon color="primary" class="mr-1" small>visibility_off</v-icon> Cannot be seen by others</li>
      <li><v-icon color="warning" class="mr-1" small>lock_open</v-icon> Is encrypted in transit, but not in the backend database</li>
      <li><v-icon color="success" class="mr-1" small>lock</v-icon> Is encrypted both in transit and in the backend database</li>
    </ul>
    <p>With the exception of your username, all you data is
    </p>
    <v-divider />
    <h6>{{ $t('whyDoWeNeedIt') }}</h6>
    <p>To authenticate you, contact you when needed, and build and online community.</p> 
 </div>
</template>

<style scoped>
ul {
  margin-left: 10px;
  font-size: 90%;
  margin: 15px 10px;
}
  ul li {
    list-style-type: none;
  }
  ul.legend {
    font-size: 60%;
  }
</style>
