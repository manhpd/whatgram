// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD2u-Pt5-hsd-u_KZrsAN_xgaGPtzH4L_s",
    authDomain: "newproject-5f2ad.firebaseapp.com",
    databaseURL: "https://newproject-5f2ad.firebaseio.com",
    projectId: "newproject-5f2ad",
    storageBucket: "newproject-5f2ad.appspot.com",
    messagingSenderId: "476763161737"
  },
  userApiUrl: 'user_api',
  photoApiUrl: 'photo_api',
  cropApiUrl: 'crop_photo_api',
  searchApiUrl: 'search_api',
  followApiUrl: 'follow_api',
  followApiUrl2: 'follow_api_2',
  photoApiUrl2: 'Photo_api_2'
};
