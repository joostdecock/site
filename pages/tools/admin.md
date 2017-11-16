---
layout: cards
title: Administration
permalink: /tools/admin
nocomments: true
action: admin
---
<div class="container">
    <div class="m600">
        <div id="q">
            <div class="ais-search-box">
                <input id="input" class="ais-search-box--input" value="" spellcheck="false" role="textbox" placeholder="Search user" autocorrect="off" autocomplete="off" autocapitalize="off" type="text">
            </div>
        </div>
        <div id="results"></div>
        <blockquote class="tip"><h5>Admins only</h5>You need to be an admin for this search to work</blockquote>
        <h2>Recent comments</h2>
        <div id="comments"></div>
    </div>
</div>

<style>
input.ais-search-box--input {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
}
input.ais-search-box--input:focus {
    color: #464a4c;
    background-color: #fff;
    border-color: #a787cc;
    outline: none;
}
</style>
