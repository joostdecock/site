---
layout: cards
title: User profile
action: app
permalink: /show-user
nopatronbanner: true
crumbs:
  - /users|Users
---
<div class="container" id="user-container" >
    <div class="row hidden" id="patronage">
        <div class="col-md-6">
            {% include blockquote.html
                bg='linear-gradient(45deg, rgba(102,63,149,1) 0%, rgba(132,90,184,1) 36%, rgba(112,61,179,1) 65%, rgba(102,63,149,1) 100%);'
                tcolor='#fff'
                icolor='#fff'
                content="<img id='patron-medal' src='/img/patrons/medals/medal-2.svg' style='float: right; max-width: 100px;' alt='A Patron medal'>
                    <h3><span class='username'></span> is a Patron</h3>
                    <h4>Freesewing lives by the grace of its Patrons; People like <span class='username'></span> who keep this ship afloat, and its crew motivated.</h4>"
            %}
        </div>
        <div class="col-md-6">
            <div class="non-patrons-only">
                 {% include blockquote.html
                     bg='transparent linear-gradient(45deg, rgb(255, 91, 119) 0%, rgb(251, 66, 102) 50%, rgb(243, 52, 87) 71%, rgb(255, 77, 109) 100%) repeat scroll 0% 0%;'
                     icon='check'
                     tcolor='#fff'
                     icolor='#fff'
                     content="<h3>Join the Patrons now</h3><h4>We are building a bedrock of loyal supporters to ensure a sustainable future for freesewing.org, our code, our patterns, and our community.</h4><p class='text-right'><a href='/patrons/join' class='btn btn-secondary'>Find out more</a></p>"
                 %}
            </div>
            <div class="patrons-only">
                 {% include blockquote.html
                     bg='transparent linear-gradient(45deg, rgb(255, 91, 119) 0%, rgb(251, 66, 102) 50%, rgb(243, 52, 87) 71%, rgb(255, 77, 109) 100%) repeat scroll 0% 0%;'
                     icon='heart'
                     tcolor='#fff'
                     icolor='#fff'
                     content="<h3>And so are you!</h3><h4>Thank you for your continued support. You're the best.</h4>"
                 %}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 mt-1">
            <div style="margin: auto; padding: 1rem; text-align: center;">
                <img src="/img/logo/spinner.svg" alt="Loading..." id="avatar" style="padding: 0.75rem 0.75rem 2.25rem 0.75rem;background: #fff;" class="drop-shadow">
            </div>
            <div id="social" class="text-center"></div>
        </div>
        <div class="col-md-8 text-center">
            <h4>Badges unlocked by <span class="username"></span></h4>
            <div id="badges"></div>
            <blockquote class="question m-600">
                <h5>How can I get badges?</h5>
                <p>You can unlock different badges based on your activity and contributions.</p>
                <p><a class="btn btn-outline-primary" href="/docs/site/badges">Show me all badges I can unlock</a></p>
            </blockquote>
        </div>
    </div>
</div>
