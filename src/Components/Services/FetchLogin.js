export const FetchLogin = (identifier, password) =>{
    return fetch('http://localhost:1337/auth/local', {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })
        .then(resp => resp.json())
        .catch(error => console.log("Error: " + error));
}