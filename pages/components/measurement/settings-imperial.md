---
permalink: /components/measurement/settings-imperial
---
<!-- Start of /components/measurement/settings-imperial -->
<div class="container">
<div class="row">
<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2" id="settings-inner">
<h2 id='measurement-main-title'>Update measurement</h2>
<form id="settings-form">
    <!-- username -->
    <div class="input-group key-sm mt-4">
        <span class="input-group-addon td-key">Value</span>
        <input class="form-number form-control text-right" id="m" name="m" value="" type="text">
        <span class="input-group-addon form-units"></span>
    </div>
<div markdown="1">

 - You can use decimals: `9.5` = Nine and a half inch
 - You can use fractions: `9 1/2` = Nine and a half inch
</div>
    <div id="loader" class="text-right">
        <a id="show-instructions" href="#loader" class="btn btn-outline-primary mt-3">Show instructions</a>
        <a id="hide-instructions" href="#loader" class="btn btn-outline-primary mt-3 hidden">Hide instructions</a>
        <button type="submit" class="btn btn-primary mt-3 poh">Save</button>
        <a href="#loader" class="btn btn-outline-info mt-3 close-modal">Cancel</a>
    </div>
</form>
<div id="instructions" class="mt-5"><div>
</div>
</div>
</div>
<!-- End of /components/measurement/settings-imperial -->
