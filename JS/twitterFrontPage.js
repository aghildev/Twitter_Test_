const tweetPostText = document.querySelector(".tweet_post_text");
const postBoxEveryoneBtn = document.querySelector(".post_box_everyone_btn");
const midContainer = document.querySelector(".mid_container");
const rightSearchText = document.querySelector(".right_search_text");
const rightSideSearch = document.querySelector(".rightside_search");
const mainContainer = document.querySelector(".main_container");
const magnifyGlass = document.querySelector(".fa-magnifying-glass");
const userProfile = document.querySelector(".user_profile");
const logoutDtetails = document.querySelector(".logout_details");
const labelChange = document.querySelector(".label_change");
const body = document.querySelector("body");
const settingsContainer = document.querySelector(".settings");
const moreContainer = document.querySelector(".more_container");
const rightSearchContainer = document.querySelector(".search_container");
const rightHappening = document.querySelector(".rightside_happening");
const rightFollow = document.querySelector(".rightside_follow");
const midBodyHeader = document.querySelector(".mid_header");
const forDark = document.querySelector(".tweet")
const loader = document.getElementById("loader")

const tweetsContainer = document.querySelector("#tweet_body");
const tweetPostBtn = document.querySelector(".tweet_post_btn");


//Show loading
function loading() {
  loader.hidden = false;
  tweetsContainer.hidden = true;
}
//Hide Loading
function complete() {
  tweetsContainer.hidden = false;
  loader.hidden = true;

}

let data;

async function getTweets() {
  //
  try {

    const response = await fetch("https://tweets-api.onrender.com/tweets");
    data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  showTweets(data);
}



const showTweets = async (tweets) => {
  tweets.forEach((tweet) => {

    const template = `
      <div class="tweet">
        <div class="tweet_header">
        <img src=${tweet.user?.avatar_url ? tweet.user.avatar_url : "https://i.ibb.co/XxvNnM3/Whats-App-Image-2023-01-03-at-16-50-27.jpg"} alt="${tweet.user.name}" />
      <h3>${tweet.user?.name?tweet.user.name:"Aghil P Wilson"}</h3>
      <p>@${tweet.user?.username}</p>
        </div>
        <div class="each_tweet_body">
          <p>${tweet.text}</p>
         <img src="${tweet.text_img}" alt="${tweet.user.name}" class = "tweet_text_img" />
        </div>
        <div class="tweet_footer">
          <p>${tweet.created_at}</p>
          <p>${tweet.retweet_count} Retweets</p>
          <p>${tweet.view_count} views</p>
          <p>${tweet.favorite_count} Likes</p>
        </div>
      </div>
    `;
    tweetsContainer.innerHTML += template;
  })

}

// *********************************************for infinite scroll*********************************************

window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  // console.log(scrollTop, scrollHeight, clientHeight);

  if ((scrollTop + clientHeight) >= (scrollHeight - 20)) {

    getTweets();
  }
})


tweetPostBtn.addEventListener("click", async (e) => {
  const currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  // Send the POST request to the API
  try {
    const response = await fetch("https://tweets-api.onrender.com/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: tweetPostText.value, user: { name: "Aghil P Wilson", username: "aghil_wilson", avatar_url: "https://i.ibb.co/XxvNnM3/Whats-App-Image-2023-01-03-at-16-50-27.jpg" } })
    });
    const newTweet = await response.json();
    console.log(newTweet);
  } catch (err) {
    console.error(err);
  }

  // Update the UI to show the new tweet
  const template = `
  <div class="tweet">
  <div class="tweet_header">
  <img src="https://i.ibb.co/XxvNnM3/Whats-App-Image-2023-01-03-at-16-50-27.jpg" alt="Aghil" />
    <h3>Aghil P Wilson</h3>
    <p>aghil_wilson</p>
  </div>
  <div class="each_tweet_body">
    <p>${tweetPostText.value}</p>
  
  </div>
  <div class="tweet_footer">
    <p>${formattedDate}</p>
    <p>${Math.floor(Math.random() * 14) + 1} Retweets</p>
    <p>${Math.floor(Math.random() * 140) + 1} views</p>
    <p>${Math.floor(Math.random() * 250) + 1}
    </div>
 </div>
  `;
  tweetsContainer.insertAdjacentHTML('afterbegin', template);
  tweetPostText.value = "";
})





window.addEventListener("DOMContentLoaded", () => getTweets())
//window.addEventListener("DOMContentLoaded", () => loading())








//***************************************************************************************************************/

tweetPostText.addEventListener("click", (e) => {
  e.stopPropagation();
  postBoxEveryoneBtn.classList.add("display_block");
})

midContainer.addEventListener("click", () => {
  postBoxEveryoneBtn.classList.remove("display_block");
})

rightSideSearch.addEventListener("click", (e) => {
  e.stopPropagation();
  rightSideSearch.style.backgroundColor = "white";
  rightSideSearch.style.border = "1px solid rgb(29, 161, 242)"
  rightSearchText.style.backgroundColor = "white";
  magnifyGlass.style.color = "rgb(29, 161, 242)";
})

mainContainer.addEventListener("click", () => {
  rightSideSearch.style.backgroundColor = "rgb(243, 244, 245)";
  rightSideSearch.style.border = "none"
  rightSearchText.style.backgroundColor = "rgb(243, 244, 245)";
  magnifyGlass.style.color = "gray";
  logoutDtetails.classList.remove("display_flex");
  settingsContainer.classList.remove("display_block");
})

userProfile.addEventListener("click", (e) => {
  e.stopPropagation();
  logoutDtetails.classList.add("display_flex");
})

labelChange.addEventListener("click", () => {
  labelChange.classList.toggle("active");
  body.classList.toggle("dark");
  settingsContainer.style.color = "black";
  rightSearchContainer.classList.toggle("dark");
  rightHappening.classList.toggle("dark");
  rightFollow.classList.toggle("dark");
  midBodyHeader.classList.toggle("dark");
  tweetPostText.classList.toggle("dark");
})

moreContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsContainer.classList.add("display_block");
})

// ************************************************************************************************************