Vue.component('score', {
    //bus tokis property:
    props: ['currentLevel'], //kaip html
    // v-for="score in scoreList" - atvaizduoja visas sumas
    //template, gali buti naudojamas tik viename elemente, kaip dive, negali buti du div atskirai, nevent vienam dive yra du divai ir t.t.
    template:`
        <div class="score-component">
        <ul class="score-list">
            <li v-for="(score, index) in scoreList"
                :class="{
                'current-winning': currentLevel - 1  === index,
                'answered-question': index < currentLevel }">
                    {{ score }}
            </li>
        </ul>
        <span>My level: {{ scoreList[currentLevel - 1] }}</span>
    </div>`,
    // template:<div>           
    // <ul >
    //     <li  class="answers" v-for="score in scoreListReverse" v-bind:class="{'current-winning': isCurrentWinning(score), ''answered-question': was Answered(score) }">{{score}}</li> 
    // </ul>
    
    
    // current money is  {{ scoreList[currentLevel - 1]}}</div>`,
    // ddarom, paciam komponente zinomos sumos, kurias galima laimeti
    data: function(){
        return{
            scoreList:[
                "100", "200", "300", "400", "800", "1 500", "3 000", "6 000", "12 000", "24 000", "48 000", "72 000", "100 000", "300 000", "1 000 000"
            ]
        }
    },
    // computed:{  //computed - tiesiog kaip data, tik biski turbo
    //     scoreListReverse: function(){
    //         let resultArray = Vue.util.extend([], this.scoreList); //naudojam, kad my level rodytu gerai. sukuriam nauja obj kopija tipo nuo 100 iki 1 mln.
    //         return resultArray.reverse(); //naudojam, kad apsuktume pinus nuo maz iki did, o ne nuo did iki maz.
    //     },

    // },
    // methods: {
    //     //kad rodytu klase nuo 0, o ne nuo 1mln
    //     isCurrentWinning: function(score){
    //         //sulyginam score su tekstu(scoreList)
    //         return score === this.scoreList[this.currentLevel -1];
    //     },
    //     answered: function(score){
    //         // reikia suzinoti index
    //     }
    // },
  })

  //objektai yra kopijuojami by reference not by value
//   let user1 = { name: "Jonas"};
//   let user2 = user1;
//   user2.name = "Petras"
//   user1.name //Petras 
//   user2.name //Petras