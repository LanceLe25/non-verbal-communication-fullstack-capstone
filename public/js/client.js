// step 1. Defining global variables

//1. User loads page
//2. User has option to sign in, create new account or continue to create SOP
//3. User selects 'Let's get started'
//4. User enters answer in answer fields
//5. User clicks Save and Contiue.
//6. Once user has answered all questions, they have the option to create SOP free-style or use template
//7. If using template, user can alter text when finished filling in blank fields
//8. User clicks Save once finished writing SOP




var loggedInUser = "";
var globalSelectedCategory = "";
var globalSelectedSubCategory = "";
var globalCardItem = "";
var globalImage = "";


// step 2. Defining functions

// step 3. dynamically created layout to display home screen
$(document).ready(function () {

    $('.ui.dropdown').dropdown();
    $('.hide-everything').hide();
    $('#navigation').show();
    //hide the following once you set up login options
    $('#nav-home, #nav-display-cards, #nav-display-categories, #nav-add-new').show();
    $('#header').show();
    $('#nav-logout').hide();
    $('#site-info-wrapper').show();

    //    hiding new-category, subcategory, card item, image input field
    $('#add-category').hide();
    $('#add-sub-category').hide();
    $('#add-card-item').hide();
    $('#select-image-wrapper').hide();
    $('#ex-image').hide();
    $('#save-card-button').hide();

    $('#clothing-category-link').hide();
    $('#household-category-link').hide();
    $('#bedroom-subcategory-link').hide();
    $('#living-room-subcategory-link').hide();
    displayCategoryDropdown();
});


//****ALL LOGIN REGISTER PAGES*****
$(document).on("click", '#nav-login', function () {
    $('#account-options').hide();
    $('#login-register-wrapper').show();
    $('#site-info-wrapper').hide();
});


$(document).on("click", '#nav-register', function () {
    $('#account-options').hide();
    $('#register-user-wrapper').show();
    $('#site-info-wrapper').hide();
});


$(document).on("submit", '#register-account-button', function (event) {
    event.preventDefault();
    $('#login-register-form').show();
});


$(document).on("submit", '#go-to-login-page', function (event) {
    event.preventDefault();
    $('#login-register-wrapper').show();
});


$(document).on("submit", '#login-account-button', function (event) {
    event.preventDefault();
    $('#nav-home, #nav - display - cards, #nav-display-categories, #nav-add-new').show();
    $('#logout').show();
});


$(document).on("submit", '#go-to-register-page-button', function (event) {
    event.preventDefault();
    $('#register-user-wrapper').show();
});





//*****ALL NAV OPTION PAGES*****

$(document).on("click", '#nav-about', function (event) {
    //if user is not logged in, about page should display account options.
    //if user is logged in, about page should display logout option
    //if user is logged in, navigation options should show
    $('#account-options').show();
    $('#login-register-form').hide();
    $('#register-user-form').hide();
    $('#site-info-wrapper').show();
    $('#home-page').hide();
});

$(document).on("click", '#nav-home', function () {
    $('#nav-home, #nav - display - cards, #nav-display-categories, #nav-add-new').show();
    $('#home-page').show();
    $('#site-info-wrapper').hide();
});


$(document).on("click", '#nav-display-cards', function () {
    $('#site-info-wrapper').hide();
    $('#card-display-wrapper').show();
    $('#accessories-subcategory-link, #going-out-subcategory-link, #business-subcategory-link').hide();
});


$(document).on("click", '#nav-display-categories', function () {
    $('#site-info-wrapper').hide();
    $('#card-display-wrapper').show();
    $('#clothing-category-link').show();
    $('#subcat-accessories').show();
    $('.card h3, .card h4').hide();
});


$(document).on("click", '#nav-add-new', function () {
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#account-options').hide();
    $('#logout-wrapper').show();
    $('#add-card-main').show();

    $('#cat-sub-cat-select').show();
    $('#select-sub-cat').show();

    $('#example-card-display-wrapper').show();
    $('#ex-card-category').show();
    $('#example-sub-cat-wrapper').show();
    $('#example-card-sub-cat').show();
    $('#ex-card').show();
    $('#blank-image').show();
    $('#ex-card-item').show();
    $('#create-card button').show();
});

//unable to get the following function to work. Do I need to
//use .on(submit)?
$(document).on("submit", '#clothing-link', function (event) {
    //    event.preventDefault();
    //    $('#site-info-wrapper').hide();
    //    $('#card-display-wrapper').show();
    //    $('#clothing-cat').show();
    //    $('#household-cat').hide();
    //    $('#bedroom-subcat').hide();
    //    $('#living-room-subcat').hide();
});


$(document).on("click", '#household-link', function () {
    //    $('#site-info-wrapper').hide();
    //    $('#card-display-wrapper').show();
    //    $('#clothing-cat').hide();
    //    $('#household-cat').show();
    //    $('#bedroom-subcat').show();
    //    $('#living-room-subcat').show();
});



//****BELOW - NEED TO BE DELETED, JUST FOR EXAMPLE***
$(document).on("click", '#nav-armchair', function () {


    //    $('.hide-everything').hide();
    //    $('#navigation').show();
    //    $('#account-options').hide();
    //    $('#logout-wrapper').show();
    //    $('#card-display-wrapper').show();
    //    $('#clothing-cat').hide();
    //    $('#bedroom-subcat').hide();
    //    $('#living-room-subcat').show();
    //    $('#card8').hide();
});


$(document).on("click", '#nav-bed', function () {

    //
    //    $('.hide-everything').hide();
    //    $('#navigation').show();
    //    $('#account-options').hide();
    //    $('#logout-wrapper').show();
    //    $('#card-display-wrapper').show();
    //    $('#clothing-cat').hide();
    //    $('#bedroom-subcat').show();
    //    $('#living-room-subcat').hide();
    //    $('#card6').hide();
});

$(document).on("click", '#nav-belt', function () {


    //    $('.hide-everything').hide();
    //    $('#navigation').show();
    //    $('#account-options').hide();
    //    $('#logout-wrapper').show();
    //    $('#card-display-wrapper').show();
    //    $('#clothing-cat').show();
    //    $('#household-cat').hide();
    //    $('#bedroom-subcat').hide();
    //    $('#living-room-subcat').hide();
    //    $('#card1').hide();
    //    $('#card3').hide();
    //    $('#card4').hide();
});
//****ABOVE - NEED TO BE DELETED, JUST FOR EXAMPLE***







//*****ADD NEW CARD PAGE WITH CAT/SUBCAT/CARD ITEM/IMAGE SELECTIONS*****
$(document).on("change", '#select-cat', function () {
    let selectCategoryIDValue = $('#select-cat').val();
    let addCategoryShow = $('#add-category').show();
    let addCategoryHide = $('#add-category').hide();
    //    alert(selectCategoryIDValue);
    if (selectCategoryIDValue == "addCategory") {
        $('#add-category input').val("");
        $('#add-category').show();
    } else if (selectCategoryIDValue == "selectCategory") {
        alert('Please make a selection');
        //    } else if ((addCategoryShow) && (globalSelectedCategory = selectCategoryIDValue)) {
        //        addCategoryHide;
    } else {
        globalSelectedCategory = selectCategoryIDValue
        displaySubCategoryDropdown(selectCategoryIDValue);
        $('#add-dropdown-categories').show();
        $('#ex-card-category').html(selectCategoryIDValue);
        $('#selectCategoryIDValue').val(selectCategoryIDValue);
    }
    console.log(globalSelectedCategory);
});

function displaySubCategoryDropdown(categoryId) {

    //when we make the call, only grab sub-categories that are
    //within the specified categoryId
    $.ajax({
            type: 'GET',
            url: '/sub-category/get/' + categoryId,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#select-sub-cat").html('');
                var buildSubCategoryDropdownOutput = "";
                buildSubCategoryDropdownOutput += '<option value="selectSubCategory">select or add sub category</option>';
                buildSubCategoryDropdownOutput += '<option value="addSubCategory">add sub category</option>';
                $.each(result, function (resultKey, resultValue) {
                    buildSubCategoryDropdownOutput += '<option value="' + resultValue._id + '">' + resultValue.name + '</option>';
                });
                //use the HTML output to show it in the index.html
                $("#select-sub-cat").html(buildSubCategoryDropdownOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

$(document).on("click", '#add-category-button', function () {
    let cardCategory = $('#add-category input').val();
    console.log(cardCategory);
    if (cardCategory == "") {
        alert("Please enter a category");

    } else {
        const newCategoryObject = {
            name: cardCategory
        };

        $.ajax({
                type: 'POST',
                url: '/category/create',
                dataType: 'json',
                data: JSON.stringify(newCategoryObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                displayCategoryDropdown();

            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

function displayCategoryDropdown() {
    $.ajax({
            type: 'GET',
            url: '/category/get',
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#select-cat").html('');
                var buildCategoryDropdownOutput = "";
                buildCategoryDropdownOutput += '<option value="selectCategory">select or add category</option>';
                buildCategoryDropdownOutput += '<option value="addCategory">add category</option>';
                $.each(result, function (resultKey, resultValue) {
                    buildCategoryDropdownOutput += '<option value="' + resultValue._id + '">' + resultValue.name + '</option>';
                });

                //use the HTML output to show it in the index.html
                $("#select-cat").html(buildCategoryDropdownOutput);
                $("#add-category").hide();
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

$(document).on("change", '#select-sub-cat', function () {
    let selectSubCategoryIDValue = $('#select-sub-cat').val();
    let cardCategory = $('#selectCategoryIDValue').val();
    let addSubCategoryShow = $('#add-sub-category').show();
    let addSubCategoryHide = $('#add-sub-category').hide();

    //    alert(selectSubCategoryIDValue);
    if (selectSubCategoryIDValue == "addSubCategory") {
        $('#add-sub-category').show();
    } else if (selectSubCategoryIDValue == "selectSubCategory") {
        alert('Please make a selection');
        //    } else if ((addSubCategoryShow) && (globalSelectedSubCategory = selectSubCategoryIDValue)) {
        //        addSubCategoryHide;
    } else {
        globalSelectedSubCategory == selectSubCategoryIDValue;
        displayCardItemDropdown(selectSubCategoryIDValue)
        $('#ex-card-category').show();
        $('#example-sub-cat-wrapper').show();
        $('#example-card-sub-cat').show();
        $('#example-card-sub-cat').html(selectSubCategoryIDValue);
        $('#ex-card').show();
        $('#blank-image').show();

        $('#selectSubCategoryIDValue').val(selectSubCategoryIDValue);
    }
});

$(document).on("click", '#add-sub-category-button', function () {
    let cardCategory = $('#add-category input').val();
    if (cardCategory == "") {
        cardCategory = $('#selectCategoryIDValue').val();
    }

    let cardSubCategory = $('#add-sub-category input').val();

    if (cardSubCategory == "") {
        alert("Please enter a sub category");

    } else {
        const newSubCategoryObject = {
            name: cardSubCategory,
            categoryId: cardCategory

        };


        $.ajax({
                type: 'POST',
                url: '/sub-category/create',
                dataType: 'json',
                data: JSON.stringify(newSubCategoryObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                displaySubCategoryDropdown();
                //    $('#dropdown').show();
                //
                //    $('#example-card-display-wrapper').show();
                //    $('#add-subcategory-display-wrapper').show();
                //    $('#add-sub-category').hide();
                //    $('#subcategory-displayed').show();
                $('#example-card-sub-cat').html(cardSubCategory);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

//based on how the category post request was written
function displayCardItemDropdown(subCategoryId) {
    $.ajax({
            type: 'GET',
            url: '/card-item/get/' + subCategoryId,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#select-card-item").html('');
                var buildCardItemDropdownOutput = "";
                buildCardItemDropdownOutput += '<option value="selectCardItem">select or add item</option>';
                buildCardItemDropdownOutput += '<option value="addCardItem">add item</option>';
                $.each(result, function (resultKey, resultValue) {
                    buildCardItemDropdownOutput += '<option value="' + resultValue._id + '">' + resultValue.name + '</option>';
                });

                //use the HTML output to show it in the index.html
                $("#select-card-item").html(buildCardItemDropdownOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayCardIconsDropdown(cardId) {
    $.ajax({
            type: 'GET',
            url: '/card-icons/get/',
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#select-icon-wrapper .menu").html('');
                var buildCardIconDropdownOutput = "";
                //                buildCardIconDropdownOutput += '<div class="ui fluid search selection dropdown">';
                //                buildCardIconDropdownOutput += '<input type="hidden" name="country">';
                //                buildCardIconDropdownOutput += '<div class="default text">Select an image</div>';
                //                buildCardIconDropdownOutput += '<div class="menu transition visible" tabindex="-1" style="display: block !important;">';

                $.each(result, function (resultKey, resultValue) {
                    buildCardIconDropdownOutput += '<div class="item" data-value="' + resultValue.url + '">';
                    buildCardIconDropdownOutput += '<i class="af flag">';
                    buildCardIconDropdownOutput += '<img id="' + resultValue.url + '" src="/icon-images/' + resultValue.url + '" alt="">';
                    buildCardIconDropdownOutput += '</i>' + resultValue.name;
                    buildCardIconDropdownOutput += '</div>';
                });
                //                buildCardIconDropdownOutput += '</div>';
                //                buildCardIconDropdownOutput += '</div>';

                //use the HTML output to show it in the index.html
                $("#select-icon-wrapper .menu").html(buildCardIconDropdownOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}









//modified select-card-item and below

$(document).on("change", '#select-card-item', function () {
    let selectCardItemNameValue = $('#select-card-item').val();
    let cardSubCategory = $('#selectSubCategoryIDValue').val();
    let addCardItemShow = $('#add-card-item').show();
    let addCardItemHide = $('#add-card-item').hide();
    console.log("selectCardItemNameValue = ", selectCardItemNameValue)

    if (selectCardItemNameValue == "addCardItem") {
        $('#add-card-item').show();
        $('#select-image-wrapper').show();
    } else if (selectCardItemNameValue == "selectCardItem") {
        alert('Please make a selection');
    } else {

        $('#selectCardItemIDValue').val(selectCardItemNameValue);

        globalCardItem == selectCardItemNameValue;
        displayCardIconsDropdown(selectCardItemNameValue);


        $('#add-dropdown-categories').show();
        $('#cat-sub-cat-select').show();
        $('#select-image-wrapper').show();

        $('#example-card-display-wrapper').show();
        $('#ex-card-category').show();
        $('#example-sub-cat-wrapper').show();
        $('#example-card-sub-cat').show();
        $('#ex-card').show();
        $('#blank-image').show();
    }
});

$(document).on("click", '#add-card-item-button', function (event) {
    event.preventDefault();

    let cardCategory = $('#add-category input').val();
    if (cardCategory == "") {
        cardCategory = $('#selectCategoryIDValue').val();
    }


    let cardSubCategory = $('#add-sub-category input').val();
    if (cardSubCategory == "") {
        cardSubCategory = $('#selectSubCategoryIDValue').val();
    }

    let cardItem = $('#add-card-item input').val();

    if (cardItem == "") {
        alert("Please enter an item");

    } else {
        const newCardItemObject = {
            name: cardItem,
            icon: "",
            categoryId: cardCategory,
            subCategoryId: cardSubCategory
        };
        console.log(newCardItemObject);

        $.ajax({
                type: 'POST',
                url: '/card-item/create',
                dataType: 'json',
                data: JSON.stringify(newCardItemObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                displayCardItemDropdown(cardSubCategory);
                $('#add-card-main').show();
                $('#add-card-item').hide();
                $('#example-card-display-wrapper').show();
                $('#ex-card-category').show();
                $('#example-sub-cat-wrapper').show();
                $('#example-card-sub-cat').show();
                $('#ex-card').show();
                $('#blank-image').show();
                $('#ex-card h4').html(cardItem);
                $('#cat-sub-cat-select').show();
                $('#select-sub-cat').show();
                $('#ex-card-item').html(cardItem);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }


});



//*****UPDATE CARD**********UPDATE CARD**********UPDATE CARD*****
$(document).on("click", '#save-card-button', function (event) {
    event.preventDefault();
    //do i need to add a variable for the empty icon image?
    //the select variables are for the if else statements that
    ///if option has not been selected
    //, user needs to select an option from the dropdown


    let cardItemID = $('#selectCardItemIDValue').val();
    let cardItemName = $('#selectCardItemNameValue').val();

    let cardIcon = $('input[name="country"]').val();
    if (cardIcon == "") {
        alert('Please select an icon for the item before continuing');
    } else {
        const saveCardObject = {
            icon: cardIcon,
            cardItemId: cardItemID,
            name: cardItemName,
        };

        console.log(saveCardObject);

        $.ajax({
                type: 'PUT',
                url: '/save-card/update',
                dataType: 'json',
                data: JSON.stringify(saveCardObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                //                displayCardItemDropdown(cardSubCategory);
                //                        $('#add-card-main').show();
                //                        $('#add-card-item').hide();
                //                        $('#example-card-display-wrapper').show();
                //                        $('#ex-card-category').show();
                //                        $('#example-sub-cat-wrapper').show();
                //                        $('#example-card-sub-cat').show();
                //                        $('#ex-card').show();
                //                        $('#blank-image').show();
                //                        $('#ex-card h4').html(cardItem);
                //                        $('#cat-sub-cat-select').show();
                //                        $('#select-sub-cat').show();
                //                        $('#ex-card-item').html(cardItem);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }


});
//*****UPDATE CARD**********UPDATE CARD**********UPDATE CARD*****







//*****how do you do this*****
$(document).on("change", '#menu url', function () {
    let selectImageValue = $('#menu url').val();

    alert(selectImageValue);
    if (selectImageValue == ".default") {
        alert('Please make a selection');
    } else {
        globalImage == selectImageValue;
        $('.hide-everything').hide();
        $('#navigation').show();
        $('#logout-wrapper').show();
        $('#add-card-main').show();
        $('#add-dropdown-categories').hide();
        $('#cat-sub-cat-select').show();
        $('#add-card-item input').hide();

        $('#example-card-display-wrapper').show();
        $('#ex-card-category').show();
        $('#example-sub-cat-wrapper').show();
        $('#example-card-sub-cat').show();
        $('#ex-card').show();
        $('#ex-image').html(selectImageValue);
    }
});

$(document).on("click", '#create-card button', function () {
    //    $('#add-dropdown-categories').hide();//    $('#cat-sub-cat-select').hide();
    //    $('#add-card-item input').hide();
    //
    //    $('#example-card-display-wrapper').show();
    //    $('#ex-card-category').show();
    //    $('#example-sub-cat-wrapper').show();
    //    $('#example-card-sub-cat').show();
    //    $('#ex-card').show();
    //    $('#ex-image').html(selectImageValue);
});






//$('.login-account').click(function () {
//
//    const inputUname = $('.signin-username').val();
//    const inputPw = $('.signin-password').val();
//
//    if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
//        alert('Please enter a valid username');
//    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
//        alert('Invalid password');
//    } else {
//        const unamePwObject = {
//            username: inputUname,
//            password: inputPw
//        };
//        user = inputUname;
//        $.ajax({
//                type: "POST",
//                url: "/users/signin",
//                dataType: 'json',
//                data: JSON.stringify(unamePwObject),
//                contentType: 'application/json'
//            })
//            .done(function (result) {
//                loggedInUser = result;
//                $('.hide-everything').hide();
//                $('.logout-account').show();
//                $('#finalLoggedinUser').val(loggedInUser);
//
//
//
//
//                $.ajax({
//                        type: 'GET',
//                        url: '/statements/' + loggedInUser,
//                        dataType: 'json',
//                        contentType: 'application/json'
//                    })
//                    .done(function (result) {
//                        let retrieveUserSop = {};
//                        if ((!result) || (result != undefined) || (result != "")) {
//                            retrieveUserSop = result;
//                        }
//
//                        if (retrieveUserSop != "") {
//                            //display final page with statement
//
//                            $('.create-text').html(retrieveUserSop.body);
//                            $('.updated-sop-id').val(retrieveUserSop._id);
//                            $('.purpose p').html(retrieveUserSop.body);
//                            $('.my-goals').html(retrieveUserSop.goals);
//
//                            let valuesArray = retrieveUserSop.values.split(",");
//                            $('.values ul').html("");
//                            for (let i = 0; i < valuesArray.length; i++) {
//                                $('.values ul').append("<li>" + valuesArray[i] + "</li>");
//                            }
//
//                            let beliefsArray = retrieveUserSop.beliefs.split(",");
//                            $('.beliefs ul').html("");
//                            for (let j = 0; j < beliefsArray.length; j++) {
//                                $('.beliefs ul').append("<li>" + beliefsArray[j] + "</li>");
//                            }
//
//                            let goalsArray = retrieveUserSop.goals.split(",");
//                            $('.goals ul').html("");
//                            for (let k = 0; k < goalsArray.length; k++) {
//                                $('.goals ul').append("<li>" + goalsArray[k] + "</li>");
//                            }
//
//                            $('.navigate-options').show();
//                            $('.hide-nav-create').hide();
//                            $('.hide-nav-review').hide();
//                            $('.hide-nav-revise').show();
//                            $('.logout-account').show();
//                            $('#completed-sop').show();
//                            $('#values-beliefs-goals').show();
//                            $('.hide-review-answers').hide();
//                            $('.hide-questions').hide();
//                            $('.template-sop').hide();
//
//                        } else {
//                            $('#sop-description-info').show();
//                            $('.hide-nav-review').show();
//                            $('.hide-nav-revise').hide();
//                        }
//                    })
//                    .fail(function (jqXHR, error, errorThrown) {
//                        console.log(jqXHR);
//                        console.log(error);
//                        console.log(errorThrown);
//                    });
//            })
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//                alert('Invalid username and password combination. Please check your username and password and try again.');
//            });
//    };
//});






//
//$('.register-account').click(function (event) {
//    event.preventDefault();
//
//    const uname = $('.register-username').val();
//    const pw = $('.register-password').val();
//    const confirmPw = $('.register-confirm-password').val();
//
//    if (uname == "") {
//        alert('Please specify username');
//    } else if ((pw !== confirmPw) || (pw == "")) {
//        alert('Passwords must match and not be empty!');
//    } else {
//        const newUserObject = {
//            username: uname,
//            password: pw
//        };
//
//        $.ajax({
//                type: 'POST',
//                url: '/users/create',
//                dataType: 'json',
//                data: JSON.stringify(newUserObject),
//                contentType: 'application/json'
//            })
//            .done(function (result) {
//                alert('Thanks for signing up! You may now sign in with your username and password.');
//
//                $('.hide-everything').hide();
//                $('#sop-description-info').show();
//                $('#login-sop').show();
//            })
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//            });
//    };
//
//});



//$('.start-button').click(function () {
//    if (!(loggedInUser)) {
//        alert('Please login or register');
//    } else {
//        $('.logged-in-username').val(loggedInUser);
//        $('.hide-everything').hide();
//        $('.logout-account').show();
//        $('#questions').show();
//        $('.get-started-instructions').show();
//        $('.answer-questions').show();
//        $('.enter-value-belief').show();
//    };
//});



//$('.save-answers-button').click(function (event) {
//    event.preventDefault();
//    let answer1 = $('.js-answer1').val();
//    let answer2 = $('.js-answer2').val();
//    let answer3 = $('.js-answer3').val();
//    let answer4 = $('.js-answer4').val();
//    let answer5 = $('.js-answer5').val();
//    let answer6 = $('.js-answer6').val();
//    let sopLoggedInUser = $('.logged-in-username').val();
//
//    if ((answer1 == "") || (answer2 == "") || (answer3 == "") || (answer4 == "") || (answer5 == "") || (answer6 == "")) {
//        alert("Please complete each field");
//        return;
//    } else {
//
//        $('.js-completed-sop1').val(answer1);
//        $('.js-completed-sop2').val(answer2);
//        $('.js-completed-sop3').val(answer3);
//        $('.js-completed-sop4').val(answer4);
//        $('#finalValues').val(answer5);
//        $('#finalBeliefs').val(answer6);
//
//
//        usersAnswers.push(answer1, answer2, answer3, answer4, answer5, answer6, sopLoggedInUser);
//
//        for (let i = 0; i < usersAnswers.length; i++) {
//            $('.js-connect-answer' + (i + 1)).text(usersAnswers[i]);
//        };
//
//        $('.js-connect-answer5').html("");
//        $('#values-beliefs-goals .values ul').html("");
//
//        let valuesArray = answer5.split(",");
//        for (let j = 0; j < valuesArray.length; j++) {
//            $('#values-beliefs-goals .values ul').append("<li>" + valuesArray[j] + "</li>");
//            $('.js-connect-answer5').append("<li>" + valuesArray[j] + "</li>");
//        };
//
//
//        $('.js-connect-answer6').html("");
//        $('#values-beliefs-goals .beliefs ul').html("");
//
//        let beliefsArray = answer6.split(",");
//        for (let h = 0; h < beliefsArray.length; h++) {
//            $('#values-beliefs-goals .beliefs ul').append("<li>" + beliefsArray[h] + "</li>");
//            $('.js-connect-answer6').append("<li>" + beliefsArray[h] + "</li>");
//        };
//
//        $('.hide-everything').hide();
//        $('.logout-account').show();
//        $('#review').show();
//    };
//});







//$('.save-completed-button').click(function (event) {
//
//    event.preventDefault();
//    let createSopFreeStyle = $('.create-text').val();
//    let createGoals = $('.my-goals').val();
//    let sopId = $('.updated-sop-id').val();
//
//    if (createSopFreeStyle == "") {
//        alert("Please create Statement of Purpose");
//        return;
//    } else if (createGoals != "") {
//        usersCompletedSop.push(createSopFreeStyle);
//
//        $('#completed-sop .purpose p').html(createSopFreeStyle);
//
//        $('.hide-everything').hide();
//        $('.navigate-options').show();
//        $('.logout-account').show();
//        $('#completed-sop').show();
//        $('#values-beliefs-goals').show();
//        $('#finalSopBody').val(createSopFreeStyle);
//    } else {
//        usersCompletedSop.push(createSopFreeStyle);
//
//        $('#completed-sop .purpose p').html(createSopFreeStyle);
//
//        $('.hide-everything').hide();
//        $('.navigate-options').show();
//        $('.logout-account').show();
//        $('#completed-sop').show();
//        $('#create-goals').show();
//        $('#finalSopBody').val(createSopFreeStyle);
//    }
//
//    const userIdObject = {
//        body: createSopFreeStyle
//    }
//
//    $.ajax({
//            type: 'PUT',
//            url: '/statements/' + sopId,
//            dataType: 'json',
//            data: JSON.stringify(userIdObject),
//            contentType: 'application/json'
//        })
//        .done(function (result) {})
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//});


//
//$('.save-completed-template-button').click(function (event) {
//
//    event.preventDefault();
//    let createSopSentence1 = $('.js-completed-sop1').val();
//    let createSopSentence2 = $('.js-completed-sop2').val();
//    let createSopSentence3 = $('.js-completed-sop3').val();
//    let createSopSentence4 = $('.js-completed-sop4').val();
//    if ((createSopSentence1 == "") || (createSopSentence2 == "") || (createSopSentence3 == "") || (createSopSentence4 == "")) {
//        alert("Please create Statement of Purpose");
//        return;
//    } else {
//        let createSopTemplate = "It is my purpose to " + createSopSentence1 + ". I will grow and develop my " + createSopSentence2 + ". The people that are most important to me are " + createSopSentence3 + ". I will strive to " + createSopSentence4 + ".";
//
//
//        $('#completed-sop .purpose p').html("");
//        $('#completed-sop .purpose p').append("<p>" + createSopTemplate + "</p>");
//
//        $('#finalSopBody').val(createSopTemplate);
//    }
//
//    $('.hide-everything').hide();
//    $('.logout-account').show();
//    $('.navigate-options').show();
//    $('#completed-sop').show();
//    $('#create-goals').show();
//});




//$('.save-goals-button').click(function () {
//    let user = $('#finalLoggedinUser').val();
//    let body = $('#finalSopBody').val();
//    let values = $('#finalValues').val();
//    let beliefs = $('#finalBeliefs').val();
//    let goals = $('.my-goals').val();
//    if (goals == "") {
//        alert("Please create goals");
//        return;
//    } else {
//        $('#values-beliefs-goals .goals ul').html("");
//        let goalsArray = goals.split(",");
//        for (let k = 0; k < goalsArray.length; k++) {
//            $('#values-beliefs-goals .goals ul').append("<li>" + goalsArray[k] + "</li>");
//        };
//        $('.hide-everything').hide();
//        $('.navigate-options').show();
//        $('.logout-account').show();
//        $('#completed-sop').show();
//        $('#values-beliefs-goals').show();
//
//        const userStatementObject = {
//            user: user,
//            body: body,
//            values: values,
//            beliefs: beliefs,
//            goals: goals
//        }
//
//        $.ajax({
//                type: 'POST',
//                url: '/statements/create',
//                dataType: 'json',
//                data: JSON.stringify(userStatementObject),
//                contentType: 'application/json'
//            })
//            .done(function (result) {
//
//            })
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//            });
//        displayUpdatedStatement(user);
//    }
//});



$('#nav-logout').click(function () {
    window.location.reload();
});
