/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Sameer Rao
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    const id = hero.id;
    return `
        <div class='card' style="width: 30%; min-height: 600px; margin-top:20px; margin-left: 10px; float: left">
            <div style="background-color:${hero.backgroundColor}">
                <img src="${hero.img}" style="width: 30%; margin: 0 auto; display: block" />
            </div>
            <div class='card-content'>
                <div>
                    <h1 class='title'><span style="color:${hero.color}">${hero.name}</span></h1>
                </div>
                <div>
                    <h3>${hero.subtitle}</h3>
                    <p><strong>Alter ego:</strong> ${hero.first} ${hero.last}</p>
                    <p><strong>First appearance:</strong> ${hero.firstSeen}</p>
                    <br>
                    <p>${hero.description}</p>
                </div>

                <div style='margin-top: 5px'>
                    <button data-index=${hero.id} class="edit button is-link is-light">edit</button>
                <div>
            </div>
        </div>
    `;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    
    let date = new Date(hero.firstSeen);
    let year = date.getFullYear();
    let month= date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = `0${month}`;
    }

    if (day < 10) {
        day = `0${day}`;
    }

    let fullDate = `${year}-${month}-${day}`;
    // console.log(fullDate);

    return `
       <form class="form" style='margin-left: 10px; width: 95%;'>
            <div class='field'>
                <label class='label'>Hero Name</label>
                <input id='heroName-${hero.id}' class="input" type="text" value="${hero.name}">
            </div>
            <div class='field'>
                <label class="label" >First Name</label>
                <input id='first-${hero.id}' class="input" type="text" value="${hero.first}">
            </div>

            <div class="field">
                <label class="label">Last Name</label>
                <input id='last-${hero.id}' class="input" type="text" value="${hero.last}">
            </div>

            <div class='field'>
                <label class="label">Subtitle</label>
                <input id='sub-${hero.id}' class="input" type="text" value="${hero.subtitle}">
            </div>

            <div class='field'>
                <label class="label">Description</label>
                <textarea class="textarea" id='desc-${hero.id}'>${hero.description}</textarea>
            </div>

            <div class="field">
                <label class="label" >First Appearance</label>
                <input id='firstSeen-${hero.id}' class="input" type="date" value=${fullDate}>
            </div>

            <button type='submit' class='submit button is-primary is-light' data-index=${hero.id}>save</button>
            <button type='button' class='cancel button is-danger is-light' data-index=${hero.id}>cancel</button>
            <div style="height: 10px">
            </div>
       </form>
    `;
};


/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    const $card = $(event.target.closest('.card-content'));
    const heroID = event.target.getAttribute('data-index') - 1;
    $card.replaceWith(renderHeroEditForm(heroicData.find(h => h.id === (heroID + 1))));
    
    // return  [$('.submit'),$('.cancel')];
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    
    let heroID = event.target.getAttribute('data-index') - 1;
    const $wholeCard = $(event.target.closest('.card'));
    $wholeCard.replaceWith(renderHeroCard(heroicData.find(h => h.id === heroID + 1)));
    
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead

    
    event.preventDefault();
    let heroID = event.target.getAttribute('data-index') - 1;
    heroID = heroID + 1

    let newValues = {};
    newValues.id = heroicData[heroicData.indexOf(heroicData.find(h => h.id === heroID))].id;
    newValues.first=document.getElementById(`first-${heroID}`).value;
    newValues.last=document.getElementById(`last-${heroID}`).value;
    newValues.name = document.getElementById(`heroName-${heroID}`).value;
    newValues.img = heroicData[heroicData.indexOf(heroicData.find(h => h.id === heroID))].img;
    newValues.color = heroicData[heroicData.indexOf(heroicData.find(h => h.id === heroID))].color;
    newValues.backgroundColor = heroicData[heroicData.indexOf(heroicData.find(h => h.id === heroID))].backgroundColor;
    newValues.subtitle=document.getElementById(`sub-${heroID}`).value;
    newValues.description=document.getElementById(`desc-${heroID}`).value;

    let year = new Date(document.getElementById(`firstSeen-${heroID}`).value).getFullYear();
    let month = new Date(document.getElementById(`firstSeen-${heroID}`).value).getMonth() + 1;
    // let day = new Date(document.getElementById(`firstSeen-${heroID}`).value).getDay();
    newValues.firstSeen= new Date(year, month);
    console.log(newValues.firstSeen);
    heroicData[heroicData.indexOf(heroicData.find(h => h.id === heroID))] = newValues;
    console.log(heroicData);
    // console.log(heroicData[heroicData.indexOf(heroicData.find(h => h.id === heroID))]);


    const $wholeCard = $(event.target.closest('.card'));
    $wholeCard.replaceWith(renderHeroCard(heroicData.find(h => h.id === heroID)));

    
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    for (let i = 0; i < heroes.length; i++) {
        
        $root.append(renderHeroCard(heroes[i])); // change to renderHeroCard
    }

    $root.on('click', '.edit', function (event) {
        handleEditButtonPress(event)
    });

    $root.on('click', '.submit', function(event) {
        handleEditFormSubmit(event)
    });

    $root.on('click', '.cancel', function (event) {
        handleCancelButtonPress(event);
    });  
    
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
