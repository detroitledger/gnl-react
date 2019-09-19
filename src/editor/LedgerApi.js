import fetch from 'cross-fetch';

export default class LedgerApi {
  constructor({ apiUrl, baseUrl }) {
    this.apiUrl = apiUrl;
    this.baseUrl = baseUrl;
  }
  
  /**
   * @param {Number} grant id
   * @returns {Promise}
   */
  grantById(id) {
    const url = `${this.apiUrl}/grants/${id}.json`;
    
    return fetch(url)
      .then(response => response.json())
      .then(data => LedgerApi.grantTemplate(data));
  }

  /**
   * @param {Number} ein
   * @returns {Promise}
   */
  grantsByEin(ein, limit, offset) {
    const url = `${this.apiUrl}/grants.json?filters[ein]=${ein}&limit=${limit}&offset=${offset}`;
    
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        return data.grants.map((grant) => LedgerApi.grantTemplate(grant));
      });
  }

  /**
   * @param {Number} ein
   * @returns {Promise}
   */
  organizationsByEin(ein, limit, offset) {
    const url = `${this.apiUrl}/orgs.json?filters[ein]=${ein}&limit=${limit}&offset=${offset}`;
    
    return fetch(url)
      .then(response => response.json())
      .then(data => data.orgs ? data.orgs.map(LedgerApi.orgTemplate) : []);
  }


  /**
   * @param {Number} ein
   * @returns {Promise}
   */
  newsArticlesByEin(ein, limit, offset) {
    const url = `${this.apiUrl}/newsarticles.json?filters[ein]=${ein}&limit=${limit}&offset=${offset}`;
    
    return fetch(url)
      .then(response => response.json())
      .then(data => data.newsarticles.map((article) => LedgerApi.newsTemplate(article)));
  }

  /**
   * @param {Number} ein
   * @returns {Promise}
   */
  organization(id) {
    const url = `${this.apiUrl}/orgs/${id}.json`;
    
    return fetch(url)
      .then(response => response.json())
      .then(data => LedgerApi.orgTemplate(data));
  }

  /**
   * @param {Number} organization id
   * @returns {Promise}
   */
  grantsFunded(id, limit, offset) {
    const url = `${this.apiUrl}/orgs/${id}/grants_funded.json?limit=${limit}&offset=${offset}`;
    
    return fetch(url)
      .then(response => response.json())
      .then(data => data.grants_funded.map((grant) => LedgerApi.grantTemplate(grant)));
  }

  /**
   * @param {Number} organization id
   * @returns {Promise}
   */
  grantsReceived(id, limit, offset) {
    const url = `${this.apiUrl}/orgs/${id}/grants_received.json?limit=${limit}&offset=${offset}`;
    
    return fetch(url)
      .then(response => response.json())
      .then(data => data.grants_received.map((grant) => LedgerApi.grantTemplate(grant)));
  }
  
  /**
   * @param {Object} grant
   *   data in drupal format (use this.detemplateGrant)
   * @param {String} token
   * @return ?
   */
  createGrant(grant, token) {
    const url = `${this.apiUrl}/node.json`;
    
    return fetch(url, {
      body: JSON.stringify(grant),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': token,
      },
    })
      .then(response => response.json());
  }
  
  /**
   * Get session token from logged-in user
   */
  getToken() {
    return fetch(`${this.baseUrl}/services/session/token`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(function(response) {
      return response.text();
    });
  }

  static orgTemplate(org) {
    let templated = {};

    try {
      templated = {
        id: org.id,
        created: org.created,
        changed: org.changed,
        ein: org.field_ein,
        name: org.title,
        description: org.body ? org.body.und[0].value : null,
        start: org.org_grants_datestart,
        end: org.org_grants_dateend,
        received: org.org_grants_received,
        funded: org.org_grants_funded,
        ntees: org.field_ntee ? org.field_ntee.und : [],
        nteeIds: org.field_ntee ? Object.keys(org.field_ntee.und) : [],
        stateCorpId: org.field_state_corp_id ? org.field_state_corp_id.value : null,
        newsArticles: org.news ? org.news.map((article) => LedgerApi.newsTemplate(article)) : [],
      };
    } catch (error) {
      throw new Error('cannot put org into template', error);
    }
    
    return templated;
  }
  
  static grantTemplate(grant) {
    let templated = {};

    try {
      templated = {
        id: grant.id,
        created: grant.created,
        changed: grant.changed,
        funder: {
          id: grant.field_funder.target_id,
          name: grant.field_funder.name,
        },
        recipient: {
          id: grant.field_recipient.target_id,
          name: grant.field_recipient.name,
        },
        start: grant.field_start_date,
        end: grant.field_end_date,
        amount: grant.field_funded_amount,
        description: grant.body ? grant.body.und[0].value : null,
        federalAwardId: grant.field_federal_award_id ? grant.field_federal_award_id.value : null,
      };
    } catch (error) {
      throw new Error('cannot put grant into template', error);
    }
    
    return templated;
  }
  
  /**
   *
    {
      start '01/2012'
      end '01/2012'
      funder id
      recipient id
      source string
      amount int
      description string
      types[] array of strings
      tags[] array of strings
      internalNotes string
      federalAwardId string
      region string
    }
   */
  static grantDetemplate(grant) {
    let drupalized = {};
    
    try {
      drupalized = {
        type: 'grant',
        id: grant.id,
        field_funder: { und: [ {
          target_id: `name (${grant.funder.id})`,
        } ] },
        field_recipient: { und: [ {
          target_id: `name (${grant.recipient.id})`,
        } ] },
        field_year: { und: [ {
          value: { date: grant.start },
          value2: { date: grant.end },
        } ] },
        field_source: { und: [ {
          value: grant.source,
        } ] },
        field_funded_amount: { und: [ {
          value: grant.amount,
        } ] },
        field_internal_notes: { und: [ {
          value: grant.internalNotes,
        } ] },
        body: { und: [ {
          value: grant.description,
        } ] },
        field_grant_types: { und: grant.types },
        field_grant_tags: { und: grant.tags },
        field_federal_award_id: { und: [ {
          value: grant.federalAwardId,
        } ] },
        field_region: { und: [ {
          value: grant.region,
        } ] },
      };
    } catch (error) {
      throw new Error('cannot drupalize', error);
    }
  
    return drupalized;
  }
  
  static newsTemplate(article) {
    return {
      id: article.id,
      title: article.title,
      desc: article.field_news_desc,
      date: article.field_news_date,
      link: article.field_news_link,
      relatedOrgIds: article.field_news_org.map((el) => el.target_id),
    };
  }
}
