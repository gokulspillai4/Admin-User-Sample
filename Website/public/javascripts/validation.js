
var nameflag = false, emailflag = false, telflag = false, msgflag = false;

$(document).ready(function () {
  $('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
  });

  $("#name").on('input', function () {
    this.value = this.value.replace(/[^ a-zA-Z]/, '');

    var name = $(this).val()
    if (name.length < 3 || name.includes('  ') || name.charAt(0) == ' ') {
      $(this).css({ "box-shadow": "0 0 6px red" })
      $("#name-warning").show()
      nameflag = 0;
    }
    else {
      $(this).css({ "box-shadow": "0 0 6px green" })
      $("#name-warning").hide()
      nameflag = 1;
    }
  })

  $("#tel").on('input', function () {
    this.value = this.value.replace(/[^0-9]/, '');
    var tel = $(this).val()
    if (tel.length != 10) {
      $("#tel-warning").show()
      $(this).css({ "box-shadow": "0 0 6px red" })
      telflag = 0;
    }
    else {
      $("#tel-warning").hide()
      $(this).css({ "box-shadow": "0 0 6px green" })
      telflag = 1;
    }
  })


  $("#msg-box").on('input', function () {
    var msg = $(this).val()
    if (msg.length < 4) {
      $("#msg-warning").show()
      $(this).css({ "box-shadow": "0 0 6px red" })
      msgflag = 0;
    }
    else {
      $("#msg-warning").hide()
      $(this).css({ "box-shadow": "0 0 6px green" })

      msgflag = 1;
    }

  })




  function validateEmail(email) {
    var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailReg.test(email);
  }

  $("#email").on('input', function () {
    var email = $(this).val()

    if (!validateEmail(email) || email == '') {
      $("#email-warning").show()
      $(this).css({ "box-shadow": "0 0 6px red" })
      emailflag = 0;
    }
    else {
      $("#email-warning").hide()
      $(this).css({ "box-shadow": "0 0 6px green" })
      emailflag = 1;
    }
  })
})




$("#submit-form").submit((e) => {
  e.preventDefault()
  if (nameflag == 1 && emailflag == 1 && telflag == 1 && msgflag == 1) {
    console.log(nameflag + "got")
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbw00gugnnofuq5lYHZOyLUHrxm2XG2iPJNQ0O8UDGXr0Kz_-5_G6jKwLcRIErZpHYFs/exec",
      data: $("#submit-form").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully.")
        window.location.reload()
        //window.location.href="https://google.com"
      },
      error: function (err) {
        alert("Some Error")
      }
    })
  } else {
    alert("Enter valid details to submit the form")
  }
})

