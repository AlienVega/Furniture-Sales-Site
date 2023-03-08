

// form control
(function (){
    'use strict'
    var myName = document.querySelector("#name");
    var myEmail = document.querySelector("#email");
    var myPhone = document.querySelector("#phone");
    var myMessage = document.querySelector("#message");
    var myBtn = document.querySelector("#BtnContact");

    if (myMessage.value.length == 0){
        myBtn.disabled=true;
    }
    const spacePattern= /^\S*$/;
    const NumericPattern = /^([^0-9]*)$/;
    const myEmailPattern=/^([a-zA-Z0-9_\-?\.?]){3,}@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;
    const OnlyNumberPattern = /^[0-9]*$/;
    


    myName.addEventListener("blur",controlName);
    myEmail.addEventListener("blur",controlEmail);
    myPhone.addEventListener("blur",controlPhone);
    myMessage.addEventListener("blur",controlMessage);

    function controlName(){
        var myError =document.querySelector("#ErrName");
        if (myName.value.length==0){
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myError.textContent ="İsim alanı boş bırakılamaz";
            return false;
        }else if (myName.value.length< 3){
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myError.textContent ="İsminiz 3 karakterden az olamaz";
            return false;
        }else if (myName.value.length > 39){
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myError.textContent ="İsminiz 40 karakterden fazla olamaz";
            return false;
        }else if (!NumericPattern.test(myName.value)){
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myError.textContent ="İsminiz rakam içeremez";
            return false;
        }
        else{
            myName.classList.remove("is-invalid");
            myName.classList.add("is-valid");
            return true;
        }

    }
    function controlEmail(){
        var myError =document.querySelector("#ErrEmail");
        if (myEmail.value.length==0){
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myError.textContent ="mail alanı boş bırakılamaz";
            return false;
        }else if (!spacePattern.test(myEmail.value)){
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myError.textContent ="e-posta adresinizde boşluk bıraktınız";
            return false;
        }else if (!myEmailPattern.test(myEmail.value)){
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myError.textContent ="e-posta formatınız yanlış tekrardan kontrol edin";
            return false;
        }else if (myEmail.value.length > 39){
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myError.textContent ="e-posta adresiniz 40 karakterden fazla olamaz";
            return false;
        }
        else{
            myEmail.classList.remove("is-invalid");
            myEmail.classList.add("is-valid");
            return true;
        }
        
    }
    function controlPhone(){
        var myError =document.querySelector("#ErrPhone");
        if (myPhone.value.length==0){
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myError.textContent ="telefon alanı boş bırakılamaz";
            return false;
        }else if (!spacePattern.test(myPhone.value)){
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myError.textContent ="telefon numaranız boşluk içeremez";
            return false;
        }else if (!OnlyNumberPattern.test(myPhone.value)){
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myError.textContent ="telefon numaranız sadece rakamlardan oluşmalıdır.";
            return false;
        }else if (myPhone.value.length  < 11){
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myError.textContent ="telefon numaranız 11 haneden az olamaz";
            return false;
        }else if (myPhone.value.length > 12){
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myError.textContent ="telefon numaranız 12 haneden fazla olamaz";
            return false;
        }
        else{
            myPhone.classList.remove("is-invalid");
            myPhone.classList.add("is-valid");
            return true;
        }
    }
    function controlMessage(){
        var myError =document.querySelector("#ErrMessage");
        if (myMessage.value.length==0){
            myMessage.classList.remove("is-valid");
            myMessage.classList.add("is-invalid");
            myError.textContent ="Mesaj alanı boş bırakılamaz";
            return false;
        }else if (myMessage.value.length  < 10){
            myMessage.classList.remove("is-valid");
            myMessage.classList.add("is-invalid");
            myError.textContent ="mesajınız 10 karakterden az olamaz";
            return false;
        }
        else{
            myMessage.classList.remove("is-invalid");
            myMessage.classList.add("is-valid");
            return true;
        }
    }

    myMessage.addEventListener("keyup",function(){
       var mesaj = document.getElementById("current-character");
        mesaj.textContent = myMessage.value.length;
       var Mesajuzunluk = document.getElementById("last-character"); 
        Mesajuzunluk.textContent = 300 - myMessage.value.length;
        if (myMessage.value.length >= 10){
            myBtn.disabled=false;
        }else {
            myBtn.disabled=true;
        }
    });
    var myForms =document.querySelector(".needs-validation");
    myForms.addEventListener("submit",function(e){
        if (!myForms.checkValidity() ||
            !controlName() ||
            !controlEmail() ||
            !controlPhone() ||
            !controlMessage()  
        ) {
            e.preventDefault();
            e.stopPropagation();
        }
    },false);
    
})();

// navbar sticky
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navstcky");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("stickyy")
  } else {
    navbar.classList.remove("stickyy");
  }
}

