$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $('#thething').datepicker({
    clearBtn: true,
    multidate: 5
  });
});

