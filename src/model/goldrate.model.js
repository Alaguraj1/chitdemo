import instance from "../utils/axios.utils";

const goldrate = {
  GoldRate: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/login/GoldRate";
      console.log("✌️url --->", url);
      instance()
        .get(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
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

  GoldMaxMinRate: (params) => {
console.log('✌️data --->', params);
    let promise = new Promise((resolve, reject) => {
      let url = "api/login/MinMaxGoldRate";
      console.log("✌️url --->", url);
      instance()
        .get(url, {
          params: params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
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

export default goldrate;
