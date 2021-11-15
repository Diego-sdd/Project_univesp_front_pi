
import api from './api';

export async function postRegisterCompany(data) {

  try {
    const result = await api.post('/v1/postRegisterCompany',

      data);

    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}

export async function getSectorCompany(idUser) {
  
  try {
    const result = await api.get('/v1/getSectorCompany',
      {
        params: {
          "idUser": idUser
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

export async function getUsersEmployee(data) {

  try {
    const result = await api.get('/v1/getUsersEmployee', 
    {
      params: {
        "filter": data
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
export async function getDataHomeUsers(data) {

  try {
    const result = await api.get('/v1/getDataHomeUsers', 
    {
      params: {
        "filter": data
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

export async function putUpdateUserCompany(data) {
  try {
    const result = await api.put('/v1/putUpdateUserCompany', data);

    return result;
  } catch (error) {

    return {
      status: error.response.status,
      msg: error.response.data.body
    }
  }

}