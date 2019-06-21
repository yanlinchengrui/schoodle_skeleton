$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $('#thething').datepicker({
    clearBtn: true,
    multidate: 5
  });

  // SUBMIT FORM

  $('#new-event').on('submit', (event) => {
    event.preventDefault();

    let participantData = {
      name: $('#name').val(),
      email: $('#email').val(),
      event_name: $('#event_name').val(),
      votes_to_win: $('#votes_to_win').val(),
      description: $('#description').val(),
      dates: $('#dates').val()
    }

    $.ajax({
      method: "POST",
      url: "/participants",
      data: participantData
    }).done(function (data) {

      let eventData = {
        host_id: data,
        event_name: $('#event_name').val(),
        votes_to_win: $('#votes_to_win').val(),
        description: $('#description').val(),
        dates: $('#dates').val()
      }

      $.ajax({
        method: "POST",
        url: "/events",
        data: eventData
      }).done(function(data) {
        console.log('eventdata', eventData);
        console.log(data);
        window.location.href = `/events/${data.event_url}`;
      })
    });

    

  });

  $('#close-btn').on('click', (event) => {
    event.preventDefault();
    console.log($('#pop-up-name').val(), $('#pop-up-email').val())

    // for now, this only toggles ALL buttons - need to specify it later
    $('#row-submit-btn').css('visibility', 'visible');
  });

  $('.table-option').on('click', (event) => {
    console.log('option clicked')

    // color change not working
    $(this).css('background-color', 'green');
  })

});


