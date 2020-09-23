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
        const text = getCurentCopiedTxt() ? getCurentCopiedTxt() : ""
        if (this.history.length == 0 ) {
            debugger;
            this.history = ({
                text,
                type: "",
                clipped: new Date()
            })
        }

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
           
            const lastElem = this.history.length == 0 ? 0 : this.history.length - 1;
            if (lastElem == 0) {
                debugger;
                this.history.push({
                    text,
                    clipped: new Date(),
                    isClicked: false
                })
            }
            else {
                if (this.history[lastElem]["text"] !== text) {
                    this.history.push({
                        text,
                        clipped: new Date(),
                        isClicked: false
                    })

                }
            }

            
        },
        itemClick(item, index) {
            
            this.history.splice(this.history.indexOf(item), 1);

            audio.currentTime = 0
            audio.play()
            clipboard.writeText(item.text)

            
        }
    }
})

