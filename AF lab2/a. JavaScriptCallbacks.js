function fetchData(url, callback){

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){ //call every time readyState
        if(xhr.readyState === 4){ //request complete
            if(xhr.status ===200){ //request successfull
                callback(null, xhr.responseText);
            }else{
                callback(xhr.status); //error
            }
        }
    };
    xhr.open("GET", url); //get rquest 
    xhr.send(); //send request
}
const url = "https://example.com/api/data";
fetchData(url, logData);