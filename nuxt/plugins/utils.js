export default class Units {

  normalize(object) {
    return JSON.parse(JSON.stringify(object))
  }

  asMm(value, units) {
    if(units === 'imperial') {
      return value*25.4
    } else {
      return value*10
    }
  }

  format(value, units, type) {
    if(type === 'measure') {
      if(units === 'imperial') {
        return this.inchesAsFraction(value)
      } else {
        return Math.round(value*10)/10+'cm'
      }
    } else if (type === 'angle') {
      return Math.round(value*10)/10+'°'
    } else if (type === 'percent') {
      return Math.round(value*10)/10+'%'
    } else {
      return value
    }
  }

  round(value) {
    return Math.round(value*100)/100;
  }

  fractionToDecimal(fraction) {
    let parts = fraction.split('/')
    return parts[0]/parts[1]
  }

  sliderRound(value, units) {
    if(units === 'imperial') {
      return this.roundToFraction(value/25.4)
    } else {
      return this.round(value/10)
    }
  }
  roundToFraction(value) {
    if(value == 0) return 0;
    let negative = false
    let inches = 0
    let rest = 0
    let fraction8 = 0
    if(value < 0) {
      value = Math.abs(value);
      negative = true;
    }
    if(value < 1) {
      rest = value;
    } else {
      inches = Math.floor(value);
      rest = value - inches;
    }
    fraction8 = Math.round(rest*8)/8;

    if(negative) {
      if(parseInt(inches) == 1) return -1-fraction8;
      else return -1 * parseInt(inches)-fraction8;
    }
    else return parseInt(inches)+fraction8;
  }

  inchesAsFraction(value) {
    if(value == 0) return 0;
    let negative = ''
    let inches = ''
    let rest = ''
    if(value < 0) {
      value = value * -1;
      negative = '-';
    }
    if(Math.abs(value) < 1) {
      inches = '';
      rest = value;
    } else {
      inches = Math.floor(value);
      rest = value - inches;
    }
    let fraction64 = Math.round(rest*64);
    if(fraction64 == 0) return negative+inches+'"'
    if(fraction64 % 32 ==0) return ' '+negative+inches+' <sup>'+fraction64/32+'</sup>/<sub>2</sub>"'
    if(fraction64 % 16 ==0) return ' '+negative+inches+' <sup>'+fraction64/16+'</sup>/<sub>4</sub>"'
    if(fraction64 % 8 == 0) return ' '+negative+inches+' <sup>'+fraction64/8+'</sup>/<sub>8</sub>"'
    if(fraction64 % 4 == 0) return ' '+negative+inches+' <sup>'+fraction64/4+'</sup>/<sub>16</sub>"'
    if(fraction64 % 2 == 0) return ' '+negative+inches+' <sup>'+fraction64/2+'</sup>/<sub>32</sub>"'
    else return negative+value+'"'
  }
}
