---
permalink: /components/account/settings
---
<div class="container">
<div class="row">
<div class="col-md-6 offset-md-3 mt-2">
<h2>Settings</h2>
<form id="settings-form">
    <h4>Your data</h4>
    <!-- email -->
    <div class="input-group key-sm">
        <span class="input-group-addon td-key">Email</span>
        <input class="form-number form-control" id="email" name="email" value="" type="email">
    </div>
    <!-- username -->
    <div class="input-group key-sm">
        <span class="input-group-addon td-key">Username</span>
        <input class="form-number form-control" id="username" name="username" value="" type="text">
    </div>
    <h4 class="mt-3">Your defaults</h4>
    <!-- units -->
    <div class="input-group key-toggle key-sm">
        <span class="input-group-addon td-key">Units</span>
        <div class="toggle toggle-light" id="units-toggle"></div>
    </div>
    <input class="hidden" id="units" name="units" value="imperial" type="checkbox" checked="">
    <!-- theme -->
    <div class="input-group key-toggle key-sm">
        <span class="input-group-addon td-key">Theme</span>
        <div class="toggle toggle-light" id="theme-toggle"></div>
    </div>
    <input class="hidden" id="theme" name="theme" value="paperless" type="checkbox" checked="">
    <h4 class="mt-3">Your picture</h4>
    <!-- picture -->
    <img src="" id="picture">
    <div id="loader" class=""><button type="submit" class="btn btn-primary btn-lg mt-5 btn-block disabled">Save settings</button></div>
</form>
</div>
</div>
</div>
