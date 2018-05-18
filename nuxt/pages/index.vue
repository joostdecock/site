<template>
  <section class="fs-pad">
    <div class="welcome">
      <h1>{{ $t('sewingPatternsForNonAveragePeople') }} *
        <span class="byline">* {{ $t('averagePeopleDontExist') }}</span>
      </h1>
      <h5 class="mt-3">
        <v-btn class="hidden-sm-and-up" :to="$fs.path('/signup')" color="primary">
          <v-icon class="mr-3">home</v-icon>{{ $t('signUpForAFreeAccount') }}
        </v-btn>
        <v-btn large class="hidden-xs-only" :to="$fs.path('/signup')" color="primary">
          <v-icon class="mr-3">home</v-icon>{{ $t('signUpForAFreeAccount') }}
        </v-btn>
      </h5>
    </div>
    <blockquote class="skully fs-m800 mt-5 mb-5">
      <h3>{{ $t('freesewing') }} </h3>
      <h5>{{ $t('txt-slogan') }} </h5>
    </blockquote>
    <h2>{{ $t('txt-homepage-different')}}</h2>
    <v-layout row wrap class="mt-5">
      <v-flex md4 xs12>
        <v-card color="white">
          <v-card-text>
            <h3 class="text-xs-center">{{ $t('100PercentOpenSource') }}</h3>
            <p class="text-xs-center">{{ $t('txt-homepage-opensource') }}</p>
            <p class="text-xs-center"><v-btn large href="https://github.com/freesewing" target="_BLANK" color="primary">{{ $t('freesewingOnGithub') }}</v-btn></p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card color="white">
          <v-card-text>
            <h3 class="text-xs-center">{{ $t('100PercentCommunity') }}</h3>
            <p class="text-xs-center">{{ $t('txt-homepage-community') }}</p>
            <p class="text-xs-center"><v-btn large href="https://github.com/orgs/freesewing/teams/contributors/members" target="_BLANK" color="primary">{{ $t('freesewingContributors') }}</v-btn></p>

          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card color="white">
          <v-card-text>
            <h3 class="text-xs-center">{{ $t('100PercentFree') }}</h3>
            <p class="text-xs-center">{{ $t('txt-homepage-patrons') }}</p>
            <p class="text-xs-center"><v-btn large href="https://github.com/orgs/freesewing/teams/contributors/members" target="_BLANK" color="primary">{{ $t('freesewingPatrons') }}</v-btn></p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <h2>{{ $t('txt-homepage-how')}}</h2>
    <v-layout row wrap class="mt-5">
      <v-flex md4 xs12>
        <v-card color="primary" dark>
          <v-card-text>
            <h3 class="text-xs-center">
              <v-btn fab small color="white" outline><b><big>1</big></b></v-btn>
              {{ $t('createAnAccount') }}
            </h3>
            <p class="text-xs-center">{{ $t('txt-homepage-join') }}</p>
            <p class="text-xs-center"><v-btn large color="white" outline>{{ $t('signUpForAFreeAccount') }}</v-btn></p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card color="primary" dark>
          <v-card-text>
            <h3 class="text-xs-center">
              <v-btn fab small color="white" outline><b><big>2</big></b></v-btn>
              {{ $t('addAModel') }}
            </h3>
            <p class="text-xs-center">{{ $t('txt-homepage-model') }}</p>
            <p class="text-xs-center"><v-btn large color="white" outline>{{ $t('newModel') }}</v-btn></p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card color="primary" dark>
          <v-card-text>
            <h3 class="text-xs-center">
              <v-btn fab small color="white" outline><b><big>3</big></b></v-btn>
              {{ $t('draftAPattern') }}
            </h3>
            <p class="text-xs-center">{{ $t('txt-homepage-draft') }}</p>
            <p class="text-xs-center"><v-btn large color="white" outline>{{ $t('newDraft') }}</v-btn></p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <h2>{{ $t('txt-homepage-quotes')}}</h2>
    <v-layout row wrap class="mt-5">
      <v-flex md4 xs12>
        <v-card color="white">
          <div class="quote">
            <p>Age doesn't matter. Unless you're a cheese.</p>
            <div class="avatar"><v-avatar size="52px"><img src="http://i.pravatar.cc/104" alt="" class="elevation-1"/></v-avatar></div>
            <div class="author">
              <p><b>Author Name</b></p>
              <p>Author description</p>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card color="white">
          <div class="quote">
            <p>Age doesn't matter. Unless you're a cheese.</p>
            <div class="avatar"><v-avatar size="52px"><img src="http://i.pravatar.cc/104" alt="" class="elevation-1"/></v-avatar></div>
            <div class="author">
              <p><b>Author Name</b></p>
              <p>Author description</p>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card color="white">
          <div class="quote">
            <p>Age doesn't matter. Unless you're a cheese.</p>
            <div class="avatar"><v-avatar size="52px"><img src="http://i.pravatar.cc/104" alt="" class="elevation-1"/></v-avatar></div>
            <div class="author">
              <p><b>Author Name</b></p>
              <p>Author description</p>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <h2>{{ $t('readyToTryFreesewing') }}</h2>
    <p class="text-xs-center">{{ $t('signingUpOnlyTakesAMinute') }}</p>
    <p class="text-xs-center"><v-btn large color="primary">{{ $t('signUpForAFreeAccount') }}</v-btn></p>
  </section>
</template>

<script>
export default {layout: 'homepage'}
</script>

<style>
div.welcome {
  max-width: 600px;
  color: #f5f8f9;
}
h1 {
  font-weight: 900;
  letter-spacing: -0.05rem;
}
h1 span.byline {
  display: block;
  font-size: 24px;
  font-weight: 400;
  margin-top: 4px;
}
h2 {
  text-align: center;
  font-size: 52px;
  font-weight: 200;
  margin-top: 90px;
}
div.quote {
  padding: 24px;
  font-size: 22px;
  font-style: italic;
}
div.avatar {
  float: left;
  margin-right: 4px;
  margin-bottom: 4px;
}
div.author p {
  margin:0;
  padding: 2px 0;
  line-height: 1.1;
  font-size: 18px;
  color: #848484;
}
@media (max-width: 600px) {
  div.welcome {
    min-height: 320px;
    margin-top: -30px;
    margin-left: 0;
  }
}
@media (min-width: 601px) {
  div.welcome {
    min-height: 450px;
    margin-top: 50px;
  }
}
@media (min-width: 960px) {
  div.welcome {
    min-height: 600px;
    margin-top: 150px;
  }
}
@media (min-width: 1264px) {
  div.welcome {
    min-height: 900px;
    margin-top: 200px;
    margin-left: 100px;
  }
}
</style>
