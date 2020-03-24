import car from '../assets/car.png';
import background from '../assets/background.gif';
import pausedBackground from '../assets/background-paused.png';

const loadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

const preloadAssets = async () => {
  await loadImage(car);
  await loadImage(background);
  await loadImage(pausedBackground);
};

export default preloadAssets;
