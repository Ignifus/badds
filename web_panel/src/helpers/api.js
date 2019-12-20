export function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export function getRequestConfig(headers) {
  var csrftoken = getCookie('csrftoken');
  return {
    headers: { 'X-CSRFToken': csrftoken, ...headers }
  }
}

export function parseRestrictions(apiRestrictions) {
  const restrictions = apiRestrictions.reduce((acc, restriction) => {
    const key = restriction.restriction__restriction;
    if (acc[key] == null) {
        acc[key] = key === 'AGE' ? restriction.value :
            restriction.value.split(',');
    }
    return acc;
  }, {});

  return {
    countryWhiteList: restrictions.COUNTRY_WHITELIST || [],
    countryBlackList: restrictions.COUNTRY_BLACKLIST || [],
    genders: restrictions.GENDER || [],
    age: restrictions.AGE || ''
  }
}
