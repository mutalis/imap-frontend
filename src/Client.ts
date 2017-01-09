import 'whatwg-fetch';

function getEntries(url:string) {
  let requestHeaders = new Headers();

  requestHeaders.append('Accept', 'application/json');
  //requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings:RequestInit = { method: 'GET',
               headers: requestHeaders,
               mode: 'no-cors',
               cache: 'default' };
  // return fetch(`/api/food?q=${query}`, {
  console.log(url);
  return fetch(url, requestSettings).then(checkStatus)
    .then(parseJSON);
}

function addEntry(url:string, bodyData:string) {

  let payload = JSON.stringify(bodyData);
  let requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json; charset=utf-8');
  requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings:RequestInit = { method: 'POST',
               headers: requestHeaders,
               body: payload,
              //  body: '{ "username": "aaaab", "quota": 200, "password": "12345678", "domain_id": "0af0f599-307b-4b28-9d7b-6ca9cfc4e821"}',
               cache: 'default' };

  let myRequest = new Request(url, requestSettings);
  return fetch(myRequest).then(checkStatus)
    .then(parseJSON);
}

function deleteEntry(url:string) {
  let requestHeaders = new Headers();

  requestHeaders.append('Accept', 'application/json');
  requestHeaders.append('Authorization', 'Token token=e8a947943367d7f358794f6141ece2ca');

  let requestSettings:RequestInit = { method: 'DELETE',
               headers: requestHeaders,
               cache: 'default' };

  return fetch(url, requestSettings).then(checkStatus);
}

function checkStatus(response:ResponseInit) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error:any = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response:any) {
  return response.json();
}

const Client = { getEntries, addEntry, deleteEntry };
export default Client;
