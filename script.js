generatePlacerholderText();
function generatePlacerholderText() {
    const btns = document.querySelectorAll(".btn");
    let btnsArr = Array.from(btns);
    btnsArr.forEach(btn => {
        btn.textContent = "8";
    });
}

