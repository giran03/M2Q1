class PreLoadScene extends Phaser.Scene
{
    constructor() 
    { 
        super("PreLoadScene")
    }

    preload()
    {
        this.load.video('background', './assets/background/pix-bg.mp4');
        this.load.image('fruit', './assets/misc/watermelon.png');
        this.load.image('platform', './assets/misc/platform.jpg');
        this.load.image('bomb', './assets/misc/bomb.png');
        this.load.spritesheet('uiButton', './assets/gui/UI_Button.png', { frameWidth: 96, frameHeight: 32 });
        this.load.spritesheet('uiButtonSmall', './assets/gui/UI_Button_small.png', { frameWidth: 96, frameHeight: 32 });
        this.load.spritesheet('letterKeys', './assets/gui/letter_keys.png', { frameWidth: 17, frameHeight: 16 });
        this.load.spritesheet('arrowKeys', './assets/gui/arrow_keys.png', { frameWidth: 17, frameHeight: 16 });
        this.load.spritesheet('suiIdle', './assets/player/sui-casual-idle.png', { frameWidth: 128.5, frameHeight: 160 });
        this.load.spritesheet('suiRunL', './assets/player/sui-casual-run-left.png', { frameWidth: 155, frameHeight: 150 });
        this.load.spritesheet('suiRunR', './assets/player/sui-casual-run-right.png', { frameWidth: 155, frameHeight: 150 });
        this.load.audio('confirmSFX', './assets/audio/select.ogg');
        this.load.audio('declineSFX', './assets/audio/back.ogg');
        this.load.audio('bgm', './assets/audio/gameSceneBGM.ogg');
        this.load.audio('fruitSFX', './assets/audio/fruitCollect.ogg');
        this.load.audio('bombSFX', './assets/audio/bomb.ogg');

        this.load.on("progress", (percent)=> {
            console.log("loading: "+ percent)
        })

        this.add.text(config.width*.3,config.height*.5,"L O A D I N G . . .", {
            fontSize: '30px'
        })
    }

    create() 
    {
        // 🗿 PLAYER ANIMATION 🗿
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('suiRunL', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('suiIdle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('suiRunR', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        // ⌨️ KEYBOARD KEYS ANIMATION ⌨️
        this.anims.create({
            key: 'animWkey',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'animAkey',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'animDkey',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'animL',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'animR',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'animUP',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: -1
        });

        // 🔘 BUTTON ANIMATION 🔘
        this.anims.create({
            key: 'btnPressSmall',
            frames: this.anims.generateFrameNumbers('uiButtonSmall', { start: 0, end: 3}),
            frameRate: 30,
        });
        this.anims.create({
            key: 'btnPress',
            frames: this.anims.generateFrameNumbers('uiButton', { start: 0, end: 3}),
            frameRate: 30
        });

        console.log("LOADED!")
        this.scene.start('MainMenuScene')
    }

}