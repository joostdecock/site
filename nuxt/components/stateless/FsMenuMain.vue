<template>
  <aside>
    <v-list>
      <v-list-tile :to="$fs.path('/search')">
        <v-list-tile-action>
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('search') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list>
      <v-list-tile @click="toggleSub('cmty')">
        <v-list-tile-action>
          <v-icon color="info">extension</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('community') }}
            <v-icon color="secondary" class="ml-1" v-if="cmtySub">arrow_drop_up</v-icon>
            <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <fs-menu-community v-if="cmtySub" class="" dense />

      <v-list>
        <v-list-tile @click="toggleSub('docs')">
          <v-list-tile-action>
            <v-icon color="info">import_contacts</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('documentation') }}
              <v-icon color="secondary" class="ml-1" v-if="cmtySub">arrow_drop_up</v-icon>
              <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <fs-menu-documentation v-if="docsSub" dense />

        <v-list>
          <v-list-tile :to="$fs.path('/blog')">
            <v-list-tile-action>
              <v-icon>rss_feed</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('blog') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="$fs.path('/patterns')">
            <v-list-tile-action>
              <v-icon>content_paste</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('patterns') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list v-if="$auth.loggedIn">
            <v-list-tile avatar @click="toggleSub('user')">
              <v-list-tile-avatar :size="(24)">
                <img :src="$fs.conf.api.data+$auth.user.account.pictureSrc" :alt="$auth.user.account.username">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title> fixme {{ '@'+$auth.user.account.username }}
                  <v-icon color="secondary" class="ml-1" v-if="cmtySub">arrow_drop_up</v-icon>
                  <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <div v-else class="mt-2">
            <fs-button-signup />
            <fs-button-login />
            <fs-button-patron />
          </div>
          <fs-menu-user v-if="userSub" dense />
        </v-list>
  </aside>
</template>

<script>
import FsMenuCommunity from '~/components/stateless/FsMenuCommunity'
import FsMenuDocumentation from '~/components/stateless/FsMenuDocumentation'
import FsMenuUser from '~/components/stateful/FsMenuUser'
import FsButtonPatron from '~/components/stateless/FsButtonPatron'
import FsButtonSignup from '~/components/stateless/FsButtonSignup'
import FsButtonLogin from '~/components/stateless/FsButtonLogin'

export default {
  components: {
    FsMenuCommunity,
    FsMenuDocumentation,
    FsMenuUser,
    FsButtonPatron,
    FsButtonSignup,
    FsButtonLogin
  },
  data: function() {
    return {
      docsSub: false,
      cmtySub: false,
      userSub: false,
    }
  },
  methods: {
    toggleSub: function(sub) {
      let menu = sub+'Sub'
      if (this[menu]) {
        this[menu] = false
      } else {
        this.docsSub = false
        this.cmtySub = false
        this.userSub = false
        this[menu] = true
      }
    }
  }
}
</script>
