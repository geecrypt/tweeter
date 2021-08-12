/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetsTestData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = tweetData => {
  const $header = $('<header>');
  $header.append(`<div><img src=${tweetData.user.avatars}><h8>${tweetData.user.name}</h8></div>`);
  $header.append(`<h4>${tweetData.user.handle}</h4>`);
  const $p = $('<p>').text(tweetData.content.text);
  // eslint-disable-next-line
  const $timeCreated = $('<h6>').text(timeago.format(tweetData.created_at));
  const $actionIcons = [
    $('<i>').addClass('fas fa-flag'),
    $('<i>').addClass('fas fa-retweet'),
    $('<i>').addClass('fas fa-heart')
  ];

  const $footer = $('<footer>');
  $footer.append($timeCreated, $('<div>').append(...$actionIcons));
  const $tweet = $('<article>').addClass('tweet');
  $tweet.append($header, $p, $footer);

  console.log($tweet);
  
  return $tweet;
};

const renderTweets = tweetsData => {
   for (const tweetData of tweetsData) {
    $('#tweets-container').append(createTweetElement(tweetData));
   }
}

$("#new-tweet").find("").submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});

$(() => {
  renderTweets(tweetsTestData);
});
