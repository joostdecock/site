---
layout: class
title: Model
namespace: Freesewing
tags: [class]
permalink: /class/Model
---
## Description 

The [`Model`](Model) holds data for a model. More precisely, the model's measurements.

## Typical use

The [`Model`](Model) object is most commonly used in the patterns to retrieve
model measurements.

Given that this is so comment, there's an alias for it: [`Model::m`](Model#m).

## Public methods

### setMeasurement

```php?start_inline=1
void setMeasurement( 
    string $name,
    float $value 
)
```
This stores a measurement name-value pair. 

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Model $model */
$model->setMeasurement('chestCircumference', 1080);
```

#### Typical use
{:.no_toc}

This is not used, we use [`Model::addMeasurements`](Model#addmeasurements) instead.

#### Parameters
{:.no_toc}

This expects a string to indicate the name of the measurerent, and a float with its value.

### addMeasurements

```php?start_inline=1
void addMeasurements( 
    array $measurements
)
```
This stores name-value pairs of measurements passed to it in an array.

It's like a bulk version of [`Model::setMeasurement`](Model#setmeasurement).

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Model $model */
$model->addMeasurements([
    'acrossBack' => 450,
    'bicepsCircumference' => 335,
    'centerBackNeckToWaist' => 480,
    'chestCircumference' => 1080,
    'naturalWaistToHip' => 120,
    'neckCircumference' => 420,
    'shoulderLength' => 150,
    'shoulderSlope' => 55,
    'hipsCircumference' => 950,
    'sleeveLengthToWrist' => 700,
    'wristCircumference' => 190,
]);
```

#### Typical use
{:.no_toc}

Used by the [`Services\DraftService`](Services/DraftService), 
[`Services\SampleService`](Services/SampleService) and 
[`Services\CompareService`](Services/CompareService) to add the 
measurements provided in the request (or defaults loaded from the 
config) to the [`Model`](Model) object.

#### Parameters
{:.no_toc}

An array of measurements.

### getMeasurement

```php?start_inline=1
float getMeasurement(
    string $name
)
```
Returns the value of measurement `$name`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="getMeasurement" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="getMeasurement-result">

1080

</div>
<div role="tabpanel" class="tab-pane" id="getMeasurement-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Model $model */
$model->getMeasurement('chestCircumference');
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to retrieve a measurement for a [`Model`](Model)
altough it's typically called through its [`Model::m`](Model#m) alias.

#### Parameters
{:.no_toc}

The name of the measurement.

#### Return value
{:.no_toc}

The value of the measurement, typically a float.

### m

```php?start_inline=1
float m(
    string $name
)
```

An alias of [`Model::getMeasurement`](Model#getmeasurement).

#### Example
{:.no_toc}

{% include classTabs.html
    id="m" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="m-result">

1080

</div>
<div role="tabpanel" class="tab-pane" id="m-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Model $model */
$model->m('chestCircumference');
```

</div>
</div>

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

