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


  // SUBMIT FORM

  $('#new-event').on('submit', (event) => {
    event.preventDefault();

    let eventName   = $('#event_name').val();
    let hostName    = $('#name').val();
    let descrip     = $('#description').val();
    let dateSelect  = $('#dates').val();
    let hostEmail   = $('#email').val();
    let votesWin    = $('#votes_to_win').val();

    // const obj = {
    //   event_name:   $('#event_name').val(),
    //   name:         $('#name').val(),
    //   description:  $('#description').val(),
    //   dates:        $('#dates').val(),
    //   email:        $('#email').val(),
    //   votes_to_win: $('#votes_to_win').val()
    // }

    console.log(dateSelect.split(','))

    function dateToString(dateInput) {
      let cut = dateInput.split('/');
      let monthList = [ "Jan", "Feb", "Mar", "April", "May", "June", 
      "July", "August", "Sep", "Oct", "Nov", "Dec" ];
      let temp = Number(cut[0]) - 1;
      let month = monthList[temp];
      let day = cut[1];
      if (day[0] == 0) {
        return month + ' ' + day[1];
      } else {
        return month + ' ' + day;
      }
    }

    let splitDates = dateSelect.split(',');
  
  });
  





});
