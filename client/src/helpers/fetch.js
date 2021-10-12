const baseUrlDev ='http://localhost:4100';
const baseUrlProd = ''

const fetchSinToken = ( endPoint, data, method = 'GET' ) => {
    const url =`${baseUrlDev}/${endPoint}`;

    if( method === 'GET') {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }
}

const fetchConToken = ( endPoint, data, method = 'GET' ) => {
    const url =`${baseUrlDev}/${endPoint}`;
    const token = localStorage.getItem('acc-t') || '';

    if( method === 'GET') {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        })
    }
}

export {
    fetchSinToken,
    fetchConToken
}