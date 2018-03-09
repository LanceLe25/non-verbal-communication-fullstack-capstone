// step 1. Defining global variables

//1. User loads page that gives information on what the site is about
//2. User selects 'ADD NEW' to create a new card
//3. User selects or adds a Category, Sub-Category, Item and Icon
//4. User clicks 'Save' to save the card
//5. User can click 'SHOW ALL' to view all their cards
//6. User selects HOME to return the the home page




var loggedInUser = "";
var globalSelectedCategory = "";
var globalSelectedSubCategory = "";
var globalCardItem = "";
var globalImage = "";

// step 2. Defining functions
function displayAll() {
    $.ajax({
            type: 'GET',
            url: '/category/get',
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            if ((!result) || (result != undefined) || (result != "")) {

                $("#category-display-wrapper").html('');
                var buildCategoryDropdownOutput = "";

                $.each(result, function (resultKey, resultValue) {

                    buildCategoryDropdownOutput += '<section id="' + removeSpaces(resultValue.name) + '-cat" class="category">';
                    buildCategoryDropdownOutput += '<div id="' + removeSpaces(resultValue.name) + '-category-title">';
                    buildCategoryDropdownOutput += '<div>';
                    buildCategoryDropdownOutput += '<h2>' + resultValue.name + '</h2>';
                    buildCategoryDropdownOutput += '</div>';
                    buildCategoryDropdownOutput += '<div class="edit-delete-category">';
                    buildCategoryDropdownOutput += '<a  id="updateCategory" onclick=showEditCategory("' + resultValue._id + '@' + removeSpaces(resultValue.name) + '")>Update</a> ';
                    buildCategoryDropdownOutput += '<a  id="deleteCategory" onclick=deleteCategory("' + resultValue._id + '")>Delete</a>';
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
                                    buildSubCategoryDropdownOutput += '<a  id="showEditSubCategory" onclick=showEditSubCategory("' + resultValue._id + '@' + removeSpaces(resultValue.name) + '")>Update</a> ';
                                    buildSubCategoryDropdownOutput += '<a  id="deleteSubCategory" onclick=deleteSubCategory("' + resultValue._id + '")>Delete</a>';
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
                                            if ((!result) || (result != undefined) || (result != "")) {

                                                $("#subcat-" + removeSpaces(resultValue.name) + "-cards").html('');
                                                var buildCardItemDropdownOutput = "";
                                                $.each(result, function (resultKey, resultValue) {

                                                    //                    <!--       start card-->

                                                    buildCardItemDropdownOutput += '<section id="completed-card-' + removeSpaces(resultValue.name) + '" class="completed-card-content">';
                                                    buildCardItemDropdownOutput += '<div class="edit-delete-card">';
                                                    buildCardItemDropdownOutput += '<a onclick=showEditItem("' + resultValue._id + '@' + removeSpaces(resultValue.name) + '")>Update name</a> ';
                                                    buildCardItemDropdownOutput += '<a onclick=deleteItem("' + resultValue._id + '")>Delete</a>';
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
                    $('#example-card-category').html(result);
                } else {
                    $('#example-card-category').html("no category");
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
                    $('#example-card-item').html(result);
                } else {
                    $('#example-card-item').html("no item");
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

                $.each(result, function (resultKey, resultValue) {
                    buildCardIconDropdownOutput += '<div class="item" data-value="' + resultValue.url + '">';
                    buildCardIconDropdownOutput += '<i class="af flag">';
                    buildCardIconDropdownOutput += '<img id="' + resultValue.url + '" src="/icon-images/' + resultValue.url + '" alt="">';
                    buildCardIconDropdownOutput += '</i>' + resultValue.name;
                    buildCardIconDropdownOutput += '</div>';
                });

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

function showEditCategory(categoryIDAndCategoryName) {
    let categoryIDAndCategoryNameArray = categoryIDAndCategoryName.split("@");
    let categoryID = categoryIDAndCategoryNameArray[0];
    let categoryName = categoryIDAndCategoryNameArray[1];

    let buildShowEditCategoryHTML = "<form class='editShowAllCategoryForm' id='edit-" + categoryName + "'-form'>";

    buildShowEditCategoryHTML += "<div id='categoryUpdateInput'>";
    buildShowEditCategoryHTML += "<input class='editShowAllInputText' type='text' name='category-name' placeholder='Category name' value='" + categoryName + "'>";
    buildShowEditCategoryHTML += "<input class='editShowAllInputHidden' type='hidden' name='category-id' placeholder='Category ID' value='" + categoryID + "'>";
    buildShowEditCategoryHTML += "</div>"
    buildShowEditCategoryHTML += "<div id='updateCancelCategory'>";
    buildShowEditCategoryHTML += "<button id='updateCategory' class='editShowAllInputButton' type='submit'>Update</button>";
    buildShowEditCategoryHTML += "<a id='cancelUpdateCategory' class='editShowAllInputButton' onclick=displayAll()>Cancel</a>";
    buildShowEditCategoryHTML += "</div>";
    buildShowEditCategoryHTML += "</form>";
    $('#' + removeSpaces(categoryName) + '-cat h2').html(buildShowEditCategoryHTML);
    $('.edit-delete-category').hide();
}

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
    buildShowEditSubCategoryHTML += "<button id='updateSubCategory' class='editShowAllInputButton' type='submit'>Update</button>";
    buildShowEditSubCategoryHTML += "<a id='cancelUpdateSubCategory'class='editShowAllInputButton' onclick=displayAll()>Cancel</a>";
    buildShowEditSubCategoryHTML += "</div>";
    buildShowEditSubCategoryHTML += "</form>";
    $('#subcat-' + removeSpaces(subCategoryName) + ' h4').html(buildShowEditSubCategoryHTML);
    $('.edit-delete-sub-category').hide();
}

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
    buildShowEditItemHTML += "<a id='cancelUpdateItem' class='editShowAllInputButton' onclick=displayAll()>Cancel</a>";
    buildShowEditItemHTML += "</div>";
    buildShowEditItemHTML += "</form>";
    $('#completed-card-' + removeSpaces(itemName) + ' h5').html(buildShowEditItemHTML);
}

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
            // check if there items
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
                //Add alert that asks user, "Are you sure you want to delete subCategory?
                //button to cancel delete request that will go back to "displayAll
            } else {
                confirm('Are you sure you want to delete this sub-category?')

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
    let userConfirmation = confirm('Are you sure you want to delete this item?');
    console.log(userConfirmation);
    if (userConfirmation == true) {
        displayAll();

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
}



// step 3. dynamically created layout to display home screen
$(document).ready(function () {

    $('.ui.dropdown').dropdown();
    $('.hide-everything').hide();
    $('#navigation').show();
    //hide the following once you set up login options
    $('#nav-home, #nav-display-categories, #nav-add-new').show();
    $('#header').show();
    $('#site-info-wrapper').show();

    //    hiding new-category, subCategory, card item, image input field
    $('#add-category').hide();
    $('#add-sub-category').hide();
    $('#add-card-item').hide();
    $('#example-image').hide();
    $('#save-card-button').hide();
    $('#add-card-main').hide();
    displayCategoryDropdown();
});


//*****ALL NAV OPTION PAGES*****

$(document).on("click", '#nav-about', function (event) {
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#site-info-wrapper').show();
});

$(document).on("click", '#nav-home', function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#home-page-icons').show();
});

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

$(document).on("click", '#nav-display-categories', function (event) {
    event.preventDefault();

    displayAll();

    $('.hide-everything').hide();
    $('#navigation').show();
    $('#category-display-wrapper').show();
});

$(document).on("click", '#nav-add-new', function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#navigation').show();
    $('#add-card-main').show();
    $('#add-card-wrapper-form').show();
    $('#example-card-display-wrapper').show();
    $('#save-card-button').show();
    $('#select-cat').focus();
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
        $('#add-category input').focus();
    } else if (selectCategoryIDValue == "selectCategory") {
        alert('Please make a selection');
    } else {
        globalSelectedCategory = selectCategoryIDValue
        displaySubCategoryDropdown(selectCategoryIDValue);
        $('#add-dropdown-categories').show();
        displayNameByID(selectCategoryIDValue, "category");
        $('#selectCategoryIDValue').val(selectCategoryIDValue);
        $('#select-sub-cat').focus();
    }
    console.log(globalSelectedCategory);
});

function checkCategoryDuplicate(categoryName) {
    $.ajax({
            type: 'GET',
            url: '/check-category-duplicate-by-name/' + categoryName,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            processCategoryDuplicate(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function processCategoryDuplicate(result) {
    return result;
}
//HELP, need validation if user is trying to add a category that already exists
$(document).on("click", '#add-category-button', function (event) {
    event.preventDefault();
    let cardCategory = $('#add-category input').val();


    let lowerName = cardCategory.toLowerCase();
    let upperName = cardCategory.toUpperCase();
    console.log(cardCategory, lowerName, upperName);
    console.log(processCategoryDuplicate(cardCategory));

    console.log(cardCategory);
    if (cardCategory == "") {
        alert("Please enter a category");
    } else if (cardCategory == processCategoryDuplicate(cardCategory)) {
        alert('Category already exists, please select from list');
    } else if (cardCategory == processCategoryDuplicate(lowerName)) {
        alert('Category already exists, please select from list');
    } else if (cardCategory == processCategoryDuplicate(upperName)) {
        alert('Category already exists, please select from list');
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
                $('#select-cat').focus();

            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$(document).on("change", '#select-sub-cat', function (event) {
    event.preventDefault();
    let selectSubCategoryIDValue = $('#select-sub-cat').val();
    let selectCategoryIDValue = $('#select-cat').val();
    let addSubCategoryShow = $('#add-sub-category').show();
    let addSubCategoryHide = $('#add-sub-category').hide();

    if ((selectSubCategoryIDValue == "addSubCategory") && (selectCategoryIDValue == "addCategory") || (selectCategoryIDValue == "selectCategory")) {
        alert('Please select a category');

    } else if (selectSubCategoryIDValue == "addSubCategory") {
        $('#add-sub-category').show();
        $('#add-sub-category input').focus();
    } else if ((selectSubCategoryIDValue == "selectSubCategory") && (selectCategoryIDValue == "addCategory") || (selectCategoryIDValue == "selectCategory")) {
        alert('Please select a category');
    } else if (selectSubCategoryIDValue == "selectSubCategory") {
        alert('Please make a selection');
    } else {
        globalSelectedSubCategory == selectSubCategoryIDValue;
        displayCardItemDropdown(selectSubCategoryIDValue)
        $('#example-card-category').show();
        $('#example-sub-cat-wrapper').show();
        $('#example-card-sub-cat').show();
        displayNameByID(selectSubCategoryIDValue, "subcategory");
        $('#example-card').show();
        $('#blank-image').show();
        $('#selectSubCategoryIDValue').val(selectSubCategoryIDValue);
        $('#select-card-item').focus();
    }
});

function checkSubCategoryDuplicate(subCategoryName) {
    $.ajax({
            type: 'GET',
            url: '/check-sub-category-duplicate-by-name/' + subCategoryName,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            processSubCategoryDuplicate(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function processSubCategoryDuplicate(result) {
    return result;
}

$(document).on("click", '#add-sub-category-button', function (event) {
    event.preventDefault();
    let cardCategory = $('#add-category input').val();
    if (cardCategory == "") {
        cardCategory = $('#selectCategoryIDValue').val();
    }

    let cardSubCategory = $('#add-sub-category input').val();

    let lowerName = cardSubCategory.toLowerCase();
    let upperName = cardSubCategory.toUpperCase();
    console.log(cardSubCategory, lowerName, upperName);
    console.log(processSubCategoryDuplicate(cardSubCategory));
    console.log(cardSubCategory);

    if (cardCategory == "") {
        alert("Please select a category");
    } else if (cardSubCategory == "") {
        alert("Please enter a sub category");
    } else if (cardSubCategory == processSubCategoryDuplicate(cardSubCategory)) {
        alert('Sub-category already exists, please select from list');
    } else if (cardSubCategory == processSubCategoryDuplicate(lowerName)) {
        alert('Sub-category already exists, please select from list');
    } else if (cardSubCategory == processSubCategoryDuplicate(upperName)) {
        alert('Sub-category already exists, please select from list');
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
                $('#select-sub-cat').focus();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$(document).on("click", '#select-icon-wrapper .item', function (event) {
    event.preventDefault();
    let cardIcon = $('input[name="country"]').val();
    $("#example-card-display-wrapper #blank-image").css('background-image', 'url(/icon-images/' + cardIcon + ')');
});

$(document).on("change", '#select-card-item', function (event) {
    event.preventDefault();
    let selectCardItemNameValue = $('#select-card-item').val();
    let cardItemID = $('#selectCardItemIDValue').val();
    let selectCategoryIDValue = $('#select-cat').val();
    let cardSubCategory = $('#selectSubCategoryIDValue').val();
    let addCardItemShow = $('#add-card-item').show();
    let addCardItemHide = $('#add-card-item').hide();
    let selectSubCategoryIDValue = $('#select-sub-cat').val();
    //    let cardItemNameValue =

    console.log("selectCardItemNameValue = ", selectCardItemNameValue)

    if ((cardItemID == "addCardItem") && (selectCategoryIDValue == "selectCategory") || (selectCategoryIDValue == "addCategory") ||
        (selectSubCategoryIDValue == "selectSubCategory") || (selectSubCategoryIDValue == "addSubCategory")) {
        alert('Please select a category and subcategory');
        console.log("addCardItem");
    } else if ((cardItemID == "addCardItem") && (selectSubCategoryIDValue == "selectSubCategory") || (selectSubCategoryIDValue == "addSubCategory")) {
        alert('Please select a subcategory');
        console.log("addCardItem");
    } else if (selectCardItemNameValue == "addCardItem") {
        $('#add-card-item').show();
        $('#add-card-item input').focus();
    } else if ((selectCardItemNameValue == "selectCardItem") && (selectSubCategoryIDValue == "selectSubCategory") || (selectSubCategoryIDValue == "addSubCategory")) {
        alert('Please select a subcategory');
    } else if (selectCardItemNameValue == "selectCardItem") {
        alert('Please make a selection');
    } else {

        $('#selectCardItemIDValue').val(selectCardItemNameValue);

        globalCardItem == selectCardItemNameValue;
        displayCardIconsDropdown(selectCardItemNameValue);
        $('.search').focus();
        $('#add-card-main').show();
        $('#selectCardItemNameValue').html('.search');
        displayNameByID(selectCardItemNameValue, "item");
    }
});

function checkItemDuplicate(ItemName) {
    $.ajax({
            type: 'GET',
            url: '/check - item - duplicate - by - name/' + ItemName,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            processItemDuplicate(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function processItemDuplicate(result) {
    return result;
}

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

    let lowerName = cardItem.toLowerCase();
    let upperName = cardItem.toUpperCase();
    console.log(cardItem, lowerName, upperName);
    console.log(processItemDuplicate(cardItem));
    console.log(cardItem);

    if (cardItem == "") {
        alert("Please enter an item");
    } else if (cardItem == processItemDuplicate(cardItem)) {
        alert('Item already exists, please select from list');
    } else if (cardItem == processItemDuplicate(lowerName)) {
        alert('Item already exists, please select from list');
    } else if (cardItem == processItemDuplicate(upperName)) {
        alert('Item already exists, please select from list');
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
                $('#add-card-item').hide();
                displayNameByID(cardItem, "item");
                $('#select-card-item').focus();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }


});

$(document).on("click", '#save-card-button', function (event) {
    event.preventDefault();

    let selectCategoryIDValue = $('#select-cat').val();
    let selectCardItemNameValue = $('#select-card-item').val();
    let cardSubCategory = $('#selectSubCategoryIDValue').val();
    let cardItemID = $('#selectCardItemIDValue').val();
    let cardItemName = $('#selectCardItemNameValue').val();
    let cardIcon = $('input[name="country"]').val();


    if ((selectCategoryIDValue == "selectCategory") || (selectCategoryIDValue == "addCategory") ||
        (selectSubCategoryIDValue == "selectSubCategory") || (selectSubCategoryIDValue == "addSubCategory") ||
        (selectCardItemNameValue == "selectCardItem") || (selectCardItemNameValue == "addCardItem")) {
        alert('Please select a category, subcategory, item and icon');
    } else if (cardIcon == "") {
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

    displayCardIconsDropdown();
});

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
        $('#example-image').html(selectImageValue).hide();
    }
});
