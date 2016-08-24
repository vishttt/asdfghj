MyGame = function (index, game, player) {
    this.game = game;
    this.player = player;
  
};
MyGame.prototype = {
    create: function () {
        
        this.score = 0,
        this.counterMax = 60,
        this.clue = '',
        this.word = '',
        this.level = 0;
       
        var t = (new Phaser.Graphics).beginFill(0, 0.6).drawRoundedRect(0, 0, 600, 240, 20).endFill().beginFill(16766006, 1).drawRoundedRect(5, 5, 590, 230, 15).endFill().generateTexture();
        this.add.image(20, 360, t),
        this.userText = this.game.add.text(this.world.centerX, 480, '', {
            font: '56px Sniglet',
            fill: '#333333'
        }),
        this.userText.anchor.setTo(0.5),
        this.add.image(50, 300, 'iconInfo'),
        this.clueText = this.game.add.text(100, 320, '', {
            font: '32px Sniglet',
            fill: '#ffffff'
        }),
        this.clueText.anchor.setTo(0, 0.5),
        this.letters = this.game.add.group(),
        this.lettersOrder = [
        ];
        var e = (new Phaser.Graphics).beginFill(0, 1).drawCircle(0, 0, 60).endFill().generateTexture(),
        s = this.game.add.text(0, 2, 'X', {
            font: '24px Sniglet',
            fill: '#FFFFFF'
        });
        s.anchor.setTo(0.5),
        this.resetBtn = this.add.image(575, 405, e),
        this.resetBtn.addChildAt(s, 0),
        this.resetBtn.anchor.setTo(0.5),
        this.resetBtn.inputEnabled = !0,
        this.resetBtn.input.useHandCursor = !0,
        this.resetBtn.events.onInputUp.add(this.emptyUserInput, this),
        this.resetBtn.visible = !1,
        this.counterBackground = this.game.add.graphics(120, 120),
        this.counterBackground.lineStyle(0),
        this.counterBackground.beginFill(0, 0.3),
        this.counterBackground.drawCircle(0, 0, 200),
        this.counterBackground.endFill(),
        this.circleTimerGroup = this.game.add.group(),
        this.counterDisplay = this.add.text(120, 120, '', {
            font: '50px Sniglet',
            fill: '#ffffff'
        }),
        this.counterDisplay.anchor.setTo(0.5, 0.5),
        this.scoreText = this.game.add.text(280, 80, this.game.cache.getJSON('ihm').lbl_score[this.game.global.language] + this.score, {
            font: '72px Sniglet',
            fill: '#FFFFFF'
        }),
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 0),
        this.winText = this.game.add.text(this.world.centerX, 550, this.game.cache.getJSON('ihm').lbl_win[this.game.global.language], {
            font: '40px Sniglet',
            fill: '#00BB00'
        }),
        this.winText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0),
        this.winText.anchor.setTo(0.5),
        this.loseText = this.game.add.text(this.world.centerX, 550, this.game.cache.getJSON('ihm').lbl_lose[this.game.global.language], {
            font: '40px Sniglet',
            fill: '#FF0000'
        }),
        this.loseText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0),
        this.loseText.anchor.setTo(0.5),
        this.winText.visible = !1,
        this.loseText.visible = !1,
        this.startText = this.game.add.text(this.world.centerX, 640, this.game.cache.getJSON('ihm').lbl_start[this.game.global.language], {
            font: '40px Sniglet',
            fill: '#ffffff'
        }),
        this.startText.alpha = 0,
        this.startText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0),
        this.startText.anchor.setTo(0.5, 0),
        this.startText.wordWrap = !0,
        this.startText.wordWrapWidth = 480;
      
    },
    launchGame: function () {
        var t = this.game.rnd.integerInRange(0, this.wordsJSON.length - 1);
        switch (this.game.global.language) {
            case 'fr':
                this.clue = this.wordsJSON[t].clue_fr,
                this.word = this.wordsJSON[t].word_fr.toUpperCase();
                break;
            case 'en':
                this.clue = this.wordsJSON[t].clue_en,
                this.word = this.wordsJSON[t].word_en.toUpperCase();
                break;
            default:
                this.clue = this.wordsJSON[t].clue_en,
                this.word = this.wordsJSON[t].word_en.toUpperCase()
        }
        this.wordsJSON.splice(t, 1),
        this.clueText.text = this.clue,
        this.winText.visible = !1,
        this.loseText.visible = !1,
        this.initUserText(),
        this.letters.removeAll(!0, !0),
        this.lettersOrder = [
        ];
        for (var e = (new Phaser.Graphics).beginFill(0, 0.6).drawCircle(0, 0, 90).endFill().beginFill(16777215, 1).drawCircle(0, 0, 82).endFill().generateTexture(), s = (new Phaser.Graphics).beginFill(0, 0.6).drawCircle(0, 0, 90).endFill().beginFill(16777215, 1).drawCircle(0, 0, 80).endFill().generateTexture(), i = this.word.replace(/ /g, '').split(''), a = i.sort(this.sorting), r = 70, n = 680, h = 0; h < a.length; h++) {
            var l = 100 * (h % 11) + r,
            o = 180 * Math.floor(h / 11) + n;
            h % 11 >= 6 && (l -= 550, o += 90);
            var d = this.game.add.text(0, 2, a[h].toUpperCase(), {
                font: '36px Sniglet',
                fill: '#333333'
            });
            d.anchor.setTo(0.5);
            var g = this.add.image(l, o, e);
            g.addChildAt(d, 0),
            g.anchor.setTo(0.5),
            g.letter = a[h],
            g.inputEnabled = !0,
            g.input.useHandCursor = !0,
            g.events.onInputUp.add(function (t) {
                t.setTexture(e),
                t.getChildAt(0).y = 2,
                this.letterClick(t)
            }, this),
            g.events.onInputDown.add(function (t) {
                t.setTexture(s),
                t.getChildAt(0).y = 4
            }, this),
            g.events.onInputOut.add(function (t) {
                t.setTexture(e),
                t.getChildAt(0).y = 2
            }, this),
            this.letters.add(g)
    }
    this.counterDisplay.text = '' + this.counter,
    this.game.add.tween(this.counterDisplay.scale).to({
        x: 1.2,
        y: 1.2
    }, 300, null, !0, 0, 0, !0),
    this.timer = this.game.time.create(!1),
    this.timer.loop(1000, this.updateCounter, this),
    this.timer.start()
},
initUserText: function () {
    this.userText.text = '';
    for (var t = 0; t < this.word.length; t++) ' ' === this.word[t] ? this.userText.text += ' ' : this.userText.text += '_'
},
eraseLastLetter: function () {
    for (var t = this.userText.text.split(''), e = t.length - 1; e >= 0; e--) if (' ' != t[e] && '_' != t[e]) {
        this.userText.text = this.userText.text.substr(0, e) + '_' + this.userText.text.substr(e + 1);
        break
    }
},
letterClick: function (t) {
    this.userText.text = this.userText.text.replace(/_/, t.letter.toUpperCase()),
    this.lettersOrder.push(this.letters.getChildIndex(t)),
    t.kill(),
    0 === this.letters.countLiving() && this.userText.text === this.word ? (this.resetBtn.visible = !1, this.win())  : this.resetBtn.visible = !0
},
emptyUserInput: function () {
    this.eraseLastLetter(),
    this.letters.getChildAt(this.lettersOrder[this.lettersOrder.length - 1]).revive(),
    this.lettersOrder.pop(),
    0 === this.letters.countDead() && (this.resetBtn.visible = !1)
},
updateCounter: function () {
    this.counter--,
    this.counterDisplay.text = '' + this.counter,
    this.game.add.tween(this.counterDisplay.scale).to({
        x: 1.2,
        y: 1.2
    }, 300, null, !0, 0, 0, !0);
    var t = this.game.add.graphics(120, 120);
    this.circleTimerGroup.add(t),
    t.lineStyle(20, 16767232);
    var e = this.game.math.degToRad( - 90 + 360 / this.counterMax * (this.counterMax - (this.counter + 1))),
    s = this.game.math.degToRad( - 90 + 360 / this.counterMax * (this.counterMax - this.counter)),
    i = t.arc(0, 0, 90, e, s, !1);
    i.alpha = 0,
    i.beginFill(16724736),
    i.endFill();
    var a = this.game.add.tween(i).to({
        alpha: 1
    }, 400);
    a.start(),
    0 === this.counter && (this.timer.destroy(), this.lose())
},
win: function () {
    this.timer.pause(),
    this.score++,
    this.scoreText.text = 'Score : ' + this.score;
    var t = localStorage.getItem('fwc_bs');
    (null === t || this.score > t) && localStorage.setItem('fwc_bs', this.score),
    0 === this.wordsJSON.length && (this.wordsJSON = this.shuffleArray(this.game.cache.getJSON('words')).slice()),
    this.winText.x = this.world.centerX - 600,
    this.winText.visible = !0;
    this.game.add.tween(this.winText).to({
        x: this.world.centerX
    }, 2000, Phaser.Easing.Elastic.Out, !0);
    this.game.time.events.add(3 * Phaser.Timer.SECOND, this.launchGame, this)
},
lose: function () {
    this.loseText.x = this.world.centerX + 600,
    this.loseText.text += this.word,
    this.loseText.visible = !0;
    this.game.add.tween(this.loseText).to({
        x: this.world.centerX
    }, 2000, Phaser.Easing.Elastic.Out, !0);
    this.resetBtn.visible = !1,
    this.letters.forEachAlive(function (t) {
        t.inputEnabled = !1
    }, this),
    this.game.time.events.add(4 * Phaser.Timer.SECOND, this.returnMenu, this)
},
returnMenu: function () {
    this.state.start('menu')
},
sorting: function (t, e) {
    return t > e ? 1 : - 1
},
shuffleArray: function (t) {
    for (var e = t.length - 1; e > 0; e--) {
        var s = Math.floor(Math.random() * (e + 1)),
        i = t[e];
        t[e] = t[s],
        t[s] = i
    }
    return t
}
};

