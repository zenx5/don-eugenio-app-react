import axios from "axios"

export default class BaseService {
  static resource() {
    return ''
  }

  static baseURL() {
    return process.env.REACT_APP_URL_API
  }

  /**
   * Fetch all records from resources
   * @options {object} params - Query filters params
   * @returns {object}
   */
  static async fetch(fields = '', sortBy = null, sortDesc = false,  page = 1, limit = 999, filters = []) {
    const finalFilters = filters.filter(e => e.value !== undefined && !!e.value.length)
    const params = {
      fields,
      sortBy,
      sortDesc,
      page: page >= 1 ? page : 1,
      per_page: limit < 0 ? 0 : limit,
      filters: finalFilters.length ? finalFilters.reduce(
        (accumulator, currentValue, currentIndex, array) => {
          let newString = accumulator;
          newString += `(${currentValue.field} ${currentValue.operation || '='} ${currentValue.value})`
          if (currentIndex === (array.length -1)) {
            newString += ')'
          } else {
            newString += 'and'
          }
          return newString
        },
        '('
      ) : undefined
    }
    // Eliminamos los parametros nullos o en blanco. Ejm: `filter[query]=`
    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key]
    })

    const { data } = await axios.get(`${this.baseURL()}/${this.resource()}${finalFilters.length ? '/search' : ''}`, {
      params,
    })
    if (!data) {
      return {data: []}
      // throw new Error('Not found')
    }
    return data
  }

  /**
   * Get a resource by id
   * @param {Number} id - resource Id
   * @param {Array} params - query params
   * @returns {object} resource
   */
  static async get(id, params = {}) {
    const { data } = await axios.get(`${this.baseURL()}/${this.resource()}/${id}`, {
      params,
    })
    return data
  }

  /**
   * Create a new resource
   * @param {object} payload  - Data to save
   * @returns {object} resource
   */
  static async post(payload = {}) {
    const { data } = await axios.post(`${this.baseURL()}/${this.resource()}`, payload)
    return data.data
  }

  /**
   * Modify a existent resource
   * @param {Number} id - resource Id
   * @param {object} payload  - Data to update
   * @returns {object} resource
   */
  static async update(id, payload = {}) {
    const { data } = await axios.put(`${this.baseURL()}/${this.resource()}/${id}`, payload)
    return data.data
  }

  /**
   * Delete a existent resource
   * @param {Number} id - resource Id
   * @returns {object} resource
   */
  static async delete(id) {
    const { data } = await axios.delete(`${this.baseURL()}/${this.resource()}/${id}`)
    return data
  }

  /**
   * Create or Modify a existent resource
   * @param {object} payload  - Data to create or update
   * @returns {object} resource
   */
  static async save(payload) {
    if (payload.id) return this.update(payload.id, payload)
    return this.post(payload)
  }
}
