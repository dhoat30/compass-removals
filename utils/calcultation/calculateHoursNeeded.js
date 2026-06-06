export default function calculateHoursNeeded(propertySize, furnishingLevel) {
  let baseTime = 0;

  switch (propertySize) {
    case 'studio':
      baseTime = 1;
      break;
    case '2br':
      baseTime = 2.5;
      break;
    case '3br':
      baseTime = 3.2;
      break;
    case '4br':
      baseTime = 4;
      break;
    default:
      baseTime = 5.5; // fallback
  }

  const furnishingMultipliers = {
    lightlyFurnished:1.5,
    moderatelyFurnished: 2,
    highlyFurnished:2.5,
  };

  const multiplier = furnishingMultipliers[furnishingLevel] || 1;
  const estimatedTime = baseTime * multiplier;

  // Round to nearest 0.5 hour
  const roundedTime = Math.round(estimatedTime * 2) / 2;

  return roundedTime;
}