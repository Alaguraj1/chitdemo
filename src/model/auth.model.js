import instance from '../utils/axios.utils';

const user = {
  Login: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = 'API/CCALOGINLIVE';
console.log('✌️url --->', url);
      instance()
        .post(url, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          if (error.response) {
            reject(error.response.data.message);
          } else if (error.message) {
            reject(error.message);
          } else {
            console.log(error);
            reject(error);
          }
        });
    });
    return promise;
  },

 
};

export default user;
