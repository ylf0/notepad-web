import fetch from 'isomorphic-fetch';
import config from './config';

const getOptions = ({
  method,
  body,
  headers,
}) => {
  const options = {
    method,
    headers,
    credentials: 'same-origin'
  }
  if (Object.keys(body).length) {
    options.body = JSON.stringify(body);
  }
  return options;
}

const getQueryString = ({
  query = {}
}) => {
  let qs = `?time=${Date.now()}`;
  if (Object.keys(query).length) {
    Object.keys(query).forEach((key) => {
      qs += `&${key}=${query[key] !== undefined ? query[key] : ''}`;
    });
  }
  return qs;
}

export default async function (
  method = 'GET',
  path = '',
  query = {},
  body = {},
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
  }
) {
  if (!path) throw new Error('path is required!');

  const res = await fetch(encodeURI(`${config.baseURL}${path}${getQueryString({
    query,
  })}`), getOptions({
    method,
    body,
    headers,
  }));

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg);
  }
  return data;
}
