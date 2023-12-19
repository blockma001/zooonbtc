
// const baseUrl = 'https://btczoo.co';
// const baseUrl = 'http://124.221.133.213:8099';
// const baseUrl = 'http://43.228.125.144:8099';
const baseUrl = 'https://www.00077.shop/';
// const baseUrl = 'http://localhost:8099';
const demoUrlStr = baseUrl+'/ttt/syDemo';
const projectUrlStr = baseUrl+'/ttt/syPro';

const connectButton = document.getElementById("connectBtn")
const mintButton1 = document.getElementById("mintBtn")
mintButton1.onclick = checkEnable
connectButton.onclick = connect

let userName = '';
let sun = 100000000;
let address = '';

let buttonText = 'Connect Wallet';
let buttonDisable = false;
let toastrType = 'success';
let toastrText = 'Please Connect Wallet';
let proJudgeIsDisable = false;
// 0 ：normal -1 ：unStart 1 :ended 9: exceeded
let proJudgeIsDisableState = 0;
let allNum = 0;

// 倒计时需要用的js
$.exists = function(selector) {
  return ($(selector).length > 0);
}

/*
window.updatedProItem = function (proItem) {
  if ($.exists('#tm-if-expired')) {
    // Set the date we're counting down to tm-if-expired
    var startDate = new Date('2019-05-30 23:59:59').getTime();
    var endDate = new Date('2019-05-30 23:59:59').getTime();

    var x = 0;
    var y = 0;
    var finalX = 0;
    var total = 1;
    let barValuePer = '0%'
    let barValue = '0/0'

    if (null != proItem) {
      startDate = proItem.start;
      endDate = proItem.end;
      x = proItem.x;
      y = proItem.y;
      total = proItem.total;
      finalX = x>y?x:y;
      if (finalX>total){
        finalX = Number(total);
      }

      barValuePer = finalX/total;
      barValue ='Sale Progress : ' + finalX +'  /  ' + total;
    }

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distanceStart = startDate - now;
      var distanceEnd = endDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = 0;
      var hours = 0;
      var minutes = 0;
      var seconds = 0;



      // Not started
      if (distanceStart > 0 ){
        document.getElementById("projectText").innerHTML = 'Token Sale Not Started.';
        proJudgeIsDisable = true;
        proJudgeIsDisableState = -1;
      }else {
        // already begun
        if (distanceEnd < 0) {
          // end
          clearInterval(x);
          document.getElementById("projectText").innerHTML = "Token Sale Is Over.";
          proJudgeIsDisable = true;
          proJudgeIsDisableState = 1;
        }else{
          // Ongoing
          // Time calculations for days, hours, minutes and seconds
          days = Math.floor(distanceEnd / (1000 * 60 * 60 * 24));
          hours = Math.floor((distanceEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          minutes = Math.floor((distanceEnd % (1000 * 60 * 60)) / (1000 * 60));
          seconds = Math.floor((distanceEnd % (1000 * 60)) / 1000);
        }
      }

      // Output the result in an element with id="demo"
      document.getElementById("tm-count-days").innerHTML = days;
      document.getElementById("tm-count-hours").innerHTML = hours;
      document.getElementById("tm-count-minutes").innerHTML = minutes;
      document.getElementById("tm-count-seconds").innerHTML = seconds;

      /!*if (barValuePer == 0){
        document.getElementById("barValuePer").innerHTML = '';
        document.getElementById("barValue").innerHTML = '';
      }else{


      }*!/
      document.getElementById("barValuePer").innerHTML = barValuePer*100 +'%';
      document.getElementById("barValue").innerHTML = barValue;

      // 若值大于1 ，则只显示1
      // if (barValuePer>1){
      //   barValuePer = 1;
      // }
      $('#barDiv').css('width',barValuePer*100 +'%');

      // 若 等于1 ，则销售满了，需要禁止
      if(barValuePer == 1){
        proJudgeIsDisable = true;
        proJudgeIsDisableState = 9;
      }
      // setMiniBtn(isDisable)
    }, 1000);
  }
}
*/

async function connect() {
  try {
    let accounts = await window.unisat.requestAccounts();
    console.log('connect success', accounts);
    address = accounts[0];
    setUserName(address);
    try {
      let res = await window.unisat.getBalance();
      console.log(res)
      setTotalMoney(res.total)
      getAddress(address);

    } catch (e) {
      console.log(e);
    }

  } catch (e) {
    console.log('connect failed');
  }
}

function getPayAddress(){
  var array = [
    'bc1qtmsym3pdyfy62avsyz620e0mk4ed8sfvktgl3a',
    'bc1q5pk8ywmplq92ysqk9fh6pdv8wqsmr36rr3rnxh',
    'bc1qccsnt9amdhcyujdctm5233gg0w39puxtk9zw0g',
    'bc1qkcgspm2xz764367ehlhy2hnam0vpeq8mv5qh2v',
    'bc1q0l2sx50ww6t3r0r5zthyqc4hf43w2ya9wu74kx',
    'bc1qugmf6x7mqpzaq03976sy7m2s0ydf65ujw9dcph',
    'bc1q8a4hp5a8xppjeeyv6rvwhvlvquv9j68hdjkcww',
    'bc1qcgm4fu4rhxt3d49ygv2gme075phtsvvvsh75e4',
    'bc1qastredcv9kndyjx2yf26cqq56sl874jakphzk2',
    'bc1qnp69nwhk2rh9duc2wtlde4h8xjksxaytkvvzcn',
    'bc1q7cm9kjga8we8utz8dsk5vyu6dq5e5pvpzrdlvq',
    'bc1q4pc3glyg6kspdxagcp24l9mx7qj0xh76s5qnqq',
    'bc1qwrplkn7ycmhlpngzpxcmh2929q2tp94fns7qap',
    'bc1q9fj9mstgc7c6k0vw7mrvd6klfwqqhrh0dmy2zg',
    'bc1qhvm83zw4jnfypam6sd8ktd07yev32n5g7vrlm7',
    'bc1qv0h48pkgsy7enpljp2gwv9m50t8tw6yxsgje43',
    'bc1qvqjqy0zfju7uq9sg33tsmmwprz6mrd7nutmyne',
    'bc1qusd0pgndsnu77wklujx0z48zflmx5scpaxajwy',
    'bc1q5hf6g6xx4vgnavfq5uyq8xc06vzjknly6ly2s0',
    'bc1qn24cfvcv2ejd6leexj0z0yhr09pa69064jdx7j'
  ];
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function checkEnable() {
  $.ajax({
    url: demoUrlStr + '/getEnable',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ttToken': myEncrypt()
    },
    success: function (resultRes) {
      if (resultRes.code === 0 && resultRes.data.enable === true) {
          mint();
      } else {
        toastrText = 'Purchase time has not yet arrived.';
        toastrType = 'danger';
        commonUtil.message(toastrText, toastrType);

      }
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log(666666);
    }
  });
}

async function mint() {
  $.ajax({
    url: demoUrlStr + '/getAllOrder',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ttToken': myEncrypt()
    },
    success: async function (resultRes) {
      allNum = resultRes.data.isPlayReally
      if (allNum >= 1000) {
        debugger
        toastrText = 'SOLD OUT !';
        toastrType = 'danger';
        commonUtil.message(toastrText, toastrType);
      } else {
        try {
          let payAddress = getPayAddress();
          let txid = await window.unisat.sendBitcoin(payAddress, 380000);
          // let txid =1;
          updateAddress(address, txid);

          console.log(txid)
        } catch (e) {
          console.log(e);

          toastrText = 'User Rejected The Transaction.';
          toastrType = 'danger';
          commonUtil.message(toastrText, toastrType);
        }
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log(666666);
    }
  });
}

function setUserName(address){
  const addressTemp = address;

  const startStr = addressTemp.substring(0, 4);
  const endStr = addressTemp.substring(addressTemp.length - 4);

  const newStr = startStr + "..." + endStr;
  userName = newStr;
  localStorage.setItem("userName", newStr);
  connectButton.innerHTML = newStr;
}

function setTotalMoney(total){
  const totalMoney = document.getElementById("totalMoney")

  let balances = total / sun
  const strToRender = balances || "0.0000";

  totalMoney.innerHTML = 'Your Balance  : ' + String(strToRender).replace(/^(.*\..{4}).*$/,"$1")  +' BTC' ;
}

function getAddress(accounts){
  $.ajax({
    url: demoUrlStr + '/get20231214',
    type: 'POST',
    data: JSON.stringify({"address": accounts}),
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ttToken': myEncrypt()
    },
    success: function (resultRes) {
      console.log(resultRes);
      setButtonTeam(resultRes);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log(666666);
    }
  });
}

function getAllOrder(){
  $.ajax({
    url: demoUrlStr + '/getAllOrder',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ttToken': myEncrypt()
    },
    success: function (resultRes) {
      console.log(resultRes);
      console.log(12121);
      updateOrderNum(resultRes);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log(666666);
    }
  });
}


window.getProject = function(){
  let proId = 1;

  $.ajax({
    url: projectUrlStr + '/get/'+proId,
    type: 'GET',
    // data: JSON.stringify({"address": accounts}),
    // dataType: 'json',
    // contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ttToken': myEncrypt()
    },
    success: function (resultRes) {
      console.log(resultRes);
      getAllOrder();
      // updatedProItem(resultRes.data)
      // setButtonTeam(resultRes);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log(666666);
      // updatedProItem(null)
    }
  });
}

function updateAddress(accounts,txid){
  $.ajax({
    url: demoUrlStr + '/add20231214',
    type: 'POST',
    data: JSON.stringify({"address": accounts,"txid": txid,"b":1}),
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ttToken': myEncrypt()
    },
    success: function (resultRes) {
      console.log("update Success",resultRes);

      let rCode = resultRes.code;

      if (rCode !== 0){
        toastrText = 'SOLD OUT !';
        toastrType = 'danger';
        commonUtil.message(toastrText,toastrType);
      }

      toastrText = 'Mint Success, Tx:'+ txid;
      commonUtil.message(toastrText);

      buttonDisable = true;
      $('#mintBtn').text('Alredy Minted')
      $('#mintBtn').prop('disabled', buttonDisable);
      if (buttonDisable){
        $('#mintBtn').addClass('buttonDisable');
      }else{
        $('#mintBtn').removeClass('buttonDisable');
      }
      getAllOrder();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log(666666);
    }
  });
}

function updateOrderNum(resultRes){
  if (resultRes.code === 0) {
    let data = resultRes.data
    const totalMoney2 = document.getElementById("totalMoney2")
    var fenzi =  data.isPlayReally;
    // var fenmu =data.isPlayTotal;
    var fenmu = 1001;
    totalMoney2.innerHTML = 'Mint Progress  : '+ fenzi + " / "+fenmu ;
  }else{
    totalMoney2.innerHTML = 'Mint Progress  : 0/800';
  }
}


function setButtonTeam(resultRes){
  if (resultRes.code === 0) {
    let data = resultRes.data
    if (data.b === 0) {
      toastrType = 'success'
      toastrText = 'Connect Success.'
      buttonDisable = false;
      buttonText = ' Mint '

      // const totalMoney2 = document.getElementById("totalMoney2")
      // var fenzi = 0;
      // var fenmu = 0;
      // totalMoney2.innerHTML = 'Mint Progress  : '+ fenzi + " / "+fenmu ;
      // getAllOrder();
    } else if (data.b === 1) {
      toastrType = 'warning'
      toastrText = 'Oops, Your Address Has Alredy Minted'
      buttonDisable = true;
      buttonText = 'Alredy Minted'
    }
  } else {
    toastrType = 'danger'
    toastrText = 'Oops, Your Address Not Whitelisted.'
    buttonDisable = true;
    buttonText = 'Not Whitelisted'
  }

  commonUtil.message(toastrText,toastrType);

  $('#mintBtn').text(buttonText)

  setMiniBtn(buttonDisable)
}

function setMiniBtn(buttonDisable) {
  $('#mintBtn').prop('disabled', buttonDisable || proJudgeIsDisable);

  if (buttonDisable || proJudgeIsDisable) {
    $('#mintBtn').addClass('buttonDisable');

    if (!buttonDisable) {
      $('#mintBtn').addClass('buttonMini');
      if(proJudgeIsDisable){
        $('#mintBtn').prop('disabled', !proJudgeIsDisable);
      }
    }else{
      $('#mintBtn').removeClass('buttonMini');
    }
  } else {
    $('#mintBtn').removeClass('buttonDisable');
    $('#mintBtn').addClass('buttonMini');
  }
}
window.myEncrypt = function () {

  const word = new Date().getTime() + ',abcd';
  const key = CryptoJS.enc.Utf8.parse("1234567890hijklm");
  const iv = CryptoJS.enc.Utf8.parse('1234567890abcdef');

  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

window.onload = function() {

  localStorage.removeItem("userName");

  userName =  localStorage.getItem("userName");
  const strToRender = userName || "Connect Wallet";
  connectButton.innerHTML = strToRender;

}