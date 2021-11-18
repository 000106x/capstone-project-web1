//  CHECK THÔNG TIN FORM
function CheckInput() {
    txtname = document.myform.txtname;
    txtemail = document.myform.txtemail;
    idphone = document.myform.idphone;
    idmess = document.getElementById("idmess").value;

    reg1 = /^[0-9A-Za-z]+[0-9A-Za-z_]*@[\w\d.]+.\w{2,4}$/;
    reg2 = /^[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]/;
    reg3 = /^[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]/;
    // kiểm tra email
    testmail = reg1.test(txtemail.value);

    // kiểm tra số điện thoại
    testphone = reg2.test(idphone.value);
    testphone2 = reg3.test(idphone.value);

    if (txtname.value == "") {
        alert("Hãy nhập họ tên của bạn");
        txtname.focus();
        return false;
    }
    if (!testmail) {
         alert("Địa chỉ email không hợp lệ");
         txtemail.focus();
       return false;
     }
    if (!testphone || !testphone2) {
         alert("Số điện thoại chưa chính xác");
         idphone.focus();
         return false;
    }
    
    if (idmess == "") {
        alert("Hãy nhập câu hỏi");
        idmess.focus();
        return false;
    }
    else alert("Gửi thành công! \n Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất!");
    return true;
    document.getElementById("myform").submit();
    document.getElementById("myform").reset();
}
window.onscroll = function () { scrollFunction() };

