document.getElementById("signin").onsubmit = function (e) { 
    e.preventDefault();
    var url = window.location.origin + "/";
    window.location.assign(url);
};
