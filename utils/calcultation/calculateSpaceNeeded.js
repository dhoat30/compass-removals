export default function calculateSpaceNeeded(propertySize, furnishingLevel) {
  let baseVolume = 0;

  switch (propertySize) {
    case 'studio':
      baseVolume = 3;
      break;
    case '2br':
      baseVolume = 10;
      break;
    case '3br':
      baseVolume = 14;
      break;
    case '4br':
      baseVolume = 17;
      break;
    default:
      baseVolume = 21; // fallback for larger properties
  }

  const furnishingMultipliers = {
    lightlyFurnished: 1.8,
    moderatelyFurnished: 2.4,
    highlyFurnished:3.2,
  };

  const multiplier = furnishingMultipliers[furnishingLevel] || 1;
  const estimatedVolume = baseVolume * multiplier;

  // Round to nearest 0.5 cubic metre
  const roundedVolume = Math.ceil(estimatedVolume);

  return roundedVolume;
}