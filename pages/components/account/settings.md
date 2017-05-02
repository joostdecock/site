---
permalink: /components/account/settings
---
<div class="container">
<div class="row">
<div class="col-md-6 offset-md-3 mt-5">
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
        <input class="hidden" id="units" name="units" value="" type="checkbox">
    </div>
    <!-- paperless -->
    <div class="input-group key-toggle key-sm">
        <span class="input-group-addon td-key">Theme</span>
        <div class="toggle toggle-light" id="units-paperless"></div>
        <input class="hidden" id="paperless" name="paperless" value="" type="checkbox">
    </div>
    <h4 class="mt-3">Danger zone</h4>
    <p>Remove your account and all data.</p>
    <p><a href="#" class="btn btn-danger" id="delete">Delete my account</a></p>
</form>
</div>
</div>
</div>
