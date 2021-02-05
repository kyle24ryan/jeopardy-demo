// Animations from Blake Bowen - Simple Hero Transitions (https://codepen.io/osublake/pen/WwgQEV)

class Category {
    constructor(id, title, clues_count, clues) {
        this.id = id;
        this.title = title;
        this.clues_count = clues_count;
        this.clues = clues;
    }
}

class Clue {
    constructor(id, answer, question, value) {
        this.id = id;
        this.answer = answer;
        this.question = question;
        this.value = value;
    }
}

$(document).ready(function() {   
    let categories = [];
    let root  = document.documentElement;
    let body = document.body;
    let pages = null;
    let clues = null;
    let score = 0;
    let cluesLeft = 30;

    function buildCategory(category) {
        var categoryObj = new Category(category.id, category.title, category.clues_count, category.clues);
        console.log(categoryObj);
        categories.push(categoryObj);
    }

    function getCategories(randomIds) {
        const settings = {
            type: 'GET',
            dataType: "json",
            async: true,
            success: function(category) {
                buildCategory(category);
            }
        };
        $.when($.ajax("http://jservice.io/api/category?id=" + randomIds[0], settings),
        $.ajax("http://jservice.io/api/category?id=" + randomIds[1], settings),
        $.ajax("http://jservice.io/api/category?id=" + randomIds[2], settings),
        $.ajax("http://jservice.io/api/category?id=" + randomIds[3], settings),
        $.ajax("http://jservice.io/api/category?id=" + randomIds[4], settings),
        $.ajax("http://jservice.io/api/category?id=" + randomIds[5], settings))
            .then(buildBoard);
    }

    function calcClueNum(clueNum) {
        var category = Math.ceil(clueNum/5);
        var clue = (((clueNum%5) == 0) ? 5 : clueNum % 5);
        return [category, clue];
    }

    function checkAnswer(answer, array) {
        let category, clue;
        [category, clue] = calcClueNum(array[0]);
        let value = parseInt($("#value"+clue).text().substring(1));
        let actualAnswer = categories[category-1].clues[clue-1].answer;
        console.log(answer.toLowerCase());
        console.log(actualAnswer.toLowerCase());
        //includes() is case sensitive
        if (( (actualAnswer.toLowerCase().includes(answer.toLowerCase())) || (answer.toLowerCase().includes(actualAnswer.toLowerCase())) ) && answer.length > 0) {
            document.getElementById("correct").play();
            score = score + value;
        } else {
            document.getElementById("wrong").play();
            score=  score - value;
        }
        if (score < 0) {
            $("#score").css("color", "red");
        } else {
            $("#score").css("color", "white");
        }
        $("#score").text(score);
        hideQuestion(array);
    }

    function showAnswerField(array) {
        var clueNum = array[0];
        //console.log(clueNum);
        $("#btnGroup"+clueNum).append(`<input type="text" id="answer`+clueNum+`" name="answer"><input type="submit" id="ansBtn`+clueNum+`" value="ANSWER"></input>`);
        $("#answer"+clueNum).addClass("btn-input");
        $("#ansBtn"+clueNum).addClass("btn-lg btn-outline-light btn-submit").click(function() {
            var answer = $("#answer"+clueNum).val();
            $("#btnGroup"+clueNum).hide();
            checkAnswer(answer, array);
        });
    }

    function showQuestion(array) {
        let clueNum = array[0];
        //console.log(clueNum);
        let category, clue;
        [category, clue] = calcClueNum(clueNum);
        //console.log(category + "  " + clue);
        var clueObj = categories[category - 1].clues[clue - 1];
        //console.log(clueObj);
        $("#clue"+clueNum).append('<div id="question'+clueNum+`" class="question">` + clueObj.question + `</div>`).append(`<div id="btnGroup`+clueNum+`" class="row btn-group"></div>`);
        $("#btnGroup"+clueNum).append(`<button id="buzzer`+clueNum+`" class="btn-lg btn-outline-light">BUZZ IN</button>`).append(`<button id="pass`+clueNum+`" class="btn-lg btn-outline-light">PASS</button>`);
        $("#buzzer"+clueNum).css(["display", "padding-top"], ["flex", "10px"]).click(function() {
            showAnswerField(array);
            $("#buzzer"+clueNum).hide();
            $("#pass"+clueNum).hide();
        });
        $("#pass"+clueNum).css(["display", "padding-top"], ["flex", "10px"]).click(function() {
            $("#question"+clueNum).text(clueObj.answer);
            setTimeout(function() { hideQuestion(array); }, 1200);
        });
    }

    function hideQuestion(array) {
        var category , clue;
        [category, clue] = calcClueNum(array[0]);
        $("#clue"+array[0]).hide("slow").text("");
        $("#category"+category+" #value"+clue).css("color", "blue").css("text-shadow", "none");
        cluesLeft--;
        animateHero(array[1], array[2]);
        
    }

    function animateBoard() {
        document.getElementById("boardAudio").play();
        setTimeout(function() { $("#category6 #value5").fadeOut(100).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category2 #value2").fadeOut(200).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category4 #value1").fadeOut(300).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category1 #value4").fadeOut(400).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category4 #value2").fadeOut(500).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category2 #value1").fadeOut(600).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category5 #value1").fadeOut(700).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category2 #value3").fadeOut(800).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category6 #value1").fadeOut(900).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category6 #value2").fadeOut(1000).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category5 #value4").fadeOut(1100).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category3 #value2").fadeOut(1200).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category5 #value3").fadeOut(1300).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category6 #value4").fadeOut(1400).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category1 #value5").fadeOut(1500).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category1 #value3").fadeOut(100).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category2 #value4").fadeOut(200).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category6 #value3").fadeOut(300).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category4 #value3").fadeOut(400).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category2 #value5").fadeOut(500).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category3 #value1").fadeOut(600).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category5 #value2").fadeOut(700).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category3 #value4").fadeOut(800).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category3 #value5").fadeOut(900).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category3 #value3").fadeOut(1000).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category1 #value2").fadeOut(1100).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category4 #value4").fadeOut(1200).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category1 #value1").fadeOut(1300).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category5 #value5").fadeOut(1400).fadeIn(2000);}, 800);
        setTimeout(function() { $("#category4 #value5").fadeOut(1500).fadeIn(2000);}, 800);
    }

    function addOnClicks(clue, page, clueNum) {
        $(function(){
            $(clue).click(function(){
                animateHero(clue, page);
                showQuestion([clueNum, page, clue]);
            });
        });
    }

    function buildBoard(){
        for (let i = 0; i < categories.length; i++) {    
            $("#board").append(`<div id="category`+(i+1)+`" class="col-sm text-center category"></div>`);
            $("#category" + (i+1)).append(`<p class="category-text">`+ categories[i].title +`</p>`);
            $("#category" + (i+1)).append(`<h1 id="value1" class="clue hero border-black">$100</h1>`);
            $("#category" + (i+1)).append(`<h1 id="value2" class="clue hero border-black">$200</h1>`);
            $("#category" + (i+1)).append(`<h1 id="value3" class="clue hero border-black">$300</h1>`);
            $("#category" + (i+1)).append(`<h1 id="value4" class="clue hero border-black">$400</h1>`);
            $("#category" + (i+1)).append(`<h1 id="value5" class="clue hero border-black">$500</h1>`);
        }

        clues = document.querySelectorAll(".clue");
        for (let j = 0; j < clues.length; j++) {
            $(".page-container").append(`<div id="clue`+ (j+1) +`"class="page hero"></div>`);
            $("#clue"+(j+1)).append(``);
        }
        pages = document.querySelectorAll(".page");
        for (var i = 0; i < clues.length; i++) {  
            let clueNum = i + 1;
            addOnClicks(clues[i], pages[i], clueNum);
        }

        animateBoard();
    }

    function animateHero(fromHero, toHero) {
    
        var clone = fromHero.cloneNode(true);
            
        var from = calculatePosition(fromHero);
        var to = calculatePosition(toHero);
        
        TweenLite.set([fromHero, toHero], { visibility: "hidden" });
        TweenLite.set(clone, { position: "absolute", margin: 0 });
        
        body.appendChild(clone);  
            
        var style = {
          x: to.left - from.left,
          y: to.top - from.top,
          width: to.width,
          height: to.height,
          autoRound: false,
          ease: Power1.easeOut,
          onComplete: onComplete
        };
         
        TweenLite.set(clone, from);  
        TweenLite.to(clone, 0.3, style)
          
        function onComplete() {
          
          TweenLite.set(toHero, { visibility: "visible" });
          body.removeChild(clone);
        }

        if (cluesLeft == 0) {
            //Enter New Round or Final Jeopardy HERE
            setTimeout(function() { 
                if (confirm("Play Again?")) {
                    window.location.reload();
                } else {
                    alert("GAME OVER! Score: " + score);
                }
            }, 1500);
        }
    }
      
    function calculatePosition(element) {
        
        var rect = element.getBoundingClientRect();
        
        var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
        var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
        
        var clientTop  = root.clientTop  || body.clientTop  || 0;
        var clientLeft = root.clientLeft || body.clientLeft || 0;
            
        return {
            top: Math.round(rect.top + scrollTop - clientTop),
            left: Math.round(rect.left + scrollLeft - clientLeft),
            height: rect.height,
            width: rect.width,
        };
    }
    
    let randomIds = [];
    for (let i = 0; i < 6; i++) {
        randomIds.push(Math.floor(Math.random() * 10000));
    }
    // AJAX calls to API to getCategories and when they are done there is a single call to build the board
    getCategories(randomIds);

    // TODO: 
        // add Random DailyDouble
        // Intro - Landing Page
        // 2nd rd and final jeopardy
        // Remove punctuation from answer strings
        // Clean up code and css
});