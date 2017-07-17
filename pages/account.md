---
layout: cards
title: Your account
action: app
permalink: /account
nocomments: true
---
<div class="container">
    <div class="account-display" id="account">
        <div>
            <div class="crown-wrapper">
                <span class="crown crown-left" id="account-model-count">0</span>
                <img alt="Your account avatar" src="/img/logo/spinner.svg" class="crown crown-middle" id="account-picture" />
                <span class="crown crown-right" id="account-draft-count">0</span>
            </div>
            <h3 id="account-username"></h3>
        </div>
    </div>
    <div class="row" id="account-actions">
        <div class="col-xl-10 offset-xl-1 col-lg-12">
                    <div class="row mb-3">
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#account" class="add-model-btn rop-shadow btn btn-block btn-info mt-3 modal light"><i class="fa fa-plus" aria-hidden="true"></i> Add model</a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="/draft" id="redraft-btn" class="drop-shadow btn btn-block btn-info mt-3 modal light"><i class="fa fa-magic" aria-hidden="true"></i> New draft</a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#account" id="account-settings-btn" class="drop-shadow draft-settings btn btn-block btn-primary mt-3 modal light"><i class="fa fa-wrench" aria-hidden="true"></i> Settings</a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#account" id="delete-btn" class="drop-shadow btn btn-block btn-danger mt-3 modal light"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
                        </div>
                    </div>
        </div>
    </div>
    <div class="row" id="model-actions">
        <div class="col-xl-10 offset-xl-1 col-lg-12">
                    <div class="row mb-3">
                        <div class="col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-12 ">
                            <a href="#account" class="add-model-btn drop-shadow btn  btn-lg btn-block btn-primary mt-3 modal light"><i class="fa fa-plus" aria-hidden="true"></i> Add model</a>
                        </div>
                    </div>
        </div>
    </div>
    <div class="row" id="models-title-row">
        <div class="col-md-12">
            <h2 id="models-title">Models</h2>
        </div>
    </div>
    <div class="row" id="models"></div>
    <div class="row">
        <div class="col-md-12" id="drafts">
            <h2>Drafts</h2>
            <table class="table table-striped table-hover">
                <thead class="thead-inverse">
                    <tr>
                        <th>#</th>
                        <th>Pattern</th>
                        <th>Model</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th class="icon"><i class="fa fa-trash" aria-hidden="true"></i></th>
                    </tr>
                </thead>
                <tbody id="draftlist">
                    <tr id='spinner'>
                        <td colspan="6" class="text-center px-5"><img src="/img/logo/spinner.svg" alt="Loading drafts..."></td>
                    </tr>
                    <tr id='draft-row'>
                        <td class="handle"></td>
                        <td class="pattern"></td>
                        <td class="model"></td>
                        <td class="name"></td>
                        <td class="date"></td>
                        <td class="trash"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
