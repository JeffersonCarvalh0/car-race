import car from '../assets/car.png';
import obstacle from '../assets/obstacle.png';
import background from '../assets/background.gif';
import pausedBackground from '../assets/background-paused.png';

const loadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

const preloadAssets = async (onFinishLoad: Function) => {
  await Promise.all([
    loadImage(car),
    loadImage(obstacle),
    loadImage(background),
    loadImage(pausedBackground),
  ]);
  onFinishLoad();
};

export default preloadAssets;
