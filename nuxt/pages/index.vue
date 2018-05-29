<template>
  <section class="fs-pad">
    <div class="welcome">
      <h1>{{ $t('sewingPatternsForNonAveragePeople') }} *
        <span class="byline">* {{ $t('averagePeopleDontExist') }}</span>
      </h1>
      <div class="mt-4" v-if="$store.state.user.loggedIn && $store.state.user.isPatron">
        <!-- Not sure what to show patrons -->
      </div>
      <div class="mt-4" v-else-if="$store.state.user.loggedIn">
        <v-btn class="hidden-sm-and-up" :to="$fs.path('/patrons/join')" color="primary">
          <v-icon class="mr-3" color="accent">favorite</v-icon>{{ $t('becomeAPatron') }}
        </v-btn>
        <v-btn large class="hidden-xs-only" :to="$fs.path('/patrons/join')" color="primary">
          <v-icon class="mr-3" color="accent">favorite</v-icon>{{ $t('becomeAPatron') }}
        </v-btn>
      </div>
      <div class="mt-4" v-else>
        <v-btn class="hidden-sm-and-up" :to="$fs.path('/signup')" color="primary">
          <v-icon class="mr-3">person_add</v-icon>{{ $t('signUpForAFreeAccount') }}
        </v-btn>
        <v-btn large class="hidden-xs-only" :to="$fs.path('/signup')" color="primary">
          <v-icon class="mr-3">person_add</v-icon>{{ $t('signUpForAFreeAccount') }}
        </v-btn>
      </div>
    </div>
    <blockquote class="skully fs-bq fs-m800 mt-5 mb-5">
      <h3>{{ $t('freesewing') }} </h3>
      <h5>{{ $t('txt-slogan') }} </h5>
    </blockquote>
    <h2><a name="differences">{{ $t('txt-homepage-different')}}</a></h2>
    <v-layout row wrap class="mt-5">
      <v-flex md4 xs12 v-for="diff in differences" :key="diff.title">
        <v-card color="white">
          <v-card-text>
            <h3 class="text-xs-center">{{ $t(diff.title) }}</h3>
            <p class="text-xs-center">{{ $t(diff.text) }}</p>
            <p class="text-xs-center">
              <v-btn large :href="diff.href" target="_BLANK" color="primary" v-if="diff.href">{{ $t(diff.button) }}</v-btn>
              <v-btn large :to="$fs.path(diff.to)" color="primary" v-else>{{ $t(diff.button) }}</v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <h2><a name="how">{{ $t('txt-homepage-how')}}</a></h2>
    <v-layout row wrap class="mt-5">
      <v-flex md4 xs12 v-for="(h, i) in how" :key="h.to">
        <v-card color="primary" dark>
          <v-card-text>
            <h3 class="text-xs-center">
              <v-btn fab small color="white" outline><b><big>{{ i+1}}</big></b></v-btn>
              {{ $t(h.title) }}
            </h3>
            <p class="text-xs-center">{{ $t(h.text) }}</p>
            <p class="text-xs-center">
            <v-btn class="hidden-md-and-down" large color="white" outline :to="$fs.path(h.to)"><v-icon class="mr-3">{{ h.icon }}</v-icon>{{ $t(h.button) }}</v-btn>
              <v-btn class="hidden-lg-and-up" color="white" outline :to="$fs.path(h.to)">{{ $t(h.buttonSmall) }}</v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <h2>{{ $t('txt-homepage-quotes')}}</h2>
    <v-layout row wrap class="mt-5">
      <v-flex md4 xs12 v-for="quote in quotes" :key="quote.handle">
        <v-card color="white">
          <a :href="quote.link" target="_BLANK" class="fs-block-link"></a>
          <div class="quote">
            <p>{{ $t('quote-'+quote.handle) }}</p>
            <div class="avatar"><v-avatar size="52px"><img :src="'/img/quotes/'+quote.handle+'.jpg'" alt="" class="elevation-1"/></v-avatar></div>
            <div class="author">
              <p><b>{{ quote.name }}</b></p>
              <p>{{ $t('quote-'+quote.handle+'-about') }}</p>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-if="!$store.state.user.loggedIn">
    <h2>{{ $t('readyToTryFreesewing') }}</h2>
    <p class="text-xs-center">{{ $t('signingUpOnlyTakesAMinute') }}</p>
    <p class="text-xs-center"><v-btn large color="primary"><v-icon class="mr-3">person_add</v-icon>{{ $t('signUpForAFreeAccount') }}</v-btn></p>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'homepage',
  data: () => {
    return {
      quotes: [
        {name: 'Jamie Kemp', handle: 'jamie', link: 'http://maledevonsewing.co.uk/'},
        {name: 'Ivan Pedrazas', handle: 'ivan', link: 'https://twitter.com/ipedrazas/status/942004135372775429'},
        {name: 'Allie', handle: 'allie', link: 'https://theaspiringseamstress.wordpress.com/2018/03/01/freesewing-org-simon/'},
      ],
      differences: [
        {
          title: '100PercentOpenSource',
          text: 'txt-homepage-opensource',
          button: 'freesewingOnGithub',
          href: 'https://github.com/freesewing',
        },
        {
          title: '100PercentCommunity',
          text: 'txt-homepage-community',
          button: 'freesewingContributors',
          href: 'https://github.com/orgs/freesewing/teams/contributors/members'
        },
        {
          title: '100PercentFree',
          text: 'txt-homepage-patrons',
          button: 'freesewingPatrons',
          href: false,
          to: '/patrons'
        }
      ],
      how: [
        {
          title: 'createAnAccount',
          text: 'txt-homepage-join',
          button: 'signUpForAFreeAccount',
          buttonSmall: 'signUp',
          to: '/signup',
          icon: 'person_add'
        },
        {
          title: 'addAModel',
          text: 'txt-homepage-model',
          button: 'newModel',
          buttonSmall: 'newModel',
          to: '/model',
          icon: 'perm_identity'
        },
        {
          title: 'draftAPattern',
          text: 'txt-homepage-draft',
          button: 'newDraft',
          buttonSmall: 'newDraft',
          to: '/draft',
          icon: 'insert_drive_file'
        },
      ]
    }
  }
}
</script>

<style scoped>
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
