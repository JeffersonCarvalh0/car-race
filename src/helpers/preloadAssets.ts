import car from '../assets/car.png';
import background from '../assets/background.gif';
import pausedBackground from '../assets/background-paused.png';

const preloadAssets = () => {
  new Image().src = car;
  new Image().src = background;
  new Image().src = pausedBackground;
};

export default preloadAssets;
