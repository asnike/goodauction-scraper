/**
 * Created by ruudnike on 2017-04-05.
 */


function getData(){
    var tenant = $('.view_imcha .tbl_grid .money').html(),
        recentPercent = $('#nk_total .tbl_grid tr'),
        recentPercent =  recentPercent ? $(recentPercent[recentPercent.length-1]).children()[3].innerText : '85%',
        recentPercent = +recentPercent.replace('%', ''),
        appraisedValueText = $('.view_gibon .tbl_grid .money')[0].innerText,
        appraisedValue = parseInt(appraisedValueText.replace(/\,/g, '')),
        price = parseInt(parseInt(appraisedValue)*recentPercent/100), t0, t1,
        loan = (t0 = parseInt(price*80/100))<(t1 = parseInt(appraisedValue*70/100)) ? t0:t1,
        loanText = numberWithCommas(loan) + '원',
        depositText = tenant ? tenant.split('<br>')[0] : '',
        rentPriceText = tenant ? (tenant.split('<br>')[1] ? tenant.split('<br>')[1] : '') : '',
        type = $('.class_info .blue').text();

        console.log(tenant);

    return {
        addr:$('.view_gibon .addr.left .bold')[0].innerText,
        no:$('.head_title .head_num.bold').text(),
        'bid-deposit':$('.view_gibon .money')[3].innerText,
        'place':$('.head_title .head_con.center .bold')[2].innerText,
        'd-day':$('.head_title .head_con.center .bold')[3].innerText,
        type:type,
        'appraised-value':appraisedValueText,
        floor:$('.view_build .center')[0].innerText,
        'exclusive-size':$('.view_build .tbl_grid .center')[2].innerHTML.replace('<br>', ''),
        'completed-at':$('.p_gam .no')[1].innerText,
        structure:$('.view_build .tbl_grid .center')[3].innerHTML,
        'deposit-text':depositText,
        deposit:depositText.replace(/[\,원보]/g, ''),
        'rent-price-text':rentPriceText,
        'rent-price':rentPriceText.replace(/[\,원월]/g, ''),
        'recent-percent':recentPercent,
        price:price,
        'loan-text':loanText,
        loan:loan,
        'judicial-fee':500000,
        'move-fee':0,
        'mediation-fee':300000,
        etc:0,
        tax:Math.round(price*(type.indexOf('오피스텔') > -1 ? 4.6:1.1)/100)
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


chrome.extension.sendMessage({
    action:"getSource",
    source:getData()
});