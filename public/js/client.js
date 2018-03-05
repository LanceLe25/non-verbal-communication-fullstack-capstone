// step 1. Defining global variables

//1. User loads page that gives information on what the site is about
//2. User has option to sign in or create new account
//3. User selects 'ADD NEW' to create a new card
//4. User selects or adds a Category, Sub-Category, Item and Icon
//5. User clicks 'Save' to save the card
//6. User can click 'SHOW ALL' to view all their cards
//7. User selects HOME to return the the home page




var loggedInUser = "";
var globalSelectedCategory = "";
var globalSelectedSubCategory = "";
var globalCardItem = "";
var globalImage = "";

function removeSpaces(inputString) {
    return inputString.replace(/\s/g, '-');
}

function deleteCategory(categoryID) {
    console.log(categoryID);
    // check if there subcategories
    $.ajax({
            type: 'GET',
            url: '/sub-category/get/' + categoryID,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (resultSubCategories) {
            console.log(resultSubCategories);
            if (resultSubCategories.length != 0) {
                // delete the category
                alert("Category has sub-categories and can't be deleted");
            }
            // check if there itmes
            else {
                $.ajax({
                        type: 'GET',
                        url: '/card-item/get-by-category/' + categoryID,
                        dataType: 'json',
                        contentType: 'application/json'
                    })
                    .done(function (resultItems) {
                        console.log(resultItems);
                        if (resultItems.length != 0) {
                            // delete the category
                            alert("Category has items and can't be deleted");
                        } else {
                            $.ajax({
                                    type: 'DELETE',
                                    url: '/delete-category/' + categoryID,
                                    dataType: 'json',
                                    contentType: 'application/json'
                                })
                                .done(function (result) {
                                    displayAll();
                                    alert('Category has been deleted');
                                })
                                .fail(function (jqXHR, error, errorThrown) {
                                    console.log(jqXHR);
                                    console.log(error);
                                    console.log(errorThrown);
                                });
                        }
                    })
                    .fail(function (jqXHR, error, errorThrown) {
                        console.log(jqXHR);
                        console.log(error);
                        console.log(errorThrown);
                    });
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function deleteSubCategory(subCategoryID) {
    console.log(subCategoryID);
    // check if there subcategories

    $.ajax({
            type: 'GET',
            url: '/card-item/get/' + subCategoryID,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (resultItems) {
            console.log(resultItems);
            if (resultItems.length != 0) {
                // delete the category
                alert("Sub-Category has items and can't be deleted");
            } else {
                $.ajax({
                        type: 'DELETE',
                        url: '/delete-sub-category/' + subCategoryID,
                        dataType: 'json',
                        contentType: 'application/json'
                    })
                    .done(function (result) {
                        displayAll();
                        alert('Sub-Category has been deleted');
                    })
                    .fail(function (jqXHR, error, errorThrown) {
                        console.log(jqXHR);
                        console.log(error);
                        console.log(errorThrown);
                    });
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function deleteItem(itemID) {

    $.ajax({
            type: 'DELETE',
            url: '/delete-item/' + itemID,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            displayAll();
            alert('Item has been deleted');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

// step 2. Defining functions

// step 3. dynamically created layout to display home screen
$(document).ready(function () {

    $('.ui.dropdown').dropdown();
    $('.hide-everything').hide();
    $('#navigation').show();
    //hide the following once you set up login options
    $('#nav-home, #nav-display-categories, #nav-add-new').show();
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

    $('#add-card-main').hide();
    $('#add-card-wrapper-form').hide();
    $('#example-card-display-wrapper').hide();
    $('#save-card-button').hide();
    $('#category-display-wrapper').hide();
    displayCategoryDropdown();
});


//****ALL LOGIN REGISTER PAGES*****
$(document).on("click", '#nav-login', function (event) {
    event.preventDefault();
    $('#account-options').hide();
    $('#login-register-wrapper').show();
    $('#site-info-wrapper').hide();
});


$(document).on("click", '#nav-register', function (event) {
    event.preventDefault();
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
    $('#nav-home, #nav-display-categories, #nav-add-new').show();
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
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#account-options').show();
    $('#login-register-form').hide();
    $('#register-user-form').hide();
    $('#site-info-wrapper').show();
    $('#home-page').hide();
});

$(document).on("click", '#nav-home', function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#nav-login, #nav-register').hide();
    $('#nav-logout').show();
    $('#home-page').show();
    $('#site-info-wrapper').hide();
    $('#category-display-wrapper').hide();
    $('#save-card-button').hide();
});

function showEditCategory(categoryIDAndCategoryName) {
    let categoryIDAndCategoryNameArray = categoryIDAndCategoryName.split("@");
    let categoryID = categoryIDAndCategoryNameArray[0];
    let categoryName = categoryIDAndCategoryNameArray[1];

    let buildShowEditCategoryHTML = "<form class='editShowAllCategoryForm' id='edit-" + categoryName + "'-form'>";
    buildShowEditCategoryHTML += "<div id='categoryUpdateInput'>"
    buildShowEditCategoryHTML += "<input class='editShowAllInputText' type='text' name='category-name' placeholder='Category name' value='" + categoryName + "'>";
    buildShowEditCategoryHTML += "<input class='editShowAllInputHidden' type='hidden' name='category-id' placeholder='Category ID' value='" + categoryID + "'>";
    buildShowEditCategoryHTML += "</div>"
    buildShowEditCategoryHTML += "<div id='updateCancelCategory'>";
    buildShowEditCategoryHTML += "<button class='editShowAllInputButton' type='submit'>Update</button>";
    buildShowEditCategoryHTML += "<a class='editShowAllInputButton' onclick=displayAll()>Cancel</a>";
    buildShowEditCategoryHTML += "</div>";
    buildShowEditCategoryHTML += "</form>";
    $('#' + removeSpaces(categoryName) + '-cat h2').html(buildShowEditCategoryHTML);
    $('.edit-delete-category').hide();
}


$(document).on("submit", '.editShowAllCategoryForm', function (event) {
    event.preventDefault();

    const categoryName = $(this).find('.editShowAllInputText').val();
    const categoryID = $(this).find('.editShowAllInputHidden').val();

    console.log(categoryID, categoryName);
    if (categoryName == "") {
        alert('Please specify Category Name');
    } else {
        const updateCategoryObject = {
            name: categoryName,
            id: categoryID
        };

        $.ajax({
                type: 'PUT',
                url: '/update-category/',
                dataType: 'json',
                data: JSON.stringify(updateCategoryObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                displayAll();
                alert('Category ' + categoryName + ' has been updated');
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});


function showEditSubCategory(subCategoryIDAndSubCategoryName) {
    let subCategoryIDAndSubCategoryNameArray = subCategoryIDAndSubCategoryName.split("@");
    let subCategoryID = subCategoryIDAndSubCategoryNameArray[0];
    let subCategoryName = subCategoryIDAndSubCategoryNameArray[1];

    let buildShowEditSubCategoryHTML = "<form class='editShowAllSubCategoryForm' id='edit-" + subCategoryName + "'-form'>";
    buildShowEditSubCategoryHTML += "<div id='subCategoryUpdateInput'>"
    buildShowEditSubCategoryHTML += "<input class='editShowAllInputText' type='text' name='sub-category-name' placeholder='Sub-category name' value='" + subCategoryName + "'>";
    buildShowEditSubCategoryHTML += "<input class='editShowAllInputHidden' type='hidden' name='sub-category-id' placeholder='Sub-category ID' value='" + subCategoryID + "'>";
    buildShowEditSubCategoryHTML += "</div>"
    buildShowEditSubCategoryHTML += "<div id='updateCancelSubCategory'>";
    buildShowEditSubCategoryHTML += "<button class='editShowAllInputButton' type='submit'>Update</button>";
    buildShowEditSubCategoryHTML += "<a class='editShowAllInputButton' onclick=displayAll()>Cancel</a>";
    buildShowEditSubCategoryHTML += "</div>";
    buildShowEditSubCategoryHTML += "</form>";
    $('#subcat-' + removeSpaces(subCategoryName) + ' h4').html(buildShowEditSubCategoryHTML);
    $('.edit-delete-sub-category').hide();
}


$(document).on("submit", '.editShowAllSubCategoryForm', function (event) {
    event.preventDefault();

    const subCategoryName = $(this).find('.editShowAllInputText').val();
    const subCategoryID = $(this).find('.editShowAllInputHidden').val();

    console.log(subCategoryID, subCategoryName);
    if (subCategoryName == "") {
        alert('Please specify Sub-category Name');
    } else {
        const updateSubCategoryObject = {
            name: subCategoryName,
            id: subCategoryID
        };

        $.ajax({
                type: 'PUT',
                url: '/update-sub-category/',
                dataType: 'json',
                data: JSON.stringify(updateSubCategoryObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                displayAll();
                alert('Sub-category ' + subCategoryName + ' has been updated');
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});

function showEditItem(itemIDAndItemName) {
    let itemIDAndItemNameArray = itemIDAndItemName.split("@");
    let itemID = itemIDAndItemNameArray[0];
    let itemName = itemIDAndItemNameArray[1];

    let buildShowEditItemHTML = "<form class='editShowAllItemForm' id='edit-" + itemName + "'-form'>";
    buildShowEditItemHTML += "<div id='itemUpdateInput'>"
    buildShowEditItemHTML += "<input class='editShowAllInputText' type='text' name='item-name' placeholder='Item name' value='" + itemName + "'>";
    buildShowEditItemHTML += "<input class='editShowAllInputHidden' type='hidden' name='item-id' placeholder='Item ID' value='" + itemID + "'>";
    buildShowEditItemHTML += "</div>"
    buildShowEditItemHTML += "<div id='updateCancelItem'>";
    buildShowEditItemHTML += "<button id='updateItem' class='editShowAllInputButton' type='submit'>Update</button>";
    buildShowEditItemHTML += "<a id='deleteItem' class='editShowAllInputButton' onclick=displayAll()>Cancel</a>";
    buildShowEditItemHTML += "</div>";
    buildShowEditItemHTML += "</form>";
    $('#completed-card-' + removeSpaces(itemName) + ' h5').html(buildShowEditItemHTML);
    //    $('.edit-delete-card').hide();
}

$(document).on("submit", '.editShowAllItemForm', function (event) {
    event.preventDefault();

    const itemName = $(this).find('.editShowAllInputText').val();
    const itemID = $(this).find('.editShowAllInputHidden').val();

    console.log(itemID, itemName);
    if (itemName == "") {
        alert('Please specify Item Name');
    } else {
        const updateItemObject = {
            name: itemName,
            id: itemID
        };

        $.ajax({
                type: 'PUT',
                url: '/update-item/',
                dataType: 'json',
                data: JSON.stringify(updateItemObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                displayAll();
                alert('Item ' + itemName + ' has been updated');
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});



function displayAll() {
    $.ajax({
            type: 'GET',
            url: '/category/get',
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            //console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#category-display-wrapper").html('');
                var buildCategoryDropdownOutput = "";

                $.each(result, function (resultKey, resultValue) {

                    buildCategoryDropdownOutput += '<section id="' + removeSpaces(resultValue.name) + '-cat" class="category">';
                    buildCategoryDropdownOutput += '<div id="' + removeSpaces(resultValue.name) + '-category-title">';
                    buildCategoryDropdownOutput += '<div>';
                    //                    buildCategoryDropdownOutput += '<a href="" id="' + removeSpaces(resultValue.name) + '-link">';
                    buildCategoryDropdownOutput += '<h2>' + resultValue.name + '</h2>';
                    //                    buildCategoryDropdownOutput += '</a>';
                    buildCategoryDropdownOutput += '</div>';
                    buildCategoryDropdownOutput += '<div class="edit-delete-category">';
                    buildCategoryDropdownOutput += '<a  id="updateCategory" href="#" onclick=showEditCategory("' + resultValue._id + '@' + removeSpaces(resultValue.name) + '")>update name</a> ';
                    buildCategoryDropdownOutput += '<a  id="deleteCategory" href="#" onclick=deleteCategory("' + resultValue._id + '")>delete</a>';
                    buildCategoryDropdownOutput += '</div>';
                    buildCategoryDropdownOutput += '</div>';
                    buildCategoryDropdownOutput += '<div id="all-' + removeSpaces(resultValue.name) + '-cards">';


                    $.ajax({
                            type: 'GET',
                            url: '/sub-category/get/' + resultValue._id,
                            dataType: 'json',
                            contentType: 'application/json'
                        })
                        .done(function (result) {
                            //console.log(result);
                            if ((!result) || (result != undefined) || (result != "")) {

                                $("#all-" + removeSpaces(resultValue.name) + "-cards").html('');
                                var buildSubCategoryDropdownOutput = "";
                                $.each(result, function (resultKey, resultValue) {

                                    //                    <!--       start subcategory-->

                                    buildSubCategoryDropdownOutput += '<div id="subcat-' + removeSpaces(resultValue.name) + '" class="subcategory">';
                                    buildSubCategoryDropdownOutput += '<section id="' + removeSpaces(resultValue.name) + '-subcategory-title" class="subcategory-title">';
                                    buildSubCategoryDropdownOutput += '<div>';
                                    buildSubCategoryDropdownOutput += '<h4>' + resultValue.name + '</h4> ';
                                    buildSubCategoryDropdownOutput += '</div>';
                                    buildSubCategoryDropdownOutput += '<div class="edit-delete-sub-category">';
                                    buildSubCategoryDropdownOutput += '<a  id="showEditSubCategory" href="#" onclick=showEditSubCategory("' + resultValue._id + '@' + removeSpaces(resultValue.name) + '")>update name</a> ';
                                    buildSubCategoryDropdownOutput += '<a  id="deleteSubCategory" href="#" onclick=deleteSubCategory("' + resultValue._id + '")>delete</a>';
                                    buildSubCategoryDropdownOutput += '</div>';
                                    buildSubCategoryDropdownOutput += '</section>';
                                    buildSubCategoryDropdownOutput += '<div id="subcat-' + removeSpaces(resultValue.name) + '-cards" class="card-wrapper">';


                                    $.ajax({
                                            type: 'GET',
                                            url: '/card-item/get/' + resultValue._id,
                                            dataType: 'json',
                                            contentType: 'application/json'
                                        })
                                        .done(function (result) {
                                            //console.log(result);
                                            if ((!result) || (result != undefined) || (result != "")) {

                                                $("#subcat-" + removeSpaces(resultValue.name) + "-cards").html('');
                                                var buildCardItemDropdownOutput = "";
                                                $.each(result, function (resultKey, resultValue) {

                                                    //                    <!--       start card-->

                                                    buildCardItemDropdownOutput += '<section id="completed-card-' + removeSpaces(resultValue.name) + '" class="completed-card-content">';
                                                    buildCardItemDropdownOutput += '<div class="edit-delete-card">';
                                                    buildCardItemDropdownOutput += '<a href="#" onclick=showEditItem("' + resultValue._id + '@' + removeSpaces(resultValue.name) + '")>update name</a> ';
                                                    buildCardItemDropdownOutput += '<a href="#" onclick=deleteItem("' + resultValue._id + '")>delete</a>';
                                                    buildCardItemDropdownOutput += '</div>';
                                                    buildCardItemDropdownOutput += '<div>';
                                                    if (resultValue.icon != "") {
                                                        buildCardItemDropdownOutput += '<img id="purse-icon" src="/icon-images/' + resultValue.icon + '" alt="">';
                                                    } else {
                                                        buildCardItemDropdownOutput += '<img id="purse-icon" src="/icon-images/no-image.png" alt="">';
                                                    }
                                                    buildCardItemDropdownOutput += '<h5>' + resultValue.name + '</h5>';
                                                    buildCardItemDropdownOutput += '</div>';
                                                    buildCardItemDropdownOutput += ' </section>';
                                                    //                <!--       start card-->

                                                });

                                                //use the HTML output to show it in the index.html
                                                $("#subcat-" + removeSpaces(resultValue.name) + "-cards").html(buildCardItemDropdownOutput);
                                            }
                                        })
                                        .fail(function (jqXHR, error, errorThrown) {
                                            console.log(jqXHR);
                                            console.log(error);
                                            console.log(errorThrown);
                                        });

                                    buildSubCategoryDropdownOutput += '</div>';
                                    buildSubCategoryDropdownOutput += '</div>';
                                    //                <!--       end subcategory-->


                                });
                                //use the HTML output to show it in the index.html
                                $("#all-" + removeSpaces(resultValue.name) + "-cards").html(buildSubCategoryDropdownOutput);
                            }
                        })
                        .fail(function (jqXHR, error, errorThrown) {
                            console.log(jqXHR);
                            console.log(error);
                            console.log(errorThrown);
                        });




                    buildCategoryDropdownOutput += '</div>';
                    buildCategoryDropdownOutput += '</section>';

                });

                //use the HTML output to show it in the index.html
                $("#category-display-wrapper").html(buildCategoryDropdownOutput);
                $("#add-category").hide();
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


$(document).on("click", '#nav-display-categories', function (event) {
    event.preventDefault();

    displayAll();

    $('.hide-everything').hide();
    $('#navigation').show();
    $('#site-info-wrapper').hide();
    $('#save-card-button').hide();
    $('#category-display-wrapper').show();
});


$(document).on("click", '#nav-add-new', function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#nav-login, #nav-register').hide();
    $('#nav-logout').show();
    $('#add-card-main').show();
    $('#add-card-wrapper-form').show();
    $('#example-card-display-wrapper').show();
    $('#save-card-button').show();
});




//*****ADD NEW CARD PAGE WITH CAT/SUBCAT/CARD ITEM/IMAGE SELECTIONS*****
$(document).on("change", '#select-cat', function (event) {
    event.preventDefault();
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
        displayNameByID(selectCategoryIDValue, "category");
        $('#selectCategoryIDValue').val(selectCategoryIDValue);
    }
    console.log(globalSelectedCategory);
});

function displayNameByID(id, element) {
    console.log(id, element);
    if (element == "category") {
        $.ajax({
                type: 'GET',
                url: '/get-category-name-by-id/' + id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                if ((!result) || (result != undefined) || (result != "")) {
                    $('#ex-card-category').html(result);
                } else {
                    $('#ex-card-category').html("no category");
                }
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (element == "subcategory") {
        $.ajax({
                type: 'GET',
                url: '/get-subcategory-name-by-id/' + id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                if ((!result) || (result != undefined) || (result != "")) {
                    $('#example-card-sub-cat').html(result);
                } else {
                    $('#example-card-sub-cat').html("no sub-category");
                }
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (element == "item") {
        $.ajax({
                type: 'GET',
                url: '/get-item-name-by-id/' + id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                if ((!result) || (result != undefined) || (result != "")) {
                    $('#ex-card-item').html(result);
                } else {
                    $('#ex-card-item').html("no item");
                }
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (element == "icon") {
        $.ajax({
                type: 'GET',
                url: '/get-item-icon-by-id/' + id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                if ((!result) || (result != undefined) || (result != "")) {
                    $("#select-icon-wrapper input").val(result);
                    $("#select-icon-wrapper .text img").attr("id", result);
                    $("#select-icon-wrapper .text img").attr("src", "/icon-images/" + result);
                    $("#example-card-display-wrapper #blank-image").css('background-image', 'url(/icon-images/' + result + ')');
                }
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    } else {
        return "element not defined";
    }
}

function displaySubCategoryDropdown(categoryId) {
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


//HELP, need validation if user is trying to add a category that already exists
$(document).on("click", '#add-category-button', function (event) {
    event.preventDefault();
    let cardCategory = $('#add-category input').val();

    //loop through list of categories to see if cardCategory already exists
    //if card category exists, alert user.
    //    let existingCardCategory = resultValue.name;
    //
    //    for (let i = 0; i < existingCardCategory.length; i++) {
    //        if (cardCategory == existingCardCategory) {
    //            alert("Category already exists");
    //        }
    //    }

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
                $('#add-category input').val('');

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

$(document).on("change", '#select-sub-cat', function (event) {
    event.preventDefault();
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
        displayNameByID(selectSubCategoryIDValue, "subcategory");
        $('#ex-card').show();
        $('#blank-image').show();

        $('#selectSubCategoryIDValue').val(selectSubCategoryIDValue);
    }
});

$(document).on("click", '#add-sub-category-button', function (event) {
    event.preventDefault();
    let cardCategory = $('#add-category input').val();
    if (cardCategory == "") {
        cardCategory = $('#selectCategoryIDValue').val();
    }

    let cardSubCategory = $('#add-sub-category input').val();
    if (cardCategory == "") {
        alert("Please select a category");
    } else if (cardSubCategory == "") {
        alert("Please enter a sub category");
    } else {
        const newSubCategoryObject = {
            name: cardSubCategory,
            categoryId: cardCategory

        };
        console.log(newSubCategoryObject);


        $.ajax({
                type: 'POST',
                url: '/sub-category/create',
                dataType: 'json',
                data: JSON.stringify(newSubCategoryObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                displaySubCategoryDropdown(cardCategory);
                $('#add-category input').val('');
                $('#add-sub-category input').val('');
                $('#add-sub-category').hide();
                $('#example-card-sub-cat').html(cardSubCategory);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});


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
    let selectCardItemNameValue = $('#select-card-item').val();
    let selectedIcon = displayNameByID(selectCardItemNameValue, "icon");
    console.log(selectedIcon);
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
                $('#add-card-item input').val('');
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


$(document).on("click", '#select-icon-wrapper .item', function (event) {
    event.preventDefault();
    let cardIcon = $('input[name="country"]').val();
    $("#example-card-display-wrapper #blank-image").css('background-image', 'url(/icon-images/' + cardIcon + ')');
});

//modified select-card-item and below

$(document).on("change", '#select-card-item', function (event) {
    event.preventDefault();
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
        displayNameByID(selectCardItemNameValue, "item");
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
                $('#cat-sub-cat-select').show();
                $('#select-sub-cat').show();
                displayNameByID(cardItem, "item");
                $('#add-card-item input').val('');
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
                alert("Card created");
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
    //    displayCategoryDropdown();
    //    displaySubCategoryDropdown();
    //    displayCardItemDropdown();
    //how do I get icons to refresh?
    //    displayCardIconsDropdown();
});





//*****how do you do this*****
$(document).on("change", '#menu url', function (event) {
    event.preventDefault();
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

$(document).on("click", '#create-card button', function (event) {
    event.preventDefault();
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

$('#nav-logout').click(function () {
    window.location.reload();
});
