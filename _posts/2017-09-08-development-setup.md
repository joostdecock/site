---
layout: blog
title: "Freesewing from scratch: Whether you're setting up a development environment, or want to run your own copy, this is what it takes."
linktitle: "Freesewing from scratch"
img: coffee.jpg
caption: "Grab a coffee and let's do this"
author: joostdecock
category: docs
blurb: "It's damn near impossible for people with a Hotmail/Outlook/MSN/Live email address to sign up for this website."
---
The other day I had to setup a new development server to work on freesewing. 

While it's not rocket science, I do feel it's a good idea to write a post 
documenting the steps it takes to get up and running with your own
freesewing instance. Freesewing from scratch as it were.

I'm writing this as a blog post -- and not a documentation page -- because I do not plan to maintain 
these instructions every time something changes. But, since this is a lengthy post, a table of
content is probably handy:

## Table of contents
{:.no_toc}

* TOC - Do not remove this line
{:toc #blogtoc}

## Why would you want to do this?

There are two main reasons to set up your own environment:

 - You are interested to start hacking/working on/developing freesewing
 - You want to run your own instance, perhaps because you want to run your own pattern business

Regardless the reasons, these instructions apply to both because we're actually going to setup 
a proper (virtual) server, and not some sort of environment on a laptop somewhere.

As a developer, you might find this overkill, but I like to have my development copy publically 
available so that I can sometimes point users to it and ask them to test out a feature on
the bleeding edge of the codebase.

## Get yourself a server

We're going to setup a real server, so you need to get your hands on one first.

I use [Linode](https://www.linode.com/) because I've been with them for years and I like
their servive, but there are plenty of other options for cloud hosting.

I've picked a 2GB (that's the memory we're talking about) Linode for this, but you can
get away with a 1GB one too. This will set you back $5 per month.
It's basically the price of two coffees per month.

With my server under my control, I've deployed one of Linode's images to it.
I went with Debian 9 because Debian is my favourite OS, and 9 is the latest version
that I can deploy with the click of a button.

Once it's setup, you can boot your Linode and it's ready to go.
Linode will ask for a root password during the setup. Make it long and impossible to guess. And write it down for now.

## Configure DNS

I'm assuming you have some sort of domain name under your control. If not, get one as 
they are dirt cheap.

I have decock.org, which I'll use for the server's primary hostname.
And for the different freesewing services, I'll use freesewing.org.

### Hostname and reverse DNS

I've named the server mei.decock.org (after that cutie in Overwatch) and so at my DNS provider
([EuroDNS](https://www.eurodns.com/) should you wonder) I've setup and A record that points to the
server's IP address: 139.162.166.219

Essentially, this:

```sh
mei	 IN A  139.162.166.219
```

Once this is done, I configured the reverse DNS in Linode management console so that it 
points to mei.decock.org.

### DNS for freesewing site, data, and core

Now we're going to configure DNS for:

 - Freesewing site: The frontend will live at joost.freesewing.org
 - Freesewing data: The data backend will live at joost.data.freesewing.org
 - Freesewing core: The core backend will live at joost.core.freesewing.org

These are all going to be hosted at mei.decock.org. Technically I could make this a CNAME
record for all, but I'm going to setup and A record for the site, and then point the rest 
to them with CNAME records.

Like this:

```
joost       IN A      139.162.166.219
joost.data  IN CNAME  joost
joost.core  IN CNAME  core
```

## Initial server configuration


### Connect with SSH

There's a few things to do on your new server. The first is to connect to it.

This should do the trick:

```sh
ssh joost.freesewing.org -l root
```

Login with your root password.

### Install updates

Before we do anything else, let's install the latest updates.

First get the list of latest software:

```sh
apt-get update
```

Then install all updates:

```sh
apt-get upgrade
```

### Create a user for yourself

You just logged in as root. The first thing we'll do (after installing updates)
is create a user so you won't ever have to log in as root again.

This does the trick:

```sh
adduser joost
``` 

> Obviously, the username is *joost* in this case, but you can pick whatever.
{:.comment}

We've added the regular user `joost`. You will be prompted for a password, make it hard to guess.

Since we won't be logging in as root, our privileges will be limited. 

That's good, but sometimes we will need root access. So, we'll give our user `sudo` rights.

On Debian, all it takes is to add your user to the `sudo` group like this:

```sh
usermod -G -a sudo joost
```

### Disable remote root access

Sweet, now log out of your SSH session (type `exit`) and we'll connect again, but
this time as your own user. In my case, that's `joost`.

```sh
ssh joost.freesewing.org -l joost
```

Once you're logged in, we're going to prevent remote logins by root.

To do so, open up the SSH server configuration file:

```sh
sudo vi /etc/ssh/sshd_config
```

Sudo will ask for your password, so enter it.

Look for this line:

```
PermitRootLogin yes
```

and change it to:

```
PermitRootLogin no
```

> I use vi as my editor, feel free to use something else like emacs or nano
{:.tip}

Cool. We've done the minimum to keep our system safe. Now let's get freesewing up and running.

## Setup git

Git is the version control system we'll be using. It's needed for all the parts, so let's get it
up and running first.

First install it:

```sh
sudo apt-get install git
```

Now, we're going to create an SSH key that we can add to our GitHub account, this way
we can pull and push code from/to GitHub without having to worry about authentication.

Create the SSH key as such:

```sh
ssh-keygen -t rsa -b 4096 -C "joost@decock.org"
```

Obviously, use your own email address.

You'll be asked where to save the file. You hit Enter to accept the default location.
You can add a passphrase if you want to.

Now, we'll add the key to `ssh-agent`. First make sure it's running:

```sh
eval $(ssh-agent -s)
```

Then add your key to it:

```sh
ssh-add ~/.ssh/id_rsa
```

When this is done, [add your SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account).

Last but not least, tell git who you are:

```sh
git config --global user.email "joost@decock.org"
git config --global user.name "Joost De Cock"
```

## Freesewing site

### Install software

For the website, we're going to need the following software:

 - Apache, the web server
 - Bundler, the ruby package manager

The following command installs them, along with some library we need:

```sh
sudo apt-get install apache2 bundler zlib1g-dev
```

This will place the `site` repository in the `site` directory. 

### Clone the site repository

Change to your home directory, and create a subfolder called `git`, then cd into it:

```sh
cd
mkdir git
cd git
```

In the `git` directory, we'll keep all our repositories.

Clone the site repo:

```sh
git clone git@github.com:freesewing/site.git
```

### Jekyll

cd into our new site repository, and let bundler handle the Jekyll install:

```sh
cd ~/git/site
bundler install
```

This will install jekyll and all dependecies.

Before we have Jekyll generate the site, you'll need to update the configuration
to reflect your own environment.

The best thing to do is create your own config file in the `_config` directory.

The one I use is `joost.yml`. You can copy that one, or simply make the changes in it.

Only the start of the file needs to be updated. This is what it looks like:

```yaml
url: 'https://joost.freesewing.org/'
github: 'https://github.com/freesewing'
twitter: 'freesewing_org'
instagram: 'freesewing_org'
gitter: 'https://gitter.im/freesewing/freesewing'
branch: 'develop'

future: true

api:
  core: 'https://joost.core.freesewing.org'
  data: 'https://joost.data.freesewing.org'
```

These are the things to change:

 - **url** : Set this to the url of your freesewing frontend
 - **api**
   - **core** : Set this to the url of your core backend
   - **data** : Set this to the url of your core backend

Once this is done, let jekyll generate the site:

```
bundle exec jekyll build --config _config/joost.yml --incremental --watch > /dev/null 2>&1 &
```

> Note that I'm pointing to my own config file here. If you used another one, update the 
> command accordingly.
{:.comment}

Jekyll now generated our site in the `_site` directory. Now we should have apache serve up our website.

### Apache

#### HTTP site

Get to the apache configuration directory where site configurations are held:

```
cd /etc/apache2/sites-available 
```

We're going to add a new site, so let's create an empty file:

```
sudo touch joost.freesewing.org.conf
```

Not to prevent we need to use `sudo` everytime we want to update this site config, 
let's make it our file:

```
sudo chown joost joost.freesewing.org
```

Now open the file with your editor of choice, and add the configuration.
Here's mine:

```
<VirtualHost *:80>
  ServerName joost.freesewing.org
  ServerAdmin joost@decock.org

  DocumentRoot /home/joost/git/site/_site

  <Directory />
    Options FollowSymLinks
    AllowOverride None
  </Directory>

  <Directory /home/joost/git/site/_site>
    Options FollowSymLinks MultiViews
    AllowOverride None
    Require all granted

    RewriteEngine On
  </Directory>

  LogLevel notice
  ErrorLog /home/joost/logs/joost.site.error.log
  CustomLog /home/joost/logs/joost.site.access.log combined

  RewriteEngine on
  RewriteCond %{SERVER_NAME} =joost.freesewing.org
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
</VirtualHost>

```

You can adapt it to your own needs, most of it is self-explanatory.

For now, comment out these three lines:

```sh
  #RewriteEngine on
  #RewriteCond %{SERVER_NAME} =joost.freesewing.org
  #RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
```

These will force users who visit the HTTP site to the HTTPS site. 
But since that one doesn't work yet, we don't need that for now.

Before we tell apache about this new site, we need to create the directory where
we configured the log files to go:

```sh
mkdir /home/joost/logs
```

Now tell apache about the new site, and reload the service:

```sh
sudo a2ensite joost.freesewing.org.conf
sudo service apache2 reload
```

If all is well, you can now point your browser to 
your equivalent of [joost.freesewing.org](http://joost.freesewing.org)
and you should see the site.

#### HTTPS site

It's 2017, you should encrypt your site. To do so, we're going to install 
a certificate from Let's Encrypt.

This is handled through certbot, so let's install that first:

```sh
sudo apt-get install certbot
```

When it's done, we can get a certificate. However, this apache version on Debian 9
can't be auto-confiured by certbot, so we'll do it manually.

We'll let certbot spin up a temporary webserver for this, but it can't bind to the port
apache is already listening on. So first, we stop apache:

```sh
sudo service apache stop
```

Then, we run certbot in certificate-only mode:

```sh
cerbot certonly
```

When prompted, pick the stand-along server option (2) and enter your domain name.
In my case, it's `joost.freesewing.org`.

When you're all done, get back to the apache site configuration directory.
As before, we'll create an empty file, and change its ownership:

```sh
cd /etc/apache2/sites-available 
sudo touch joost.freesewing.org-le.conf
sudo chown joost joost.freesewing.org
```

Now, let's configure. Here's what I've got:

```
<IfModule mod_ssl.c>
<VirtualHost *:443>
  ServerName joost.freesewing.org
  ServerAdmin joost@decock.org

  DocumentRoot /home/joost/git/site/_site

  <Directory />
    Options FollowSymLinks
    AllowOverride None
  </Directory>

  <Directory /home/joost/git/site/_site>
    Options FollowSymLinks MultiViews
    AllowOverride None
    Require all granted

    RewriteEngine on

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d

    RewriteRule ^drafts/(.*) show-draft [L]
    RewriteRule ^drafts list-drafts [L]

    RewriteRule ^draft/([a-z]+)/for/([a-z]+) /step/3/draft [L]
    RewriteRule ^draft/([a-z]+) /step/2/draft [L]
    RewriteRule ^draft /step/1/draft [L]

    RewriteRule ^fork/([a-z]+)/for/([a-z]+) /step/3/fork [L]
    RewriteRule ^fork/([a-z]+) /step/2/fork [L]

    RewriteRule ^redraft/([a-z]+)/for/([a-z]+) /step/3/redraft [L]

    RewriteRule ^models/(.*) show-model [L]
    RewriteRule ^models account [L]

    RewriteRule ^users/(.*) show-user [L]
    RewriteRule ^users list-users [L]
    RewriteRule ^profile(.*) show-user [L]
  </Directory>

  LogLevel notice
  ErrorLog /home/joost/logs/joost.site.error.log
  CustomLog /home/joost/logs/joost.site.access.log combined

  SSLCertificateFile /etc/letsencrypt/live/joost.freesewing.org/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/joost.freesewing.org/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
```

As before, it's pretty much self-explanatory. The things you might want to change
are the servername, locations of log files and certificates.

We need a bunch of rewrite rules, and we'll be running this site encrypted.
For that, we'll need to enable two modules in apache:

```sh
sudo a2enmod rewrite
sudo a2enmod ssl
```

Once this is done, add the site and reload the service:

```sh
sudo a2ensite joost.freesewing.org-le.conf
sudo service apache2 reload
```

Point your browser to your equivalent of [https://joost.freesewing.org](https://joost.freesewing.org)
and you should get the encrypted site.

Now that our encrypted site is up and running, uncomment the rewrite rules in our HTTP site 
that force people to the HTTPS site:

```sh
  RewriteEngine on
  RewriteCond %{SERVER_NAME} =joost.freesewing.org
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
```

That's it, you've setup the freesewing site. 
Althoug it will be severely crippled without the data backend.


## Freesewing data

With our site good to go, let's get the data backend up and running.

### Install software

We'll need some more software though:

 - PHP, the scripting language
 - MariaDb, the database server
 - composer, the PHP package manager
 - inkscape, to tile our generated patterns
 - imagick, to handle user avatars

Install them as such:

```sh
apt-get install php7.0 php7.0-xml php7.0-mbstring mariadb-server composer inkscape php-imagick
```

> We need PHP version 7, because that's what the data backend requires.
{:.comment}

### MariaDb
When it completes, proceed to secure your database server:

```sh
sudo mysql_secure_installation
```

This will prompt you for a database root password. Make it long and hard to guess.

### Freesewing tile

Freesewing data depends on freesewing tile. Change to the `git` folder in your home directory and clone the tile repo:

```sh
git clone git@github.com:freesewing/tile.git
```

cd into it, and make and install tile.

```sh
cd tile
make 
sudo make install 
```

That was easy :)

### Clone this site repository

Change to the `git` folder in your home directory and clone the data repo:

```sh
git clone git@github.com:freesewing/data.git
```

cd into it, and let composer install all dependencies.

```sh
cd data
composer install
composer dump-autoload -o
```

### Create the database

Time to create our database, and database user. Connect to the database server as such:

```sh
sudo mysql -u root
```

You don't need to enter a password, because the database server uses the `unix_socket`
authentication plugin that matches the local username to the database user.

Since you logged in as root (you used sudo) you are not the root database user.

First, let's create our database:

```
CREATE DATABASE freesewing_data;
```

Just as we don't login with root on our server, we won't login as root on our database server.
So let's add a user, and grant them privileges:

```
CREATE USER 'freesewing'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';GRANT USAGE ON *.* TO 'freesewing'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `freesewing\_%`.* TO 'freesewing'@'localhost';
```

When it's done, flush the privileges and disconnect:

```
FLUSH PRIVILEGES;
quit;
```

With our database in place, it's time to populate it with all tables.

Assuming you're still in the data repository directory, run this command:

```sh
mysql -u root freesewing_data < DATABASE_STRUCTURE.sql
```

### Create the users directory

Our users' profile pictures and pattern drafts will be stored on disk.
We need to add this directory to the repository (since it's ignored by git)
and give the webserver rights to it:

```sh
mkdir public/static/users
sudo chown www-data public/static/users
```

### Apache

#### HTTP site

Get to the apache configuration directory where site configurations are held:

```
cd /etc/apache2/sites-available 
```

We're going to add a new site, so let's create an empty file:

```
sudo touch joost.data.freesewing.org.conf
```

Not to prevent we need to use `sudo` everytime we want to update this site config, 
let's make it our file:

```
sudo chown joost joost.data.freesewing.org
```

Now open the file with your editor of choice, and add the configuration.
Here's mine:

```
<VirtualHost *:80>
  ServerName joost.data.freesewing.org
  ServerAdmin joost@decock.org

  DocumentRoot /home/joost/git/data/public

  <Directory />
    Options FollowSymLinks
    AllowOverride None
  </Directory>

  <Directory /home/joost/git/data/public>
    Options FollowSymLinks MultiViews
    AllowOverride None
    Require all granted
    RewriteEngine on
    RewriteCond %{SERVER_NAME} =joost.data.freesewing.org
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
  </Directory>
</VirtualHost>

```

You can adapt it to your own needs, most of it is self-explanatory.

For now, comment out these three lines:

```sh
  #RewriteEngine on
  #RewriteCond %{SERVER_NAME} =joost.data.freesewing.org
  #RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
```

These will force users who visit the HTTP site to the HTTPS site. 
But since that one doesn't work yet, we don't need that for now.

Now tell apache about the new site, and reload the service:

```sh
sudo a2ensite joost.data.freesewing.org.conf
sudo service apache2 reload
```

If all is well, you can now point your browser to 
your equivalent of [joost.data.freesewing.org](http://joost.data.freesewing.org)
and you should see a error message from SLIM.

#### HTTPS site

You should encrypt your backend. To do so, we're going to install 
a certificate from Let's Encrypt.

Like with our site, 
we'll let certbot spin up a temporary webserver for this, but it can't bind to the port
apache is already listening on. So first, we stop apache:

```sh
sudo service apache stop
```

Then, we run certbot in certificate-only mode:

```sh
cerbot certonly
```

When prompted, pick the stand-along server option (2) and enter your domain name.
In my case, it's `joost.data.freesewing.org`.

When you're all done, get back to the apache site configuration directory.
As before, we'll create an empty file, and change its ownership:

```sh
cd /etc/apache2/sites-available 
sudo touch joost.data.freesewing.org-le.conf
sudo chown joost joost.data.freesewing.org
```

Now, let's configure. Here's what I've got:

```
<IfModule mod_ssl.c>
<VirtualHost *:443>
  ServerName joost.data.freesewing.org
  ServerAdmin joost@decock.org

  SSLCertificateFile /etc/letsencrypt/live/joost.data.freesewing.org/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/joost.data.freesewing.org/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf

  DocumentRoot /home/joost/git/data/public

  <Directory />
    Options FollowSymLinks
    AllowOverride None
  </Directory>

  <Directory /home/joost/git/data/public>
    Options FollowSymLinks MultiViews
    AllowOverride None
    Require all granted

    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.php [QSA,L]
  </Directory>

  SetEnv DB_HOST "localhost"
  SetEnv DB_DB "freesewing_data"
  SetEnv DB_USER "freesewing"
  SetEnv DB_PASS "FREESEWING_DB_USER_PASSWORD_HERE"
  SetEnv JWT_SECRET "YOUR_JWT_SECRET_HERE"
  SetEnv MAILGUN_KEY "YOUR_MAILGUN_API_KEY_HERE"
  SetEnv MAILGUN_INSTANCE "MAILGUN_INSTANCE_HERE"
  SetEnv GMAIL_USER "GMAIL_EMAIL_ADDRESS_HERE"
  SetEnv GMAIL_SECRET "GMAIL_APP_PASSWORD_HERE"
  SetEnv DATA_API "https://joost.data.freesewing.org"
  SetEnv CORE_API "https://joost.core.freesewing.org"
  SetEnv SITE "https://joost.freesewing.org"
  SetEnv ORIGIN "https://joost.freesewing.org"
  SetEnv LOG_FILE "/home/joost/logs/joost.data.app.log"

  LogLevel warn
  ErrorLog /home/joost/logs/joost.data.error.log
  CustomLog /home/joost/logs/joost.data.access.log combined

</VirtualHost>
</IfModule>
```

As before, it's pretty much self-explanatory. The things you might want to change
are the servername, locations of log files and certificates.

What's new is a bunch of environment variables that you'll need to adapt.
This is because things like passwords shoulnd't be kept in the source code.
Instead, we define them here, and use the environment variables.

This are the things to adapt:

 - DB_HOST: Your database host, `localhost` in our case
 - DB_DB: Your database, `freesewing_data` in our case
 - DB_USER: Your database user, `freesewing` in our case
 - DB_PASS: Your database user password
 - JWT_SECRET: A random string to be used as secret for our JWT middleware
 - MAILGUN_KEY: Freesewing data uses [MailGun](https://www.mailgun.com/) for email delivery. This is the API key.
 - MAILGUN_INSTANCE: The mailgun instance
 - GMAIL_USER: Freesewing data also uses Gmail for email delivery (see [this blog post](/blog/email-spam-problems/) to understand why). This is the email address of the Google account you'll use
 - GMAIL_SECRET: The password of the Google account, or more probably [an app password](https://support.google.com/accounts/answer/185833?hl=en) (you are using two-factor authentication on your account, right?)
 - DATA_API: The url to your data API
 - CORE_API: The url to your core API
 - SITE: The url of your frontend
 - ORIGIN: The url of your frontend
 - LOG_FILE: Location of the SLIM log file

Once this is done, add the site and reload the service:

```sh
sudo a2ensite joost.data.freesewing.org-le.conf
sudo service apache2 reload
```

Before you continue, you need to create the log file for SLIM and change its permissions:

```sh
touch /home/joost/logs/joost.data.app.log
sudo chown www-data /home/joost/logs/joost.data.app.log
```

Now if you point your browser to your equivalent of [https://joost.data.freesewing.org](https://joost.data.freesewing.org)
you should get a pretty error message.

Now that our encrypted site is up and running, uncomment the rewrite rules in our HTTP site 
that force people to the HTTPS site:

```sh
  RewriteEngine on
  RewriteCond %{SERVER_NAME} =joost.data.freesewing.org
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
```

That's it, you've setup the freesewing data backend.
 
All that's left to do now is setup freesewing core.

## Freesewing core

### Clone the repository

Let's get core. Change to the `git` folder in your home directory and clone the core repo:

```sh
git clone git@github.com:freesewing/core.git
```

cd into it, and make and let composer install all dependencies.

```sh
cd core
composer install 
composer dump-autoload -o 
```

And that's it! You now how a full freesewing instance.

Happy hacking :)
