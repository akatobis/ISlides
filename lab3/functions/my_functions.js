var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function elemInArray(array, elem) {
    return array.indexOf(elem) !== -1;
}
var TypeBlock;
(function (TypeBlock) {
    TypeBlock[TypeBlock["image"] = 0] = "image";
    TypeBlock[TypeBlock["text"] = 1] = "text";
    TypeBlock[TypeBlock["figure"] = 2] = "figure";
})(TypeBlock || (TypeBlock = {}));
function deleteSlides(oldPresentationMaker) {
    var oldIdsSelectedSlides = oldPresentationMaker.idsSelectedSlides;
    var idLastSelectedSlide = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
    var oldSlides = oldPresentationMaker.presentation.slides;
    var newSlides = oldSlides.filter(function (slide) {
        return !elemInArray(oldIdsSelectedSlides, slide.id);
    });
    var indexLastSelectedSlide = 0;
    var idLastSlide = oldSlides[oldSlides.length - 1].id;
    if (idLastSelectedSlide === idLastSlide) {
        indexLastSelectedSlide = oldSlides.length - 2;
    }
    else {
        oldSlides.forEach(function (slide) {
            if (slide.id === idLastSelectedSlide) {
                indexLastSelectedSlide = oldSlides.indexOf(slide);
            }
        });
    }
    var newPresentation = __assign(__assign({}, oldPresentationMaker.presentation), { slides: newSlides });
    return __assign(__assign({}, oldPresentationMaker), { presentation: newPresentation, idsSelectedSlides: [
            newSlides[indexLastSelectedSlide - oldIdsSelectedSlides.length + 1].id,
        ] });
}
var deleteTextBlock = {
    typeBlock: TypeBlock.text,
    innerString: "",
    isBold: false,
    isItalick: false,
    isStrikethrough: false,
    isUnderline: false,
    colour: "000",
    fontSize: 16,
    font: "Calibri"
};
var deletBlocks = [
    {
        id: "1",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
    {
        id: "2",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
    {
        id: "3",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
    {
        id: "4",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
    {
        id: "5",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
    {
        id: "6",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
    {
        id: "7",
        content: deleteTextBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    },
];
var deletePresentation = {
    slides: [
        {
            id: "1",
            background: "111",
            blocks: deletBlocks
        },
        {
            id: "2",
            background: "222",
            blocks: []
        },
        {
            id: "3",
            background: "333",
            blocks: []
        },
        {
            id: "4",
            background: "444",
            blocks: []
        },
        {
            id: "5",
            background: "555",
            blocks: []
        },
        {
            id: "6",
            background: "666",
            blocks: []
        },
    ]
};
var deleteOpm = {
    presentation: deletePresentation,
    idsSelectedSlides: ["1"],
    idsSelectedBlocks: ["1", "5"]
};
function changeBackgroundSlide(oldPresentantionMaker, newBackground) {
    var idsSelectedSlides = oldPresentantionMaker.idsSelectedSlides;
    var oldSlides = oldPresentantionMaker.presentation.slides;
    var selectedSlides = oldSlides.filter(function (slide) {
        return elemInArray(idsSelectedSlides, slide.id);
    });
    var newSlides = oldSlides.map((function (slide) {
        if (elemInArray(selectedSlides, slide)) {
            return __assign(__assign({}, slide), { background: newBackground });
        }
        return slide;
    }));
    var newPresentation = __assign(__assign({}, oldPresentantionMaker.presentation), { slides: newSlides });
    return __assign(__assign({}, oldPresentantionMaker), { presentation: newPresentation });
}
function deleteBlocks(oldPresentationMaker) {
    var oldSlides = oldPresentationMaker.presentation.slides;
    var idSelectedSlide = oldPresentationMaker.idsSelectedSlides[0];
    var selectedSlide = oldSlides.filter(function (slide) {
        return idSelectedSlide === slide.id;
    })[0];
    var idsSelectedBlocks = oldPresentationMaker.idsSelectedBlocks;
    var oldBlocks = selectedSlide.blocks;
    var newBlocks = oldBlocks.filter(function (block) {
        return !elemInArray(idsSelectedBlocks, block.id);
    });
    var newSlides = oldSlides.map(function (slide) {
        if (slide.id === idSelectedSlide) {
            return __assign(__assign({}, slide), { blocks: newBlocks });
        }
        return slide;
    });
    var newPresentation = __assign(__assign({}, oldPresentationMaker.presentation), { slides: newSlides });
    return __assign(__assign({}, oldPresentationMaker), { presentation: newPresentation, idsSelectedBlocks: [] });
}
function addBlock(oldPresentationMaker, _a) {
    var img = _a.img, figureType = _a.figureType;
    var contentNewBlock;
    if (img) {
        contentNewBlock = addImage(img);
    }
    else if (figureType) {
        // contentNewBlock = ;
    }
    else {
        contentNewBlock = createTextBlock();
    }
    var idNewBlock = '';
    var newBlock = {
        id: idNewBlock,
        content: contentNewBlock,
        coordinatX: 500,
        coordinatY: 500,
        width: 400,
        higth: 250
    };
    var oldPresentation = oldPresentationMaker.presentation;
    var oldSlides = oldPresentation.slides;
    var idSelectedSlide = oldPresentationMaker.idsSelectedSlides[0];
    var selectedSlide = oldSlides.filter(function (slide) {
        return idSelectedSlide === slide.id;
    })[0];
    var oldBlocks = selectedSlide.blocks;
    var newSlides = oldSlides.map(function (slide) {
        if (slide.id === idSelectedSlide) {
            return __assign(__assign({}, selectedSlide), { blocks: __spreadArray(__spreadArray([], oldBlocks, true), [newBlock], false) });
        }
        return slide;
    });
    console.log(newSlides[0].blocks[7]);
    var newPresentation = __assign(__assign({}, oldPresentation), { slides: newSlides });
    return __assign(__assign({}, oldPresentationMaker), { presentation: newPresentation, idsSelectedBlocks: [] });
}
console.log(addBlock(deleteOpm, {}));
function addImage(img) {
    return {
        typeBlock: TypeBlock.image,
        imageBase64: img
    };
}
function createTextBlock() {
    return {
        typeBlock: TypeBlock.text,
        innerString: '',
        isBold: false,
        isItalick: false,
        isStrikethrough: false,
        isUnderline: false,
        colour: '000',
        fontSize: 16,
        font: "Calibri"
    };
}
function changeText(oldTextBlock, _a) {
    var newTextStyle = _a.newTextStyle, newColour = _a.newColour, newFont = _a.newFont, newFontSize = _a.newFontSize;
    if (newTextStyle) {
        if (newTextStyle = TextStyles.bold) {
            return __assign(__assign({}, oldTextBlock), { isBold: !oldTextBlock.isBold });
        }
        if (newTextStyle = TextStyles.italic) {
            return __assign(__assign({}, oldTextBlock), { isItalick: !oldTextBlock.isItalick });
        }
        if (newTextStyle = TextStyles.strikethrough) {
            return __assign(__assign({}, oldTextBlock), { isUnderline: !oldTextBlock.isUnderline });
        }
        if (newTextStyle = TextStyles.underline) {
            return __assign(__assign({}, oldTextBlock), { isStrikethrough: !oldTextBlock.isStrikethrough });
        }
    }
    if (newColour) {
        return __assign(__assign({}, oldTextBlock), { colour: newColour });
    }
    if (newFont) {
        return __assign(__assign({}, oldTextBlock), { font: newFont });
    }
    if (newFontSize) {
        return __assign(__assign({}, oldTextBlock), { fontSize: newFontSize });
    }
    return undefined;
}
var Extension;
(function (Extension) {
    Extension[Extension["pdf"] = 0] = "pdf";
    Extension[Extension["ppt"] = 1] = "ppt";
    Extension[Extension["pptx"] = 2] = "pptx";
})(Extension || (Extension = {}));
var TextStyles;
(function (TextStyles) {
    TextStyles[TextStyles["bold"] = 0] = "bold";
    TextStyles[TextStyles["italic"] = 1] = "italic";
    TextStyles[TextStyles["strikethrough"] = 2] = "strikethrough";
    TextStyles[TextStyles["underline"] = 3] = "underline";
})(TextStyles || (TextStyles = {}));
var TypeFigure;
(function (TypeFigure) {
    TypeFigure[TypeFigure["elipse"] = 0] = "elipse";
    TypeFigure[TypeFigure["line"] = 1] = "line";
    TypeFigure[TypeFigure["rectangle"] = 2] = "rectangle";
    TypeFigure[TypeFigure["triangle"] = 3] = "triangle";
})(TypeFigure || (TypeFigure = {}));
