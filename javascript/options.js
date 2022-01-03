// options
// dark/light mode
document.querySelector(".toggle-display").addEventListener("click",function(){
    document.querySelectorAll(".inner-circle")[0].classList.toggle("move-inner-circle")
    document.querySelectorAll(".toggle-btn").forEach(item => {
        item.classList.toggle("turn-display-mode-btn")
    })
    document.querySelectorAll(".toggle-btn > .fas").forEach(item => {
        item.classList.toggle("text-white")
    })
    turnLightMode()
})
// text transparent
document.querySelector(".toggle-transparent").addEventListener("click",function() {
    document.querySelectorAll(".inner-circle")[1].classList.toggle("move-inner-circle")
})

// blinding mode
function turnLightMode(){
    document.querySelectorAll(".card").forEach(item => {
        if(item.style.color == "white"){
            item.style.color = "black"
            item.style.backgroundColor = "rgb(255, 255, 255,0.9)"
        }
        else{
            item.style.color = "white"
            item.style.backgroundColor = "rgba(8, 8, 8, 0.85)"
        }
    })
}