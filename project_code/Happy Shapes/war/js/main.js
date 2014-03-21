var delay = 1000;
var canvas;
var topMargin = 60;
var leftMargin = 13;
var dimension = new Object();
var numberOfActors = 0;

//Set default profile
var dp = {maxSize: 30, minSize: 5, shapes: [0,2,3,4,6,8], angle: "never", fill: "random", stroke: "random", shadow: "always", opacity: "random"};

$(document).ready(function() {

    $("#actors-number").keyup(function(e) {
        if (e.keyCode === 13)
        {
            showtime();
        }
    });

    $("#shapes-div").buttonset();

    $('#download-button').button({
        text: false,
        icons: {primary: 'ui-icon-download'}

    });

    $('#clear-button').button({
        text: false,
        icons: {primary: 'ui-icon-clear'}

    });
    
     $('#options-button').button({
        text: false,
        icons: {primary: 'ui-icon-gear'}

    });

    $('#shape-4').button({
        text: false,
        icons: {primary: 'ui-icon-rect', secondary: null}

    });
    $('#shape-2').button({
        text: false,
        icons: {primary: 'ui-icon-square', secondary: null}

    });
    $('#shape-3').button({
        text: false,
        icons: {primary: 'ui-icon-triangle', secondary: null}

    });
    $('#shape-6').button({
        text: false,
        icons: {primary: 'ui-icon-hexagon', secondary: null}

    });
    $('#shape-8').button({
        text: false,
        icons: {primary: 'ui-icon-octagon', secondary: null}

    });
    $('#shape-0').button({
        text: false,
        icons: {primary: 'ui-icon-circle', secondary: null}

    });
    $("#size-slider").slider({
        range: true,
        min: 1,
        max: 500,
        values: [5, 30],
        slide: function(event, ui) {
            dp.minSize = ui.values[ 0 ];
            dp.maxSize = ui.values[ 1 ];
            $("#size-setter").text("min: " + dp.minSize + ", max: " + dp.maxSize);
        }
    });

    $("#options-dialog").dialog({
        autoOpen: false,
        width: '40%',
        height: '300',
        buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });

    $("#options-button").click(function() {
        $("#options-dialog").dialog("open");
    });

    dp.minSize = $("#size-slider").slider("values", 0);
    dp.maxSize = $("#size-slider").slider("values", 1);
    $("#size-setter").val("min: " + dp.minSize + ", max: " + dp.maxSize);


    $("#bg-picker").ColorPicker({
        onChange: function(hsb, hex, rgb) {
            $('#bg-picker').css('backgroundColor', '#' + hex);
            canvas.backgroundColor = '#' + hex;
            $('#bg-picker').css('color', '#' + invertColor('#' + hex));
        }
    });

    dimension.width = $(window).width() - leftMargin;
    dimension.height = $(window).height() - $("#toolbar").height();

    $("#canvas-div").height(dimension.height);
    $("#canvas-div").width(dimension.width);

    $("#scratch-canvas").attr("height", dimension.height);
    $("#scratch-canvas").attr("width", dimension.width);

    canvas = new fabric.Canvas('scratch-canvas', {
        backgroundColor: "white",
        selection: false,
        allowTouchScrolling: true
    });

});


function getRandomColor() {
    return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
}

function addNewActor(x, y, callBack) {
    var actor = new Object();
    actor.selectable = false;
    actor.width = getRandomInt(dp.minSize, dp.maxSize);
    actor.height = getRandomInt(dp.minSize, dp.maxSize);
    actor.left = x - leftMargin;
    actor.top = y - topMargin;

    actor.shapeId = dp.shapes[getRandomInt(0, dp.shapes.length - 1)];
    //alert(actor.shapeId);
    if (dp.angle === 'random') {
        actor.angle = null;
        if (getRandomInt(0, 3) === 1) {
            actor.angle = getRandomInt(0, 180);
        }
    } else if (dp.angle === 'never') {
        actor.angle = null;
    } else if (dp.angle === 'always') {
        actor.angle = getRandomInt(1, 180);
    } else {
        actor.angle = dp.angle;
    }

    if (dp.fill === 'random') {
        actor.fill = null;
        if (getRandomInt(0, 1) === 1) {
            actor.fill = getRandomColor();
        }
    } else if (dp.fill === 'never') {
        actor.fill = null;
    } else if (dp.fill === 'always') {
        actor.fill = getRandomColor();
    } else {
        actor.fill = dp.fill;
    }


    if (dp.stroke === 'random') {
        actor.stroke = null;
        if (getRandomInt(0, 1) === 1 || actor.fill === null) {
            actor.stroke = getRandomColor();
            actor.strokeWidth = getRandomInt(1, 2);
        }
    } else if (dp.stroke === 'never') {
        actor.stroke = null;
    } else if (dp.stroke === 'always') {
        actor.stroke = getRandomColor();
        actor.strokeWidth = getRandomInt(1, 2);
    } else {
        actor.stroke = dp.stroke;
    }

    if (dp.shadow === 'random') {
        actor.shadow = null;
        if (getRandomInt(0, 1) === 1) {
            actor.shadow = 'rgba(0,0,0,0.3) 5px 5px 5px';
        }
    } else if (dp.shadow === 'never') {
        actor.shadow = null;
    } else if (dp.shadow === 'always') {
        actor.shadow = 'rgba(0,0,0,0.3) 5px 5px 5px';
    } else {
        actor.shadow = dp.shadow;
    }






    var opacity = getRandomArbitary(0.1, 1.0);

    actor.opacity = 0;
    var obj;
    if (actor.shapeId === 4) {
        obj = new fabric.Rect(actor);
    } else if (actor.shapeId === 3) {
        actor.height = actor.width;
        obj = new fabric.Triangle(actor);
    } else if (actor.shapeId === 2) {
        actor.height = actor.width;
        obj = new fabric.Rect(actor);
    } else if (actor.shapeId === 8) {
        var w = actor.width / 2;
        var x1 = actor.left;
        var y1 = actor.top;
        var p = Math.sin(45) * w;
        var points = [
            {x: x1 + p, y: y1},
            {x: x1 + w + p, y: y1},
            {x: x1 + w + 2 * p, y: y1 + p},
            {x: x1 + w + 2 * p, y: y1 + w + p},
            {x: x1 + w + p, y: y1 + w + 2 * p},
            {x: x1 + p, y: y1 + w + 2 * p},
            {x: x1, y: y1 + w + p},
            {x: x1, y: y1 + p}
        ];


        obj = new fabric.Polygon(points, actor);
    } else if (actor.shapeId === 6) {
        var w = actor.width / 2;
        var x1 = actor.left;
        var y1 = actor.top;
        var p = Math.sin(36) * w;
        var p2 = Math.cos(37) * w;
        var points = new Array();
        points = [
            {x: x1 + p, y: y1},
            {x: x1 + 2 * p, y: y1 + p2},
            {x: x1 + 2 * p, y: y1 + p2 + w},
            {x: x1 + p, y: y1 + 2 * p2 + w},
            {x: x1, y: y1 + p2 + w},
            {x: x1, y: y1 + p2}
        ];
        /*
         points = [
         {x: x1+4, y: y1},
         {x: x1+8, y: y1+3},
         {x: x1+8, y: y1+8},
         {x: x1+4, y: y1+11},
         {x: x1, y: y1+8},
         {x: x1, y: y1+3}
         ];*/


        obj = new fabric.Polygon(points, actor);
    } else {
        actor.radius = actor.width / 2;
        obj = new fabric.Circle(actor);
    }

    canvas.add(obj);
    obj.animate('opacity', opacity, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 1000,
        onComplete: callBack()
    });

}


function save() {
    var canvas = document.getElementById("scratch-canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");                // Get the context for the canvas.
        var imgContents = canvas.toDataURL('image/png');      // Get the data as an image.
        SaveToDisk(imgContents, "out.png");
    }
}

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

function addRandomActors(no) {
    if (no > 0) {
        addNewActor(getRandomInt(0, dimension.width), getRandomInt(0, dimension.height), function() {
            setTimeout(function()
            {
                addRandomActors(no - 1);

            }
            , 10);
            $("#progress-span").text("loading(" + (numberOfActors - no) + "/" + numberOfActors + ")");
        });
    } else {
        $("#progress-span").text("");
    }
}

function clearCanvas() {
    canvas.dispose();
}

function showtime() {
    var selectedShaped = $("#shapes-div :checkbox:checked");
    if ($(selectedShaped).size() > 0) {
        dp.shapes = new Array();
        $(selectedShaped).each(function() {
            dp.shapes.push($(this).attr("id").replace("shape-", "") * 1);
        });
        numberOfActors = $("#actors-number").val();
        addRandomActors(numberOfActors);
    } else {
        alert("please select at least on shape!");
    }
}

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);           // remove #
    color = parseInt(color, 16);          // convert to integer
    color = 0xFFFFFF ^ color;             // invert three bytes
    color = color.toString(16);           // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color;                  // prepend #
    return color;
}


function doAjax(url, sentData, callback) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: sentData,
        async: true,
        success: function(msg) {
            msg = msg.replace(/^\s+|\s+$/g, '');
            if (callback) {
                callback(msg);
                
            }
            return true;
        },
        error: function(msg) {            
        }
    });
}



function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null) {
        return "";
    } else {
        return results[1];
    }
}


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}