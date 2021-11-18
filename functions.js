//LẤY DỮ LIỆU TỪ XML
var xhr = new XMLHttpRequest();
xhr.open("GET", "../data/products.xml", false);
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

    }
    else {
        var table = "không lấy được dữ liệu";
    }
};
xhr.send();

//LẤY DỮ LIỆU TỪ FORM
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}

//Lấy dữ liệu loại thú cưng và loại hoàng được chọn để xem một/tất cả mặt hàng
var pet = unescape(getUrlVars()["choosedPet"]);
var category = unescape(getUrlVars()["choosedCategory"]);

//Xác định mặt hàng được chọn thuộc loại pet nào
if ((category.match(/Cat/g) || []).length == 1) { category = category.replace("Cat", ""); pet = "Cat"; } else if ((category.match(/Dog/g) || []).length == 1) { category = category.replace("Dog", ""); pet = "Dog"; }

//Lấy tên của loại hàng và thú cưng
var petname = "";
if (pet == "Cat") petname = "Mèo"; else petname = "Chó";



/*XEM 1 LOẠI SẢN PHẨM CỤ THỂ - PRODUCTLIST.HTML -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function loadProduct(a) {
    if (a != null) category = a;
    var xmlDoc = xhr.responseXML;
    var productList = "";
    var x = xmlDoc.getElementsByTagName("product");
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == category) {

            productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b>Giá: <span class="productprice">'
                + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
        }
    }
    var categoryname = "";
    if (category == "food") categoryname = "Thức Ăn"; else if (category == "accessory") categoryname = "Phụ Kiện"; else if (category == "clothes") categoryname = "Quần Áo"; else if (category == "toy") categoryname = "Đồ chơi"; else if (category == "furniture") categoryname = "Đồ Nội Thất"; else catergoryname = "Sản Phẩm Khác";
    var til = categoryname + " Dành Cho " + petname;
    document.getElementById("productlistTitle").innerHTML = til;
    
    document.getElementById("productList").innerHTML = productList;
}


/*XEM TẤT CẢ CÁC SẢN PHẨM - ALLPRODUCTLIST.HTML -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function loadAllProduct() {
    var xmlDoc = xhr.responseXML;
    var productList = "";
    var dem = 0;
    var x = xmlDoc.getElementsByTagName("product");
    /*Food*/
    productList += '<div class="label">Thực phẩm</div><div class="label"></div><div class="label"></div><div class="seeMoreButton"><button type="submit" value="food" name="choosedCategory">Xem tất cả ▶</button></div>'
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == "food") {           
            
            if (dem < 4) {
                
                productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                    + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b> Giá: <span class="productprice">'
                    + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                    + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                    + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
            }
            dem = dem + 1;
        }
    }
    for (var i = dem; i <= 4; i++) { if (i < 4) productList += '<div class="space"></div>'; }; dem = 0;

    /*Accessory*/
    productList += '<div class="label">Phụ kiện </div><div class="label"></div><div class="label"></div><div class="seeMoreButton"><button type="submit" value="accessory" name="choosedCategory">Xem tất cả ▶</button></div>'
    for (var i = 0; i < x.length; i++) { 
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == "accessory") {

            if (dem < 4) {

                productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                    + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b>Giá: <span class="productprice">'
                    + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                    + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                    + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
            }
            dem = dem + 1;
        }
    }
    for (var i = dem; i <= 4; i++) { if (i < 4) productList += '<div class="space"></div>'; }; dem = 0;

    /*Clothes*/
    productList += '<div class="label">Quần áo</div><div class="label"></div><div class="label"></div><div class="seeMoreButton"><button type="submit" value="clothes" name="choosedCategory">Xem tất cả ▶</button></div>'
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == "clothes") {

            if (dem < 4) {

                productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                    + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b>Giá:  <span class="productprice">'
                    + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                    + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                    + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
            }
            dem = dem + 1;
        }
    }
    for (var i = dem; i <= 4; i++) { if (i < 4) productList += '<div class="space"></div>'; }; dem = 0;

    /*Toy*/
    productList += '<div class="label">Đồ chơi</div><div class="label"></div><div class="label"></div><div class="seeMoreButton"><button type="submit" value="toy" name="choosedCategory">Xem tất cả ▶</button></div>'
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == "toy") {

            if (dem < 4) {

                productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                    + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b>Giá: <span class="productprice">'
                    + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                    + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                    + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
            }
            dem = dem + 1;
        }
    }
    for (var i = dem; i <= 4; i++) { if (i < 4) productList += '<div class="space"></div>'; }; dem = 0;

    /*Furniture*/
    productList += '<div class="label">Đồ nội thất</div><div class="label"></div><div class="label"></div><div class="seeMoreButton"><button type="submit" value="furniture" name="choosedCategory">Xem tất cả ▶</button></div>'
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == "furniture") {

            if (dem < 4) {

                productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                    + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b> Giá: <span class="productprice">'
                    + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                    + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                    + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
            }
            dem = dem + 1;
        }
    }
    for (var i = dem; i <= 4; i++) { if (i < 4) productList += '<div class="space"></div>'; }; dem = 0;

    /*Others*/
    productList += '<div class="label">Khác</div><div class="label"></div><div class="label"></div><div class="seeMoreButton"><button type="submit" value="others" name="choosedCategory">Xem tất cả ▶</button></div>'
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue == pet && x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue == "others") {

            if (dem < 4) {

                productList += "<div>" + '<form action="productdetails.html" method="get"><button class="detailsButton" type="submit" name="btDetails" ' + 'value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                    + '" /><br/><span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span><br/><br/> <b> Giá: <span class="productprice">'
                    + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + "</span> VNĐ</b>" + '</button></form><br/>'
                    + '<input type="button" name="b' + i + '" class="buyButton" value="Mua ngay" onclick="buyItem(this)"/><br/>'
                    + '<input type="button" name="c' + i + '" class="addButton" value="Thêm vào giỏ" onclick="addToCart(this)"/></div>';
            }
            dem = dem + 1;
        }
    }
    for (var i = dem; i <= 4; i++) { if (i < 4) productList += '<div class="space"></div>'; }; dem = 0;

    document.getElementById("allproductlistTitle").value = pet;
    
    document.getElementById("productList1").innerHTML = productList;
}


/*XEM THÔNG TIN CHI TIẾT 1 SẢN PHẨM - PRODUCTDETAILS.HTML -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var details = unescape(getUrlVars()["btDetails"]);
function productDetails() {
    var xmlDoc = xhr.responseXML;
    var div = '';
    var x = xmlDoc.getElementsByTagName("product");
    for (var i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == details) {
            div += '<div name= "DIV" class="prod-info"><div class="prod-detail-left"><div class="zoom" style="background:url(..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + ')" onmousemove="zoom(event)" ontouchmove="zoom(event)">'
                + '<img src="..' + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + '"/></div></div>'
                + '<div class="prod-detail-right">'
                + '<span class="productname">' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</span>'
                + '<p>' + 'Mã sản phẩm: <span>' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '</span></p>'
                + '<p>' + 'Giá: <span class="productprice">' + x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue + ' VNĐ</span></p>'
                + '<p> Số lượng: <input type="number" value="1" id="quantity" name="quantity" min="1"></p>'
                + '<p>' + 'Thương hiệu: <span>' + x[i].getElementsByTagName("brand")[0].childNodes[0].nodeValue + '</span></p>'
                + '<p>' + 'Loại sản phẩm: <span>' + x[i].getElementsByTagName("pet")[0].childNodes[0].nodeValue + '/' + x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue + '</span></p>'
                + '<div class="prod-detail-btn">' + '<button id="addtocart" value="Add to cart" onclick="addToCartDetails()">THÊM VÀO GIỎ HÀNG</button>'
                + '<button id="buynow" name="btBuy" value="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '" onclick="buyItemDetails()">THANH TOÁN NGAY</button></div></div></div>'
                + '<div class="prod-detail-bottom"><div class="prod-description">'
                + '<h4>Mô tả</h4>' + '</div>'
                + '<div class="detail-content"><p>' + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue + '</p><br/><br/></div>';
        }

    }
    document.getElementById("product-detail-container").innerHTML = div;
}
//zoom ảnh
function zoom(e) {
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = (offsetX / zoomer.offsetWidth) * 100
    y = (offsetY / zoomer.offsetHeight) * 100
    zoomer.style.backgroundPosition = x + "% " + y + "%";
}


/*MUA SẢN PHẨM - CART -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//khai báo biến đếm số lượng loại sp mua 
var amount = 0;
//xem giỏ hàng
function openCart() {
   document.getElementById("myModal").style.display = 'block';
}
//đóng giỏ hàng
function closeCart() {

    document.getElementById("myModal").style.display = 'none';
}


//Xóa sản phẩm
var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i]
    button.addEventListener("click", function (event) {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        amount--;
        updatecart();
    });
}


//Thêm vào giỏ hàng
function addToCart(e) {
    var product = e.parentElement.cloneNode(true);
    var title = product.getElementsByClassName("productname")[0].innerText
    var price = product.getElementsByClassName("productprice")[0].innerText
    amount++;
    addItemToCart(title, price)
    updatecart()
   
}

//Thêm vào giỏ hàng (trong trang productdetails)
function addToCartDetails() {
    var elmnt = document.getElementsByTagName('DIV')[0];
    var product = elmnt.parentElement.cloneNode(true);
    var title = product.getElementsByClassName("productname")[0].innerText
    var price = product.getElementsByClassName("productprice")[0].innerText
    amount++;
    addItemToCart(title, price)
    updatecart()
}


function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cart_title = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cart_title.length; i++) {
        if (cart_title[i].innerText == title) {
            alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
            amount--;
            return
        }
    }

    var cartRowContents = `
  <div class="cart-item cart-column">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function () {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatecart()
    })
    updatecart()
}
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("cart-price ")[0]
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(price_item.innerText)
        var quantity = quantity_item.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].value = total + 'VND';
    document.getElementById('amount').innerHTML = amount;
}

//Thay đổi số lượng
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i];
    input.addEventListener("change", function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatecart();
    });
}
 //Mua ngay sản phẩm
function buyItem(e) {
    var product = e.parentElement.cloneNode(true);
    var title = product.getElementsByClassName("productname")[0].innerText
    var price = product.getElementsByClassName("productprice")[0].innerText
    amount++;
    addItemToCart(title, price)
    openCart()
    updatecart()
}
//Mua ngay sản phẩm (trong trang productdetails)
function buyItemDetails() {
    var elmnt = document.getElementsByTagName('DIV')[0];
    var product = elmnt.parentElement.cloneNode(true);
    var title = product.getElementsByClassName("productname")[0].innerText
    var price = product.getElementsByClassName("productprice")[0].innerText
    amount++;
    addItemToCart(title, price)
    openCart()
    updatecart()
}


/*THANH TOÁN - PAYMENT.HTML -------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//load payment
var total = unescape(getUrlVars()["paymenttotals"]);
function loadPayment() {
    document.getElementById('paymenttotal').innerHTML = total;

}
//Thanh toán
function payment() {
    var name = document.getElementById("fname").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var adr = document.getElementById("adr").value
    var index = email.indexOf("@")
    
    if (name == " " || name == "" || email == " " || email == "" ||
        phone == " " || phone == "" || adr == " " || adr == "") {
        alert("Vui lòng nhập đây đủ thông tin!")
    }
    else if (index == -1) {
        alert("Email không hợp lệ, vui lòng nhập lại");
        document.getElementById("email").focus();
    }
    else
    {
        alert("Thông tin đơn hàng đã được ghi nhận. Quý khách có thể theo dõi thông tin đơn hàng qua Email!")
        location.assign("/pages/index.html")
    }
}

/*TOOLS------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//lên dầu trang
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function TopFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

