---
layout: cards
title: Your drafts
action: app
tags: [account]
permalink: /list-drafts
---
<div class="container">
    <div class="row">
        <div class="col-md-12" id="drafts">
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
                        <td colspan="6" class="text-center px-5"><img src="/img/logo/spinner.svg"></td>
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
