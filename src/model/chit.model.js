import instance from "../utils/axios.utils";

const chit = {


    City: (data) => {
        let promise = new Promise((resolve, reject) => {
          let url = "API/LOGIN/CITY";
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


  Branch: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/LOGIN/BRANCH";
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

  Chit: (params) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/LOGIN/CHIT";
      console.log("✌️url --->", url);
      instance()
        .get(url,{
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


  GetChit: (params) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/LOGIN/GETCHIT";
      console.log("✌️url --->", url);
      instance()
        .get(url,{
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


  EmployeeName: (params) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/LOGIN/EmployeeName";
      console.log("✌️url --->", url);
      instance()
        .get(url,{
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

export default chit;
