# Non-verbal communication fullstack capstone

Link to live application: https://non-verbal-communication.herokuapp.com/

# Goal & Use Case

This is a simple communication app for someone suffering from ataxia or other language impairment. There are other apps for this condition but they typically require that the user know what words they are looking for in order to create a sentence.

My mother is a stroke survivor. She can read and she understands what people are saying but has difficulty finding words and knowing what word she wants. It is much easier for her to communicate with pictures. It is also difficult for her to respond to a question like, "Do you want eggs or cereal for breakfast?" She will nod her head yes to both but if she sees a picture, she will point to the one she wants and if there is a phrase under the picture, she can read it.



# Screenshots
![image1](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/landing-page.png)

![image2](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/register-new-user-page.png)

![image3](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/questions-page.png)

![image4](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/instructions-to-create-sop.png)

![image5](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/create-sop-freestyle-page.png)

![image6](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/create-sop-template-page.png)

![image7](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/set-goals-page.png)

![image8](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/sop-values-beliefs-goals-final-page.png)

![image9](https://github.com/kimcheru18/define-statement-of-purpose-node-capstone/blob/master/github-images/revise-sop-page.png)


# User Stories & Initial UX

**Landing Page**
Step 1. Initial landing page explains what app is for.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/site-info-page.png)

**Login Page**
Step 2. User will login to their account here.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/login-page.png)

**Register Page**
Step 3. User registers for account.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/register-page.png)

**Add New Card Page**
Step 4. User clicks "NEW" from navigation section. All options are displayed except icon selection. A mock card is also displayed that will update as user selects or adds content.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/add-card-page.png)

**Select or Add Category Page**
Step 5. User selects existing category or "add category" from dropdown list.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/select-add-category-page.png)

**Add Category Input Page**
Step 6. User enters new category into input field and presses "add" to continue.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/add-category-input-page.png)

**Select or Add Subcategory Page**
Step 7. After selecting or adding a category, user selects existing subcategory or "add category" option from dropdown list.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/add-subcat-page.png)

**Add Subcategory Input Page**
Step 8. User enters new subcategory into input field and presses "add" to continue.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/add-subcat-input-page.png)

**Select or Add Item Page**
Step 9. After selecting or adding a subcategory, user selects existing item or "add item" from dropdown list.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/select-add-item-page.png)

**Add Item Input / Icon Dropdown Page**
Step 10. When user selects an item from the dropdown list, the icon dropdown search field is displayed. When user selects "add item" from dropdown, add item input and icon dropdown search field are displayed.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/item-input-icon-dropdown-page.png)

**Search Icon Page**
Step 11. User can add an icon to card by searching and selecting from the dropdown list or selecting from cards that are displayed.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/select-icon-page.png)

**Card Dropdown/Display All Cards**
Step 12. User can display all existing cards.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/display-all-cards-page.png)

**Card Dropdown/Display Specific Card**
Step 12. User can display a specific card from the navigation dropdown list.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/display-all-cards-page.png)

**Category Dropdown/Display All Categories**
Step 12. User can display all existing cards.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/display-all-cards-page.png)

**Category Dropdown/Display Specific Category**
Step 12. User can display a specific category from the navigation dropdown list.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/display-all-category-page.png)

**Update Delete Page**
Step 8. User can update icon or text. User can delete card.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/update-delete-page.png)

**Home Page**
Step 9. Displays all categories as clickable buttons to enter that category.
![image1](https://github.com/kimcheru18/non-verbal-communication-fullstack-capstone/blob/master/wireframe-images/home-page.png)


# Technical stack

**Front-end**
 * HTML5
 * CSS3
 * JavaScript
 * jQuery

**Back-end**
 * NodeJS
 * Mongoose / MongoDB
 * Heroku (hosting)

**Testing**
 * Mocha & Chai
 * TravisCI

**Responsiveness**
 * The site is fully responsive on most mobile & laptop devices.
 * Tested on Chrome, Firefox & Safari.

**Security**
 * Passport
 * Bcrypt

# Development Roadmap

### Version 1.1
 *Allow users to capture their own images and add to app
