

var name = "";
var role = "";
var startDate = 0;
var rate = 0;


$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyDauOQ9OvGf5AL-eE1R5DhUgW9EZ0N9Uuo",
        authDomain: "employee-data-management-48cec.firebaseapp.com",
        databaseURL: "https://employee-data-management-48cec.firebaseio.com",
        projectId: "employee-data-management-48cec",
        storageBucket: "employee-data-management-48cec.appspot.com",
        messagingSenderId: "758191264507"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#addEmployee").on("click", function (event) {
        event.preventDefault();
        name = $("#name").val();
        role = $("#role").val();
        startDate = $("#startdate").val();
        rate = $("#rate").val();
        console.log(name);
        console.log(role);
        console.log(startDate);
        console.log(rate);
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            rate: rate
        });
        $("#name").val("");
        $("#role").val("");
        $("#startdate").val("");
        $("#rate").val("");
    });

    database.ref().on("child_added", function(snapshot) {
        var sv = snapshot.val();
        var tr = $("<tr>");
        var td1 = $("<td>");
        td1.text(sv.name);
        tr.append(td1);
        var td2 = $("<td>");
        td2.text(sv.role);
        tr.append(td2);
        var td3 = $("<td>");
        td3.text(sv.startDate);
        tr.append(td3);
        var parsedDate = Date.parse(sv.startDate);
        var now = Date.now();
        var timepassed = now - parsedDate;
        console.log(timepassed);
        var days = timepassed/86400000;
        var months = days/30;
        var td4 = $("<td>");
        td4.text(months);
        tr.append(td4);
        var td5 = $("<td>");
        td5.text(sv.rate);
        tr.append(td5);
        var money = months * sv.rate;
        var td6 = $("<td>");
        td6.text("$" + money);
        tr.append(td6);
        $("tbody").append(tr);
    })

});