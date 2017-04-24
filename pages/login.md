---
layout: cover
title: Login
action: login
permalink: /login
---

<div id="login">
<ul class="nav nav-tabs nav-justified" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#login-tab" role="tab" data-toggle="tab">Login</a></li>
    <li class="nav-item"><a class="nav-link" href="#signup-tab" role="tab" data-toggle="tab">Sign up</a></li>
</ul>

<div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="login-tab">
        <p>Login with your email address and password</p>
        <form>
          <div class="form-group field-container">
            <input type="email" class="field" id="email" placeholder="Email address" required>
            <label class="floating-label">Email address</label> 
          </div>
          <div class="form-group field-container">
            <input type="password" class="field" id="password" placeholder="Password" required>
            <label class="floating-label">Password</label> 
          </div>
          <button type="submit" class="btn btn-primary btn-block btn-lg mt-4">Login</button>
          <p class="mt-3"><a href="#">Forgot your password?</a></p>
        </form>
    </div>
    
    <div role="tabpanel" class="tab-pane" id="signup-tab">
        <p>To create an account, enter your email address, and pick a password</p>
        <form>
          <div class="form-group field-container">
            <input type="email" class="field" id="signup-email" placeholder="Email address (1)" required>
            <label class="floating-label">Email</label> 
          </div>
          <div class="form-group field-container">
            <input type="password" class="field" id="signup-password" placeholder="Password (2)" required>
            <label class="floating-label">Password</label> 
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block mt-4">Sign up</button>
        </form>
        <p id='also-this'>
            1) We'll never share your email with anyone else
            <br>
            2) We don't enforce a password policy
        </p>
    </div>

</div>
</div>
