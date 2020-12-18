export const GetResource = (url) =>{
    return fetch(url)
        .then(res => res.json())
};