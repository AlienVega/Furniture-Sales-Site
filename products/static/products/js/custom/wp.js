window.onscroll = function() {
    var header = document.getElementById("header1");
    if (window.pageYOffset > 150 ) {
      header.style.visibility = "visible";
    } else {
      header.style.visibility = "hidden";
    }
  };
