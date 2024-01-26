// link 1:`https://www.themealdb.com/api/json/v1/1/random.php` it is used to fetch the random meal
// link 2: `https://www.themealdb.com/api/json/v1/1/search.php?s=${name-value}` it is used to featch the meals close to the specifid value which is a name of the meal
// link 3: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id-value}` it is used to get the meal by using specified mealid
let favouriteList={meals:[]};
let randomList={};
let searchList={};
let respectiveMealId;
var menuBarClicked=0;
let itemsList=document.getElementById('itemsList');
const app={
    init:() =>{
        document.addEventListener('DOMContentLoaded',app.load);
        console.log('html loaded');//this will print after the page has finished to load its html
    },
    load:() =>{
        app.loadPage();
    },
    loadPage:() =>{
        let page=document.body.id;
        switch(page){
            case 'mealsapp': // this case is to handle the main page
                function favouriteHandler(){
                    if(favouriteList.meals.length)// here if the lavouriteList.meals have objects then it will call app.displayList
                        app.displayList(favouriteList,'call from fav');
                    else
                        alert('your favourite list is empty');
                }
                async function searchBoxHandler(event){
                    app.searchBoxHandler(event);
                }
                async function randomHandler(){
                    console.log('called');
                    await app.randomHandler();
                }

            //the below are event listeners
                document.getElementById('random-button').addEventListener('click', function(){
                    randomHandler(); // this is for handling event after clicking the random meal button
                })

                //the below will handle the random button which is in the menu bar in small display
                document.getElementById('random-btn').addEventListener('click', function(){
                    randomHandler(); // this is for handling event after clicking the random meal button
                })

                // the below will handle of the main favourite button 
                document.getElementById('favourite-button').addEventListener('click',async function(){
                    favouriteHandler(); // this for handling the event after clicking the favourite button
                })

                // the below will hadnle of the favourite button which is in the menu bar in small display
                document.getElementById('favourite-btn').addEventListener('click',async function(){
                    favouriteHandler(); // this for handling the event after clicking the favourite button
                })
        
                document.getElementById('search').addEventListener('keypress', function(event){
                    searchBoxHandler(event); // this for handling the event whiling the pressing the key in the search box
                })

                document.getElementById('search-img').addEventListener('click',function(event){
                    searchBoxHandler(event); // this for handling the event after clicking the search image button
                });
               //the below two are for handling the menu bar event whihc will display in small displays 
                document.getElementById('menu').addEventListener('click',function(){
                    document.getElementById('menu-box').classList.remove('menu-box-styles');
                });
                document.getElementById('close').addEventListener('click',function(event){
                    event.stopPropagation();// here it will Prevent the click event from propagating to the parent
                    document.getElementById('menu-box').classList.add('menu-box-styles');
                });
                break;

            case 'respectiveMeal': //this case is to handle the specific meal page which is read more of the specific meal
                // console.log('2nd page called');
                const params = new URLSearchParams(window.location.search);// here we are searching the parameters in the url
                const respectiveMealId = JSON.parse(decodeURIComponent(params.get('respectiveMealId')));// here we are getting the value of the respectiveMealId which is passed as in url from parent window
                app.respectiveMealHandler(respectiveMealId);// here this will calling  handler of the respective meal page 
                break;
        }
    },
    // the below will handle the random button events
    randomHandler:async()=>{
        await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`) // here it will fetch the random meal
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            randomList=data;
            app.displayList(randomList,'call from random');
        }).catch((error)=>{
            console.log('error',error);
        })
    },
    //the below will handle the search events
    searchBoxHandler:async(event)=>{
        itemsList.innerHTML='';
        let dish=document.getElementById('search').value;
           if(event.key === 'Enter' || event.type === 'click'){
                if(dish){
                    event.preventDefault();// here we are preventing the default behavour because we are preventing the behavour of form reloading 
                                            //which means if we not give this statment the form will reload and the values will gone;
                }
                else
                    return;
            }
        if(dish){
            let url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`;
            await fetch(url)
            .then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data.meals){
                    app.displayList(data,'call from search');
                }
                else
                    if(event.key === 'Enter' || event.type === 'click')
                    {
                        alert('item not found');
                    }
            }).catch((error)=>{
                console.log('error',error);
            })
        }
    },
    // the below will handle the like events
    likeEventHandler:(text)=>{
        let likedList=document.getElementsByClassName('liked');// here it returns a nodeList which does not support forEach function
        likedList=Array.from(likedList);//here we are converting nodeList to array list
        likedList.forEach(function(item){
            item.addEventListener('click',function(event){
                randomList.meals.forEach(function(meal){
                    // console.log(meal.idMeal,event.target.id);
                    if(meal.idMeal===event.target.id)
                    {
                        if(meal.hasOwnProperty('liked')){
                            // console.log(meal.liked);
                            if(meal.liked==='true'){
                                event.target.parentNode.style.backgroundColor='transparent';
                                meal.liked='false';
                                if(favouriteList.meals){
                                    favouriteList.meals.forEach(function(favMeal){
                                        if(favMeal.idMeal===event.target.id){
                                            favouriteList.meals.splice(favouriteList.meals.indexOf(favMeal),1);
                                            if(text==='call from fav')
                                                app.displayList(favouriteList,text);
                                        }
                                    })
                                }
                            }
                            else{
                                event.target.parentNode.style.backgroundColor='rgb(62, 54, 54)';
                                meal.liked='true';
                                favouriteList.meals.push(meal);
                            }
                        }
                        else{
                            event.target.parentNode.style.backgroundColor='rgb(62, 54, 54)';
                            meal.liked='true';
                            favouriteList.meals.push(meal);
                        }
                    }   
                })
            })
        })
    },
    // the below will handle the display events
    displayList:(list,text)=>{
        // console.log(text);
        randomList=list;
        itemsList.innerHTML='';
        list.meals.forEach((meal)=>{
            let li=document.createElement('li')
            li.innerHTML=`<div id="item-box">
                <img src="${meal.strMealThumb}" alt="img">
                <h4>${meal.strMeal}</h4>
                <div>
                    <button onclick="app.specificMealPage(event)" id="${meal.idMeal}">Read More</button>
                    <div><img class="liked" id="${meal.idMeal}" src="../web_images/heart-icon.svg" alt="like"></div>
                </div>
            </div>`;
            itemsList.append(li);// here this statment will append the li element under to the element which refarence is present in the itemsList
            if(text==='call from fav'){
                document.querySelector(`img[id="${meal.idMeal}"]`).parentNode.style.backgroundColor='rgb(62, 54, 54)';
            }
            // console.log('completed');
        })
        if(!list.meals.length)
           alert('your favourite list is empty');
        app.likeEventHandler(text);
    },
    // the below will handle the respective meal page
    specificMealPage: async(event) => {
        // console.log('trying to call 2nd page');
        respectiveMealId = event.target.id;
        // console.log(respectiveMealId);
        const url = `respectiveMeal.html?respectiveMealId=${encodeURIComponent(JSON.stringify(event.target.id))}`;
        const newWindow=window.open(url, '_blank');
        newWindow.onload=() =>{
            console.log('2nd page called');
            app.init();
        }
    },
    //this will handle the respective meal page
    respectiveMealHandler:async(respectiveMealId)=>{
        // console.log(respectiveMealId);
        let entireList=[];
        await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${respectiveMealId}`)
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            entireList=data;
        }).catch((error)=>{
            console.log('error',error);
        })
        if (entireList) {
            // console.log('Received randomList:');
            entireList.meals.forEach(function(meal){
                // console.log(meal.idMeal,respectiveMealId);
                if(meal.idMeal===respectiveMealId){
                    var mealImg=document.querySelector('#meal-img img')
                    mealImg.setAttribute('src',`${meal.strMealThumb}`);
                    var mealContent=document.querySelector('#meal-content h3');
                    mealContent.innerText=`${meal.strInstructions}`;
                    var mealVideo=document.querySelector('#meal-content a')
                    mealVideo.setAttribute('href',`${meal.strYoutube}`);
                }
            })
        } else {
            alert('more details about the meal is not available.');
        }
    }
}
app.init();
