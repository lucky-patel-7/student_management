
const BASE_URL = "http://127.0.0.1:8000/api/"      

export const Service = {
    post: (endpoint,type, params, success, error) => {
        const requestData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };

        console.log("----Post reuest---->", `${BASE_URL}${type}/${endpoint}/${JSON.stringify(params)}`);

        fetch(`${BASE_URL}${type}/${endpoint}`, requestData)
            .then(response => response.json())
            .then(data => { 
                console.log("++++Post response++++>", `${BASE_URL}${type}/${endpoint}`, data);
                return success(data) 
            })
            .catch((err) => {
                console.log("++++Post response++++>", `${BASE_URL}${type}/${endpoint}`, err);
                return error(err)
            });
    },

    get: (endpoint,type, params, success, error) => {
        const requestData = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        console.log("----Get reuest---->", `${BASE_URL}${type}/${endpoint}/${params}`);
        
        fetch(`${BASE_URL}${type}/${endpoint}/${params}`, { requestData })
            .then(response => response.json())
            .then(data => { 
                console.log("++++Get response++++>", `${BASE_URL}${type}/${endpoint}`, data.data);
                return success(data) 
            })
            .catch((err) => {
                console.log('====================================');
                console.log("error of log",err);
                console.log('====================================');
                return error(err)
            });
    }
}
