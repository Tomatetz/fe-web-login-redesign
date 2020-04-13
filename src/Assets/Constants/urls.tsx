const hostname = window.location.hostname;
const domain = hostname.substr(hostname.indexOf(".") + 1);
export const urlList = {
  APP_URL: `https://account.${domain}/`,
};
