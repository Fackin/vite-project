// https://stackoverflow.com/questions/1664140/js-function-to-calculate-complementary-colour/37657940#37657940

// http://design.geckotribe.com/colorwheel/ 和工具最相近的是方法一

// ------------------方法一----------------------
// Complement
// const temprgb = { r: 0, g: 0xff, b: 0xff }; // Cyan

export const compColor = (temprgb: Rbg = { r: 0, g: 0xff, b: 0xff }) => {
  let temphsv = RGB2HSV(temprgb);
  temphsv.hue = HueShift(temphsv.hue, 180.0);
  temprgb = HSV2RGB(temphsv);
  console.log(temprgb); // Complement is red (0xff, 0, 0)
  return temprgb;
}

interface Rbg {
  r: any,
  g: any,
  b: any
}
interface Hsv {
  saturation: number,
  hue: number,
  value: number
}

function RGB2HSV(rgb: Rbg = { r: 0, g: 0xff, b: 0xff }) {
  let hsv: Hsv = {
    saturation: 0,
    hue: 0,
    value: 0
  };
  let max: number = max3(rgb.r, rgb.g, rgb.b);
  let dif: number = max - min3(rgb.r, rgb.g, rgb.b);
  hsv.saturation = (max == 0.0) ? 0 : (100 * dif / max);
  if (hsv.saturation == 0) hsv.hue = 0;
  else if (rgb.r == max) hsv.hue = 60.0 * (rgb.g - rgb.b) / dif;
  else if (rgb.g == max) hsv.hue = 120.0 + 60.0 * (rgb.b - rgb.r) / dif;
  else if (rgb.b == max) hsv.hue = 240.0 + 60.0 * (rgb.r - rgb.g) / dif;
  else hsv.hue = 0;
  if (hsv.hue < 0.0) hsv.hue += 360.0;
  hsv.value = Math.round(max * 100 / 255);
  hsv.hue = Math.round(hsv.hue);
  hsv.saturation = Math.round(hsv.saturation);
  return hsv;
}

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv: Hsv = {
  saturation: 0,
  hue: 0,
  value: 0
}) {
  let rgb: Rbg = { r: 0, g: 0xff, b: 0xff };
  if (hsv.saturation == 0) {
    rgb.r = rgb.g = rgb.b = Math.round((hsv.value || 0) * 2.55);
  } else {
    hsv.hue /= 60;
    hsv.saturation /= 100;
    hsv.value /= 100;
    let i = Math.floor(hsv.hue);
    let f = hsv.hue - i;
    let p = hsv.value * (1 - hsv.saturation);
    let q = hsv.value * (1 - hsv.saturation * f);
    let t = hsv.value * (1 - hsv.saturation * (1 - f));
    switch (i) {
      case 0: rgb.r = hsv.value; rgb.g = t; rgb.b = p; break;
      case 1: rgb.r = q; rgb.g = hsv.value; rgb.b = p; break;
      case 2: rgb.r = p; rgb.g = hsv.value; rgb.b = t; break;
      case 3: rgb.r = p; rgb.g = q; rgb.b = hsv.value; break;
      case 4: rgb.r = t; rgb.g = p; rgb.b = hsv.value; break;
      default: rgb.r = hsv.value; rgb.g = p; rgb.b = q;
    }
    rgb.r = Math.round(rgb.r * 255);
    rgb.g = Math.round(rgb.g * 255);
    rgb.b = Math.round(rgb.b * 255);
  }
  return rgb;
}

//Adding HueShift via Jacob (see comments)
function HueShift(h: any, s: any) {
  h += s; while (h >= 360.0) h -= 360.0; while (h < 0.0) h += 360.0; return h;
}

//min max via Hairgami_Master (see comments)
function min3(a: any, b: any, c: any) {
  return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
}
function max3(a: any, b: any, c: any) {
  return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
}


// ------------------方法二------------------------------- //


/* hexToComplimentary : Converts hex value to HSL, shifts
 * hue by 180 degrees and then converts hex, giving complimentary color
 * as a hex value
 * @param  [String] hex : hex value  
 * @return [String] : complimentary color as hex value
 */
export function hexToComplimentary(hex: any) {

  // Convert hex to rgb
  // Credit to Denis http://stackoverflow.com/a/36253499/4939630
  var rgb: any = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l: any) { return parseInt(hex.length % 2 ? l + l : l, 16); }).join(',') + ')';

  // Get array of RGB values
  rgb = rgb.replace(/[^\d,]/g, '').split(',');

  var r = rgb[0], g = rgb[1], b = rgb[2];

  // Convert RGB to HSL
  // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
  r /= 255.0;
  g /= 255.0;
  b /= 255.0;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0, s, l = (max + min) / 2.0;

  if (max == min) {
    h = s = 0;  //achromatic
  } else {
    var d = max - min;
    s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

    if (max == r && g >= b) {
      h = 1.0472 * (g - b) / d;
    } else if (max == r && g < b) {
      h = 1.0472 * (g - b) / d + 6.2832;
    } else if (max == g) {
      h = 1.0472 * (b - r) / d + 2.0944;
    } else if (max == b) {
      h = 1.0472 * (r - g) / d + 4.1888;
    }
  }

  h = h / 6.2832 * 360.0 + 0;

  // Shift hue to opposite side of wheel and convert to [0-1] value
  h += 180;
  if (h > 360) { h -= 360; }
  h /= 360;

  // Convert h s and l values into r g and b values
  // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p: any, q: any, t: any) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  // Convert r b and g values to hex
  rgb = b | (g << 8) | (r << 16);
  return "#" + (0x1000000 | rgb).toString(16).substring(1);
}

// ---------------方法三-----------------------  ///

export function complementryHexColor(hex: any) {
  let r = hex.length == 4 ? parseInt(hex[1] + hex[1], 16) : parseInt(hex.slice(1, 3), 16);
  let g = hex.length == 4 ? parseInt(hex[2] + hex[2], 16) : parseInt(hex.slice(3, 5), 16);
  let b = hex.length == 4 ? parseInt(hex[3] + hex[3], 16) : parseInt(hex.slice(5), 16);

  [r, g, b] = complementryRGBColor(r, g, b);
  return '#' + (r < 16 ? '0' + r.toString(16) : r.toString(16)) + (g < 16 ? '0' + g.toString(16) : g.toString(16)) + (b < 16 ? '0' + b.toString(16) : b.toString(16));
}

function complementryRGBColor(r: any, g: any, b: any) {
  if (Math.max(r, g, b) == Math.min(r, g, b)) {
    return [255 - r, 255 - g, 255 - b];

  } else {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s, l = (max + min) / 2;
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h = Math.round((h * 60) + 180) % 360;
    h /= 360;

    function hue2rgb(p: any, q: any, t: any) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
}