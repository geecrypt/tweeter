const TWEETLEN = 140;

// Update tweet character counter
$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    const $counter = $(this).parent().find("output");
    $counter.val(TWEETLEN - $(this).val().length);

    if ($counter.val() < 0) {
      $counter.addClass("excess-characters");
    } else {
      $counter.removeClass("excess-characters");
    }
  });
});
