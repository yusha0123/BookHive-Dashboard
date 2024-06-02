import { NgxUiLoaderConfig } from 'ngx-ui-loader';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'blue',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'blue',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'circle',
  gap: 24,
  logoPosition: 'center-center',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgb(0 0 0 / 0.5)',
  pbColor: 'blue',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  maxTime: -1,
  minTime: 300,
};

export const API_URL = 'http://localhost:3000/api/admin';
