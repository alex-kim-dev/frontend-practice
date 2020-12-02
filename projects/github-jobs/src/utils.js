export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const hexToRgba = (hex, alpha) => {
  const hexValue = hex.replace('#', '');

  const channelValues = (hexValue.length === 3
    ? hexValue.split('').map((char) => char.repeat(2))
    : hexValue.match(/[0-9a-f]{2}/gi)
  ).map((value) => parseInt(value, 16));

  const values = channelValues.concat(alpha).join(', ');

  return `rgba(${values})`;
};
