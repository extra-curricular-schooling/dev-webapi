<template>
<div class="container is-fullhd">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container is-fluid">
        </div>
      </div>
    </section>
    <registration-alert ref="alert"/>
    <section class="hero is-light">
        <div class="hero-body">
            <div class="container is-fluid">
                <div class="box">
                    <div class="container is-fluid">
                        <h1 class="title">
                            What do we do?
                        </h1>
                        <p/>
                    </div>
                    <div class="container is-fluid">
                        <h2 class="subtitle">
                            Well it all began on a nice day, very typical for Southern California. The sun is out and there is frolic and laugher all
                            around. And then a sudden realization was made. The senior project had begun and neigh an idea
                            was to be had. So out of the blue, Sir Scott came up with this idea for which we have implemented
                            here today. Sooner or later, someone, somewhere, with actual ideas that can be expressed in tangible
                            words, will edit out this masterpiece, and in turn, put something less awesome but probably more
                            appropriate for our cause. Until that day arrives,
                            <strong>I love this class. I don't lose sleep to this project at all.</strong> Honestly though, all BS
                            aside, I learned alot and will forever be grateful. Keep your head up guys.
                            <strong>Almost done!</strong>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container is-fluid">

        </div>
      </div>
    </section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <!-- Login Box Placeholder -->
                <h1 class="title"><strong>Getting Started</strong></h1>
                <Login-Panel/>
                <!-- End Login -->
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h1 class="title"><strong>Setting Up</strong></h1>
                <hr class="dropdown-divider">
                <p>
                  Getting settled can be a daunting task. Here at ECS, we make it easy to find great
                  articles tailered to your interests!
                </p>
                <hr class="dropdown-divider">
                <p>
                  Get going in a matter of minutes, simply tell us what you want to see, and we'll deliver!
                  <strong>It's that simple!</strong>
                </p>
                <hr class="dropdown-divider">
                <p>
                  What are you waiting for?
                </p>
                <hr class="dropdown-divider">
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h1 class="title">Start Reading!</h1>
                <hr class="dropdown-divider">
                <blockquote>
                  Enjoy our <strong>immersive</strong> collection of readings chosen to give the reader a pleasant illustration
                  of the material.
                </blockquote>
                <hr class="dropdown-divider">
                <blockquote>
                  <strong>200+</strong> Articles!
                </blockquote>
                <span>
                    <img src="../../static/images/open-book.gif" alt="" style="height: 75px;"/>
                  </span>
                <hr class="dropdown-divider">
              </article>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child box">
                <div class="container is-fluid">
                  <span>
                    <img src="../../static/images/star-clip-art.png" alt="" style="height: 75px;"/>
                  </span>
                  <span>
                    <p>
                      <strong>Earn Points! Win Prizes!</strong>
                    </p>
                  </span>
                </div>
                <hr class="dropdown-divider">
                <p>
                  The more you read, the more you win!
                </p>
                <hr class="dropdown-divider">
              </div>
              <div class="tile is-child box">
                <p>Share your favorite articles on</p>
                <figure class="image">
                  <a href="https://www.linkedin.com/" target="_blank">
                    <img src="../../static/images/linkedin-logo.png" alt=""/>
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container is-fluid">

        </div>
      </div>
    </section>
    <section class="hero is-light">
        <div class="hero-body">
            <div class="content has-text-centered">
                <p>
                    <strong>ECS</strong> by
                    <a href="/">KND</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed
                    <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
            </div>
        </div>
    </section>
    <div style="height: 1px;"/>
</div>
</template>

<script>
import DefaultLayout from '@/layouts/Default'
import LoginPanel from '@/components/login-panel/Template'
import RegistrationAlert from '@/components/registration-form/elements/RegistrationAlert'

export default {
  name: 'Main',
  components: {
    // DefaultLayout
    // This is causing an ambiguous root error when rendering.
    DefaultLayout,
    LoginPanel,
    RegistrationAlert
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.checkRedirectionFromRegistration()
  },
  methods: {
    checkRedirectionFromRegistration () {
      if (JSON.stringify(this.$route.params) === JSON.stringify({ isSuccess: true })) {
        this.$refs.alert.toggleNotification()
      }
    }
    // this.$router will talk to the vue-router (which is linked to the vue instance) to navigate to different pages.
    // this.$store will talk to the vuex store (which is linked to the vue instance) to get global data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-button {
  width: 90px;
}
.register-button {
  width: 90px;
}
h1 {
  font-family: Ubuntu;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 500;
  line-height: 26.4px;
}
h2 {
  font-family: Ubuntu;
  font-size: 18px;
  font-style: normal;
  font-variant: normal;
  font-weight: 500;
  line-height: 26.4px;
}
h3 {
  font-family: Ubuntu;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 500;
  line-height: 15.4px;
}
p {
  font-family: Ubuntu;
  font-size: 16px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
blockquote {
  font-family: Ubuntu;
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 30px;
}
pre {
  font-family: Ubuntu;
  font-size: 13px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 18.5714px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
