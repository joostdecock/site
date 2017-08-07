---
layout: cards
title: User profile
action: app
permalink: /show-user
crumbs:
  - /users|Users
---
<div class="container" id="user-container" >
    <div class="row">
        <div class="col-md-4 mt-5">
            <div style="margin: auto; padding: 1rem; text-align: center;">
                <img src="/img/logo/spinner.svg" alt="Loading..." id="avatar" style="padding: 0.75rem 0.75rem 2.25rem 0.75rem;background: #fff;" class="drop-shadow">
            </div>
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
