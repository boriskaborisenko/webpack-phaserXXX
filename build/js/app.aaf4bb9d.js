!function(e){function t(t){for(var i,l,n=t[0],r=t[1],h=t[2],d=0,c=[];d<n.length;d++)l=n[d],a[l]&&c.push(a[l][0]),a[l]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(p&&p(t);c.length;)c.shift()();return o.push.apply(o,h||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],i=!0,n=1;n<s.length;n++){var r=s[n];0!==a[r]&&(i=!1)}i&&(o.splice(t--,1),e=l(l.s=s[0]))}return e}var i={},a={0:0},o=[];function l(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,l),s.l=!0,s.exports}l.m=e,l.c=i,l.d=function(e,t,s){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(l.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(s,i,function(t){return e[t]}.bind(null,i));return s},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var n=window.webpackJsonp=window.webpackJsonp||[],r=n.push.bind(n);n.push=t,n=n.slice();for(var h=0;h<n.length;h++)t(n[h]);var p=r;o.push([1200,1]),s()}({1200:function(e,t,s){"use strict";s.r(t);s(496),s(497),s(1179),s(1188),s(492);var i,a,o,l=window.innerWidth,n=window.innerHeight,r={type:Phaser.AUTO,parent:"game",backgroundColor:"#138792",width:l,height:n,physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scene:{init:function(){var e=this.add.image(l/2,n/2,"splash");this.splash=this.add.text(0,0,"Bird X",{fontFamily:h,fontSize:"80px",fill:"#70B46E"}),this.splash.setStroke("#031B3C",16),this.splash.setShadow(2,2,"#333333",2,!0,!0),this.splash.x=l/2-this.splash.displayWidth/2,this.splash.y=n/2-70;var t=this.add.graphics(),s=this.add.graphics();s.fillStyle(2236962,.2),s.fillRect(l/2-150,n/2+75,300,30);this.cameras.main.width,this.cameras.main.height;var i=this.make.text({x:l/2,y:n/2+120,text:"loading",style:{font:"20px "+h,fill:"#ffffff"}});i.setOrigin(.5,.5);var a=this.make.text({x:l/2,y:n/2+90,text:"0%",style:{font:"14px "+h,fill:"#ffffff"}});a.setOrigin(.5,.5).setDepth(30),this.load.on("progress",function(e){a.setText(parseInt(100*e)+"%"),t.clear(),t.fillStyle(9292897,1),t.fillRect(l/2-145,n/2+78,290*e,25).setDepth(10)}),this.load.on("complete",function(){t.destroy(),s.destroy(),i.destroy(),a.destroy(),e.destroy()})},preload:function(){this.load.audio("song","public/assets/sfx/theme.wav"),this.load.audio("sfx-fly","public/assets/sfx/fly.wav"),this.load.audio("sfx-coin","public/assets/sfx/coin.wav"),this.load.audio("sfx-die","public/assets/sfx/die.wav"),this.load.image("soundwaves","public/assets/soundON.png"),this.load.image("sound","public/assets/soundOFF.png"),this.load.image("ground","public/assets/platform.png"),this.load.image("line","public/assets/line.png"),this.load.image("clear","public/assets/clear.png"),this.load.image("block","public/assets/block.png"),this.load.image("hole","public/assets/hole.png"),this.load.image("holeup","public/assets/holeup.png"),this.load.image("holedown","public/assets/holedown.png"),this.load.image("bg","public/assets/bg.png"),this.load.image("bgb1","public/assets/bgb1.png"),this.load.image("bgb2","public/assets/bgb2.png"),this.load.image("bgb3","public/assets/bgb3.png"),this.load.image("bgsky","public/assets/bgsky.png"),this.load.image("bggross","public/assets/bggross.png"),this.load.image("bgend","public/assets/bgend.png"),this.load.spritesheet("bird-pink","public/assets/hero/heroes/pink.png",{frameWidth:48,frameHeight:33}),this.load.spritesheet("bird-orange","public/assets/hero/heroes/orange.png",{frameWidth:48,frameHeight:33}),this.load.spritesheet("bird-violet","public/assets/hero/heroes/violet.png",{frameWidth:48,frameHeight:33})},create:function(){i=this,this.sfxfly=this.sound.add("sfx-fly"),this.sfxcoin=this.sound.add("sfx-coin"),this.sfxdie=this.sound.add("sfx-die"),this.song=this.sound.add("song"),this.taptoplay=this.add.text(0,m-28,"tap to play",{fontFamily:h,fontSize:"32px",fill:"#8DCC61"}),this.taptoplay.setStroke("#031B3C",12),this.taptoplay.setShadow(2,2,"#333333",2,!0,!0),this.taptoplay.setDepth(10),this.taptoplay.setAlpha(1),this.taptoplay.x=l/2-this.taptoplay.displayWidth/2+40,this.score=this.add.text(0,40,"0",{fontFamily:h,fontSize:"56px",fill:"#ffffff"}),this.score.setDepth(221),this.score.setStroke("#cccccc",8),this.score.setShadow(2,2,"#333333",2,!0,!0),this.score.x=l/2-this.score.displayWidth/2,this.bgsky=this.add.tileSprite(0,0+y,l,500,"bgsky").setOrigin(0),this.bgb1=this.add.tileSprite(0,0+y,l,500,"bgb1").setOrigin(0),this.bgb2=this.add.tileSprite(0,0+y,l,500,"bgb2").setOrigin(0),this.bgb3=this.add.tileSprite(0,0+y,l,500,"bgb3").setOrigin(0),this.bggross=this.add.tileSprite(0,0+y,l,500,"bggross").setOrigin(0),this.line=this.add.tileSprite(0,500+y,l,400,"line").setOrigin(0).setDepth(100),this.floor=this.physics.add.image(0,500+y,"clear").setOrigin(0).setDisplaySize(l,10),this.floor.body.immovable=!0,this.clear=this.physics.add.image(-90,0,"clear").setOrigin(0).setDisplaySize(1,n),this.pipes=this.add.group(),this.pointpipes=this.add.group(),this.timedEvent=this.time.addEvent({delay:O,callback:W,callbackScope:this,loop:!0}),this.randColor=Phaser.Math.Between(0,k.length-1),console.log(this.randColor,k[this.randColor]),this.player=this.physics.add.sprite(l/2-b,m,"bird-"+k[this.randColor]),this.player.setDepth(150);for(var e=0;e<k.length;e++)this.anims.create({key:"fly-"+k[e],frames:this.anims.generateFrameNumbers("bird-"+k[e],{start:0,end:2}),frameRate:10,repeat:0}),this.anims.create({key:"flyinf-"+k[e],frames:this.anims.generateFrameNumbers("bird-"+k[e],{start:0,end:2}),frameRate:10,repeat:-1});this.player.play("flyinf-"+k[this.randColor],!0),this.physics.add.overlap(this.clear,this.pipes.getChildren(),D,null,this),this.physics.add.overlap(this.clear,this.pointpipes.getChildren(),D,null,this),this.physics.add.overlap(this.player,this.pointpipes.children.entries,A,null,this),this.physics.add.collider(this.player,this.pipes.getChildren(),P,null,this),this.physics.add.collider(this.player,this.floor,P,null,this),this.input.setTopOnly(!0),this.allscreen=this.add.image(0,0,"clear").setOrigin(0).setDisplaySize(l,n),this.allscreen.setDepth(200),this.allscreen.setAlpha(.1),this.allscreen.setInteractive(),this.allscreen.on("pointerdown",function(e){g?(console.log("tap on start"),g=!1,c=!1,i.score.text="0",p=0,i.player.setGravity(0,500),i.player.setCollideWorldBounds(!0),i.song.play({loop:!0}),T()):T()},this),this.soundbtn=this.physics.add.image(l-80,10,"sound").setOrigin(0).setDisplaySize(70,70).setDepth(140),this.soundwaves=this.physics.add.image(l-80,10,"soundwaves").setOrigin(0).setDisplaySize(70,70).setDepth(139),this.soundbtn.setDepth(300),this.soundbtn.setInteractive(),this.soundbtn.on("pointerdown",function(e){console.log("sound"),u?(console.log("UNMUTE"),i.sfxfly.volume=1,i.sfxcoin.volume=1,i.sfxdie.volume=1,i.song.volume=.4,i.soundwaves.setAlpha(1),u=!1):(console.log("MUTE"),i.sfxfly.volume=0,i.sfxcoin.volume=0,i.sfxdie.volume=0,i.song.volume=0,i.soundwaves.setAlpha(0),u=!0)})},update:function(){c||(Phaser.Actions.Call(i.pipes.getChildren(),function(e){e.x-=C}),Phaser.Actions.Call(i.pointpipes.getChildren(),function(e){e.x-=C}),i.taptoplay.x-=C,a&&(this.player.setVelocityY(-200),this.player.play("fly-"+k[this.randColor],!0),a=!1,this.player.angle=-10,this.sfxfly.play()),o?this.player.angle=-20:this.player.angle+=1);f||(i.line.tilePositionX+=C,i.bgb1.tilePositionX+=.1,i.bgb2.tilePositionX+=.25,i.bgb3.tilePositionX+=.45,i.bgsky.tilePositionX+=.05,i.bggross.tilePositionX+=.6);g&&this.player.setGravity(0,0)},pack:{files:[{type:"image",key:"splash",url:"public/assets/splash.jpg"}]}}},h=(new Phaser.Game(r),"Paytone One"),p=0,d=0,c=!0,g=!0,f=!1;var u=!1,y=(n<=480?{top:-50}:n>480?{top:(n-600)/2}:void 0).top,b=100,m=250+y,v=(500+y)/60,x=v/3,w=v-x,S={a:Math.round(v),b:Math.ceil(x),c:Math.floor(w)},C=3.4,O=Phaser.Math.Between(2400,2400),k=["pink","orange","violet"];function D(e,t){t.destroy()}function P(){f||(c=!0,f=!0,this.song.stop(),this.sfxdie.play(),this.player.angle=45,Phaser.Actions.Call(this.pipes.getChildren(),function(e){e.disableBody()}),setTimeout(function(){!function(){console.log("startscreen",g),console.log("freeze",c),console.log("dead",f),console.log("end scenrio"),p>d&&(d=p);i.bgend=i.add.tileSprite(0,0,l,500,"bgend").setOrigin(0).setDisplaySize(l,n).setAlpha(0),i.bgend.setDepth(200),i.theend=i.add.text(0,0,"The end",{fontFamily:h,fontSize:"60px",fill:"#70B46E"}),i.theend.setDepth(221),i.theend.setAlpha(0),i.theend.x=l/2-i.theend.displayWidth/2,i.theend.y=-200,i.highscore=i.add.text(0,0,"highscore: "+d,{fontFamily:h,fontSize:"24px",fill:"#8DCC61"}),i.highscore.setDepth(221),i.highscore.setAlpha(0),i.highscore.x=l/2-i.highscore.displayWidth/2,i.highscore.y=n+200,i.tweens.add({targets:i.bgend,alpha:1,duration:1e3,delay:1e3}),i.tweens.add({targets:i.theend,y:n/2-80,alpha:1,duration:1500,delay:1e3}),i.tweens.add({targets:i.highscore,y:n/2,alpha:1,duration:1500,delay:1e3,onComplete:M})}()},400))}function M(){console.log("clear stage...");for(var e=0;e<10;e++)i.pipes.children.entries.map(function(e){return e.destroy()}),i.pointpipes.children.entries.map(function(e){return e.destroy()});console.log(i.randColor),i.randColor=Phaser.Math.Between(0,k.length-1),console.log(i.randColor),i.player.destroy(),i.player=i.physics.add.sprite(l/2-b,m,"bird-"+k[i.randColor]),i.player.setDepth(150),i.player.setGravity(0,0),i.player.x=l/2-b,i.player.y=m,i.taptoplay.x=l/2-i.taptoplay.displayWidth/2+40,i.player.play("flyinf-"+k[i.randColor],!0),i.physics.add.overlap(i.player,i.pointpipes.children.entries,A,null,i),i.physics.add.collider(i.player,i.pipes.getChildren(),P,null,i),i.physics.add.collider(i.player,i.floor,P,null,i),i.tweens.add({targets:[i.highscore,i.theend,i.bgend],alpha:0,duration:1500,delay:2e3,onComplete:z})}function z(){i.highscore.destroy(),i.theend.destroy(),i.bgend.destroy(),f=!1,g=!0}function A(e,t){f||(p++,this.score.text=p,this.sfxcoin.play(),t.destroy())}function B(e,t,s){if("hole"!=e){var a=i.physics.add.image(t,s,e);a.body.immovable=!0,i.pipes.add(a)}else{var o=i.physics.add.image(t+30,s,e);o.body.immovable=!0,i.pointpipes.add(o)}}function W(){if(c)console.log("pipes not make");else for(var e,t=Phaser.Math.Between(S.b,S.c),s=-60,i=0,a=0;a<S.a;a++)a==t-1&&(e="holeup",s+=60,i=0),a==t&&(e="hole",s+=60,i=30),a==t+1&&(e="holedown",s+=120,i=0),a!=t&&a!=t+1&&a!=t-1&&(e="block",s+=60,i=0),B(e,l+80,s+i)}function T(){a=!0,o=!0,setTimeout(function(){o=!1},200)}},496:function(e,t,s){}});
//# sourceMappingURL=app.aaf4bb9d.js.map