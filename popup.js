/*unction init(){
    console.log($   ('body'));
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});*/


chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        var key, text = [];
        for(key in request.source){
            $('.info .'+key).text(request.source[key]);

            isInput = $('.earning-rate .'+key).is('input');
            if(isInput) $('.earning-rate .'+key).val(filter(request.source[key]));
            else $('.earning-rate .'+key).text(request.source[key]);

        }
        calcEarningRate();
        $('.earning-rate .form-control').change(calcEarningRate);
    }
});

function filter(v){
    switch(v){
        case '미상':
            return 0;
        default:
            return v;
    }
}
function calcEarningRate(e){
    var loan = +$('.earning-rate .loan-text').text().replace(/[\,원]/g, ''),
        interestRate = +$('.earning-rate .interest-rate').val(),
        interest = parseInt(loan*interestRate/100/12),
        monthlyFee = +$('.earning-rate .rent-price').val(),
        monthlyMoney = monthlyFee - interest,
        appraisedValue = +$('.earning-rate .appraised-value').text().replace(/[\,원]/g, ''),
        price = parseInt(appraisedValue*+$('.earning-rate .recent-percent').val()/100),
        bidRate = (+$('.earning-rate .price').val()/appraisedValue*100).toFixed(2);
    if(e){
        if($(e.target).hasClass('recent-percent')) $('.earning-rate .price').val(price);
        else if($(e.target).hasClass('price')) $('.earning-rate .recent-percent').val(bidRate);
    }

    $('.earning-rate .interest-text').text(numberWithCommas(interest) + '원');
    $('.earning-rate .monthly-money').val(monthlyMoney);
    $('.earning-rate .monthly-money-text').text(numberWithCommas(monthlyMoney) + '원');
    $('.earning-rate .base-rate').text(calcBaseRate());
    $('.earning-rate .leverage-rate').text(calcLeverageRate());
    $('.earning-rate .investment-text').text(numberWithCommas(calcInvestment(true)) + '원');
}
function calcBaseRate(){
    var rate = ((($('.earning-rate .rent-price').val() * 12) / calcInvestment())*100).toFixed(2);

    return rate;
}

function calcLeverageRate(){
    console.log($('.earning-rate .monthly-money').val() * 12);
    var rate = ((($('.earning-rate .monthly-money').val() * 12) / calcInvestment(true))*100).toFixed(2);

    return rate;
}

function calcInvestment(includeLoan){
    var deposit = +$('.earning-rate .deposit').val();
    if(isNaN(deposit)) deposit = 0;
    return +$('.earning-rate .price').val() + +$('.earning-rate .tax').val() + +$('.earning-rate .judicial-fee').val()
        + +$('.earning-rate .mediation-fee').val() + +$('.earning-rate .etc').val() + +$('.earning-rate .repair').val()
        - deposit + +$('.earning-rate .move-fee').val()
        - (includeLoan ? +$('.earning-rate .loan-text').text().replace(/[\,원]/g, '') : 0);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: 'jquery-3.2.0.min.js'
    }, function(){
        chrome.tabs.executeScript(null, {
            file: "getSource.js"
        }, function() {
            if (chrome.extension.lastError) {
                document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
    });
}
window.onload = onWindowLoad;
