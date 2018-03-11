"use strict";

let game = new Vue({
    el: "#game",
    data: {
        questions: ALL_QUESTIONS, //turim klausimus
        currentView:"intro", //aktvus langas, dabar intro, paspaudus play prasides game
        level: 0, // level - tai lygiai, vis didesnis lygisyra didesne suma
        currentQuestion: {},
        userAnswer: null, // null - nes dar nepasirinkes atsakymo
        money : [
            0,100, 200, 300, 400, 800, 1500, 3000, 6000, 12000, 24000, 48000, 72000, 100000, 300000, 1000000
        ],
        currentMoney: 0,
        feedBackVisable: false,
        feedBackMessage: "",
        feedBackClass: null,
        helpAvailable:{
            fiftyFifty: true, 
            call: true,
            audience: true
        }


        
    },
    methods: {
        startGame: function(){
            this.level = 0; //pradedam nuo nulino level
            this.currentView = 'game';
            this.currentQuestion = this.getQuestion(); //pakvieciam getQuestion
        },
        
        //userio klikinimas. grynai ant confirm mygtuko
        submitAnswer: function(){
            //patikrinti ar teisingas atsakymas
            if (this.userAnswer===this.currentQuestion.correct){ 
                if(this.level === 15){
                    this.currentView = 'gameWon';
                    return null;
                }else{
                this.showFeedBack("correct", "feedBack-green");
                //pakeiciam leveli
                this.level += 1;
    
                //gaunam sekanti klausima
                this.currentQuestion = this.getQuestion();
                //isvalyti pasirinkta atsakyma
                this.userAnswer = null;
                }
            }else{
                console.log("Game Over");
                this.showFeedBack("Wrong answer", "feedBack-red");
                this.currentView = 'gameOver';
            }
            //nuskaitome, kiek laimejome pinigu, siuo metu
            if (this.currentMoney < this.money.length){
                return this.currentMoney++;
             }
             //this.scoreList[this.currentLevel-1]
        },
        goHome: function(){
            this.currentView = 'goHome';
            
        },
        getQuestion: function(){//darysim, kad imtu is pirmo lygio klausimus
            let all = this.questions[this.level]; //visi skirtingi 0 levelio klausimai paimti
            //imam random klausimus
            return all.questions[Math.floor(Math.random() * (this.questions.length - 0 + 1)) + 0]; 
        },
        //paduodam zinute ir jis mokes ijungti ir isjungti, kai paspaudziam submit, pakvieciam si metoda ir iskviecia ji. paduosim zinute, todel function(message)
        // => arrow function neturi this
        showFeedBack: function(message, classToAdd){
               this.feedBackVisable = true;
               this.feedBackMessage = message;
                this.feedBackClass = classToAdd;
               setTimeout(()=>{
                this.feedBackVisable = false;
                this.feedBackMessage = "";
                this.feedBackClass = null;
               }, 1300); 
        },
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        removeSomeQuestions:function(){
        //pasiodarom reference
            let all = this.currentQuestion.content;
        
            //issiaugau teisinga, cia yra kelias [] - yra atsakymas
            let correctAnswer = all[this.currentQuestion.correct];
           
        //ismetam teisigna is visu likusiu
        all.splice(this.currentQuestion.correct, 1);
        //sugeneruojam skaiciu nuo 0 iki 2, nes teisignas jau isimtas
        let randomIndex = this.getRandomInt(0, 2);
        let wrongAnswer = all[randomIndex];

        //idedam 
        this.currentQuestion.content = [
            correctAnswer, wrongAnswer
        ]
        this.currentQuestion.correct = 0;
        this.helpAvailable.fiftyFifty = false;
        },
    }
})