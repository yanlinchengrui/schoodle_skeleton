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

  // CREATE EVENT
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
      }).done(function (data) {
        console.log('eventdata', eventData);
        console.log(data);
        window.location.href = `/events/${data.event_url}`;
      })
    });
  });

  // ADD PARTICIPANT
  $('#close-btn').on('click', (event) => {
    event.preventDefault();
    console.log($('#pop-up-name').val(), $('#pop-up-email').val())
    let participantData = {
      name: $('#pop-up-name').val(),
      email: $('#pop-up-email').val()
    }
    $.ajax({
      method: "POST",
      url: `/participants${window.location.pathname.substring(7)}`,
      data: participantData
    }).done(function (data) {
      location.reload();
      console.log('closebtn data', data);  //
    })
  });


  // for now, this only toggles ALL buttons - need to specify it later
  $('.btn-go').css('visibility', 'visible');
  // window.location.href = `/events${window.location.pathname.substring(7)}`;
  // window.stop();

  $('.btn-go').on('click', function(event) {
    let email = $(this).parent().parent().attr("id");
    let selectedArray = $(this).parent().parent().find(".selected");
    let event_url = window.location.pathname.substring(8);
    let postObj = {
      dates: {
        'selected_date_1': null,
        'selected_date_2': null,
        'selected_date_3': null,
        'selected_date_4': null,
        'selected_date_5': null
      },
      email,
      event_url
    };
    selectedArray.each(function() {
      postObj['dates'][$(this).attr("id")] = '1111-11-11';
    });
    //console.log(postObj);
    $.post(event_url, postObj, function(data){
      console.log(data, postObj);
    });
  });

  $('.table-option').on('click', function (event) {

    $(this).toggleClass('selected');
  })


});




