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
  userApiUrl: 'https://6f0kxii2n0.execute-api.us-east-2.amazonaws.com/dev',
  photoApiUrl: 'https://f2t6u6vu82.execute-api.us-east-2.amazonaws.com/dev',
  cropApiUrl: 'http://serverlessimageresize-imagebucket-asjv83zdnqub.s3-website.us-east-2.amazonaws.com/300x300/'
};
