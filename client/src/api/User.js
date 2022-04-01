import axios from 'axios'

const url = '/api/user'

export default class UserAPI {
  // registerUser
  static async registerUser(user) {
      const res = await axios.post(`${url}/register`,user)
      return res.data
  }

  // loginUser
  static async loginUser(user) {
    const res = await axios.post(`${url}/login`,user,{
      headers: {"content-type":"application/json"},
    })
    return res.data
  }


}