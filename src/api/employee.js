
import api from './api';

export async function postRegisterEmployee(data) {

  try {
    const result = await api.post('/v1/postRegisterEmployee', data);

    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}
export async function getUserEmployee(userId) {

  try {
    const result = await api.get('/v1/getUserEmployee', {
      params: {
        "idUser": userId
      }
    });

    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}
export async function getDownloadPPP(userId) {

  try {
    const result = await api.get('/v1/getDownloadPPPEmployee', {
      params: {
        "idUser": userId
      }
    });

    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}
export async function postCreatedPPP(data) {

  try {
    const result = await api.post('/v1/postCreatedPPP', data);

    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}

