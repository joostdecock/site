---
layout: page
title: Data API endpoints
tags: [developer docs, data]
permalink: /docs/data/routes
---
## Anonymous endpoints

These endpoints are available without authentication:

### Status

`GET /status`

Returns info on the host running the backend, and database.

### API info

> ##### This is only used at build time
> These endpoint are only called by `script/prefetch.sh` at build time.
{:.comment}

#### YAML

`GET /info/yaml/` {% include icon.html icon='arrow-right' %} `InfoController::asYaml`

Gets a bundle of info as a YAML file that is used for pre-rendering content in Jekyll.

#### JSON

`GET /info/json/` {% include icon.html icon='arrow-right' %} `InfoController::asJson`

Gets a bundle of info as a JSON file that is used for in frontend JavaScript code.

### Preflight requests

All prefight requests are responded to with the following headers:

 - `Access-Control-Allow-Origin` with the value as defined in the config file
 - `Access-Control-Allow-Headers` with value `X-Requested-With, Content-Type, Accept, Origin, Authorization`
 - `Access-Control-Allow-Methods` with value `GET, POST, PUT, DELETE, OPTIONS`

> ##### This is defined in the routes file
>
> Preflight requests are not routed to a controller but handled in the route file itself, located at `src/routes.php`.
{:.warning}

> ##### About preflight requests
>
> A preflight request is a special type of request that checks to see if the CORS protocol is understood.
>
> [Read about preflight requests on MDN](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)
{:.link}

### User

#### Signup user

`POST /signup` {% include icon.html icon='arrow-right' %} `UserController:signup`

###### Parameters

 - `email`
 - `password`

#### Resend activation email

`POST /resend` {% include icon.html icon='arrow-right' %} `UserController:resend`

###### Parameters

 - `email`

#### Activate account

`GET /activate/[handle]/[token]` {% include icon.html icon='arrow-right' %} `UserController:activate`

###### Parameters

 - `handle` {% include icon.html icon='arrow-right' %} The user handle
 - `token` {% include icon.html icon='arrow-right' %} The token in the activation email

#### Confirm email change

`GET /confirm/[handle]/[token]` {% include icon.html icon='arrow-right' %} `UserController::confirm`

###### Parameters

 - `handle` {% include icon.html icon='arrow-right' %} The user handle
 - `token` {% include icon.html icon='arrow-right' %} The token in the activation email

> ##### This is for email confirmation after activation
> 
> Just as a user needs to confirm their email address when signing up (account actication)
> we expect the same when an activated user changes their email address.
{:.comment}

#### Password recovery

`POST /recover` {% include icon.html icon='arrow-right' %} `UserController::recover`

###### Parameters

 - `email`

#### Password change

`POST /reset` {% include icon.html icon='arrow-right' %} `UserController::reset`

###### Parameters

 - `password` {% include icon.html icon='arrow-right' %} The new password
 - `handle` {% include icon.html icon='arrow-right' %} The user handle
 - `token` {% include icon.html icon='arrow-right' %} The token in the password recovery email

### Draft

#### Download draft

`GET /download/[handle]/[format]` {% include icon.html icon='arrow-right' %} `DraftController::download`

###### Parameters
 
- `handle` {% include icon.html icon='arrow-right' %} The draft handle
- `format` {% include icon.html icon='arrow-right' %} The format to download

> ##### Downloads are anonymous
>
> Draft downloads are anonymous because the aren't handled over AJAX.
>
> This means that if you know the draft handle, you can download a draft regardless of whether
> it is shared or not. 
{:.warning}

#### Load shared draft

`GET /shared/draft/[handle]` {% include icon.html icon='arrow-right' %} `DraftController::loadShared`

###### Parameters

- `handle` {% include icon.html icon='arrow-right' %} The draft handle

### Logging

#### Referral logging

`POST /referral` {% include icon.html icon='arrow-right' %} `ReferralController::log`

###### Parameters

 - `host` {% include icon.html icon='arrow-right' %} The hostname of the referring site
 - `path` {% include icon.html icon='arrow-right' %} The path of the referring page
 - `url` {% include icon.html icon='arrow-right' %} The full url of the referral

## Authenticated endpoints

### User 

#### Authentication status

`GET /auth`

> ##### Authentication is handled by middleware
>
> This simply returns ok, because we only get this far if the user has been authenticated by
> the JWT middleware.
{:.comment}

##### Parameters

 - Send the JWT in the `Authorization` header


#### Login

`POST /login` {% include icon.html icon='arrow-right' %} `UserController::login`

##### Parameters

 - `email`
 - `password`

#### Load account data

`GET /account` {% include icon.html icon='arrow-right' %} `UserController::load`

#### Update account

`PUT /account` {% include icon.html icon='arrow-right' %} `UserController::update`

Will update account settings, based on paramters passed to it. Supported parameters are:

- `email`
- `username`
- `picture`
- `units`
- `theme`

#### Delete account

`DELETE /account` {% include icon.html icon='arrow-right' %} `UserController::remove`

### Model

#### Load model data

`GET /model/[handle]` {% include icon.html icon='arrow-right' %} `ModelController::load`

##### Parameters
- `handle` {% include icon.html icon='arrow-right' %} The handle of the model

#### Update model

`PUT /model/[handle]` {% include icon.html icon='arrow-right' %} `ModelController::update`

Will update the model based on paramters passed to it. Supported parameters are:

- `name`
- `picture`
- `notes`
- `units` {% include icon.html icon='arrow-right' %} Metric or imperial
- `body` {% include icon.html icon='arrow-right' %} This is the 'breasts or no breasts' option, but encoded as `male` or `female` in the database.
- `shared`
- `data` {% include icon.html icon='arrow-right' %} This holds the measurements as JSON


#### Create model

`POST /model` {% include icon.html icon='arrow-right' %} `ModelController::create`

##### Parameters
- `name`
- `body` {% include icon.html icon='arrow-right' %} This is the 'breasts or no breasts' option

#### Remove model

`DELETE /model/[handle] `ModelController::remove`

### Draft

#### Create draft

`POST /draft` {% include icon.html icon='arrow-right' %} `DraftController::create`

##### Parameters

- `model` {% include icon.html icon='arrow-right' %} The handle of the model to draft for
- The entire draft form

#### Recreate draft

`POST /redraft` {% include icon.html icon='arrow-right' %} `DraftController::recreate`

##### Parameters

- `model` {% include icon.html icon='arrow-right' %} The handle of the model to draft for
- `draft` {% include icon.html icon='arrow-right' %} The handle of the draft to recreate
- The entire draft form

#### Load draft data
`GET /draft/[handle]` {% include icon.html icon='arrow-right' %} `DraftController::load`

##### Parameters

- `handle` {% include icon.html icon='arrow-right' %} The handle of the draft to load

#### Update draft
`PUT /draft/[handle]` {% include icon.html icon='arrow-right' %} `DraftController::update`

Will update the draft based on paramters passed to it. Supported parameters are:

- `name`
- `notes`
- `shared`

#### Remove draft

`DELETE /draft/[handle]` {% include icon.html icon='arrow-right' %} `DraftController::remove`

##### Parameters

- `handle` {% include icon.html icon='arrow-right' %} The handle of the draft to remove

### Comment

#### Create comment

`POST /comment` {% include icon.html icon='arrow-right' %} `CommentController::create`

##### Parameters

- `comment` {% include icon.html icon='arrow-right' %} The content of the comment
- `page` {% include icon.html icon='arrow-right' %} The (path of the) page this comment was made on
- `parent` {% include icon.html icon='arrow-right' %} The optional ID of the comment this is a reply to

#### Load comments

`GET /comments/page/[page]` {% include icon.html icon='arrow-right' %} `CommentController::pageComments`

##### Parameters

- `page` {% include icon.html icon='arrow-right' %} The (path of the) page for which to load the comments

#### Remove comment
`DELETE /comment/[id]` {% include icon.html icon='arrow-right' %} `CommentController::remove`

##### Parameters

- `id` {% include icon.html icon='arrow-right' %} The ID of the comment to remove

> ##### You can't orphan a comment
>
> A comment that has children won't be removed as that will break comments.
> Instead, its contents will be replaced with a message indicating the comment was removed.
{:.comment}

## Catch-all endpoint

`GET /[whatever]` 

Displays an error message


* TOC - Do not remove this line
{:toc}

