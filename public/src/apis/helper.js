import request from 'superagent';

export function get(baseUrl, params = [], query = {}) {
  const url = finalUrl(baseUrl, params);

  return new  Promise((resolve, reject) => {
    request.get(url)
      .query(query)
      .end((err, res) => {
        handleResponse(err, res, resolve, reject);
      });
  });
}

export function post(baseUrl, data, params = []) {
  const url = finalUrl(baseUrl, params);

  return new  Promise((resolve, reject) => {
    request.post(url)
      .send(data)
      .end((err, res) => {
        handleResponse(err, res, resolve, reject);
      });
  });
}

export function put(baseUrl, data, params = []) {
  const url = finalUrl(baseUrl, params);

  return new  Promise((resolve, reject) => {
    request.put(url)
      .send(data)
      .end((err, res) => {
        handleResponse(err, res, resolve, reject);
      });
  });
}

export function del(baseUrl, data, params = []) {
  const url = finalUrl(baseUrl, params);

  return new  Promise((resolve, reject) => {
    request.del(url)
      .send(data)
      .end((err, res) => {
        handleResponse(err, res, resolve, reject);
      });
  });
}

export function postForm(baseUrl, data, params = []) {
  const url = finalUrl(baseUrl, params);

  return new  Promise((resolve, reject) => {
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      try {
        form.append(key, data[key]);
      } catch (e) {
        alert('请使用最新版的chrome浏览器！');
        reject(new Error('请使用最新版的chrome浏览器！'));
      }
    });
    request.post(url)
      .send(form)
      .end((err, res) => {
        handleResponse(err, res, resolve, reject);
      });
  });
}

function handleResponse(err, res, resolve, reject) {
  const status = res.status;
  const data = res.body;
  const code = data.code;
  const okCode = 200;

  if (okCode === code) {
    resolve(data.msg);
  }

  reject(JSON.stringify(data.msg));
}

function finalUrl(baseUrl, params) {
  return [baseUrl].concat(params).join('/');
}
