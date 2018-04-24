<template>
  <div>
    <v-toolbar color="white" flat>
      <v-spacer></v-spacer>
      <nuxt-link :to="$fs.path('/patterns')">
        <v-btn flat large>
          <v-icon class="mr-3" color="primary">content_paste</v-icon>
          {{ $t('patterns') }}
        </v-btn>
      </nuxt-link>

      <nuxt-link :to="$fs.path('/blog')">
        <v-btn flat large>
          <v-icon class="mr-3" color="primary">rss_feed</v-icon>
          {{ $t('blog') }}
        </v-btn>
      </nuxt-link>

      <v-menu nudge-right>
        <v-toolbar-title slot="activator">
          <v-btn large flat>
            <v-icon class="mr-3">import_contacts</v-icon>
            {{ $t('documentation') }}
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-list>

          <v-list-tile>
            <v-list-tile-content><b>{{ $t('forUsers') }}</b></v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="$fs.path('/docs/about')">
            <v-list-tile-action><v-icon>info_outline</v-icon></v-list-tile-action>
            <v-list-tile-content>{{ $t('aboutFreesewing') }}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="$fs.path('/docs/patterns')">
            <v-list-tile-action><v-icon>content_cut</v-icon></v-list-tile-action>
            <v-list-tile-content>{{ $t('patternDocumentation') }}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="$fs.path('/docs/measurements')">
            <v-list-tile-action><v-icon>accessibility</v-icon></v-list-tile-action>
            <v-list-tile-content>{{ $t('howToTakeMeasurements') }}</v-list-tile-content>
          </v-list-tile>

          <v-divider />
            <v-list-tile>
              <v-list-tile-content><b>{{ $t('forContributors') }}</b></v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="$fs.path('/docs/fundamentals')">
              <v-list-tile-action><v-icon>motorcycle</v-icon></v-list-tile-action>
              <v-list-tile-content>{{ $t('fundamentals') }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="$fs.path('/docs/designer/tutorial/part-1')">
              <v-list-tile-action><v-icon>gesture</v-icon></v-list-tile-action>
              <v-list-tile-content>{{ $t('learnToDesignPatterns') }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="$fs.path('/docs/api')">
              <v-list-tile-action><v-icon>code</v-icon></v-list-tile-action>
              <v-list-tile-content>{{ $t('documentationForDevelopers') }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="$fs.path('/docs/api')">
              <v-list-tile-action><v-icon>translate</v-icon></v-list-tile-action>
              <v-list-tile-content>{{ $t('documentationForTranslators') }}</v-list-tile-content>
            </v-list-tile>

            <v-divider />

              <v-list-tile :to="$fs.path('/docs')">
                <v-list-tile-action><v-icon>book</v-icon></v-list-tile-action>
                <v-list-tile-content>{{ $t('documentationOverview') }}</v-list-tile-content>
              </v-list-tile>


            </v-list>
          </v-menu>

          <nuxt-link :to="$fs.path('/search')">
            <v-btn flat large>
              <v-icon class="mr-3" color="primary">search</v-icon>
              {{ $t('search') }}
            </v-btn>
          </nuxt-link>

          <v-menu nudge-right>
            <v-toolbar-title slot="activator">
              <v-btn large flat>
                <v-icon class="mr-3" color="info">extension</v-icon>
                {{ $t('community') }}
                <v-icon color="secondary">arrow_drop_down</v-icon>
              </v-btn>
            </v-toolbar-title>
            <v-list>

              <v-list-tile :to="$fs.path('/showcase')">
                <v-list-tile-action><v-icon>photo_camera</v-icon></v-list-tile-action>
                <v-list-tile-content>{{ $t('showcase') }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile href="https://gitter.im/freesewing/freesewing" target="_BLANK">
                <v-list-tile-action><fs-icon-gitter /></v-list-tile-action>
                  <v-list-tile-content>{{ $t('chatOnGitter') }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile href="https://github.com/freesewing" target="_BLANK">
                <v-list-tile-action><fs-icon-github /></v-list-tile-action>
                  <v-list-tile-content>{{ $t('GitHub') }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile href="https://twitter.com/freesewing_org" target="BLANK">
                <v-list-tile-action><fs-icon-twitter /></v-list-tile-action>
                  <v-list-tile-content>{{ $t('Twitter') }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile href="https://instagram.com/freesewing_org" target="_BLANK">
                <v-list-tile-action><fs-icon-instagram /></v-list-tile-action>
                  <v-list-tile-content>{{ $t('Instagram') }}</v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile :to="$fs.path('/patrons')">
                <v-list-tile-action><v-icon>translate</v-icon></v-list-tile-action>
                <v-list-tile-content>{{ $t('translationTeam') }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile :to="$fs.path('/patrons')">
                <v-list-tile-action><v-icon color="accent">favorite</v-icon></v-list-tile-action>
                <v-list-tile-content>{{ $t('patrons') }}</v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-menu>

          <v-menu nudge-right>
            <v-toolbar-title slot="activator">
              <v-btn large flat>
                <img class="mr-3" :src="'/icons/locales/'+$i18n.locale+'.svg'" />
                {{ localeName }}
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </v-toolbar-title>
            <v-list>
              <v-list-tile 
                     v-for="(locale, index) in $i18n.locales"
                     :key="index" :to="switchLocalePath(locale.code)">
                <v-list-tile-action>
                  <img :src="'/icons/locales/'+locale.code+'.svg'" />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ locale.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- user toolbar -->
        <v-toolbar color="white" flat v-if="$auth.loggedIn">
          <v-spacer></v-spacer>
            <nuxt-link :to="$fs.path('/draft')">
              <v-btn large flat>
                <v-icon class="mr-3" color="success">insert_drive_file</v-icon>
                {{ $t('newDraft') }}
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="$fs.path('/model')">
              <v-btn large flat>
                <v-icon class="mr-3" color="accent">perm_identity</v-icon>
                {{ $t('newModel') }}
              </v-btn>
            </nuxt-link>
            |
            <nuxt-link :to="$fs.path('/drafts')">
              <v-btn large flat>
                <v-icon class="mr-3">folder</v-icon>
                {{ $t('drafts') }}
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="$fs.path('/models')">
              <v-btn large flat>
                <v-icon class="mr-3">perm_contact_calendar</v-icon>
                {{ $t('models') }}
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="$fs.path('/account')">
              <v-btn large flat>
                <v-icon class="mr-3">settings</v-icon>
                {{ $t('settings') }}
              </v-btn>
            </nuxt-link>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- anon toolbar -->
        <v-toolbar color="white" flat v-else>
          <v-spacer></v-spacer>
            <nuxt-link :to="$fs.path('/signup')">
              <v-btn large color="success">
                <v-icon class="mr-3" color="white">person_add</v-icon>
                {{ $t('signUpForAFreeAccount') }}
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="$fs.path('/login')">
              <v-btn large color="primary">
                <v-icon class="mr-3" color="white">vpn_key</v-icon>
                {{ $t('logIn') }}
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="$fs.path('/patrons/join')">
              <v-btn large color="accent">
                <v-icon class="mr-3" color="white">favorite</v-icon>
                {{ $t('becomeAPatron') }}
              </v-btn>
            </nuxt-link>
          <v-spacer></v-spacer>
        </v-toolbar>
  </div>
</template>

<script>
import FsIconGithub    from '~/components/stateless/FsIconGithub'
import FsIconTwitter   from '~/components/stateless/FsIconTwitter'
import FsIconInstagram from '~/components/stateless/FsIconInstagram'
import FsIconGitter    from '~/components/stateless/FsIconGitter'
export default {
  name: 'TheTopToolbar',
  components: {
    FsIconGithub,
    FsIconTwitter,
    FsIconInstagram,
    FsIconGitter
  },
  computed: { 
    localeName () {
      const self = this
      for (let locale of this.$i18n.locales) {
        if(locale.code === self.$i18n.locale) {
          return locale.name
        }
      }
      return ''
    }
  },
  methods: {
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    }
  }
}
</script>
