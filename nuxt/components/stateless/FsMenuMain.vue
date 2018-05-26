<template>
  <aside style="align-self: flex-end; width: 100%;">

    <v-list>
      <v-list-tile :to="$fs.path('/patterns')">
        <v-list-tile-action>
          <fs-icon-tshirt :color="($fs.path('/patterns') === $route.path) ? '#212121' : 'rgba(0,0,0,0.54)'" />
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="($fs.path('/patterns') === $route.path) ? 'bold' : ''">{{ $t('patterns') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="$fs.path('/blog')">
        <v-list-tile-action>
          <v-icon :color="($fs.path('/blog') === $route.path) ? '#212121' : 'rgba(0,0,0,0.54)'">rss_feed</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="($fs.path('/blog') === $route.path) ? 'bold' : ''">{{ $t('blog') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list>
      <v-list-tile @click="toggleSub('docs')">
        <v-list-tile-action>
          <v-icon color="info">import_contacts</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="($fs.path('/docs') === $route.path) ? 'bold' : ''">{{ $t('documentation') }}
            <v-icon color="secondary" class="ml-1" v-if="cmtySub">arrow_drop_up</v-icon>
            <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <fs-menu-documentation v-if="docsSub" dense />

    <v-list>
      <v-list-tile @click="toggleSub('cmty')">
        <v-list-tile-action>
          <v-icon color="info">extension</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="($fs.path('/showcase') === $route.path) ? 'bold' : ''">{{ $t('community') }}
            <v-icon color="secondary" class="ml-1" v-if="cmtySub">arrow_drop_up</v-icon>
            <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <fs-menu-community v-if="cmtySub" class="" dense />

    <v-list v-if="$store.state.user.loggedIn">
      <v-divider></v-divider>
      <v-list-tile avatar @click="toggleSub('user')">
        <v-list-tile-avatar :size="(24)">
          <img :src="$fs.conf.apis.data+$store.state.user.account.pictureSrc" :alt="$store.state.user.account.username">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title> {{ '@'+$store.state.user.account.username }}
            <v-icon color="secondary" class="ml-1" v-if="cmtySub">arrow_drop_up</v-icon>
            <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list v-else>
      <v-divider></v-divider>
      <v-list-tile :to="$fs.path('/login')">
        <v-list-tile-action>
          <v-icon color="success">vpn_key</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="($fs.path('/login') === $route.path) ? 'bold' : ''">{{ $t('logIn') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/signup')">
        <v-list-tile-action>
          <v-icon color="accent">person_add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="($fs.path('/signup') === $route.path) ? 'bold' : ''">{{ $t('signUp') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <fs-menu-user v-if="(userSub)" dense />
    <v-list v-if="$store.state.user.loggedIn">
      <v-list-tile :to="$fs.path('/model')">
        <v-list-tile-action>
          <v-icon color="accent">perm_identity</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('newModel') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/draft')">
        <v-list-tile-action>
          <v-icon color="success">insert_drive_file</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('newDraft') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </aside>
</template>

<script>
import FsMenuCommunity     from '~/components/stateless/FsMenuCommunity'
import FsMenuDocumentation from '~/components/stateless/FsMenuDocumentation'
import FsMenuUser          from '~/components/stateful/FsMenuUser'
import FsIconTshirt        from '~/components/stateless/FsIconTshirt'
import FsLogo              from '~/components/stateless/FsLogo'

export default {
  components: {
    FsMenuCommunity,
    FsMenuDocumentation,
    FsMenuUser,
    FsIconTshirt,
    FsLogo
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

<style scoped>
.bold {
  font-weight: bold;
}
</style>
