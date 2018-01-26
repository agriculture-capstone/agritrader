/**
 * Based on https://material.io/color/#!/?view.left=0&view.right=0&primary.color=00838e&secondary.color=0277BD
 */
export const MATERIAL_COLORS = {
  logo: '#0fc6ce', 
  primary: {
    normal: '#00838e',
    light: '#4fb3be',
    dark: '#005661',
  },
  secondary: {
    normal: '#0277bd',
    light: '#58a5f0',
    dark: '#004c8c',
  },
};

export const COLORS = {
  white: '#fff',
  black: '#000',
  logo: '#0fc6ce',
  icons: '#515151',
  backgroundColor: '#eeeeee',
};

export function getHexValue(color: string, opacity: number) 
{
  const opacityPercent = opacity * 100;
  if (opacityPercent >= 0 && opacityPercent <= 100) {
    let opacityHex = opacityPercent.toString(16);
    if (opacityHex.length === 1) {
      opacityHex = '0' + opacityHex;
    }
    const hexStringWithOpacity = color + opacityHex;
    return hexStringWithOpacity;
  }
  return '';
}

export const TEXT_STYLES = {
  primary: {
    normal: {
      large: getHexValue('#ffffff', 0.7),
      normal:  getHexValue('#ffffff', 1),
    }, 
    light: {
      large: getHexValue('#000000', 0.48),
      normal:  getHexValue('#000000', 0.64),
    }, 
    dark: {
      large: getHexValue('#ffffff', 0.45),
      normal:  getHexValue('#ffffff', 0.65),
    },
  },
  secondary: {
    normal: {
      large: getHexValue('#ffffff', 0.67),
      normal:  getHexValue('#ffffff', 0.95),
    }, 
    light: {
      large: getHexValue('#000000', 0.49),
      normal:  getHexValue('#000000', 0.66),
    }, 
    dark: {
      large: getHexValue('#ffffff', 0.45),
      normal:  getHexValue('#ffffff', 0.64),
    },
  },
};
