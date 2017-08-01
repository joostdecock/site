---
permalink: /snippets/login/form
---
<!-- Start of /snippets/login/form -->
<ul class="nav nav-tabs nav-justified" role="tablist">
    <li class="nav-item"><a id="login-tab-link" class="nav-link active" href="#login-tab" role="tab" data-toggle="tab">Log in</a></li>
    <li class="nav-item"><a id="signup-tab-link" class="nav-link" href="#signup-tab" role="tab" data-toggle="tab">Sign up</a></li>
</ul>
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="login-tab">
        <div class="panel-holder">
            <div class="panel" id="login-panel">
                <p id="login-msg">Log in with your email address and password</p>
                <form id="login-form">
                  <div class="form-group field-container">
                    <input type="email" name="login-email" class="field" id="email" placeholder="Email address" required>
                    <label class="floating-label">Email address</label> 
                  </div>
                  <div class="form-group field-container">
                    <input type="password" name="login-password" class="field" id="password" placeholder="Password" required>
                    <label class="floating-label">Password</label> 
                  </div>
                  <button type="submit" class="btn btn-primary btn-block btn-lg mt-4">Log in</button>
                  <p class="mt-3"><a href="#login-panel" id="show-recover-link" class="poh toggle-password-recover">Forgot your password?</a></p>
                </form>
            </div>
            <div class="panel" id="recover-panel">
                <p>Enter your email address and we'll send you a link to create a new password</p>
                <form id="recover-form">
                  <div class="form-group field-container">
                    <input type="email" name="recover-email" class="field" id="recover-email" placeholder="Email address" required>
                    <label class="floating-label">Email</label> 
                  </div>
                  <button type="submit" class="btn btn-primary btn-lg btn-block mt-4">Request a new password</button>
                  <p class="mt-3"><a href="#" class="toggle-password-recover">Back to log in</a></p>
                </form>
            </div>
        </div>
    </div>
    <div role="tabpanel" class="tab-pane" id="signup-tab">
        <div class="panel-holder">
            <div class="panel" id="signup-panel">
                <p>To create an account, enter your email address, and pick a password</p>
                <form id="signup-form">
                  <div class="form-group field-container">
                    <input type="email" class="field" id="signup-email" name="signup-email" placeholder="Email address (1)" required>
                    <label class="floating-label">Email</label> 
                  </div>
                  <div class="form-group field-container">
                    <input type="password" class="field" id="signup-password" name="signup-password" placeholder="Password (2)" required>
                    <label class="floating-label">Password</label> 
                  </div>
                  <button id="signup-submit" type="submit" class="btn btn-primary btn-block btn-lg mt-4">Sign up</button>
                </form>
                <p id='also-this'>
                    1) We'll never share your email with anyone else
                    <br>
                    2) We don't enforce a password policy
                </p>
                <p class="mt-3"><a href="#signup-panel" class="toggle-resend">Re-send activation email</a></p>
            </div>
            <div class="panel" id="resend-panel">
                <p><b>Re-send activation email</b><br>If you signed up but can't find (or didn't get) your activation email, we can send it again.</p><p>Just enter your email address below</p>
                <form id="resend-form">
                  <div class="form-group field-container">
                    <input type="email" class="field" id="resend-email" name="resend-email" placeholder="Email address" required>
                    <label class="floating-label">Email</label> 
                  </div>
                  <button id="signup-submit" type="submit" class="btn btn-primary btn-block btn-lg mt-4">Resend actication email</button>
                </form>
                <p class="mt-3"><a href="#resend-panel" class="toggle-resend">Back to sign up</a></p>
            </div>
        </div>
    </div>
</div>
<!-- End of /snippets/login/form -->
