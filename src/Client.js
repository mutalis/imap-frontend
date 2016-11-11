
function getEntries(url) {
  let requestHeaders = new Headers();

  requestHeaders.append('Accept', 'application/json');
  requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings = { method: 'GET',
               headers: requestHeaders,
              //  mode: 'cors',
               cache: 'default' };
  // return fetch(`/api/food?q=${query}`, {
  return fetch(url, requestSettings).then(checkStatus)
    .then(parseJSON);
}

function addEntry(url, bodyData) {

  let payload = JSON.stringify(bodyData);
  let requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json; charset=utf-8');
  requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings = { method: 'POST',
               headers: requestHeaders,
               body: payload,
              //  body: '{ "username": "aaaab", "quota": 200, "password": "12345678", "domain_id": "0af0f599-307b-4b28-9d7b-6ca9cfc4e821"}',
               cache: 'default' };

  let myRequest = new Request(url, requestSettings);
  return fetch(myRequest).then(checkStatus)
    .then(parseJSON);
}

function deleteEntry(url) {
  let requestHeaders = new Headers();

  requestHeaders.append('Accept', 'application/json');
  requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings = { method: 'DELETE',
               headers: requestHeaders,
               cache: 'default' };

  return fetch(url, requestSettings).then(checkStatus);
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

const Client = { getEntries, addEntry, deleteEntry };
export default Client;
