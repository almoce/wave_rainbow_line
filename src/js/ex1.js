import p5 from "p5";

let GuiControls = function(_p5, cvs) {
    this.pointNum = 8;
    this.roughness = 0.15;
    this.speed = 2.0;
    this.color = {
        h: 0,
        s: 0.0,
        v: 1.0
    };
    this.rainbow = true;
    this.save = function() {
        _p5.save(cvs, 'noise-wave.jpg', true); // Setting the third argument to 'true' improves image quality
    };
}


let scketch = function(_p5) {

    let noise_x = _p5.random(1000);
    let noise_y = _p5.random(1000);
    let maxFrame = 2000;
    let count = 0;
    let colorCounter = _p5.random(360);
    let guiControls;

    _p5.setup = function() {
        let cvs = _p5.createCanvas(_p5.windowWidth, _p5.windowHeight);
        _p5.blendMode(_p5.ADD);
        _p5.colorMode(_p5.HSB, 360, 1, 1);
        _p5.background(0, 0, 0, 255);

        // // dat GUI
        guiControls = new GuiControls(_p5, cvs);
        // let gui = new dat.GUI();
        // gui.add(guiControls, 'pointNum', 2, 30).onChange(() => {
        //     this.reDraw();
        // });
        // gui.add(guiControls, 'roughness', 0.01, 0.2).onChange(() => {
        //     this.reDraw();
        // });
        // gui.add(guiControls, 'speed', 0.1, 10.0).onChange(() => {
        //     this.reDraw();
        // });
        // gui.addColor(guiControls, 'color').onChange(() => {
        //     gui.__controllers.forEach(function(v, i) {
        //         if (v.property === 'rainbow') {
        //             v.setValue(false);
        //         }
        //     })
        //     this.reDraw();
        // });
        // gui.add(guiControls, 'rainbow').onChange(() => {
        //     this.reDraw();
        // });
        // gui.add(guiControls, 'save');
    }

    _p5.draw = function() {
        _p5.background(0, 0, 0, 255);

        let strokeColor;
        colorCounter %= 360;
            strokeColor = _p5.color(colorCounter, 100, 100, 0.05);
        // if (guiControls.rainbow) {
        //     colorCounter %= 360;
        //     strokeColor = _p5.color(colorCounter, 100, 100, 0.05);
        // } else {
        //     strokeColor = _p5.color(guiControls.color.h, guiControls.color.s, guiControls.color.v, 0.05);
        // }

        _p5.noFill();
        _p5.stroke(strokeColor);

        _p5.push();
        _p5.translate(0, _p5.windowHeight / 2);
        _p5.beginShape();
        _p5.curveVertex(0, 0);
        for (let i = 0; i <= guiControls.pointNum; i++) {
            let posx = _p5.windowWidth / guiControls.pointNum * i;
            let posy = _p5.noise(noise_x + (i * guiControls.roughness), noise_y - (i * guiControls.roughness)) * _p5.windowHeight - _p5.windowHeight / 2;
            _p5.curveVertex(posx, posy);
        }
        _p5.curveVertex(_p5.windowWidth, 0);
        _p5.endShape();
        _p5.pop();

        noise_x += guiControls.speed * 0.001;
        noise_y += guiControls.speed * 0.001;

        count += 1;
        colorCounter += 0.5;

        if (count > maxFrame) {
            _p5.noLoop();
        }

    }

    _p5.reDraw = function() {
        _p5.clear();
        _p5.fill(_p5.color(0, 0, 0, 1));
        _p5.rect(0, 0, _p5.windowWidth, _p5.windowHeight);
        noise_x = _p5.random(10000);
        noise_y = _p5.random(10000);
        if (count > maxFrame) {
            count = 0;
            _p5.loop();
        }
        count = 0;
    }


}

new p5(scketch);
