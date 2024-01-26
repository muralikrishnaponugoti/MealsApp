# MealsApp
this meal app is designed using api from themealdb.com
features:-
  - user can search any meal with meal name if the meal name present it will display the meal or some meals where the displayed meals names are contains user specified name .if the user press enter with out entering name of the meal it will display a dialogue box
  - user can choose to display a random meal by clicking random meal button
  -  user can make a like to the displayed meals and all those liked meals will display after clicking the favourite button
  -  there have a button called read more button which is used to know more about specific meal when the user click on that button it will display making process steps with youtube video link all these will display in new tab
  -  if the window width is less than 420px then the main random button and favourite button will go under the menu bar button which will display only after clicking the menu bar button
  -  if user need to close the button then user need to click the cross('x') image
- for both index.html file and respectiveMeal.html file will have a single javascript file which is mealsApp_js.js file
links:-
link 1:`https://www.themealdb.com/api/json/v1/1/random.php`
link 2: `https://www.themealdb.com/api/json/v1/1/search.php?s=${name-value}`
link 3: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id-value}`
i used the above 3 links for to fetch the data according to the user input
link 1 is used for to fetch the data of the  random meal
link 2 is used for to fetch  the data of the user specified meal 
link 3 is used for to fetch the data of the meal with specied meal id this used for internal purpose inorder to check the which specific  user need to see
