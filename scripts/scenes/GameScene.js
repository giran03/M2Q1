class GameScene extends Phaser.Scene
{
    constructor() 
    { 
        super("GameScene");
        this.ground; 
        this.player;
        this.platforms;
        this.platform; 
        this.movingPlatform;
        this.fruit; 
        this.fruits;
        this.bomb; 
        this.bombs;
        this.fruitCollected;
        // config.fruitCount = 4;
        this.fruitsCollectedcount = 0;
        this.fruitsCollectedText = 0;
        this.fruitSFX;
        this.bombSFX;
        this.keyA;
        this.keyD;
        this.keyW;
    }

    create ()
    {
        this.physics.start()
        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        this.fruitSFX = this.sound.add('fruitSFX');
        this.bombSFX = this.sound.add('bombSFX');

        // sets the score back to 0 after restarting game
        this.fruitsCollectedcount = 0;
        this.fruitsCollectedText = 0;
        
        // 🌏 CREATING STATIC PLATFORMS AND MOVING PLATFORMS 🌏
        this.platforms = this.physics.add.staticGroup()
        this.platforms.enableBody = true  

        this.platform = this.platforms.create(config.width / 8.7, 400, 'platform')
            .setScale(.07)
            .refreshBody()
        this.platform = this.platforms.create(config.width / 2, 200, 'platform')
            .setScale(.05)
            .refreshBody()
        this.platform = this.platforms.create(config.width / 1.12, 400, 'platform')
            .setScale(.07)
            .refreshBody()

        this.movingPlatform = this.physics.add.image(config.width / 2, 400, 'platform');
        this.movingPlatform.setScale(.07);
        this.movingPlatform.setVelocityX(200)
        this.movingPlatform.setCollideWorldBounds(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setImmovable(true);

        // 🗿 PLAYER SPRITE 🗿
        this.player = this.physics.add.sprite(config.width / 2, 450, 'suiIdle');
        this.player.setBounce(0,.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(.5);
        
        // 🍈 CREATING FRUITS 🍈
        this.fruits = this.physics.add.group({   // create a dyanamic group for the fruits
            key: 'fruit',
            repeat: config.fruitCount,     // count of fruits to be created
            setXY: { x: 0, y: 0, stepX: 135 }     // x,y is for location while stepX is the distance between the fruits
        });
        this.fruits.children.iterate(function (child) {  // iterate all children then set bounceY between .4 and .8
            child.setBounceY(Phaser.Math.FloatBetween(0.8, 1));
            child.setScale(Phaser.Math.FloatBetween( .3, .6))
            child.y = Phaser.Math.Between(0,600);
            child.x = Phaser.Math.Between(100,config.width - 10);
            child.setCollideWorldBounds(true);
        });

        // 💣 CREATING BOMBS 💣
        this.bombs = this.physics.add.group({
            key:'bomb',
            repeat: 2,
        });
        this.bombs.children.iterate(function (child) {
            child.setScale(.07);
            child.setBounce(1,1);
            child.setVelocity(400,100);
            child.setCollideWorldBounds(true);
            child.x = Phaser.Math.Between(10,config.width - 10);
        });
        
        // 🕶️ SCORES AND CONTROL KEYS SETUP 🕶️
        this.fruitCollected = this.add.text(config.width / 1.5, 20, 'Fruits Collected: 0', 
        { fontSize: '40px', fill: '#ffd561' , fontStyle: 'bold' , fontFamily: 'impact'}); // fruits collected text
        this.fruitCollected.setShadow(2, 2, '#000', 2, true, true);
        this.cursors = this.input.keyboard.createCursorKeys(); // keyboard controls
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update ()
    {
        // 📦 COLLISION DETECTORS 📦
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.fruits, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.movingPlatform)
        this.physics.add.collider(this.fruits, this.movingPlatform)
        this.physics.add.collider(this.bombs, this.movingPlatform)
        this.physics.add.overlap(this.player,this.fruits, this.fruitCollect, null, this)
        this.physics.add.overlap(this.player,this.bombs, this.bombHit, null, this)
        
        if (this.movingPlatform.x >= 1450) { this.movingPlatform.setVelocityX(-200) }
        if (this.movingPlatform.x <= 450) { this.movingPlatform.setVelocityX(200) }
        
        // passing score to the phaser data managaer to be used by other scenes
        this.data.set('score', this.fruitsCollectedText);

        // ⌨️ PLAYER CONTROLS ⌨️
        if (this.cursors.left.isDown || this.keyA.isDown) { this.player.setVelocityX(-600); this.player.anims.play('left', true); } // left
        else if (this.cursors.right.isDown || this.keyD.isDown) { this.player.setVelocityX(600) ; this.player.anims.play('right', true); } // right
        else if (this.cursors.right.isUp && this.cursors.left.isUp || this.keyA.isUp && this.keyD.isUp ) { this.player.setVelocityX(0); this.player.anims.play('idle', true)} // idle
        if (this.cursors.up.isDown && this.player.body.blocked.down || this.keyW.isDown && this.player.body.blocked.down) { this.player.setVelocityY(-1000); this.player.anims.play('idle', true); } // jump
    }
    
    fruitCollect(player, fruit) 
    {
        fruit.disableBody(true, true);  // remove fruit
        this.fruitSFX.play();
        this.fruitsCollectedcount += 1;
        this.fruitsCollectedText += 1 ;
        this.fruitCollected.setText('Fruits Collected: ' + this.fruitsCollectedText);
        
        if ( this.fruits.countActive(true) < config.fruitCount )
        {
            fruit.enableBody(true, Phaser.Math.Between(0,config.width-10), 0, true ,true);
        }
        
        // 🌈 set player tint based on collected fruit 🌈
        if (this.fruitsCollectedcount == 1) { player.setTint(0xff4040) }
        if (this.fruitsCollectedcount == 2) { player.setTint(0xffac40) }
        if (this.fruitsCollectedcount == 3) { player.setTint(0xfff240) }
        if (this.fruitsCollectedcount == 4) { player.setTint(0x67ff3d) }
        if (this.fruitsCollectedcount == 5) { player.setTint(0x4056ff) }
        if (this.fruitsCollectedcount == 6) { player.setTint(0x4b0082) }
        if (this.fruitsCollectedcount == 7) { player.setTint(0x8000de); this.fruitsCollectedcount = 0}

        if (this.player.scaleX < 1.5 && this.player.scaleY < 1.5 )
        {
            if (this.fruitsCollectedcount % 5 == 0) { player.setScale(player.scaleX * 1.1, player.scaleY * 1.1) }
        }

        // 🍈 FRUIT COLLECT EMITTER 🍈
        var emitter = this.add.particles('fruit').createEmitter({
            x: player.x,
            y: player.y,
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: .1, end: 0 },
            blendMode: 'ADD'
        });
        this.time.delayedCall(500, function () {emitter.stop()}, [], this);


        if (this.fruitsCollectedText == 15) { this.fruits.createMultiple({   // create a dyanamic group for the fruits
                key: 'fruit',
                repeat: 10,     // count of fruits to be created
                setXY: { x: 0, y: 0, stepX: 135 }     // x,y is for location while stepX is the distance between the fruits
            });
            this.fruits.children.iterate(function (child) {  // iterate all children then set bounceY between .4 and .8
                child.setBounceY(Phaser.Math.FloatBetween(0.8, 1));
                child.setScale(Phaser.Math.FloatBetween( .3, .6))
                child.y = Phaser.Math.Between(0,600);
                child.x = Phaser.Math.Between(100,config.width - 10);
                child.setCollideWorldBounds(true);
            }); 
        }

        // in-game events
        // reduces bomb count by 1
        if (this.fruitsCollectedText == 25 ) { this.bombs.remove(this.bombs.getChildren()[this.bombs.getLength() - 1], true); } 
        // destroys platforms total fruits collected is 32 and reduces bomb count by 1 
        if (this.fruitsCollectedText == 32) 
        {
            console.log("PLATFORM GO POOF"); 
            this.platforms.destroy(true);
            this.bombs.remove(this.bombs.getChildren()[this.bombs.getLength() - 1], true);
        } 
    }

    // loose condition | player collides with bomb
    bombHit(player, bombs)
    {
        this.physics.pause();
        player.disableBody(true,true);
        bombs.disableBody(true,true);
        this.bombSFX.play();
        bombs.setTint(0xff0000);

        var emitter = this.add.particles('bomb').createEmitter({
            x: player.x,
            y: player.y,
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: .1, end: 0 },
            blendMode: 'ADD'
        });

        this.time.delayedCall(500, function () {emitter.stop()}, [], this);

        this.time.delayedCall(700, () => {
            this.scene.start("GameOverScene")
        })

    }
}