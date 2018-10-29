const w = window.innerWidth;
const h = window.innerHeight;





var config = {
    type: Phaser.AUTO,
    parent: 'game',
    //backgroundColor: '#DDD897',
    backgroundColor: '#6767af',
    width: w,
    height: h,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    
    
    scene: {
        
        init: init,
        preload: preload,
        create: create,
        update: update,
        pack: {
            files: [
                { type: 'image', key: 'splash', url: 'public/assets/splash.jpg' }
            ]
        }
    }
    
    
};

var game = new Phaser.Game(config);
var self;

var font = 'Paytone One';
var moveMouse;
var playerdirection;
var mypoints = 0;

if(localStorage.highscore === undefined){
    var highscore = 0;
    localStorage.setItem('highscore', highscore);
}else{
    var highscore = localStorage.getItem("highscore");
}


var freeze = true;
var startscreen = true;
var dead = false;
var endscreen = false;
var allowclick = true;

function calcSize(){
    if(h<=480){
      return {top:-50};
    }
    if(h>480){
      return {top:(h-600)/2};
    }
}

var mute = false;

var cal = calcSize();
var autoH = cal.top;
var birdleft = 100;
var birdpos = 250+autoH;

var allBlocks = 500+autoH;
var howBlocks = (allBlocks)/60;
var fB = howBlocks/3;
var lB = howBlocks - fB;
var calb = {a:Math.round(howBlocks), b:Math.ceil(fB), c:Math.floor(lB)};

var defSpeed = 3.4;
var defInt = 2400;
var SPEED_A = defSpeed;

var GEN_TIME = Phaser.Math.Between(defInt, defInt);
var fixdif = false;
var levelStep = 5;
var levelUp = levelStep;
var addSpeed = 0.25;
var reduceInt = 100;

var heroes = ['pink','orange','violet'];

function init(){
    let splashpic = this.add.image(w/2, h/2, 'splash');
    this.splash = this.add.text(0, 0, 'Bird X', { fontFamily: font, fontSize: '80px', fill: '#70B46E' });
    this.splash.setStroke('#031B3C', 16);
    this.splash.setShadow(2, 2, "#333333", 2, true, true);
    this.splash.x = w/2 - this.splash.displayWidth/2;
    this.splash.y = h/2 - 70;
    //PRELOADER

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.2);
    progressBox.fillRect(w/2-150, h/2+75, 300, 30);
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: w/2,
        y: h/2 + 120,
        text: 'loading',
        style: {
            font: '20px '+font,
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: w/2,
        y: h/2+90,
        text: '0%',
        style: {
            font: '14px '+font,
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5).setDepth(30);
    

    
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x8DCC61, 1);
        progressBar.fillRect(w/2-145, h/2+78, 290 * value, 25).setDepth(10);
    });
    
    

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        splashpic.destroy();
        //this.splash.destroy();
    });
//PRELOADER

}

function preload (){

    

    this.load.audio('song', 'public/assets/sfx/theme.wav');
    this.load.audio('sfx-fly', 'public/assets/sfx/fly.wav');
    this.load.audio('sfx-coin', 'public/assets/sfx/coin.wav');
    this.load.audio('sfx-die', 'public/assets/sfx/die.wav');

    this.load.image('soundwaves', 'public/assets/soundON.png');
    this.load.image('sound', 'public/assets/soundOFF.png');

    this.load.image('ground', 'public/assets/platform.png');
    //this.load.image('line', 'public/assets/line.png');
    this.load.image('clear', 'public/assets/clear.png');
    this.load.image('block', 'public/assets/block.png');
    this.load.image('hole', 'public/assets/hole.png');
    this.load.image('holeup', 'public/assets/holeup.png');
    this.load.image('holedown', 'public/assets/holedown.png');
    /*
    this.load.image('bg', 'public/assets/bg.png');
    this.load.image('bgb1', 'public/assets/bgb1.png');
    this.load.image('bgb2', 'public/assets/bgb2.png');
    this.load.image('bgb3', 'public/assets/bgb3.png');
    this.load.image('bgsky', 'public/assets/bgsky.png');
    this.load.image('bggross', 'public/assets/bggross.png');
    this.load.image('bgend', 'public/assets/bgend.png');
    */
    this.load.spritesheet('bird-pink', 'public/assets/hero/heroes/pink.png', { frameWidth: 48, frameHeight: 33 });
    this.load.spritesheet('bird-orange', 'public/assets/hero/heroes/orange.png', { frameWidth: 48, frameHeight: 33 });
    this.load.spritesheet('bird-violet', 'public/assets/hero/heroes/violet.png', { frameWidth: 48, frameHeight: 33 });
    
    this.load.image('night_sky', 'public/assets/level/night/stage/sky.png');
    this.load.image('night_stars', 'public/assets/level/night/stage/stars.png');
    this.load.image('forrest1', 'public/assets/level/night/stage/forrest1.png');
    this.load.image('forrest2', 'public/assets/level/night/stage/forrest2.png');
    this.load.image('night_m1', 'public/assets/level/night/stage/mount1.png');
    this.load.image('night_m2', 'public/assets/level/night/stage/mount2.png');
    this.load.image('night_m3', 'public/assets/level/night/stage/mount3.png');
    this.load.image('night_line', 'public/assets/level/night/stage/line.png');
   
}

function create (){
    self = this;
    //this.stage.setBackgroundColor(0xff303f);
    
    
    
    this.sfxfly = this.sound.add('sfx-fly');
    this.sfxcoin = this.sound.add('sfx-coin');
    this.sfxdie = this.sound.add('sfx-die');
    this.song = this.sound.add('song');

    this.taptoplay = this.add.text(0, birdpos-28, 'tap to play', { fontFamily: font, fontSize: '32px', fill: '#8DCC61' });
    this.taptoplay.setStroke('#031B3C', 12);
    this.taptoplay.setShadow(2, 2, "#333333", 2, true, true);
    this.taptoplay.setDepth(10);
    this.taptoplay.setAlpha(1);
    this.taptoplay.x = (w/2 - this.taptoplay.displayWidth/2)+40;

    this.score = this.add.text(0, 40, '0', { fontFamily: font, fontSize: '56px', fill: '#ffffff' });
    this.score.setDepth(221);
    this.score.setStroke('#cccccc', 8);
    this.score.setShadow(2, 2, "#333333", 2, true, true);
    this.score.x = w/2 - this.score.displayWidth/2;

    //this.bgsky = this.add.tileSprite(0, 0+autoH, w, 500, 'bgsky').setOrigin(0);
    //this.bgb1 = this.add.tileSprite(0, 0+autoH, w, 500, 'bgb1').setOrigin(0);
    //this.bgb2 = this.add.tileSprite(0, 0+autoH, w, 500, 'bgb2').setOrigin(0);
    //this.bgb3 = this.add.tileSprite(0, 0+autoH, w, 500, 'bgb3').setOrigin(0);
    //this.bggross = this.add.tileSprite(0, 0+autoH, w, 500, 'bggross').setOrigin(0);

    this.bgsky = this.add.tileSprite(0, 0+autoH, w, 500, 'night_sky').setOrigin(0);
    this.stars = this.add.tileSprite(0, 0+autoH, w, 500, 'night_stars').setOrigin(0);
    this.bgb3 = this.add.tileSprite(0, 0+autoH, w, 500, 'night_m3').setOrigin(0);
    this.bgb2 = this.add.tileSprite(0, 0+autoH, w, 500, 'night_m2').setOrigin(0);
    this.bgb1 = this.add.tileSprite(0, 0+autoH, w, 500, 'night_m1').setOrigin(0);
    this.bggross2 = this.add.tileSprite(0, 0+autoH, w, 500, 'forrest2').setOrigin(0);
    this.bggross = this.add.tileSprite(0, 0+autoH, w, 500, 'forrest1').setOrigin(0);
    
    this.line = this.add.tileSprite(0, 500+autoH, w, 400, 'night_line').setOrigin(0).setDepth(100);
    this.floor = this.physics.add.image(0, 500+autoH, 'clear').setOrigin(0).setDisplaySize(w, 10); 
    

    this.floor.body.immovable = true;

    

    this.clear = this.physics.add.image(-90, 0, 'clear').setOrigin(0).setDisplaySize(1, h); 
    this.pipes = this.add.group();
    this.pointpipes = this.add.group();

    
        
        this.timedEvent = this.time.addEvent({
            delay: GEN_TIME,
            callback: addPipeRows,
            callbackScope: this,
            loop: true
        }); 
        

        this.randColor = Phaser.Math.Between(0, heroes.length-1);
        console.log(this.randColor, heroes[this.randColor]);
        
        this.player = this.physics.add.sprite(w/2-birdleft, birdpos, 'bird-'+heroes[this.randColor]);
        this.player.setDepth(150);
        
        for (let i = 0; i < heroes.length; i++){
            this.anims.create({
                key: 'fly-'+heroes[i],
                frames: this.anims.generateFrameNumbers('bird-'+heroes[i], { start: 0, end: 2 }),
                frameRate: 10,
                repeat: 0
            });
            this.anims.create({
                key: 'flyinf-'+heroes[i],
                frames: this.anims.generateFrameNumbers('bird-'+heroes[i], { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        this.player.play('flyinf-'+heroes[this.randColor], true);

        this.physics.add.overlap(this.clear, this.pipes.getChildren(), destroyPipe, null, this);
        this.physics.add.overlap(this.clear, this.pointpipes.getChildren(), destroyPipe, null, this); 
        this.physics.add.overlap(this.player, this.pointpipes.children.entries, pointPipe, null, this);

        this.physics.add.collider(this.player, this.pipes.getChildren(), deadBird, null, this);
        this.physics.add.collider(this.player, this.floor, deadBird, null, this);
        
        //INPUTS
        this.input.setTopOnly(true);
        this.allscreen = this.add.image(0,0,'clear').setOrigin(0).setDisplaySize(w,h);
        this.allscreen.setDepth(200);
        this.allscreen.setAlpha(0.3);
        this.allscreen.setInteractive();
        this.allscreen.on('pointerdown', function(pointer){
            
                if(startscreen){
                    console.log('tap on start');
                    startscreen = false;
                    freeze = false;
                    self.score.text = '0';
                    mypoints = 0;
                    self.player.setGravity(0, 500);
                    self.player.setCollideWorldBounds(true); 
                    self.song.play({loop:true});

                    

                    oneMove();
                }else{
                    oneMove();
                }
            
        }, this);

        this.soundbtn = this.physics.add.image(w-80, 10, 'sound').setOrigin(0).setDisplaySize(70, 70).setDepth(140);
        this.soundwaves = this.physics.add.image(w-80, 10, 'soundwaves').setOrigin(0).setDisplaySize(70, 70).setDepth(139);
        
        this.soundbtn.setDepth(300);
        this.soundbtn.setInteractive();
        this.soundbtn.on('pointerdown', function (pointer) {
            console.log('sound');
            if(!mute){
                console.log('MUTE');
                self.sfxfly.volume = 0;
                self.sfxcoin.volume = 0;
                self.sfxdie.volume = 0;
                self.song.volume = 0.0;
                self.soundwaves.setAlpha(0);
                mute = true;
            }else{
                console.log('UNMUTE');
                self.sfxfly.volume = 1;
                self.sfxcoin.volume = 1;
                self.sfxdie.volume = 1;
                self.song.volume = 0.4;
                self.soundwaves.setAlpha(1);
                mute = false;
            }
        });
}

function destroyPipe(clear, pipe){
    pipe.destroy();
}


function deadBird(){
    if(!dead){
        freeze = true;
        dead = true;
        this.song.stop();
        this.sfxdie.play();
        this.player.angle = 45;
        Phaser.Actions.Call(this.pipes.getChildren(), function(pipe) {
            pipe.disableBody();
        });
        setTimeout(()=>{
            afterDie();
        }, 400);
    }
}



function afterDie(){
    console.log('startscreen', startscreen);
    console.log('freeze', freeze);
    console.log('dead', dead);
    console.log('end scenrio');

    if(mypoints > highscore){
        highscore = mypoints;
        localStorage.highscore = highscore;
    }
    self.bgend = self.add.tileSprite(0, 0, w, 500, 'night_sky').setOrigin(0).setDisplaySize(w,h).setAlpha(0);
    self.bgend.setDepth(200);
    
    self.theend = self.add.text(0, 0, 'The end', { fontFamily: font, fontSize: '60px', fill: '#70B46E' });
    self.theend.setStroke('#031B3C', 16);
    self.theend.setShadow(2, 2, "#333333", 2, true, true);
    self.theend.setDepth(221);
    self.theend.setAlpha(0);
    self.theend.x = w/2 - self.theend.displayWidth/2;
    self.theend.y = -200;


    self.highscore = self.add.text(0, 0, 'highscore: '+highscore, { fontFamily: font, fontSize: '24px', fill: '#8DCC61' });
    self.highscore.setStroke('#031B3C', 12);
    self.highscore.setShadow(2, 2, "#333333", 2, true, true);
    self.highscore.setDepth(221);
    self.highscore.setAlpha(0);
    self.highscore.x = w/2 - self.highscore.displayWidth/2;
    self.highscore.y = h+200;

    self.tweens.add({
        targets: self.bgend,
        alpha:1,
        duration: 1000,
        delay:1000
    });

    self.tweens.add({
        targets: self.theend,
        y:h/2-96,
        alpha:1,
        duration: 1500,
        delay:1000
    });

    self.tweens.add({
        targets: self.highscore,
        y:h/2,
        alpha:1,
        duration: 1500,
        delay:1000,
        onComplete:clearStage
    });
}

function clearStage(){
    console.log('clear stage...');
    for(let i = 0; i < 10; i++){
        self.pipes.children.entries.map(item=>item.destroy());
        self.pointpipes.children.entries.map(item=>item.destroy());
    }
    console.log(self.randColor);
    self.randColor = Phaser.Math.Between(0,heroes.length-1);
    console.log(self.randColor);
    self.player.destroy();
    self.player = self.physics.add.sprite(w/2-birdleft, birdpos, 'bird-'+heroes[self.randColor]);
    self.player.setDepth(150);
    self.player.setGravity(0, 0);
    //self.player.angle = 0;
    self.player.x = w/2-birdleft;
    self.player.y = birdpos;
    self.taptoplay.x = (w/2 - self.taptoplay.displayWidth/2)+40;
    self.player.play('flyinf-'+heroes[self.randColor], true);
    self.physics.add.overlap(self.player, self.pointpipes.children.entries, pointPipe, null, self);

        self.physics.add.collider(self.player, self.pipes.getChildren(), deadBird, null, self);
        self.physics.add.collider(self.player, self.floor, deadBird, null, self);

    SPEED_A = defSpeed;
    self.timedEvent.delay = defInt;
    fixdif = false;
/*
    self.player.setGravity(0, 0);
    self.player.angle = 0;
    self.player.x = w/2-birdleft;
    self.player.y = birdpos;
    self.taptoplay.x = (w/2 - self.taptoplay.displayWidth/2)+40;
    self.player.play('flyinf', true);
 */   
    activeEnd();
}

function activeEnd(){
    self.tweens.add({
        targets: [self.highscore, self.theend, self.bgend],
        alpha:0,
        duration: 1500,
        delay:2000,
        onComplete:startNew
    });
}

function startNew(){
    self.highscore.destroy(); 
    self.theend.destroy();
    self.bgend.destroy();
    dead = false;
    startscreen = true;
    
}


function pointPipe(player, pointpipe){
    if(!dead){
        mypoints++;
        this.score.text = mypoints;
        this.sfxcoin.play();
        pointpipe.destroy();
        self.score.x = w/2 - self.score.displayWidth/2;
    }
}

function addPipes(type, x, y) {
        if(type != 'hole'){
            let pipe = self.physics.add.image(x, y, type );
            pipe.body.immovable = true;
            //pipe.body.mass = 10;
            self.pipes.add(pipe);
        }else{
            let pipe = self.physics.add.image(x+30, y, type );
            pipe.body.immovable = true;
            self.pointpipes.add(pipe);
        }
} 

function addPipeRows() {
    if(!freeze){
    let hole = Phaser.Math.Between(calb.b, calb.c);
    let type;
    let hh= -60;
    let hcorr = 0;
        for (let i = 0; i < calb.a; i++) {
            if(i == hole-1){
                type = 'holeup';
                hh += 60;
                hcorr = 0;
            }
            if(i == hole){
                type = 'hole';
                hh += 60;
                hcorr = 30;
            }
            if(i == hole+1){
                type = 'holedown';
                hh += 120;
                hcorr = 0;
            }
            if(i != hole && i != hole+1 && i != hole-1){
                type = 'block';
                hh += 60;
                hcorr = 0;  
            }
            
            addPipes(type, w+80, hh+hcorr);
        }
    
    }else{
        console.log('pipes not make');
    }
}



function switchDif(){
    if(fixdif && mypoints == levelUp){
        if(self.timedEvent.delay > 1000){
            self.timedEvent.delay -= reduceInt;  
        }
        if(SPEED_A < 8){
            SPEED_A += addSpeed;
        }
        levelUp += levelStep;
        fixdif = false;
        console.log(SPEED_A, self.timedEvent.delay, 'next Up on',levelUp);
    }
    if(!fixdif && mypoints == levelUp-1){
        fixdif = true;
    }
}


function update(){
    if(!freeze){
        switchDif();  
        animPipes();
        if(moveMouse){
            this.player.setVelocityY(-200);
            this.player.play('fly-'+heroes[this.randColor], true);
            moveMouse = false;
            this.player.angle = -10;
            this.sfxfly.play();
        }
        if(!playerdirection){
            this.player.angle += 1;
        }else{
            this.player.angle = -20;
        }
    }
    
    if(!dead){
        animBacks();
    }
    
    if(startscreen){
        this.player.setGravity(0, 0);
    }
}

function oneMove(){
    moveMouse = true;
    playerdirection = true;
    setTimeout(function(){
        playerdirection = false;
    }, 200);
}

function animPipes(){
    Phaser.Actions.Call(self.pipes.getChildren(), function(pipe) {
        pipe.x -= SPEED_A;
    });

    Phaser.Actions.Call(self.pointpipes.getChildren(), function(pipe) {
        pipe.x -= SPEED_A;
    });
    self.taptoplay.x -= SPEED_A;
    
}

function animBacks(){
    self.bgb3.tilePositionX += 0.1;
    self.bgb2.tilePositionX += 0.2;
    self.bgb1.tilePositionX += 0.4;
    //self.bgsky.tilePositionX += 0.05;
    self.stars.tilePositionX += 0.05;
    self.bggross.tilePositionX += 0.6;
    self.bggross2.tilePositionX += 0.5;
    self.line.tilePositionX += SPEED_A;
}

function newscene(){
    //this.scene.launch('newscene');
    //this.scene.pause();
    console.log('NEW scene');
    button.on('pointerdown', function() {
        this.scene.resume('sceneA');
        this.scene.stop();
    });
}