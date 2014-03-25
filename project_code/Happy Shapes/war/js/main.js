var canvas = null;
var topMargin = 60;
var leftMargin = 10;
var running = false;
var colorsRange = new Array();

//var refreshObj = null;     //used as workaround to refresh the canvas

//Set default profile
var dp = {source: 0, canvasWidth: 100, canvasHeight: 100, canvasBgColor: "white", numberOfActors: 0, shapes: [0, 2, 3, 4, 6, 8], maxSize: 30, minSize: 5, maxRotate: 180, minRotate: 0, maxOpacity: 1.0, minOpacity: 0.1, rotate: "always", fill: "never", stroke: "random", shadow: "never", colorRange: false, colorRange1: {r: 255, g: 255, b: 255}, colorRange2: {r: 0, g: 0, b: 255}};

$(document).ready(function() {
    // testGradient();


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

    dp.canvasWidth = $("#canvas-div").width() - 15;
    dp.canvasHeight = $("#canvas-div").height() - 15;
    initCanvas(dp.canvasWidth, dp.canvasHeight, dp.canvasBgColor);
}

function initCanvas(width, height, bgColor) {
    clearCanvas();
    dp.canvasWidth = width;
    dp.canvasHeight = height;
    $("#shapes-canvas").attr("width", width);
    $("#shapes-canvas").attr("height", height);

    canvas = new fabric.Canvas('shapes-canvas', {
        backgroundColor: bgColor,
        selection: false,
        allowTouchScrolling: true,
        renderOnAddRemove: false,
    });
    /*
     if (refreshObj === null) {
     refreshObj = new fabric.Circle({
     left: 0,
     top: 0,
     fill: dp.canvasBgColor,
     radius: 1
     });
     canvas.add(refreshObj);
     }
     */
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
    var fillColor = $.xcolor.random().getHex();
    var strokeColor = $.xcolor.random().getHex();
    if (dp.colorRange) {
        fillColor = colorsRange[getRandomInt(0, colorsRange.length)];
        strokeColor = colorsRange[getRandomInt(0, colorsRange.length)];
    }
    if (dp.fill === 'random') {
        actor.fill = null;
        if (getRandomInt(0, 1) === 1) {
            actor.fill = fillColor;
        }
    } else if (dp.fill === 'never') {
        actor.fill = null;
    } else if (dp.fill === 'always') {
        actor.fill = fillColor;
    } else {
        actor.fill = dp.fill;
    }


    if (dp.stroke === 'random') {
        actor.stroke = null;
        if (getRandomInt(0, 1) === 1 || actor.fill === null) {
            actor.stroke = strokeColor;
            actor.strokeWidth = getRandomInt(1, 2);
        }
    } else if (dp.stroke === 'never') {
        actor.stroke = null;
    } else if (dp.stroke === 'always') {
        actor.stroke = strokeColor;
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

    addObject(obj, callBack);


}


function addObject(obj, callBack) {
    var opacity = getRandomArbitary(dp.minOpacity, dp.maxOpacity);
    obj.opacity = opacity;
    canvas.add(obj);
    canvas.renderAll();
    callBack();

}

function addObject_pattern(obj, callBack) {
    fabric.Image.fromURL('css/images/icons/circle.png', function(img) {

        img.scaleToWidth(100);
        img.scaleToHeight(100);
        var patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(img);

        var pattern = new fabric.Pattern({
            source: function() {
                patternSourceCanvas.setDimensions({
                    width: img.getWidth(),
                    height: img.getHeight()
                });
                return patternSourceCanvas.getElement();
            }
        });

        var opacity = getRandomArbitary(dp.minOpacity, dp.maxOpacity);
        obj.opacity = opacity;
        obj.fill = pattern;
        canvas.add(obj);
        canvas.renderAll();
        callBack();
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
    if (dp.numberOfActors > 0) {
        var delay = 1;
        if (no > 0) {
            $("#go-button").hide();
            $("#surprise-button").hide();
            $("#stop-button").show();
            running = true;

            if (dp.numberOfActors < 200) {
                delay = 10;
            } else if (dp.numberOfActors < 500) {
                delay = 5;
            }
            addNewActor(getRandomInt(-1 * (dp.minSize / 2), dp.canvasWidth), getRandomInt(-1 * (dp.minSize / 2), dp.canvasHeight), function() {
                setTimeout(function()
                {
                    addRandomActors(no - 1);

                }
                , delay);
                $("#progress-span").text("loading(" + (dp.numberOfActors - no) + "/" + dp.numberOfActors + ")");
            });
        } else {
            running = false;
            $("#go-button").show();
            $("#surprise-button").show();
            $("#stop-button").hide();
            $("#progress-span").text("");
        }
    } else {
        running = false;
        $("#progress-span").text("");
    }
}

function clearCanvas() {
    if (canvas !== null) {
        canvas.dispose();
    }
}

function showtime(source) {
    if (dp.numberOfActors > 0 && running === true) {
        $("#go-button").show();
        $("#surprise-button").show();
        $("#stop-button").hide();
        dp.numberOfActors = 0;
        running = false;
        return;
    }

    if (source === 0 || source === 1) {//0     Surprise me button!, 1     go button! 
        dp.source = source;
    }
    var selectedShapes = $("#shapes-div :checkbox:checked");
    if ($(selectedShapes).size() > 0) {
        dp.shapes = new Array();
        $(selectedShapes).each(function() {
            dp.shapes.push($(this).attr("id").replace("shape-", "") * 1);
        });
        dp.numberOfActors = $("#objects-spinner").val();
        saveProfile();
        if (dp.colorRange) {
            setColorsRange();
        }
        addRandomActors(dp.numberOfActors);
    } else {
        alert("please select at least one shape!");
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
            showtime(1);
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
    $("#stop-button").button();

    $("#surprise-button").button();
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
        //text: false,
        icons: {primary: 'ui-icon-arrowthickstop-1-s'}

    });

    $('#clear-button').button({
        //text: false,
        icons: {primary: 'ui-icon-close'}

    });

    $('#options-button').button({
        //text: false,
        icons: {primary: 'ui-icon-gear'}

    });



    $("#options-button").click(function() {
        $("#options-dialog").dialog("open");
    });

    $('#chrome-button').button({
        text: false,
        icons: {primary: 'ui-icon-chrome', secondary: null}

    });

    $('#feedback-button').button({
        // text: false,
        icons: {primary: 'ui-icon-comment'}

    });

    $("#feedback-button").click(function() {
        $("#feedback-form").dialog("open");
    });

    $("#feedback-form").dialog({
        autoOpen: false,
        width: '35%',
        height: '300',
        buttons: {
            Ok: function() {
                sendFeedback();
                $(this).dialog("close");

            }
        }
    });

}

function UI_optionsDialog() {
    $("#options-dialog").dialog({
        autoOpen: false,
        width: '40%',
        height: '560',
        buttons: {
            Ok: function() {

                if ($("#canvas-width-input").val() * 1 !== dp.canvasWidth * 1 || $("#canvas-height-input").val() * 1 !== dp.canvasHeight * 1) {
                    initCanvas($("#canvas-width-input").val(), $("#canvas-height-input").val(), dp.canvasBgColor);
                }

                $(this).dialog("close");

            }
        }
    });


    $('#bg-picker').css('backgroundColor', dp.canvasBgColor);
    $("#bg-picker").ColorPicker({
        onChange: function(hsb, hex, rgb) {
            dp.canvasBgColor = '#' + hex;
            $('#bg-picker').css('backgroundColor', dp.canvasBgColor);
            canvas.backgroundColor = dp.canvasBgColor;
            canvas.renderAll();
        }
    });

    $("#canvas-height-input").val(dp.canvasHeight);
    $("#canvas-width-input").val(dp.canvasWidth);
    //Shapes size
    $("#size-slider").slider({
        range: true,
        min: 1,
        max: 500,
        values: [5, 30],
        slide: function(event, ui) {
            dp.minSize = ui.values[ 0 ];
            dp.maxSize = ui.values[ 1 ];
            $("#size-label").text("Shapes size between " + dp.minSize + " & " + dp.maxSize);
        }
    });
    dp.minSize = $("#size-slider").slider("values", 0);
    dp.maxSize = $("#size-slider").slider("values", 1);
    $("#size-label").text("Shapes size between " + dp.minSize + " & " + dp.maxSize);

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
        min: 0.01,
        max: 1,
        values: [0.1, 1],
        step: 0.01,
        slide: function(event, ui) {
            dp.minOpacity = ui.values[ 0 ];
            dp.maxOpacity = ui.values[ 1 ];
            $("#opacity-label").text("Opacity between " + dp.minOpacity + " & " + dp.maxOpacity);
        }
    });
    dp.minOpacity = $("#opacity-slider").slider("values", 0);
    dp.maxOpacity = $("#opacity-slider").slider("values", 1);
    $("#opacity-label").text("Opacity between " + dp.minOpacity + " & " + dp.maxOpacity);

    //Color range
    $("#color-range-button").button();

    $("#color-range-button").change(function() {
        if (this.checked) {
            $(".color-range-disabled").addClass("color-range-enabled").removeClass("color-range-disabled");
            $("#color1-picker").css('background-color', "#" +
                    makeColorPiece(dp.colorRange1.r) +
                    makeColorPiece(dp.colorRange1.g) +
                    makeColorPiece(dp.colorRange1.b));
            $("#color2-picker").css('background-color', "#" +
                    makeColorPiece(dp.colorRange2.r) +
                    makeColorPiece(dp.colorRange2.g) +
                    makeColorPiece(dp.colorRange2.b));
            dp.colorRange = true;
            $("#color1-picker").ColorPicker({
                onChange: function(hsb, hex, rgb) {
                    dp.colorRange1 = rgb;
                    $("#color1-picker").css('background-color', '#' + hex);
                    $("#color1-picker").css('color', invertColor('#' + hex));
                }
            });
            $("#color2-picker").ColorPicker({
                onChange: function(hsb, hex, rgb) {
                    dp.colorRange2 = rgb;
                    $("#color2-picker").css('background-color', '#' + hex);
                    $("#color2-picker").css('color', invertColor('#' + hex));

                }
            });
        } else {
            dp.colorRange = false;
            $(".color-range-enabled").addClass("color-range-disabled").removeClass("color-range-enabled");
        }
    });
}


/*
 function refreshCanvas() {
 refreshObj = new fabric.Circle({
 left: 0,
 top: 0,
 fill: dp.canvasBgColor,
 radius: 1
 });
 canvas.add(refreshObj);
 }*/

function saveProfile() {
    var ajaxData = new Object();
    ajaxData.action = "saveProfile";
    ajaxData.profile = JSON.stringify(dp);
    doAjax("ajax", ajaxData);
}

function sendFeedback() {
    if ($("#feedback-name").val() !== "" || $("#feedback-email").val() !== "" || $("#feedback-comment").val() !== "") {
        var ajaxData = new Object();
        ajaxData.action = "sendFeedback";
        ajaxData.name = $("#feedback-name").val();
        ajaxData.email = $("#feedback-email").val();
        ajaxData.comment = $("#feedback-comment").val();
        doAjax("ajax", ajaxData);
        $("#feedback-name").val("");
        $("#feedback-email").val("");
        $("#feedback-comment").val("");
    }

}

function loadPattern(url) {
    var pattern = new fabric.Pattern({
        source: new fabric.Image.fromURL('css/images/happy shapes01.png', function(img) {
            img.scaleToWidth(100);
        }),
        repeat: 'repeat'
    });
}

function test() {
    var pattern = null;
    fabric.Image.fromURL('css/images/icons/circle.png', function(img) {

        img.scaleToWidth(100);
        img.scaleToHeight(100);
        var patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(img);

        pattern = new fabric.Pattern({
            source: function() {
                patternSourceCanvas.setDimensions({
                    width: img.getWidth(),
                    height: img.getHeight()
                });
                return patternSourceCanvas.getElement();
            }
        });
        canvas.add(new fabric.Circle(
                {
                    left: 100,
                    top: 200,
                    radius: 160,
                    height: 160,
                    fill: pattern
                }));

    });


}

function test_working() {
    fabric.Image.fromURL('css/images/icons/circle.png', function(img) {

        img.scaleToWidth(100);
        img.scaleToHeight(100);
        var patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(img);

        var pattern = new fabric.Pattern({
            source: function() {
                patternSourceCanvas.setDimensions({
                    width: img.getWidth(),
                    height: img.getHeight()
                });
                return patternSourceCanvas.getElement();
            }
        });

        canvas.add(new fabric.Circle(
                {
                    left: 100,
                    top: 200,
                    radius: 160,
                    height: 160,
                    fill: pattern
                }));
    });

}

function setColorsRange() {
    colorsRange = new Array();
    for (var i = 1; i < 100; i++) {
        colorsRange.push(makeGradientColor(dp.colorRange1, dp.colorRange2, i));
    }
}

function makeGradientColor(color1, color2, percent) {
    var newColor = {};

    function makeChannel(a, b) {
        return(a + Math.round((b - a) * (percent / 100)));
    }



    newColor.r = makeChannel(color1.r, color2.r);
    newColor.g = makeChannel(color1.g, color2.g);
    newColor.b = makeChannel(color1.b, color2.b);
    newColor.cssColor = "#" +
            makeColorPiece(newColor.r) +
            makeColorPiece(newColor.g) +
            makeColorPiece(newColor.b);
    return(newColor.cssColor);
}

function makeColorPiece(num) {
    num = Math.min(num, 255);   // not more than 255
    num = Math.max(num, 0);     // not less than 0
    var str = num.toString(16);
    if (str.length < 2) {
        str = "0" + str;
    }
    return(str);
}

function surpriseMe() {
    var sizeInterval = getRandomInt(0, 20);
    var maxNumberInterval = getRandomArbitary(1.5, 3.5);
    var maxSize = 300;
    var minSize = 15;
    if (sizeInterval < 12) {
        maxSize = 40;
    } else if (sizeInterval < 15) {
        maxSize = 50;
        maxNumberInterval = getRandomArbitary(3.5, 4.5);
    } else if (sizeInterval < 17) {
        maxSize = 70;
        maxNumberInterval = getRandomArbitary(3.5, 4.5);
    } else {
        maxNumberInterval = getRandomArbitary(3.5, 4.5);
        minSize = 0;
    }
    var size1 = getRandomInt(minSize, maxSize);
    var size2 = getRandomInt(minSize, maxSize);
    dp.maxSize = Math.max(size1, size2);
    dp.minSize = Math.min(size1, size2);

    $("#size-slider").slider("values", [dp.minSize, dp.maxSize]);
    $("#size-label").text("Shapes size between " + dp.minSize + " & " + dp.maxSize);


    var opacity1 = Math.round(getRandomArbitary(0.1, 1.0) * 100) / 100;
    var opacity2 = Math.round(getRandomArbitary(0.1, 1.0) * 100) / 100;
    dp.maxOpacity = Math.max(opacity1, opacity2);
    dp.minOpacity = Math.min(opacity1, opacity2);

    $("#opacity-slider").slider("values", [dp.minOpacity, dp.maxOpacity, ]);
    $("#opacity-label").text("Opacity between " + dp.minOpacity + " & " + dp.maxOpacity);

    dp.numberOfActors = Math.floor(Math.min(dp.canvasWidth, dp.canvasHeight) / maxNumberInterval);
    $("#objects-spinner").val(dp.numberOfActors);
    //Uncheck all shapes
    $('#shapes-div :checkbox').each(function() {
        document.getElementById($(this).attr("id")).checked = false;
        $(this).button("refresh");
    });
    dp.shapes = new Array();
    var noOfSahpes = getRandomInt(1, $("#shapes-div :checkbox").size() + 5);
    if (noOfSahpes - 2 > $("#shapes-div :checkbox").size()) {
        noOfSahpes = 2;
    } else if (noOfSahpes > $("#shapes-div :checkbox").size()) {
        noOfSahpes = 1;
    }

    var r1 = getRandomInt(0, 4);
    if (getRandomInt(0, 3)) {
        if (r1 === 0) {
            dp.fill = "never";
        } else if (r1 === 1) {
            dp.fill = "always";
        } else {
            dp.fill = "random";
        }
    }
    document.getElementById("fill-" + dp.fill).checked = true;
    $("#fill-" + dp.fill).button("refresh");
    if (dp.fill === "never") {
        dp.stroke = "always";
    } else {
        r1 = getRandomInt(0, 4);
        if (r1 === 0) {
            dp.stroke = "never";
            dp.fill = "always";
        } else if (r1 === 1) {
            dp.stroke = "always";
        } else {
            dp.stroke = "random";
        }
    }

    r1 = getRandomInt(0, 4);
    if (r1 === 0) {
        dp.shadow = "never";
    } else if (r1 === 1) {
        dp.shadow = "random";
    } else {
        dp.shadow = "always";
    }

    r1 = getRandomInt(0, 4);
    if (r1 === 0) {
        dp.rotate = "always";
    } else if (r1 === 1) {
        dp.rotate = "random";
    } else {
        dp.rotate = "never";
    }

    document.getElementById("fill-" + dp.fill).checked = true;
    $("#fill-" + dp.fill).button("refresh");

    document.getElementById("stroke-" + dp.stroke).checked = true;
    $("#stroke-" + dp.stroke).button("refresh");

    document.getElementById("shadow-" + dp.shadow).checked = true;
    $("#shadow-" + dp.shadow).button("refresh");

    document.getElementById("rotate-" + dp.rotate).checked = true;
    $("#rotate-" + dp.rotate).button("refresh");

    r1 = getRandomInt(0, 4);
    if (r1 === 0) {
        dp.canvasBgColor = $.xcolor.random().getHex();
    } else if (r1 > 2) {
        dp.canvasBgColor = "black";
    } else {
        dp.canvasBgColor = "white";
    }
    r1 = getRandomInt(0, 2);
    if (r1 === 0) {
        dp.colorRange = true;
        var cRandom = $.xcolor.random();
        dp.colorRange1 = cRandom.getRGB();
        dp.colorRange2 = $.xcolor.complementary(cRandom).getRGB();
        document.getElementById("color-range-button").checked = true;
        $("#color-range-button").button("refresh");

        $(".color-range-disabled").addClass("color-range-enabled").removeClass("color-range-disabled");
        $("#color1-picker").css('background-color', "#" +
                makeColorPiece(dp.colorRange1.r) +
                makeColorPiece(dp.colorRange1.g) +
                makeColorPiece(dp.colorRange1.b));
        $("#color2-picker").css('background-color', "#" +
                makeColorPiece(dp.colorRange2.r) +
                makeColorPiece(dp.colorRange2.g) +
                makeColorPiece(dp.colorRange2.b));
    } else if (r1 === 1) {
        dp.colorRange = false;
        document.getElementById("color-range-button").checked = false;
        $("#color-range-button").button("refresh");
        $(".color-range-enabled").addClass("color-range-disabled").removeClass("color-range-enabled");
    }

    canvas.backgroundColor = dp.canvasBgColor;
    $('#bg-picker').css('backgroundColor', dp.canvasBgColor);


    for (var i = 0; i < noOfSahpes; i++) {
        var unCheckedShapes = $("#shapes-div :checkbox:not(:checked)").size();
        if (unCheckedShapes > 0) {
            var unchIndex = getRandomInt(0, unCheckedShapes - 1);
            var shapeId = $("#shapes-div :checkbox:not(:checked):eq(" + unchIndex + ")").attr("id");
            document.getElementById(shapeId).checked = true;
            $("#" + shapeId).button("refresh");
            dp.shapes.push(shapeId.replace("shape-", ""));
        }

    }
    showtime(0);
}
