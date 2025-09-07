const exchangeRates = {
    USD: 0,
    EUR: 0,
    GBP: 0,
    JPY: 0,
    CAD: 0,
    AUD: 0,
    CHF: 0,
    SAR: 0,
    AED: 0,
    EGP: 0
};
$.ajax({
    type: 'get',
    dataType: 'json',
    url: "https://api.currencyapi.com/v3/latest?apikey=cur_live_qTT2SuUIKqWaj4cPF9FSs96ohYV0n5sGgTGaebSx",
    success: function (data){
            for (let currency in exchangeRates) {
                if (data.data[currency]) {
                    exchangeRates[currency] = data.data[currency].value;
                }
            }
    }
});

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


function calc(){
    const inputAmount = document.getElementById('inp').value;
    
    if (isFinite(inputAmount) && inputAmount > 0) {
        const fromCurrency = document.getElementById('from-convert').value;
        const toCurrency = document.getElementById('to-convert').value;
        
        const result = inputAmount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
        
        document.getElementById('result').value = result.toFixed(2);
    }
}
document.getElementById('convert').addEventListener('click', function() {
    calc();
});
document.getElementById('from-convert').addEventListener('change', calc);


window.onload=()=>{
    document.getElementById('inp').value='';
    document.getElementById('result').value = '';
}
