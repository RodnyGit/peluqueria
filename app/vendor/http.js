async function get(url, type = 'json') {
    const res = await fetch(url).then(response => {
        if (type == 'json') {
            return response.json();
        } else {
            return response.text();
        }
    }).catch(error => {
        throw new Error(error);
    });
    return res;
}

async function post(url, type, contentType, data) {
    const res = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': contentType
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (type == 'json') {
                return response.json();
            } else {
                return response.text();
            }
        }).catch(error => {
            throw new Error(error);
        });
    return res;
}

// function postImage(url, contentType, data) {
//     const res = fetch(
//         url,
//         {
//             method: 'POST',
//             // headers: {
//             //     'Content-Type': contentType
//             // },
//             body: data
//         }).then(response => {
//             console.log(response);
//         });
//     return res;
// }

export { get, post };