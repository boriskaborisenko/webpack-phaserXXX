const w = window.innerWidth;
const h = window.innerHeight;
var config = {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#DDD897',
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
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var self;


var keys;
var moveMouse;
var playerdirection;
var mypoints = 0;
var highscore = 0;

var freeze = true;
var startscreen = true;
var dead = false;
var endscreen = false;


var SPEED_A = 3.4;
var GEN_TIME = Phaser.Math.Between(2400, 2400);

function preload (){

    //PRELOADER

            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.6);
            progressBox.fillRect(w/2-160, h/2-25, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: w/2,
                y: h/2 - 50,
                text: 'Loading',
                style: {
                    font: '20px Black Ops One',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: w/2,
                y: h/2,
                text: '0%',
                style: {
                    font: '14px Black Ops One',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
 
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(w/2-150, h/2-15, 300 * value, 30);
            });
            
            
 
            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
            });
            
            

    //PRELOADER

    this.load.audio('song', 'public/assets/fbremix.mp3');
    this.load.audio('sfx-fly', 'public/assets/sfx/fly.wav');
    this.load.audio('sfx-coin', 'public/assets/sfx/coin.wav');
    this.load.audio('sfx-die', 'public/assets/sfx/die.wav');

    this.load.image('ground', 'public/assets/platform.png');
    this.load.image('line', 'public/assets/line.png');
    this.load.image('star', 'public/assets/star.png');
    this.load.image('bomb', 'public/assets/bomb.png');
    this.load.image('block', 'public/assets/block.png');
    this.load.image('hole', 'public/assets/hole.png');
    this.load.image('holeup', 'public/assets/holeup.png');
    this.load.image('holedown', 'public/assets/holedown.png');
    this.load.image('bg', 'public/assets/bg.png');
    this.load.image('bgb1', 'public/assets/bgb1.png');
    this.load.image('bgb2', 'public/assets/bgb2.png');
    this.load.image('bgb3', 'public/assets/bgb3.png');
    this.load.image('bgsky', 'public/assets/bgsky.png');
    this.load.image('bggross', 'public/assets/bggross.png');
    this.load.image('bgend', 'public/assets/bgend.png');

    this.load.spritesheet('bird', 'public/assets/bird2.png', { frameWidth: 43, frameHeight: 30 });

    
}

function create (){
    self = this;
    
    this.sfxfly = this.sound.add('sfx-fly');
    this.sfxcoin = this.sound.add('sfx-coin');
    this.sfxdie = this.sound.add('sfx-die');
    this.song = this.sound.add('song');

    this.score = this.add.text(0, 40, '0', { fontFamily: 'Black Ops One', fontSize: '24px', fill: '#ffffff' });
    this.score.setDepth(221);
    this.score.x = w/2 - this.score.displayWidth/2;

    this.bgsky = this.add.tileSprite(0, 0, w, 500, 'bgsky').setOrigin(0);
    this.bgb1 = this.add.tileSprite(0, 0, w, 500, 'bgb1').setOrigin(0);
    this.bgb2 = this.add.tileSprite(0, 0, w, 500, 'bgb2').setOrigin(0);
    this.bgb3 = this.add.tileSprite(0, 0, w, 500, 'bgb3').setOrigin(0);
    this.bggross = this.add.tileSprite(0, 0, w, 500, 'bggross').setOrigin(0);
    this.line = this.add.tileSprite(0, 500, w, 400, 'line').setOrigin(0).setDepth(100);
    this.floor = this.physics.add.image(0, 500, 'clear').setOrigin(0).setDisplaySize(w, 20); 
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
        
        this.player = this.physics.add.sprite(w/2-100, 250, 'bird');
        this.player.setDepth(150);
        
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'flyinf',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.player.play('flyinf', true);

        this.physics.add.overlap(this.clear, this.pipes.getChildren(), destroyPipe, null, this);
        this.physics.add.overlap(this.clear, this.pointpipes.getChildren(), destroyPipe, null, this); 
        this.physics.add.overlap(this.player, this.pointpipes.children.entries, pointPipe, null, this);

        this.physics.add.overlap(this.player, this.pipes.getChildren(), deadBird, null, this);
        this.physics.add.collider(this.player, this.floor, deadBird, null, this);
        
        

        this.input.on('pointerup', function(){
            if(startscreen){
                console.log('tap on start');
                startscreen = false;
                freeze = false;
                self.player.setGravity(0, 500);
                self.player.setCollideWorldBounds(true); 
                self.song.play({loop:true, volume:0.4});
                oneMove();
            }else{
                oneMove();
            }
            if(endscreen){
                activeEnd();
            }
        }, this);
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
        setTimeout(()=>{afterDie();}, 100);
    }
}

function afterDie(){
    console.log('startscreen', startscreen);
    console.log('freeze', freeze);
    console.log('dead', dead);
    console.log('end scenrio');

    if(mypoints > highscore){
        highscore = mypoints;
    }
    self.bgend = self.add.tileSprite(0, 0, w, 500, 'bgend').setOrigin(0).setDisplaySize(w,h).setAlpha(0);
    self.bgend.setDepth(200);
    
    self.theend = self.add.text(0, 0, 'The end', { fontFamily: 'Black Ops One', fontSize: '60px', fill: '#70B46E' });
    //self.theend.stroke = '#ff303f';
    //self.theend.strokeThickness = 16;
    self.theend.setDepth(221);
    self.theend.setAlpha(0);
    self.theend.x = w/2 - self.theend.displayWidth/2;
    self.theend.y = -200;


    self.highscore = self.add.text(0, 0, 'highscore: '+highscore, { fontFamily: 'Black Ops One', fontSize: '24px', fill: '#8DCC61' });
    //self.highscore.stroke = '#ff303f';
    //self.highscore.strokeThickness = 16;
    self.highscore.setDepth(221);
    self.highscore.setAlpha(0);
    self.highscore.x = w/2 - self.highscore.displayWidth/2;
    self.highscore.y = 1400;

    self.tweens.add({
        targets: self.bgend,
        alpha:1,
        duration: 1000,
        delay:1000
    });

    self.tweens.add({
        targets: self.theend,
        y:220,
        alpha:1,
        duration: 1500,
        delay:1000
    });

    self.tweens.add({
        targets: self.highscore,
        y:300,
        alpha:1,
        duration: 1500,
        delay:1000,
        onComplete:clearStage
    });
}

function clearStage(){
    console.log('clear stage...');
    for(let $i = 0; $i < 10; $i++){
        self.pipes.children.entries.map(item=>item.destroy());
        self.pointpipes.children.entries.map(item=>item.destroy());
    }
    self.player.setGravity(0, 0);
    self.player.angle = 0;
    self.player.x = w/2-100;
    self.player.y = 250;
    self.player.play('flyinf', true);
    dead = false;
    endscreen = true;
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
    self.score.text = '0';
    mypoints = 0;
    self.highscore.destroy(); 
    self.theend.destroy();
    self.bgend.destroy();
    startscreen = true;
}


function pointPipe(player, pointpipe){
    mypoints++;
    this.score.text = mypoints;
    this.sfxcoin.play();
    pointpipe.destroy();
}

function addPipes(type, x, y) {
        let pipe = self.physics.add.image(x, y, type ).setDepth(3);
        if(type != 'hole'){
            self.pipes.add(pipe);
        }else{
            self.pointpipes.add(pipe);
        }
} 

function addPipeRows() {
    if(!freeze){
    let hole = Phaser.Math.Between(2,5);
    let type;
        for (let i = 0; i < 9; i++) {
            if(i == hole-1){
                type = 'holeup';
            }
            if(i == hole){
                type = 'hole';
            }
            if(i == hole+1){
                type = 'hole';
            }
            if(i == hole+2){
                type = 'holedown';
            }
            if(i != hole && i != hole+1 && i != hole-1 && i!=hole+2){
                type = 'block';  
            }
            
            addPipes(type, w+80, i * 60 + 10);
        }
    
    }else{
        console.log('pipes not make');
    }
}



function update(){
    if(!freeze){
        animPipes();
        if(moveMouse){
            this.player.setVelocityY(-200);
            this.player.play('fly', true);
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
}

function animBacks(){
    self.line.tilePositionX += SPEED_A;
    self.bgb1.tilePositionX += 0.1;
    self.bgb2.tilePositionX += 0.25;
    self.bgb3.tilePositionX += 0.45;
    self.bgsky.tilePositionX += 0.05;
    self.bggross.tilePositionX += 0.6;
}