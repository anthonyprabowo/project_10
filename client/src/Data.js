import apiPath from './config';
export default class Data {
  getData(path, method, body, authenticate = false, credentials = null) {
    const url = apiPath + path
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      }
    }
  
    if(body !== null) {
      options.body = JSON.stringify(body);
    }

    if(authenticate){
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }
  
    return fetch(url, options)
  }

  async getAllCourse() {
    const response = await this.getData('/courses', 'GET', null)
    if(response.status === 200) {
      return response.json().then(data => data);
    } else if(response.status === 400) {
      return response.json().then(data => {
        return data.errors
      })
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.getData(`/courses/${id}`, 'GET', null)
    if(response.status === 200) {
      return response.json().then(data => data)
    } else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.getData('/users', 'POST', user)
    if(response.status === 201) {
      return []
    } else if(response.status === 400) {
      return response.json().then(data => {
        return data.error
      })
    } else {
      throw new Error();
    }
  }

  async getUser(emailAddress, password) {
    const response = await this.getData('/users', 'GET', null, true, {username: emailAddress, password})
    if(response.status === 200) {
      return response.json().then(data => data)
    } else if(response.status === 401) {
      return null
    } else {
      throw new Error();
    }
  }
}




