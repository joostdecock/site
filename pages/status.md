---
layout: cards
title: Status page
permalink: /status
nopatronbanner: true
crumbs: false
action: status
---
<div class="container">
    <div class="row">
        <div class="col-sm-4">
            <blockquote id="core-status" class="text-white py-3">
                <div class="status-icon float-right">
                    <i class="fa fa-check fa-3x" aria-hidden="true"></i>
                </div>
                <h3>Core API</h3>
            </blockquote>
        </div> 
        <div class="col-sm-4">
            <blockquote id="data-status" class="text-white py-3">
                <div class="status-icon float-right">
                    <i class="fa fa-check fa-3x" aria-hidden="true"></i>
                </div>
                <h3>Data API</h3>
            </blockquote>
        </div>
        <div class="col-sm-4">
            <blockquote id="site-status" class="text-white bg-success py-3">
                <div class="status-icon float-right">
                    <i class="fa fa-check fa-3x" aria-hidden="true"></i>
                </div>
                <h3>Website</h3>
                <h5>Up and running</h5>
            </blockquote>
        </div>
    </div>
    <div class="row mb-5">
        <div class="col-sm-6 offset-sm-3">
            <blockquote id="overall-status" class="text-white bg-success text-center py-3">
                <i class="fa fa-smile-o fa-4x" aria-hidden="true"></i>
                <h6>Everything looks fine</h6>
                <p><a class="btn btn-outline-white" href="https://gitter.im/freesewing/freesewing" target="_BLANK">Chat with support</a></p>
            </blockquote>
        </div>
    </div>
    <p>Skip ahead to 
        <a href="#rollbar">run-time issues</a>, 
        <a href="#builds">code builds</a>, 
        <a href="#issues">code issues</a>, 
        <a href="#counters">counters</a>, 
        <a href="#code-base">code base</a>, 
        <a href="#server-status">server status</a>,
        or <a href="#referrals">referrals</a> 
    </p>
    <h2 id="rollbar">Run-time issues on Rollbar</h2>
    <p>We use <a href="https://rollbar.com/joostdecock/freesewing.org/" target="_BLANK">Rollbar</a> to notify us of errors in our production code. If there are any, they are listed below.</p>
    <table id="rollbar-table" class="table">
        <thead>
            <tr>
                <th scope="col" class="px-1">Level</th>
                <th scope="col" class="px-1">Count</th>
                <th scope="col" class="px-1">Source</th>
                <th scope="col" class="px-1">Issue</th>
            </tr>
        </thead>
    </table>
    <h2 id="builds">Code builds by Travis</h2>
    <p>We use <a href="https://travis-ci.org/freesewing" target="_BLANK">Travis</a> to build and deploy our code. The build status for our core and data backends are listed below.</p>
    <table class="table">
        <tr><th nowrap scope="row">core</th><td style="width: 100%"><img src="https://travis-ci.org/freesewing/core.svg?branch=master"></td></tr>
        <tr><th nowrap scope="row">data</th><td style="width: 100%"><img src="https://travis-ci.org/freesewing/data.svg?branch=master"></td></tr>
    </table>
    <h2 id="issues">Code issues on GitHub</h2>
    <p>We track bugs, feature requests, and other improvements through <a href="https://github.com/freesewing" target="_BLANK">GitHub</a> issues. Open issues are listed below, per repository.</p>
    <table id="github-table" class="table">
        <thead>
            <tr>
                <th scope="col" class="px-1">Repo</th>
                <th scope="col" class="px-1">Issue</th>
                <th scope="col" class="px-1">By</th>
                <th scope="col" class="px-1">Title</th>
            </tr>
        </thead>
    </table>
    <h2 id="counters">Counters</h2>
    <div class="row only-on-small">
        <table class="table">
            <tr><th scope="row" class="text-right" style="width:150px;">Users</th><td class="counter users"></td></tr>
            <tr><th scope="row" class="text-right" style="width:150px;">Models</th><td class="counter models"></td></tr>
            <tr><th scope="row" class="text-right" style="width:150px;">Drafts</th><td class="counter drafts"></td></tr>
            <tr><th scope="row" class="text-right" style="width:150px;">Patterns</th><td class="counter patterns"></td></tr>
            <tr><th scope="row" class="text-right" style="width:150px;">Showcases</th><td class="counter">{{ site.showcases | size}}</td></tr>
            <tr><th scope="row" class="text-right" style="width:150px;">Comments</th><td class="counter comments"></td></tr>
        </table>
    </div>
    <div class="row not-on-small">
        <div class="col-md-2 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Users</h4>
                    <p class="counter users"></p>
                </div>
            </div>
        </div>
        <div class="col-md-2 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Models</h4>
                    <p class="counter models"></p>
                </div>
            </div>
        </div>
        <div class="col-md-2 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Drafts</h4>
                    <p class="counter drafts"></p>
                </div>
            </div>
        </div>
        <div class="col-md-2 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Patterns</h4>
                    <p class="counter patterns"></p>
                </div>
            </div>
        </div>
        <div class="col-md-2 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Showcases</h4>
                    <p class="counter">{{ site.showcases | size }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-2 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Comments</h4>
                    <p class="counter comments"></p>
                </div>
            </div>
        </div>
    </div>
    <h2 id="code-base">Code base</h2>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Site</h4>
                    <div id="site"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Data</h4>
                    <div id="data"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Core</h4>
                    <div id="core"></div>
                </div>
            </div>
        </div>
    </div>
    <h2 id="server-status">Server status</h2>
    <p>Uptime: <span id="uptime"></span></p>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Memory</h4>
                    <div class="progress">
                        <div id="memory" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Swap</h4>
                    <div class="progress">
                        <div id="swap" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">CPU</h4>
                    <div class="progress">
                        <div id="cpu" class="progress-bar" role="progressbar" style="width: 0%; " aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h2 id="referrals">Referrals</h2>
    <p>This is data for the last two weeks</p>
    <table id="reflist" class="table striped paper">
        <thead>
            <tr>
                <th style="max-width: 4rem; text-align:right">Count</th>
                <th>Site</th>
                <th class="not-on-small" style="width: 60%;">Proportion</th>
            </tr>
        </thead>
    </table>
</div>
<span id="branch" data-branch="{{ site.branch }}"></span>
