/*
This helper.js module performs the following:
  - fetch requests for the application

Exports =
  AJAX - Performs download and upload fetch requests for application
*/

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// timeout function for fetch request
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// fetch request for downloads and uploads
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? // upload data
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : // download data
        fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
