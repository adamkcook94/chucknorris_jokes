document.querySelector('.get-jokes').addEventListener('click', getJokes);


function getJokes(e){
    const number = document.querySelector('input[type="number"]').value; 
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function() {
        if(this.status === 200) {
            const response = JSON.parse(this.responseText); // We initially get a JSON string so we need to parse it to an object we can manipulate.
            // We get an object which has 'type' & 'value'
            // Type = server success
            // Value = array of jokes
            let output = '';

            if(response.type === 'success') {
                // Now we want to loop through this array - so we want to loop through the 'value' - not the response
                // This is why it is response.value.forEach.
                response.value.forEach(function(joke){
                    output += `<li>${joke.joke}</li>`;
                });
            } else {
                output += '<li>Something went wrong</li>'
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }

    xhr.send();

    e.preventDefault();
};