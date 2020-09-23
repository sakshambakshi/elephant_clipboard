const Vue = require("vue/dist/vue.js")
const electron = require("electron")
const { clipboard } = electron

function getCurentCopiedTxt() {
    return clipboard.readText();
}
// console.log(readClipboardText())
const audio = new Audio("./sounds/elephantcub.mp3")

const App = new Vue({
    el: "#app",
    data: {
        title: "🐘 Elephant Clipboard 🎉",
        history: []
    },
    mounted() {
        const text = getCurentCopiedTxt()
        
        this.history.unshift({
            text,
            type:"",
            clipped: new Date()
        })
        setInterval(this.checkClipboard, 500)
    },
    computed: {
        historyReversed() {
          return this.history.slice().reverse();
        }
      },
    methods: {
        checkClipboard() {
            const text = getCurentCopiedTxt()
            // console.log(this.history.length)
            // if(this.history.length){
            // if(this.history.length == 0){
            //     this.history.unshift({
            //         text,
            //         clipped: new Date() 
            //     })
            // }
            // else{
           if(this.history[this.history.length - 1]["text"] !== text) { 
               this.history.push({
                text,
                clipped: new Date(),
                isClicked:false
            }) 
            // alert(this.history.length);
            
        }
            // }

            // this.history.indexOf(text) ==    -1 ? this.history.unshift(text) : "" 

            // }
            console.log(this.history)
        },
        itemClick(item , index) {
            
            this.history.splice(this.history.indexOf(item) , 1);
            
            audio.currentTime = 0 
            audio.play()
            clipboard.writeText(item.text)
        
            alert(item.text)
        }
    }
})

