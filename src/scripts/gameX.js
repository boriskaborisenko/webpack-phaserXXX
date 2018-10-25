var config = {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#DDD897',
    width: window.innerWidth,
    height: window.innerHeight,
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
var w = window.innerWidth;
var h = window.innerHeight;

var keys;
var moveMouse;
var playerdirection;
var mypoints = 0;

var freeze = true;
var startscreen = true;
var dead = false;

var SPEED_A = 3.8;
var GEN_TIME = 2400;




function preload (){
    //this.load.audio('song', 'public/assets/fbremix.mp3');
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

    this.load.spritesheet('bird', 'public/assets/bird2.png', { frameWidth: 43, frameHeight: 30 });
}

function create (){
    //this.music = this.sound.add('song');
    this.sfxfly = this.sound.add('sfx-fly');
    this.sfxcoin = this.sound.add('sfx-coin');
    this.sfxdie = this.sound.add('sfx-die');
    self = this;
    this.score = this.add.text(16, 16, 'Score: 0', { fontFamily: 'Mali', fontSize: '24px', fill: '#ffffff' });
    this.score.setDepth(100);

   

    //this.backgound = this.add.tileSprite(0, 0, w, 500, 'bg').setOrigin(0);
    this.bgsky = this.add.tileSprite(0, 0, w, 500, 'bgsky').setOrigin(0);
    this.bgb1 = this.add.tileSprite(0, 0, w, 500, 'bgb1').setOrigin(0);
    this.bgb2 = this.add.tileSprite(0, 0, w, 500, 'bgb2').setOrigin(0);
    this.bgb3 = this.add.tileSprite(0, 0, w, 500, 'bgb3').setOrigin(0);
    
    this.bggross = this.add.tileSprite(0, 0, w, 500, 'bggross').setOrigin(0);
    
    this.line = this.add.tileSprite(0, 500, w, 400, 'line').setOrigin(0).setDepth(100);

    this.floor = this.physics.add.image(0, 500, 'clear').setOrigin(0).setDisplaySize(w, 20); 
    this.floor.body.immovable = true;
    
    this.clear = this.physics.add.image(-100, 0, 'clear').setOrigin(0).setDisplaySize(1, h); 
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

        this.input.on('pointerup', function(){
            moveMouse = true;
            playerdirection = true;
            setTimeout(function(){
                playerdirection = false;
            }, 200);
        }, this);
        //this.physics.add.collider(this.player, this.floor);

        this.physics.add.overlap(this.clear, this.pipes.children.entries, destroyPipe, null, this);
        this.physics.add.overlap(this.clear, this.pointpipes.children.entries, destroyPipe, null, this); 
        this.physics.add.overlap(this.player, this.pointpipes.children.entries, pointPipe, null, this);

        this.physics.add.overlap(this.player, this.pipes.children.entries, deadBird, null, this);
        this.physics.add.collider(this.player, this.floor, deadBird, null, this);
        
        //this.start = this.add.text(w/2-60, 230, 'Tap to fly!', { fontFamily: 'Mali', fontSize: '32px', fill: '#fff' });
        this.start = this.add.image(0,0,'clear').setOrigin(0);
        this.start.setDisplaySize(w,h);
        this.start.setAlpha(0.4);
        this.start.setDepth(100);
        
        this.start.setInteractive();
        this.start.on('pointerdown', function (pointer) {
            if(freeze){
                freeze = false;
                startscreen = false;
                self.player.setGravity(0, 500);
                self.player.setCollideWorldBounds(true); 
                self.start.y = -h;
                /*
                setTimeout(()=>{
                    self.music.play({loop:true});
                }, 500);
                */
                
                
                //self.start.setText('PLAY');
            }
            /*else{
                freeze = false;
                self.player.setGravity(0, 500);
                self.player.setCollideWorldBounds(true); 
                self.start.y = -700;
                startscreen = false;
            }*/
        });

} 

function destroyPipe(clear, pipe){
    pipe.destroy();
}

function deadBird(player){
    this.sfxdie.play();
    //dead = true;
    //self.music.stop();
    player.angle = 40;
    freeze = true;
    
    //setTimeout(()=>{startAgain();}, 2000);
}

function startAgain(){
    /*
    self.tweens.add({
        targets: self.pipes.children.entries,
        alpha:0,
        duration: 500
    });

    self.tweens.add({
        targets: self.player,
        alpha:0,
        duration: 500
    });
   */
    //setTimeout(()=>{
        startscreen = true;
        
        self.pipes.children.entries.map(item=>item.destroy());
        self.pointpipes.children.entries.map(item=>item.destroy());
        self.player.setCollideWorldBounds(false); 
        self.player.setAlpha(1);
        self.player.y = 250;
        self.player.x = -700;
        self.player.play('flyinf', true);
        self.player.setGravity(0, 0);
        self.player.setVelocityY(0);
        self.player.angle = 0;
        
        self.tweens.add({
            targets: self.player,
            x: w/2-100,
            //alpha:1,
            duration: 1000,
            
        });
        
        self.score.text = 'Score: 0';
        mypoints = 0;
        //
        dead = false;
        if(!dead){
            setTimeout(()=>{self.start.y = 0;},1000);
            
        }
    //}, 1500);
    
    
    
    
}

function pointPipe(player, pointpipe){
    mypoints++;
    this.score.text = 'Score: '+mypoints;
    this.sfxcoin.play();
    pointpipe.destroy();
}

function addPipes(type, vel, x, y) {
    if(!freeze){
        if(type=='hole'){
            let pointpipe = self.physics.add.image(x, y, type ).setVelocity(vel, 0).setDepth(3);
            self.pointpipes.add(pointpipe);
        }
        if(type=='holeup'){
            let pipe = self.physics.add.image(x, y, type ).setVelocity(vel, 0).setDepth(3);
            self.pipes.add(pipe);
        }
        if(type=='holedown'){
            let pipe = self.physics.add.image(x, y, type ).setVelocity(vel, 0).setDepth(3);
            self.pipes.add(pipe);
        }
        if(type == 'block'){
            let pipe = self.physics.add.image(x, y, type ).setVelocity(vel, 0).setDepth(3);
            self.pipes.add(pipe);
        }
    }
} 

function addPipeRows() {
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
            
            addPipes(type, 0, w+80, i * 60 + 10);
        }
    
    
}



function update (){
    if(!freeze){
        //this.player.setGravity(0, 600);
        this.line.tilePositionX += SPEED_A;
        //this.backgound.tilePositionX += 0.5;
        this.bgb1.tilePositionX += 0.1;
        this.bgb2.tilePositionX += 0.25;
        this.bgb3.tilePositionX += 0.45;
        this.bgsky.tilePositionX += 0.05;
        this.bggross.tilePositionX += 0.6;
        this.pipes.children.entries.map(item => item.x -= SPEED_A);
        this.pointpipes.children.entries.map(item => item.x -= SPEED_A);
            
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
    if(startscreen){
        this.line.tilePositionX += SPEED_A;
        //this.backgound.tilePositionX += 0.5; 
        this.bgb1.tilePositionX += 0.1;
        this.bgb2.tilePositionX += 0.25;
        this.bgb3.tilePositionX += 0.45;
        this.bgsky.tilePositionX += 0.05;
        this.bggross.tilePositionX += 0.6;

    }
    
}