const Vue = require("vue/dist/vue.js")
const electron = require("electron")
const {clipboard} = electron

function getCurentCopiedTxt(){
    return clipboard.readText();
}
// console.log(readClipboardText())


const App = new Vue({
    el:"#app",
    data:{
        title:"🐘 Elephant Clipboard 🎉",
        history:[]
    },
    mounted(){
        setInterval(this.checkClipboard , 500)
    },
    methods:{
        checkClipboard   (){
            const text = getCurentCopiedTxt()
            // console.log(this.history.length)
            // if(this.history.length){
                this.history[0] !== text ? this.history.unshift(text) : "" 
            // }
            console.log(this. history)
        }
    }
})