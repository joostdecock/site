---
layout: cards
title: Status page
permalink: /status
nopatronbanner: true
crumbs: false
action: status
nocomments: true
---
<div class="container">
    <div class="row">
        <div class="col-sm-4">
            <blockquote id="core-status" class="text-white py-3">
                <div class="status-icon float-right text-right">
                    <i class="fa fa-check fa-3x" aria-hidden="true"></i>
                    <br>
                    <img src="https://travis-ci.org/freesewing/core.svg?branch={{ site.branch }}" class="drop-shadow mt-3" style="margin-right: -15px;">
                </div>
                <h3>Core API</h3>
            </blockquote>
        </div> 
        <div class="col-sm-4">
            <blockquote id="data-status" class="text-white py-3">
                <div class="status-icon float-right">
                    <i class="fa fa-check fa-3x" aria-hidden="true"></i>
                    <br>
                    <img src="https://travis-ci.org/freesewing/data.svg?branch={{ site.branch }}" class="drop-shadow mt-3" style="margin-right: -15px;">
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
</div>
<span id="branch" data-branch="{{ site.branch }}"></span>
