---
layout: class
title: Service
namespace: Freesewing\Services
tags: [class, service, abstract]
permalink: /class/services/service
---
## Description 

The [`Service`](service) class is an abstract class to be extended by services.

It defines two abstract public methods that must be implemented by all classes
extending it. They are:

- [`Service::getServiceName`](service#getservicename) 
- [`Service::run`](service#run) 

## Public methods

### getServiceName

```php?start_inline=1
string getServiceName() 
```
Returns the name of the service, which is a `string`.

### run

```php?start_inline=1
void run(
    \Freesewing\Context $context
) 
```
Run the service and do whatever it does, making changes in the [`Context`](../context) object.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}
