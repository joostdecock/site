---
layout: cards
title: Your account
action: app
tags: [account]
permalink: /account
---
<div class="container">
    <div class="account-display" id="account">
        <div>
            <div class="crown-wrapper">
                <span class="crown crown-left" id="account-model-count">0</span>
                <img class="crown crown-middle" id="account-picture" />
                <span class="crown crown-right" id="account-draft-count">0</span>
            </div>
            <h3 id="account-username"></h3>
            <a id="add-model-btn" href="#" class="btn btn-outline-primary mt-1"><i class="fa fa-plus" aria-hidden="true"></i> Add model</a>
            <a id="settings-btn" href="#" class="btn btn-outline-primary mt-1"><i class="fa fa-wrench" aria-hidden="true"></i> Settings</a>
            <a href="#" class="btn btn-outline-danger mt-1" id="delete-btn"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
        </div>
    </div>
    <div class="row" id="models-title-row">
        <div class="col-md-12">
            <h2 id="models-title">Models</h2>
        </div>
    </div>
    <div class="row" id="models"></div>
</div>
