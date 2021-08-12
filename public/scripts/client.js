/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  const loadTweets = function() {
    $.get( "/tweets/", function( data ) {
      renderTweets(data);
      console.log("Load was performed." );
    });
  }();

  $('#tweet-text').parent().submit(function( event ) {
    event.preventDefault();

    const tweetTextVal = $('#tweet-text').val();

    if (tweetTextVal.length === 0) {
      alert('No characters entered!');
    } else if (tweetTextVal.length > 140) {
      alert('Too many characters entered!');
    } else {
      const serializedData = $(this).serialize();
      console.log(serializedData);
      $.post('/tweets/', serializedData);
    }
  });
});
