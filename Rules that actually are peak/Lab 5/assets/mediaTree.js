function quickSample (sx,sy,sw,sh) {
    return new Sample (new Coordinate(sx,sy),new Coordinate(sw,sh));
}

let media = {
    images: {
        testSprite: {
            image: new Image(),
            green1_1: quickSample(0,0,0.25,0.25),
            orange1_1: quickSample(0.5,0,0.25,0.25),
            blue1_1: quickSample(0.75,0,0.25,0.25),
            f: quickSample(0,0.25,0.25,0.125),
            arrow: quickSample(0,0.25 + 0.125,0.125,0.125),
            b: quickSample(0.125,0.25 + 0.125,0.125,0.125),
            blue1_2: quickSample(0.25,0,0.25,0.5),
            green2_1: quickSample(0.5,0.25,0.5,0.25),
            green_3: quickSample(0,0.5 + 0.125,0.25,0.25 + 0.125),
            blue3_: quickSample(0.25,0.5 + 0.125,0.25 + 0.125,0.25),
            card: quickSample(0.25,0.75 + 0.125,0.125,0.125),
            corruptedCard: quickSample(0.75 + 0.125,0.5 + 0.125,0.125,0.125),
            corruptedOrange_3: quickSample(0.5 + 0.125,0.5 + 0.125,0.25,0.25 + 0.125),
            orangew: quickSample(0,0.5,0.25 + 0.125,0.125),
            red4_w: quickSample(0.25 + 0.125,0.5,0.5,0.125),
            a: quickSample(0.75 + 0.125,0.5,0.125,0.125)
        },
        highlightedTestSprite: {
            image: new Image(),
            green1_1: quickSample(0,0,0.25,0.25),
            orange1_1: quickSample(0.5,0,0.25,0.25),
            blue1_1: quickSample(0.75,0,0.25,0.25),
            f: quickSample(0,0.25,0.25,0.125),
            arrow: quickSample(0,0.25 + 0.125,0.125,0.125),
            b: quickSample(0.125,0.25 + 0.125,0.125,0.125),
            blue1_2: quickSample(0.25,0,0.25,0.5),
            green2_1: quickSample(0.5,0.25,0.5,0.25),
            green_3: quickSample(0,0.5 + 0.125,0.25,0.25 + 0.125),
            blue3_: quickSample(0.25,0.5 + 0.125,0.25 + 0.125,0.25),
            card: quickSample(0.25,0.75 + 0.125,0.125,0.125),
            corruptedCard: quickSample(0.75 + 0.125,0.5 + 0.125,0.125,0.125),
            corruptedOrange_3: quickSample(0.5 + 0.125,0.5 + 0.125,0.25,0.25 + 0.125),
            orangew: quickSample(0,0.5,0.25 + 0.125,0.125),
            red4_w: quickSample(0.25 + 0.125,0.5,0.5,0.125),
            a: quickSample(0.75 + 0.125,0.5,0.125,0.125)
        },
        title: {
            backdrop: {
                image: new Image(),
                title: quickSample(0,0,1,1)
            },
            buttons: {
                image: new Image(),
                a: quickSample(0,0,0.25,0.125),
                b: quickSample(0,0.125,0.25,0.125)
            }
        },
    },
    audio: {},
    fonts: {}
}