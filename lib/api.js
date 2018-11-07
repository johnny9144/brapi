const debug = require('debug')('dev:api');
const axios = require('axios');
debug( 'load');
class API {
  constructor( data) {
    this.baseUri = data.uri;
  }

  ['contact.info'] ( key, data) {
    return request('GET', `${this.baseUri}/contact/info`, key, data);
  }

  ['contact.create.init'] ( key, data) {
    return request('POST', `${this.baseUri}/contact/create/init`, key, data);
  }

  ['contact.create.add'] ( key, data) {
    return request('POST', `${this.baseUri}/contact/create/add`, key, data);
  }

  ['contact.update'] ( key, data) {
    return request('PUT', `${this.baseUri}/contact/update`, key, data);
  }

  ['contact.verify.send'] ( key, data) {
    return request('POST', `${this.baseUri}/contact/verify/send`, key, data);
  }

  ['contact.verify.upload'] ( key, data) {
    return request('PUT', `${this.baseUri}/contact/verify/upload`, key, data);
  }

  ['contact.verify.status'] ( key, data) {
    return request('GET', `${this.baseUri}/contact/verify/status`, key, data);
  }
  
  ['domain.check'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/check`, key, data);
  }

  ['domain.claims'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/claims`, key, data);
  }

  ['domain.create'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/create`, key, data);
  }

  ['domain.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/info`, key, data);
  }

  ['domain.update'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/update`, key, data);
  }

  ['domain.delete'] ( key, data) {
    return request( 'DELETE', `${this.baseUri}/domain/delete`, key, data);
  }

  ['domain.lock'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/lock`, key, data);
  }

  ['domain.renew'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/renew`, key, data);
  }

  ['domain.privacy'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/privacy`, key, data);
  }

  ['domain.redirect'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/redirect`, key, data);
  }

  ['domain.dns.update'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/dns/update`, key, data);
  }

  ['domain.dns.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/dns/info`, key, data);
  }

  ['domain.ns.update'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/ns/update`, key, data);
  }

  ['domain.ns.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/info`, key, data);
  }

  ['domain.transfer.request'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/transfer/request`, key, data);
  }

  ['domain.transfer.verify'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/transfer/verify`, key, data);
  }

  ['domain.transfer.status'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/transfer/status`, key, data);
  }

  ['domain.transfer.cancel'] ( key, data) {
    return request( 'DELETE', `${this.baseUri}/domain/transfer/cancel`, key, data);
  }

  ['domain.transfer.reject'] ( key, data) {
    return request( 'DELETE', `${this.baseUri}/domain/transfer/reject`, key, data);
  }

  ['domain.transfer.approve'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/transfer/approve`, key, data);
  }

  ['domain.transfer.vsp.create'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/transfer/vsp/create`, key, data);
  }

  ['domain.transfer.vsp.status'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/transfer/vsp/query`, key, data);
  }

  ['domain.transfer.vsp.cancel'] ( key, data) {
    return request( 'DELETE', `${this.baseUri}/domain/transfer/vsp/cancel`, key, data);
  }

  ['domain.verify.enable'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/verify/send`, key, data);
  }

  ['domain.verify.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/verify/info`, key, data);
  }

  ['domain.status.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/status/info`, key, data);
  }

  ['domain.status.update'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/status/update`, key, data);
  }

  ['domain.host.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/domain/host/info`, key, data);
  }

  ['domain.host.create'] ( key, data) {
    return request( 'POST', `${this.baseUri}/domain/host/create`, key, data);
  }

  ['domain.host.update'] ( key, data) {
    return request( 'PUT', `${this.baseUri}/domain/host/update`, key, data);
  }

  ['domain.host.delete'] ( key, data) {
    return request( 'DELETE', `${this.baseUri}/domain/host/delete`, key, data);
  }

  ['dpml.check'] ( key, data) {
    return request( 'GET', `${this.baseUri}/dpml/check`, key, data);
  }

  ['dpml.info'] ( key, data) {
    return request( 'GET', `${this.baseUri}/dpml/info`, key, data);
  }

  ['dpml.create'] ( key, data) {
    return request( 'POST', `${this.baseUri}/dpml/create`, key, data);
  }

  ['dpml.renew'] ( key, data) {
    return request( 'POST', `${this.baseUri}/dpml/renew`, key, data);
  }
}

module.exports = API;

function request ( method, url, key, params) {
  return axios( {
    method: method,
    baseURL: url,
    headers: {
      apikey: key.apikey,
      apisecret: key.apisecret
    },
    timeout: 60 * 1000,
    data: method !== 'GET' ? params : null,
    params: method === 'GET' ? params : null
  })
    .then( body => {
      return body.data;
    })
    .catch( err => {
      if ( err.response) 
        throw err.response.data;
      else if ( err.request) 
        throw { code: 500, msg: 'connection_fail' };
      else 
        throw { code: 500, msg: 'service_error' };
    });
}
