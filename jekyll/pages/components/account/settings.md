---
permalink: /components/account/settings
---
<!-- Start of /components/account/settings -->
<div class="container">
<div class="row">
<div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2" id="settings-inner">
<h2>Account settings</h2>
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
    <!-- shipping address -->
    <div id="patron-settings">
        <div class="input-group key-sm patrons-only mt-2">
            <span class="input-group-addon td-key">Shipping address</span>
            <textarea class="form-control" id="address" name="address" value="" rows="5" placeholder="Enter your full name + shipping address here"></textarea>
        </div>
        <p class="mb-2"><small>A shipping address is only required for <b>Captain</b> and <b>First mate</b> Patrons.</small></p>
        <div id="captain-settings">
            <div class="input-group key-sm patrons-only">
                <span class="input-group-addon td-key">Birthmonth</span>
                <select class="form-control" id="birthday-month" name="birthday-month" value="">
                    <option value="1" id="birthday-month-1">January</option> 
                    <option value="2" id="birthday-month-2">February</option>
                    <option value="3" id="birthday-month-3">March</option>
                    <option value="4" id="birthday-month-4">April</option>
                    <option value="5" id="birthday-month-5">May</option>
                    <option value="6" id="birthday-month-6">June</option>
                    <option value="7" id="birthday-month-7">July</option>
                    <option value="8" id="birthday-month-8">August</option>
                    <option value="9" id="birthday-month-9">September</option>
                    <option value="10" id="birthday-month-10">October</option>
                    <option value="11" id="birthday-month-11">November</option>
                    <option value="12" id="birthday-month-12">December</option>
                </select>
            </div>
            <div class="input-group key-sm patrons-only">
                <span class="input-group-addon td-key">Birthday</span>
                <select class="form-control" id="birthday-day" name="birthday-day" value="">
                    <option value="1" id="birthday-day-1">1</option> 
                    <option value="2" id="birthday-day-2">2</option> 
                    <option value="3" id="birthday-day-3">3</option> 
                    <option value="4" id="birthday-day-4">4</option> 
                    <option value="5" id="birthday-day-5">5</option> 
                    <option value="6" id="birthday-day-6">6</option> 
                    <option value="7" id="birthday-day-7">7</option> 
                    <option value="8" id="birthday-day-8">8</option> 
                    <option value="9" id="birthday-day-9">9</option> 
                    <option value="10" id="birthday-day-10">10</option> 
                    <option value="11" id="birthday-day-11">11</option> 
                    <option value="12" id="birthday-day-12">12</option> 
                    <option value="13" id="birthday-day-13">13</option> 
                    <option value="14" id="birthday-day-14">14</option> 
                    <option value="15" id="birthday-day-15">15</option> 
                    <option value="16" id="birthday-day-16">16</option> 
                    <option value="17" id="birthday-day-17">17</option> 
                    <option value="18" id="birthday-day-18">18</option> 
                    <option value="19" id="birthday-day-19">19</option> 
                    <option value="20" id="birthday-day-20">20</option> 
                    <option value="21" id="birthday-day-21">21</option> 
                    <option value="22" id="birthday-day-22">22</option> 
                    <option value="23" id="birthday-day-23">23</option> 
                    <option value="24" id="birthday-day-24">24</option> 
                    <option value="25" id="birthday-day-25">25</option> 
                    <option value="26" id="birthday-day-26">26</option> 
                    <option value="27" id="birthday-day-27">27</option> 
                    <option value="28" id="birthday-day-28">28</option> 
                    <option value="29" id="birthday-day-29">29</option> 
                    <option value="30" id="birthday-day-30">30</option> 
                    <option value="31" id="birthday-day-31">31</option> 
                </select>
            </div>
            <p class="mb-2"><small>A birthday is only required for <b>Captain</b> Patrons.</small></p>
        </div>
    </div>
    <h4>Social media</h4>
    <!-- twitter -->
    <div class="input-group key-sm">
        <span class="input-group-addon td-key">Twitter</span>
        <input class="form-number form-control" id="twitter" name="twitter" value="" type="text" placeholder="Enter your Twitter username here">
    </div>
    <!-- instagram -->
    <div class="input-group key-sm">
        <span class="input-group-addon td-key">Instagram</span>
        <input class="form-number form-control" id="instagram" name="instagram" value="" type="text" placeholder="Enter your Instagram username here">
    </div>
    <!-- github -->
    <div class="input-group key-sm">
        <span class="input-group-addon td-key">GitHub</span>
        <input class="form-number form-control" id="github" name="github" value="" type="text" placeholder="Enter your GitHub username here">
    </div>
    <p><small><a href="/blog/privacy-choices/" target="_BLANK">Your privacy is in good hands here</a>. I am not interested in collecting your data, and the only reason
    this is here is because <a taget="_BLANK" href="https://github.com/freesewing/site/issues/184">people asked for it</a>.</small></p>
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
    <!-- picture -->
    <h4 class="mt-3">Your picture</h4>
        <div class="bg-thematic drop-shadow" id="picture-key" style="width: 100px; height: 100px; background-color: #fff; display: inline-block; margin-right: 1rem; float: left;"></div>
        <div style="display: inline-block; width: 250px;">
            <p id="picture-msg">This is your current picture, click below to select a new one</p>
            <a class="btn btn-outline-primary poh" id="picture-btn">Change image</a>
            <input class="hidden" id="file" name="file" type="file">
            <input class="hidden" id="picture" name="picture" type="hidden">
        </div>
    <div id="loader" class=""><button type="submit" class="btn btn-primary btn-lg mt-5 btn-block disabled">Save settings</button></div>
</form>
</div>
</div>
</div>
<!-- End of /components/account/settings -->

