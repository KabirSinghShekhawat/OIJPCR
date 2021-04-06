function imageResponsive() {
  const images = document.querySelectorAll("img")
  const isMobile = screen.width < 768 ? true : false
  for(let img of images) {
      if(isMobile) {
          img.style.width = "100%";
      }
      img.style.maxWidth = "100%"
  }
}
document.onLoad = imageResponsive();

// $(document).ready(function(){
//     $("img").addClass("img-responsive");
//     $("img").css("max-width", "100%");
// });

const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const linkedinBtn = document.querySelector(".linkedin-btn");
const whatsappBtn = document.querySelector(".whatsapp-btn");

function init() {
  let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("Check out this article from OIJPCR : ");
  facebookBtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );

  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  );

  linkedinBtn.setAttribute(
    "href",
    `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
  );

  whatsappBtn.setAttribute(
    "href",
    `https://wa.me/?text=${postTitle} ${postUrl}`
  );
}

document.onload = init();
