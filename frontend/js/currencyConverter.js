const exchangeRates = {
    USD: 1.0000,
    EUR: 0.8069,
    GBP: 0.7192,
    JPY: 147.69,
    CAD: 1.2600,
    AUD: 0.6522,
    CHF: 0.9331,
    SAR: 3.7500,
    AED: 3.6730,
    EGP: 49.20
};

function updateToOptions() {
    const fromCurrency = document.getElementById('from-convert').value;
    const toSelect = document.getElementById('to-convert');
    const currentToValue = toSelect.value;
    
    const options = toSelect.querySelectorAll('option');
    
    options.forEach(option => {
        if (option.value === fromCurrency) {
            option.style.display = 'none';
        } else {
            option.style.display = 'block';
        }
    });
    
    if (currentToValue === fromCurrency) {
        for (let option of options) {
            if (option.value !== fromCurrency) {
                toSelect.value = option.value;
                break;
            }
        }
    }
}

document.getElementById('from-convert').addEventListener('change', updateToOptions);


document.getElementById('convert').addEventListener('click', function() {
    const inputAmount = document.getElementById('inp').value;
    
    if (isFinite(inputAmount) && inputAmount > 0) {
        const fromCurrency = document.getElementById('from-convert').value;
        const toCurrency = document.getElementById('to-convert').value;
        
        const result = inputAmount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
        
        document.getElementById('result').value = result.toFixed(2);
    }
});

window.onload=()=>{
    document.getElementById('inp').value='';
    document.getElementById('result').value = '';
}