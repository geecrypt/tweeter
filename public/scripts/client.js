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
  const $timeCreated = $(`<h6>${timeago.format(tweetData.createdAt)}</h6>`);
  const $actionIcons = [
    $('<i>').addClass('fas fa-flag'),
    $('<i>').addClass('fas fa-retweet'),
    $('<i>').addClass('fas fa-heart')
  ];

  const $footer = $('<footer>');
  $footer.append($timeCreated, $('<div>').append(...$actionIcons));
  const $tweet = $('<article>').addClass('tweet');
  $tweet.append($header, $p, $footer);

  return $tweet;
};

const renderTweets = tweetsData => {
  $('#tweets-container').empty();
  for (const tweetData of tweetsData) {
    $('#tweets-container').prepend(createTweetElement(tweetData));
  }
};

$("#new-tweet").find("").submit(function(event) {
  alert("Handler for .submit() called.");
  event.preventDefault();
});

$(() => {
  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      renderTweets(data);
    });
  };
  
  loadTweets();

  $('#tweet-text').parent().submit(function(event) {
    event.preventDefault();

    const tweetTextVal = $('#tweet-text').val();

    if (tweetTextVal.length === 0) {
      $('.error').slideDown("slow");
      $('.error').children().text('you did not enter any text');
      // add attribute:
    } else if (tweetTextVal.length > 140) {
      $('.error').slideDown("slow");
      $('.error').children().text('you exceeded the character limit');
    } else {
      const serializedData = $(this).serialize();
      $('.error').slideUp("slow");
      $('.errors').children().text('');
      $('#tweet-text').val('');
      $('#tweet-text').parent().find('.counter').val('140');
      $.post('/tweets/', serializedData).then(loadTweets);
    }
  });
});
