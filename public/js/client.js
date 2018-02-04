// step 1. Defining global variables

//1. User loads page
//  a. nav options
//        -Reflect takes user to existing SOP, Values, Beliefs and Goals
//        -Create takes user to edit page for SOP
//        -Review takes user to questions that they answered where they can edit answers including values and beliefs
//2. User has option to sign in, create new account or continue to create SOP
//3. User selects 'Let's get started'
//4. User enters answer in answer fields
//5. User clicks Save and Contiue.
//6. Once user has answered all questions, they have the option to create SOP free-style or use template
//7. If using template, user can alter text when finished filling in blank fields
//8. User clicks Save once finished writing SOP




var loggedInUser = "";

// step 2. Defining functions
//function displayUpdatedStatement(username) {
//    let retrieveUserSop = {};
//    $.ajax({
//            type: 'GET',
//            url: '/statements/' + username,
//            dataType: 'json',
//            contentType: 'application/json'
//        })
//        .done(function (result) {
//            if ((!result) || (result != undefined) || (result != "")) {
//                retrieveUserSop = result;
//            }
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//    return retrieveUserSop;
//}

// step 3. dynamically created layout to display home screen
$(document).ready(function () {

    $('.hide-everything').hide();
    $('#login').show();
    $('#navigation').show();

    $('#register-account-here').click(function () {

        $('.hide-everything').hide();
        $('#register-new-user').show();

    });

    $('#register-account').click(function () {
        $('.hide-everything').hide();
        $('#login').show();
    });



    $('#login-account').click(function () {
        $('.hide-everything').hide();
        $('#logout').show();
        $('#navigation-options').show();
        $('#nav-new-category').show();
        $('#dropdown').show();
    });




    $('#nav-new-category').click(function () {
        $('.hide-everything').hide();
        $('#nav-new-category').show();
        $('#add-new-category').show();
        $('#add-subcategory-item').hide();
        $('#add-card-item').hide();
        $('#icon-selection-wrapper').hide();
        $('#add-category-input').focus();
    });




    $('#add-category-input').keypress(function (event) {
        const newCategory = $('#add-category-input').val();

        if (newCategory == '' && event.which == 13) {
            alert('Please add a new category')
        } else if(!(newCategory == '') && event.which == 13){
            $('.hide-everything').hide();
            $('#nav-new-category').show();
            $('#add-new-category').show();
            $('#add-category-item').hide();
            $('#add-card-item').hide();
            $('#icon-selection-wrapper').hide();
            $('#add-subcategory-item').show();
            $('#add-subcategory-input').focus();
        }

    });



    $('#add-subcategory-input').keypress(function (event) {
        const newCategory = $('#add-category-input').val();
        const newSubcategory = $('#add-subcategory-input').val();

        if (newSubcategory == '' && event.which == 13) {
            alert('Please add a new subcategory')
        } else if(!(newSubcategory == '') && event.which == 13){

            $('#category-title').val(newCategory);
            $('.hide-everything').hide();
            $('#nav-new-category').show();
            $('#add-new-category').show();
            $('#add-category-item').hide();
            $('#add-subcategory-item').hide();
            $('#add-card-item').show();
            $('#add-card-input').focus();
        }
    });

    $('#add-card-input').keypress(function (event) {
        const newCard = $('#add-card-input').val();

        if (newCard == '' && event.which == 13) {
            alert('Please add a new card')
        } else if(!(newCard == '') && event.which == 13){
            $('.hide-everything').hide();
            $('#nav-new-category').show();
            $('#add-new-category').show();
            $('#add-category-item').hide();
            $('#add-subcategory-item').hide();
            $('#add-card-item').hide();
            $('#icon-selection-wrapper').show();
            $('#icon-search').focus();
        }
    });

    $('#icon-search').keypress(function (event) {
        let addIcon = $('#icon-search').val();
        let newCategory = $('#add-category-input').val();
        let newSubcategory = $('#add-subcategory-input').val();
        let newCard = $('#add-card-input').val();
        let updateHtml = $('#category-title').html();


        if(!(addIcon == '') && event.which == 13){

            document.getElementById(updateHtml).innerHTML = newCategory;

            $('.hide-everything').hide();
            $('#nav-new-category').show();
            $('#add-new-category').show();
            $('#add-content-wrapper').hide();
            $('#card-added').show();
        }
    });




//    $('.login-account').click(function () {
//
//        const inputUname = $('.signin-username').val();
//        const inputPw = $('.signin-password').val();
//
//        if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
//            alert('Please enter a valid username');
//        } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
//            alert('Invalid password');
//        } else {
//            const unamePwObject = {
//                username: inputUname,
//                password: inputPw
//            };
//            user = inputUname;
//            $.ajax({
//                    type: "POST",
//                    url: "/users/signin",
//                    dataType: 'json',
//                    data: JSON.stringify(unamePwObject),
//                    contentType: 'application/json'
//                })
//                .done(function (result) {
//                    loggedInUser = result;
//                    $('.hide-everything').hide();
//                    $('.logout-account').show();
//                    $('#finalLoggedinUser').val(loggedInUser);
//
//
//
//
//                    $.ajax({
//                            type: 'GET',
//                            url: '/statements/' + loggedInUser,
//                            dataType: 'json',
//                            contentType: 'application/json'
//                        })
//                        .done(function (result) {
//                            let retrieveUserSop = {};
//                            if ((!result) || (result != undefined) || (result != "")) {
//                                retrieveUserSop = result;
//                            }
//
//                            if (retrieveUserSop != "") {
//                                //display final page with statement
//
//                                $('.create-text').html(retrieveUserSop.body);
//                                $('.updated-sop-id').val(retrieveUserSop._id);
//                                $('.purpose p').html(retrieveUserSop.body);
//                                $('.my-goals').html(retrieveUserSop.goals);
//
//                                let valuesArray = retrieveUserSop.values.split(",");
//                                $('.values ul').html("");
//                                for (let i = 0; i < valuesArray.length; i++) {
//                                    $('.values ul').append("<li>" + valuesArray[i] + "</li>");
//                                }
//
//                                let beliefsArray = retrieveUserSop.beliefs.split(",");
//                                $('.beliefs ul').html("");
//                                for (let j = 0; j < beliefsArray.length; j++) {
//                                    $('.beliefs ul').append("<li>" + beliefsArray[j] + "</li>");
//                                }
//
//                                let goalsArray = retrieveUserSop.goals.split(",");
//                                $('.goals ul').html("");
//                                for (let k = 0; k < goalsArray.length; k++) {
//                                    $('.goals ul').append("<li>" + goalsArray[k] + "</li>");
//                                }
//
//                                $('.navigate-options').show();
//                                $('.hide-nav-create').hide();
//                                $('.hide-nav-review').hide();
//                                $('.hide-nav-revise').show();
//                                $('.logout-account').show();
//                                $('#completed-sop').show();
//                                $('#values-beliefs-goals').show();
//                                $('.hide-review-answers').hide();
//                                $('.hide-questions').hide();
//                                $('.template-sop').hide();
//
//                            } else {
//                                $('#sop-description-info').show();
//                                $('.hide-nav-review').show();
//                                $('.hide-nav-revise').hide();
//                            }
//                        })
//                        .fail(function (jqXHR, error, errorThrown) {
//                            console.log(jqXHR);
//                            console.log(error);
//                            console.log(errorThrown);
//                        });
//                })
//                .fail(function (jqXHR, error, errorThrown) {
//                    console.log(jqXHR);
//                    console.log(error);
//                    console.log(errorThrown);
//                    alert('Invalid username and password combination. Please check your username and password and try again.');
//                });
//        };
//    });







//    $('.register-account').click(function (event) {
//        event.preventDefault();
//
//        const uname = $('.register-username').val();
//        const pw = $('.register-password').val();
//        const confirmPw = $('.register-confirm-password').val();
//
//        if (uname == "") {
//            alert('Please specify username');
//        } else if ((pw !== confirmPw) || (pw == "")) {
//            alert('Passwords must match and not be empty!');
//        } else {
//            const newUserObject = {
//                username: uname,
//                password: pw
//            };
//
//            $.ajax({
//                    type: 'POST',
//                    url: '/users/create',
//                    dataType: 'json',
//                    data: JSON.stringify(newUserObject),
//                    contentType: 'application/json'
//                })
//                .done(function (result) {
//                    alert('Thanks for signing up! You may now sign in with your username and password.');
//
//                    $('.hide-everything').hide();
//                    $('#sop-description-info').show();
//                    $('#login-sop').show();
//                })
//                .fail(function (jqXHR, error, errorThrown) {
//                    console.log(jqXHR);
//                    console.log(error);
//                    console.log(errorThrown);
//                });
//        };

//    });


//
//    $('.start-button').click(function () {
//        if (!(loggedInUser)) {
//            alert('Please login or register');
//        } else {
//            $('.logged-in-username').val(loggedInUser);
//            $('.hide-everything').hide();
//            $('.logout-account').show();
//            $('#questions').show();
//            $('.get-started-instructions').show();
//            $('.answer-questions').show();
//            $('.enter-value-belief').show();
//        };
//    });


//
//    $('.save-answers-button').click(function (event) {
//        event.preventDefault();
//        let answer1 = $('.js-answer1').val();
//        let answer2 = $('.js-answer2').val();
//        let answer3 = $('.js-answer3').val();
//        let answer4 = $('.js-answer4').val();
//        let answer5 = $('.js-answer5').val();
//        let answer6 = $('.js-answer6').val();
//        let sopLoggedInUser = $('.logged-in-username').val();
//
//        if ((answer1 == "") || (answer2 == "") || (answer3 == "") || (answer4 == "") || (answer5 == "") || (answer6 == "")) {
//            alert("Please complete each field");
//            return;
//        } else {
//
//            $('.js-completed-sop1').val(answer1);
//            $('.js-completed-sop2').val(answer2);
//            $('.js-completed-sop3').val(answer3);
//            $('.js-completed-sop4').val(answer4);
//            $('#finalValues').val(answer5);
//            $('#finalBeliefs').val(answer6);
//
//
//            usersAnswers.push(answer1, answer2, answer3, answer4, answer5, answer6, sopLoggedInUser);
//
//            for (let i = 0; i < usersAnswers.length; i++) {
//                $('.js-connect-answer' + (i + 1)).text(usersAnswers[i]);
//            };
//
//            $('.js-connect-answer5').html("");
//            $('#values-beliefs-goals .values ul').html("");
//
//            let valuesArray = answer5.split(",");
//            for (let j = 0; j < valuesArray.length; j++) {
//                $('#values-beliefs-goals .values ul').append("<li>" + valuesArray[j] + "</li>");
//                $('.js-connect-answer5').append("<li>" + valuesArray[j] + "</li>");
//            };
//
//
//            $('.js-connect-answer6').html("");
//            $('#values-beliefs-goals .beliefs ul').html("");
//
//            let beliefsArray = answer6.split(",");
//            for (let h = 0; h < beliefsArray.length; h++) {
//                $('#values-beliefs-goals .beliefs ul').append("<li>" + beliefsArray[h] + "</li>");
//                $('.js-connect-answer6').append("<li>" + beliefsArray[h] + "</li>");
//            };
//
//            $('.hide-everything').hide();
//            $('.logout-account').show();
//            $('#review').show();
//        };
//    });




//    $('.create-sop-button ').click(function () {
//        var createSop = $('.create-text').val();
//        if (createSop == "") {
//            $('.hide-everything').hide();
//            $('#create').show();
//            return;
//        } else {
//            $('.hide-everything').hide();
//            $('.navigate-options').show();
//            $('.logout-account').show();
//            $('#create').show();
//        };
//    });
//
//
//
//    $('.use-template-button').click(function () {
//        $('.hide-everything').hide();
//        $('.logout-account').show();
//        $('.navigate-options').show();
//        $('#create-with-template').show();
//    });



//    $('.save-completed-button').click(function (event) {
//
//        event.preventDefault();
//        let createSopFreeStyle = $('.create-text').val();
//        let createGoals = $('.my-goals').val();
//        let sopId = $('.updated-sop-id').val();
//
//        if (createSopFreeStyle == "") {
//            alert("Please create Statement of Purpose");
//            return;
//        } else if (createGoals != "") {
//            usersCompletedSop.push(createSopFreeStyle);
//
//            $('#completed-sop .purpose p').html(createSopFreeStyle);
//
//            $('.hide-everything').hide();
//            $('.navigate-options').show();
//            $('.logout-account').show();
//            $('#completed-sop').show();
//            $('#values-beliefs-goals').show();
//            $('#finalSopBody').val(createSopFreeStyle);
//        } else {
//            usersCompletedSop.push(createSopFreeStyle);
//
//            $('#completed-sop .purpose p').html(createSopFreeStyle);
//
//            $('.hide-everything').hide();
//            $('.navigate-options').show();
//            $('.logout-account').show();
//            $('#completed-sop').show();
//            $('#create-goals').show();
//            $('#finalSopBody').val(createSopFreeStyle);
//        }
//
//        const userIdObject = {
//            body: createSopFreeStyle
//        }
//
//        $.ajax({
//                type: 'PUT',
//                url: '/statements/' + sopId,
//                dataType: 'json',
//                data: JSON.stringify(userIdObject),
//                contentType: 'application/json'
//            })
//            .done(function (result) {})
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//            });
//    });


//
//    $('.save-completed-template-button').click(function (event) {
//
//        event.preventDefault();
//        let createSopSentence1 = $('.js-completed-sop1').val();
//        let createSopSentence2 = $('.js-completed-sop2').val();
//        let createSopSentence3 = $('.js-completed-sop3').val();
//        let createSopSentence4 = $('.js-completed-sop4').val();
//        if ((createSopSentence1 == "") || (createSopSentence2 == "") || (createSopSentence3 == "") || (createSopSentence4 == "")) {
//            alert("Please create Statement of Purpose");
//            return;
//        } else {
//            let createSopTemplate = "It is my purpose to " + createSopSentence1 + ". I will grow and develop my " + createSopSentence2 + ". The people that are most important to me are " + createSopSentence3 + ". I will strive to " + createSopSentence4 + ".";
//
//
//            $('#completed-sop .purpose p').html("");
//            $('#completed-sop .purpose p').append("<p>" + createSopTemplate + "</p>");
//
//            $('#finalSopBody').val(createSopTemplate);
//        }
//
//        $('.hide-everything').hide();
//        $('.logout-account').show();
//        $('.navigate-options').show();
//        $('#completed-sop').show();
//        $('#create-goals').show();
//    });




//    $('.save-goals-button').click(function () {
//        let user = $('#finalLoggedinUser').val();
//        let body = $('#finalSopBody').val();
//        let values = $('#finalValues').val();
//        let beliefs = $('#finalBeliefs').val();
//        let goals = $('.my-goals').val();
//        if (goals == "") {
//            alert("Please create goals");
//            return;
//        } else {
//            $('#values-beliefs-goals .goals ul').html("");
//            let goalsArray = goals.split(",");
//            for (let k = 0; k < goalsArray.length; k++) {
//                $('#values-beliefs-goals .goals ul').append("<li>" + goalsArray[k] + "</li>");
//            };
//            $('.hide-everything').hide();
//            $('.navigate-options').show();
//            $('.logout-account').show();
//            $('#completed-sop').show();
//            $('#values-beliefs-goals').show();
//
//            const userStatementObject = {
//                user: user,
//                body: body,
//                values: values,
//                beliefs: beliefs,
//                goals: goals
//            }
//
//            $.ajax({
//                    type: 'POST',
//                    url: '/statements/create',
//                    dataType: 'json',
//                    data: JSON.stringify(userStatementObject),
//                    contentType: 'application/json'
//                })
//                .done(function (result) {
//
//                })
//                .fail(function (jqXHR, error, errorThrown) {
//                    console.log(jqXHR);
//                    console.log(error);
//                    console.log(errorThrown);
//                });
//            displayUpdatedStatement(user);
//        }
//    });



    $('#logout').click(function () {
        window.location.reload();
    });
});
