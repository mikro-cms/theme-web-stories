function Petch ({origin = null, options = {}, headers = {}} = {}) {
  // a.k.a this
  const self = this

  const setting = {
    origin: window.location.origin,
    options: {},
    headers: {}
  }

  /**
   * Create option from setting.
   *
   * @param   object
   * @param   object
   * @param   object
   * @return  object
   */
  const createOption = function (options, headers, body) {
    let currentOptions = {...setting.options, ...options}

    currentOptions.headers = {...setting.headers, ...headers}
   
    if (typeof body !== null) {
      currentOptions.body = body
    }

    return currentOptions
  }

  /**
   * Create form data.
   *
   * @param   object
   * @return  object
   */
  const createFormData = function (body) {
    let formData = new FormData()

    for (var field in body) {
      formData.append(field, body[field])
    }

    return formData
  }

  /**
   * Create url search params.
   *
   * @param   object
   * @return  object
   */
  const createURLSearchParams = function (body) {
    let urlSearchParams = new URLSearchParams()

    for (var field in body) {
      urlSearchParams.append(field, body[field])
    }

    return urlSearchParams
  }

  /**
   * Allow to access current setting.
   */
  this.setting = {
    get origin() {
      return setting.origin
    },
    get options() {
      return setting.options
    },
    get headers() {
      return setting.headers
    }
  }

  /**
   * Change current setting.
   *
   * @return  void
   */
  this.setup = function ({origin = null, options = {}, headers = {}}) {
    setting.origin = origin || setting.origin
    setting.options = {...setting.options, ...options}
    setting.headers = {...setting.headers, ...headers}
  }

  /**
   * Request with get method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.get = function (url, {options = {}, headers = {}} = {}) {
    return fetch(`${setting.origin}/${url}`, createOption(options, headers, null))
  }

  /**
   * Request with post method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.postData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'POST'

    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createURLSearchParams(body)))
  }

  /**
   * Request with put method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.putData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'PUT'

    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createURLSearchParams(body)))
  }

  /**
   * Request with delete method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.deleteData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'DELETE'

    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createURLSearchParams(body)))
  }


  /**
   * Request with post method to upload files.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.uploadData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'POST'

    // headers['Content-Type'] = 'multipart/form-data'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createFormData(body)))
  }

  /**
   * Request with post data to send json body.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.postJSON = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'POST'

    headers['Content-Type'] = 'application/json'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, JSON.stringify(body)))
  }

  /**
   * Request with put data to send json body.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.putJSON = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'PUT'

    headers['Content-Type'] = 'application/json'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, JSON.stringify(body)))
  }

  /**
   * Request with delete method to send json body.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.deleteJSON = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'DELETE'

    headers['Content-Type'] = 'application/json'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, JSON.stringify(body)))
  }

  // Pre-setup initialization
  // Apply all received setting parameters.
  self.setup({origin, options, headers})
}
