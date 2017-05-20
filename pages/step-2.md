---
layout: cards
title: Choose a model
action: app
tags: [account]
permalink: /step/2
---
<div class="container">
    <div class="row">
        <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 text-center">
            <h3>Two steps to go</h3>
            <ul style="margin: auto; display:inline-block; text-align: left; padding-left: 0;" class="todo mt-2 mb-3">
                <li class="done"><a href="/draft" id="step1-link">You chose a pattern</a></li>
                <li class="ongoing">Choose a model</li>
                <li>Next, choose your options</li>
                <li>Then, we draft your pattern</li>
            </ul>
            <div class="progress mb-5" style="max-width: 250px; margin:auto;">
                <div class="progress-bar" style="width: 33%;" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">33%</div>
            </div>
        </div>
    </div>

    <div class="row" id="okmsg">
        <div class="col-12">
            <h2>These models are ok</h2>
            <p>These models have all the required measurements to draft this pattern. Simply click on one of them to move to the next step.</p>
        </div>
    </div>
    <div class="row" id="okmodels"></div>

    <div class="row" id="komsg">
        <div class="col-12">
            <h2>These models cannot be used</h2>
            <p>If you want to make this pattern for any of these models, you'll have to update them with the required measurements first.</p>
            <blockquote class="tip">You can click on any of these models to update them.</blockquote>
        </div>
    </div>

    <div class="row" id="komodels"></div>
</div>
