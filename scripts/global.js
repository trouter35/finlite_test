"use strict";
var imgSrc = '';


function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

function differenceInDays(fDate, sDate) {

    var dt1 = fDate.split('/'),
            dt2 = sDate.split('/'),
            one = new Date(dt1[2], dt1[1] - 1, dt1[0]),
            two = new Date(dt2[2], dt2[1] - 1, dt2[0]);

    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    return Math.floor(days);
}
;


function calculateAge(DOB) { // birthday is a date
    var DOBinAD = (BS2AD(DOB)); //Date of Birth in AD
    var date = DOBinAD.toString();
    var y = (date.split('/')[0]);
    var m = (date.split('/')[1]);
    var d = (date.split('/')[2]);

    var birthday = new Date(y, m, d);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
;

function CheckOnlineStatus(msg) {
    var condition = navigator.onLine ? "Y" : "N";
    if (condition === "Y") {
        // alert("Connected.");
    }
    else {
        alert("No Internet Connection.");
    }

}
function Pageloaded() {
    CheckOnlineStatus("load");
    document.body.addEventListener("offline", function() {
        CheckOnlineStatus("offline")
    }, false);
    document.body.addEventListener("online", function() {
        CheckOnlineStatus("online")
    }, false);
}

function applyDataMask(field) {
    var mask = field.dataset.mask.split('');

    // For now, this just strips everything that's not a number
    function stripMask(maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }

    // Replace `_` characters with characters from `data`
    function applyMask(data) {
        return mask.map(function(char) {
            if (char != '_')
                return char;
            if (data.length == 0)
                return char;
            return data.shift();
        }).join('')
    }

    function reapplyMask(data) {
        return applyMask(stripMask(data));
    }

    function changed() {
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;

        field.value = reapplyMask(field.value);

        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
    }
    field.addEventListener('click', changed)
    field.addEventListener('keyup', changed)
}

var inputQuantity = [];
function lenManage() {
    $(".lenManage").each(function(i) {
        inputQuantity[i] = this.defaultValue;
        $(this).data("idx", i); // save this field's index to access later
    });
    $(".lenManage").on("keyup", function(e) {
        var $field = $(this),
                val = this.value,
                $thisIndex = parseInt($field.data("idx"), 10); // retrieve the index
        //        window.console && console.log($field.is(":invalid"));
        //  $field.is(":invalid") is for Safari, it must be the last to not error in IE8
        if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid")) {
            this.value = inputQuantity[$thisIndex];
            return;
        }
        if (val.length > Number($field.attr("maxlength"))) {
            val = val.slice(0, 3);
            $field.val(val);
        }
        inputQuantity[$thisIndex] = val;
    });
}
;


