import instance from "../utils/axios.utils";

const goldrate = {

  CdBranch: (params) => {
console.log('✌️data --->', params);
    let promise = new Promise((resolve, reject) => {
      let url = "api/Login/custBranch";
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
  
  PayDue: (params) => {
    console.log('✌️data --->', params);
        let promise = new Promise((resolve, reject) => {
          let url = "api/login/custviewLive/";
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



  ClosedDue: (params) => {
    console.log('✌️data --->', params);
        let promise = new Promise((resolve, reject) => {
          let url = "api/login/closedDue";
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
