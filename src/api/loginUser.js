
import api from './api';

export async function LoginUser(data) {
  console.log(api)
  try {
    const result = await api.get('/v1/loginUser',
      {
        params: data
      }
    );
    console.log(result)
    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}