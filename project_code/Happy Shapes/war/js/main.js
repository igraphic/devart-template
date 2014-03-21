var delay = 1000;
var canvas = null;
var topMargin = 60;
var leftMargin = 10;
var dimension = new Object();
var numberOfActors = 0;
var canvasWidth = 100;
var canvasHeight = 100;
var canvasBgColor = "white";

var refreshObj = null;     //used as workaround to refresh the canvas

//Set default profile
var dp = {shapes: [0, 2, 3, 4, 6, 8], maxSize: 30, minSize: 5, maxRotate: 180, minRotate: 0, maxOpacity: 1.0, minOpacity: 0.1, rotate: "always", fill: "never", stroke: "random", shadow: "never"};

$(document).ready(function() {

    init();

    UI_basicButtons();

    UI_objectsNumber();

    UI_shapesButtons();

    UI_optionsDialog();




});

function init() {

    $("#toolbar").height(36);
    topMargin = $("#toolbar").height();
    $("#canvas-div").height($(window).height() - topMargin);
    $("#canvas-div").width($(window).width() - leftMargin);

    canvasWidth = $("#canvas-div").width() - 15;
    canvasHeight = $("#canvas-div").height() - 15;
    initCanvas(canvasWidth, canvasHeight, canvasBgColor);
}

function initCanvas(width, height, bgColor) {
    clearCanvas();
    canvasWidth = width;
    canvasHeight = height;
    $("#shapes-canvas").attr("width", width);
    $("#shapes-canvas").attr("height", height);

    canvas = new fabric.Canvas('shapes-canvas', {
        backgroundColor: bgColor,
        selection: false,
        allowTouchScrolling: true
    });

    if (refreshObj === null) {
        refreshObj = new fabric.Circle({
            left: 0,
            top: 0,
            fill: canvasBgColor,
            radius: 1
        });
        canvas.add(refreshObj);
    }

}

function getRandomColor() {
    return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
}

function addNewActor(x, y, callBack) {
    var actor = new Object();
    actor.selectable = false;
    actor.width = getRandomInt(dp.minSize, dp.maxSize);
    actor.height = getRandomInt(dp.minSize, dp.maxSize);
    actor.left = x;
    actor.top = y;

    actor.shapeId = dp.shapes[getRandomInt(0, dp.shapes.length - 1)];
    //alert(actor.shapeId);
    if (dp.rotate === 'random') {
        actor.angle = null;
        if (getRandomInt(0, 3) === 1) {
            actor.angle = getRandomInt(dp.minRotate, dp.maxRotate);
        }
    } else if (dp.rotate === 'never') {
        actor.angle = null;
    } else if (dp.rotate === 'always') {
        actor.angle = getRandomInt(dp.minRotate, dp.maxRotate);
    } else {
        actor.angle = dp.rotate;
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






    var opacity = getRandomArbitary(dp.minOpacity, dp.maxOpacity);

    actor.opacity = 0;
    var obj;
    if (actor.shapeId === 4) {          //Rect
        obj = new fabric.Rect(actor);
    } else if (actor.shapeId === 3) {   //Triangle
        actor.height = actor.width;
        obj = new fabric.Triangle(actor);
    } else if (actor.shapeId === 2) {   //Square
        actor.height = actor.width;
        obj = new fabric.Rect(actor);
    } else if (actor.shapeId === 8) {   //Octagon
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
    } else if (actor.shapeId === 6) {   //Hexagon
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

        obj = new fabric.Polygon(points, actor);
    } else {    //Circle
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
    var canvas = document.getElementById("shapes-canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");                // Get the context for the canvas.
        var imgContents = canvas.toDataURL('image/png');      // Get the data as an image.
        SaveToDisk(imgContents, "Happy Shapes.png");
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
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
    }
}

function addRandomActors(no) {
    if (no > 0) {
        addNewActor(getRandomInt(-1*(dp.minSize/2), canvasWidth), getRandomInt(-1*(dp.minSize/2), canvasHeight), function() {
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
    if(canvas !== null){
        canvas.dispose();
    }    
}

function showtime() {
    var selectedShapes = $("#shapes-div :checkbox:checked");
    if ($(selectedShapes).size() > 0) {
        dp.shapes = new Array();
        $(selectedShapes).each(function() {
            dp.shapes.push($(this).attr("id").replace("shape-", "") * 1);
        });
        numberOfActors = $("#objects-spinner").val();
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


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}

function UI_objectsNumber() {
    $("#objects-spinner").keyup(function(e) {
        if (e.keyCode === 13)
        {
            showtime();
        }
    });

    $(".numeric-input").keyup(function(e) {
        $(this).val($(this).val().replace(/\D/g, ''));
    });

    var objectsSpinner = $("#objects-spinner").spinner({
        min: 1,
        max: 1000,
        step: 1,
        start: 100
    });
    $("#go-button").button();
}

function UI_shapesButtons() {
    $("#shapes-div").buttonset();
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
}

function UI_basicButtons() {
    $('#download-button').button({
        text: false,
        icons: {primary: 'ui-icon-arrowthickstop-1-s'}

    });

    $('#clear-button').button({
        text: false,
        icons: {primary: 'ui-icon-close'}

    });

    $('#options-button').button({
        text: false,
        icons: {primary: 'ui-icon-gear'}

    });
    $("#options-button").click(function() {
        $("#options-dialog").dialog("open");
    });

}

function UI_optionsDialog() {
    $("#options-dialog").dialog({
        autoOpen: false,
        width: '40%',
        height: '560',
        buttons: {
            Ok: function() {

                if ($("#canvas-width-input").val()*1 !== canvasWidth*1 || $("#canvas-height-input").val()*1 !== canvasHeight*1) {
                    initCanvas($("#canvas-width-input").val(), $("#canvas-height-input").val(), canvasBgColor);                    
                }
                
                $(this).dialog("close");                

            }
        }
    });



    $("#bg-picker").ColorPicker({
        onChange: function(hsb, hex, rgb) {
            canvasBgColor = '#' + hex;
            $('#bg-picker').css('backgroundColor', canvasBgColor);
            canvas.backgroundColor = canvasBgColor;
            $('#bg-picker').css('color', '#' + invertColor(canvasBgColor));
            refreshCanvas();
        }
    });

    $("#canvas-height-input").val(canvasHeight);
    $("#canvas-width-input").val(canvasWidth);
    //Shapes size
    $("#size-slider").slider({
        range: true,
        min: 1,
        max: 500,
        values: [5, 30],
        slide: function(event, ui) {
            dp.minSize = ui.values[ 0 ];
            dp.maxSize = ui.values[ 1 ];
            $("#size-label").text("Shapes size between "+dp.minSize + " & " + dp.maxSize);
        }
    });
    dp.minSize = $("#size-slider").slider("values", 0);
    dp.maxSize = $("#size-slider").slider("values", 1);
    $("#size-label").text("Shapes size between "+dp.minSize + " & " + dp.maxSize);

    //Rotate
    $("#rotate-radio").buttonset();
    dp.rotate = $("#rotate-radio :radio:checked").val();
    $("#rotate-radio :radio").each(function() {
        $(this).click(function() {
            dp.rotate = $("#rotate-radio :radio:checked").val();
        });
    });

    $("#rotate-slider").slider({
        range: true,
        min: 0,
        max: 180,
        values: [0, 180],
        slide: function(event, ui) {
            dp.minRotate = ui.values[ 0 ];
            dp.maxRotate = ui.values[ 1 ];
            $("#rotate-label").text("Rotate angle between " + dp.minRotate + " & " + dp.maxRotate);
        }
    });

    //Fill
    $("#fill-radio").buttonset();
    dp.fill = $("#fill-radio :radio:checked").val();
    $("#fill-radio :radio").each(function() {
        $(this).click(function() {
            if ($("#fill-radio :radio:checked").val() === "never") {
                // $("#stroke-always").click();
                document.getElementById("stroke-always").checked = true;
                $("#stroke-always").button("refresh");
                dp.stroke = $("#stroke-radio :radio:checked").val();
            }
            dp.fill = $("#fill-radio :radio:checked").val();
        });
    });
    
    

    //Stroke
    $("#stroke-radio").buttonset();
    dp.stroke = $("#stroke-radio :radio:checked").val();
    $("#stroke-radio :radio").each(function() {
        $(this).click(function() {
            if ($("#stroke-radio :radio:checked").val() === "never") {
                document.getElementById("fill-always").checked = true;
                $("#fill-always").button("refresh");
                dp.fill = $("#fill-radio :radio:checked").val();
            }
            dp.stroke = $("#stroke-radio :radio:checked").val();
        });
    });
    
    
    //Shadow
    $("#shadow-radio").buttonset();
    dp.shadow = $("#shadow-radio :radio:checked").val();
    $("#shadow-radio :radio").each(function() {
        $(this).click(function() {
            dp.shadow = $("#shadow-radio :radio:checked").val();
        });
    });

    dp.minSize = $("#size-slider").slider("values", 0);
    dp.maxSize = $("#size-slider").slider("values", 1);
    $("#rotate-label").text("Rotate angle between " + dp.minRotate + " & " + dp.maxRotate);
    
    
    //Opacity
     $("#opacity-slider").slider({
        range: true,
        min: 0.1,
        max: 1,
        values: [0.1, 1],
        step: 0.1,
        slide: function(event, ui) {
            dp.minOpacity = ui.values[ 0 ];
            dp.maxOpacity = ui.values[ 1 ];
            $("#opacity-label").text("Opacity between "+dp.minOpacity + " & " + dp.maxOpacity);
        }
    });
    dp.minOpacity = $("#opacity-slider").slider("values", 0);
    dp.maxOpacity = $("#opacity-slider").slider("values", 1);
    $("#opacity-label").text("Opacity between "+dp.minOpacity + " & " + dp.maxOpacity);
}

function test() {
    initCanvas(2000, 2000, "black");
    refreshCanvas("black");
}

function refreshCanvas() {
    refreshObj = new fabric.Circle({
        left: 0,
        top: 0,
        fill: canvasBgColor,
        radius: 1
    });
    canvas.add(refreshObj);
}