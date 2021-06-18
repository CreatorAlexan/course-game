class Buttons{
    constructor(){
        this.button1 = createButton("lvl1")
        this.button2 = createButton("lvl2")
        this.button3 = createButton("lvl3")
        this.button4 = createButton("lvl4")
    }
    display(){
        this.button1.position(20,15)
        this.button1.mousePressed(()=>{
            courseStatus = 1
        })
        this.button2.position(20,35)
        this.button2.mousePressed(()=>{
            courseStatus = 2
        })
        this.button3.position(20,55)
        this.button3.mousePressed(()=>{
            courseStatus = 3
        })
        this.button4.position(20,75)
        this.button4.mousePressed(()=>{
            courseStatus = 4
        })
    }
}