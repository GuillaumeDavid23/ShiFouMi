//DECLARATION VARIABLES :
var pcPoints = 0;
var userPoints = 0;
var mutedTest = false;

//SELECTION DES ID BALISES IMG
var userImage = document.getElementById("imgUser");
var pcImage = document.getElementById("imgPC");
var soundImg = document.getElementById("sound");

//DECLARATION DES IMAGES
var pierreImg = "assets/img/pierre.jpg"
var feuilleImg = "assets/img/feuille.jpg"
var ciseauxImg = "assets/img/ciseaux.jpg"
var sound = "assets/img/sound.png"
var muted = "assets/img/muted.png"

//SELECTION DES DIFFERENT ID
var egality = document.getElementById("egality");
var defait = document.getElementById("defait");
var victory = document.getElementById("victory");
var win = document.getElementById("win");
var lose = document.getElementById("lose");
var resetbtn = document.getElementById("reset");
var launch = document.getElementById("launch");

//CHOIX IA
const iaChoice =() =>{
    let ramdom = Math.floor((Math.random() * 3)+1);

    if (ramdom == 1){
        return "pierre";
    }
    else if (ramdom == 2){
        return "feuille";
    }
    else{
        return "ciseaux";
    }
}

//COMPARAISON DES CHOIXS
const comparison = (user, pc) =>{
    
    //USER CHOICE = PIERRE
    if(user == "pierre" && pc == "pierre"){
        egality.classList.remove("d-none");
        userImage.src = pierreImg;
        pcImage.src = pierreImg;
        
        return 0;
    }
    else if(user == "pierre" && pc == "feuille"){
        defait.classList.remove("d-none");
        userImage.src = pierreImg;
        pcImage.src = feuilleImg;
        
        return 2;
    }
    else if(user == "pierre" && pc == "ciseaux"){
        victory.classList.remove("d-none");
        userImage.src = pierreImg;
        pcImage.src = ciseauxImg;
        
        return 1;
    }

    //USER CHOICE = FEUILLE
    if(user == "feuille" && pc == "pierre"){
        victory.classList.remove("d-none");
        pcImage.src = pierreImg;
        userImage.src = feuilleImg;
        return 1;
    }
    else if(user == "feuille" && pc == "feuille"){
        egality.classList.remove("d-none");
        userImage.src = feuilleImg;
        pcImage.src = feuilleImg;
        return 0;
    }
    else if(user == "feuille" && pc == "ciseaux"){
        defait.classList.remove("d-none");
        userImage.src = feuilleImg;
        pcImage.src = ciseauxImg;
        return 2;
    }

    //USER CHOICE = CISEAUX
    if(user == "ciseaux" && pc == "pierre"){
        defait.classList.remove("d-none");
        pcImage.src = pierreImg;
        userImage.src = ciseauxImg;
        return 2; 
    }
    else if(user == "ciseaux" && pc == "feuille"){
        victory.classList.remove("d-none");
        pcImage.src = feuilleImg;
        userImage.src = ciseauxImg;
        return 1;
    }
    else if(user == "ciseaux" && pc == "ciseaux"){
        egality.classList.remove("d-none");
        pcImage.src = ciseauxImg;
        userImage.src = ciseauxImg;
        return 0;
    }
}

//COMPTAGE DES POINTS
const points = (count) =>{
    if (count == 1){
        userPoints++;
        $('#userPoints').html(`VOUS : ${userPoints}`);
        if (userPoints == 3){
            return 1;
        }
    }
    else if (count == 2){
        pcPoints++;
        $('#pcPoints').html(`PC : ${pcPoints}`);
        if (pcPoints == 3){
            return 2;
        }
    } 
    
}

//Verification fin de partie
function countTotal(total){
    if (total == 1){
        win.classList.remove("d-none");
        document.getElementById("applause").play();
        launch.disabled = true;
        resetbtn.classList.remove("d-none");
    }
    else if (total == 2){
        lose.classList.remove("d-none");
        launch.disabled = true;
        resetbtn.classList.remove("d-none");
    } 
}

//Fonction de mise a zéro des display;
const NotDisplay = () =>{
    let tableNone = document.getElementsByClassName("noDisplay");
    for (let i = 0; i < tableNone.length; i++ ){
        tableNone[i].classList.add("d-none");
    }
}

//RESET BUTTON
$("#reset").click(function(){

    //Point à zéro
    pcPoints = 0;
    userPoints = 0;
    $('#pcPoints').html(`VOUS : ${pcPoints}`);
    $('#userPoints').html(`VOUS : ${userPoints}`);

    //Mise a zéro des display
    NotDisplay();
    
    //Désactive le bouton
    launch.disabled = false;
});

//FONCTION MAIN
$("#launch").click(function(){
    let userChoice = document.getElementById('choice').value;
    document.getElementById("ost").play();
    //remise a zéro des displays
    NotDisplay();
    
    //Comparaison des choix
    let count = comparison(userChoice, iaChoice());
    countTotal(points(count));
});


//GESTION DU SON
$("#sound").click(function(){
    
    if(mutedTest == false){
        soundImg.src = muted;
        document.getElementById("ost").muted = true;
        document.getElementById("applause").muted = true;
        
        mutedTest = true;
    }
    else{
        soundImg.src = sound;
        document.getElementById("ost").muted = false;
        document.getElementById("applause").muted = false;
        
        mutedTest = false;
    }  
});