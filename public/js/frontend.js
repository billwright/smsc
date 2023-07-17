function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function getPrimeFactors() {
    const inputBox = document.getElementById('inputBox');
    const url = '/primeFactors/api?input=' + inputBox.value;

    const ulElement = document.getElementById('factorList');
    removeAllChildNodes(ulElement);
    
    const inputNumberHeading = document.getElementById('inputNumberHeading');
    inputNumberHeading.innerHTML = 'thinking...';
    const executionTimeParagraph = document.getElementById('executionTimeParagraph');
    executionTimeParagraph.innerHTML = '';

    const start = performance.now();

    // Get factors by calling REST endpoint...
    fetch(url)
        .then((response) => response.json())
        .then(({ input, factors }) => {
            removeAllChildNodes(ulElement);
            
            inputNumberHeading.innerHTML = `Factors for ${input}:`;
            const end = performance.now();
            executionTimeParagraph.innerHTML = `Execution time: ${Math.floor(end - start)} ms`;

            factors.forEach((factor) => {
                let liElement = document.createElement('li');
                liElement.innerText = factor;
                ulElement.appendChild(liElement);
            });
        });
}
