<template>
  <v-app dark>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />

      <!-- User Info (If Logged In) -->
      <template v-if="$auth.loggedIn">
        <v-avatar v-if="$auth.user.picture" class="mr-2">
          <img :src="$auth.user.picture" />
        </v-avatar>
        <div class="mr-4 d-none d-md-flex flex-column align-end">
          <span class="subtitle-2">{{ $auth.user.name }}</span>
          <span class="caption">{{ $auth.user.email }}</span>
        </div>
      </template>

      <!-- Logout Button -->
      <v-btn v-if="$auth.loggedIn" @click="logout" color="red" text>
        Logout
      </v-btn>

      <!-- Menu Toggle -->
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main View -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Right Drawer -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Footer -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['auth'],
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'mdi-apps', title: 'Welcome', to: '/' },
        { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire' },
        { icon: 'mdi-qrcode', title: 'QR CODE', to: '/qrscaner' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    async logout () {
      try {
        // Clear Nuxt Auth session
        await this.$auth.logout()

        // Redirect to Google logout to allow switching accounts on next login
        window.location.href = 'https://accounts.google.com/Logout'
      } catch (err) {
        console.error('Logout error:', err)
      }
    }
  }
}
</script>
