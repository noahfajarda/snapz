
let bool = false;
const toggleLike = () => {
  const button = document.getElementById('like')
  const likecount = document.getElementsByClassName('like-count')[0]

  if (bool) {
    // unlike
    button.classList.remove("red-text", "text-darken-4")
    button.parentElement.classList.add("red")
    button.parentElement.classList.remove("white")
    bool = false;
    // set like counter
    likecount.textContent = Number(likecount.textContent) - 1
    likecount.style.color = "black"
  } else {
    // like
    button.classList.add("red-text", "text-darken-4")
    button.parentElement.classList.remove("red")
    button.parentElement.classList.add("white")
    bool = true;
    // set like counter
    likecount.textContent = Number(likecount.textContent) + 1
    likecount.style.color = "white"
  }
}