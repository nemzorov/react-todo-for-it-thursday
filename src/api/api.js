export const API = {
    API_URL: 'http://127.0.0.1:8000/api/',

    create: async function (endpoint, params) {
        const url = this.API_URL + endpoint;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        return await response.json();
    },

    read: async function (endpoint, id = '') {
        const url = this.API_URL + endpoint + '/' + id;
        const response = await fetch(url);
        return await response.json();
    },

    update: async function (endpoint, id, params) {
        const url = this.API_URL + endpoint + '/' + id;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        return await response.json();
    },

    delete: async function (endpoint, id) {
        const url = this.API_URL + endpoint + '/' + id;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return response.status;
    }
}