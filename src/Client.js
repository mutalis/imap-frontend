
function search(url) {
  let requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings = { method: 'GET',
               headers: requestHeaders,
              //  mode: 'cors',
               cache: 'default' };
  // return fetch(`/api/food?q=${query}`, {
  return fetch(url, requestSettings).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
