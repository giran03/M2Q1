class MainMenuScene extends Phaser.Scene
{
    constructor() 
    { 
        super("MainMenuScene")
        this.playBtn;
        this.settingsBtn;
        this.quitBtn;
        this.player;
        this.playerTwo;
    }

    create() 
    {
        this.sound.stopAll(); // stops music when starting the scene
        this.sound.pauseOnBlur = false; // disabled audio pause when window is out of focus

        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        let confirmSFX = this.sound.add('confirmSFX');
        let declineSFX = this.sound.add('declineSFX');
        // background music audio set to loop and volume
        this.sound.play('bgm', {
            loop: true,
            volume: .3
        })

        // character in the top of menu
        this.player = this.add.sprite(config.width / 2, 450, 'suiIdle');
        this.player.y = config.height * .3;
        this.player.anims.play('idle', true)

        // character that pops up when buttons are hovered
        this.playerTwo = this.add.sprite(config.width / 2, 450, 'suiIdle');
        this.playerTwo.visible = false;
        this.playerTwo.x = config.width * .43;
        this.playerTwo.y = config.height * .6;
        this.playerTwo.setScale(.4)
        this.playerTwo.anims.play('right', true)

        // text display and creating of buttons for CONTROLS on main menu
        //========================================== START ==========================================
        let controlsText = this.add.text(config.width*.04, config.height*.04, "C O N T R O L S  " ,
        { fill: '#fff' , fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        controlsText.setShadow(2, 2, '#000', 5, true, true);

        let jumpText = this.add.text(config.width*.1, config.height*.12, "J U M P  " ,
        { fill: '#fff' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        jumpText.setShadow(2, 2, '#000', 5, true, true);
        let leftText = this.add.text(config.width*.1, config.height*.22, "L E F T  " ,
        { fill: '#fff' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        leftText.setShadow(2, 2, '#000', 5, true, true);
        let rightText = this.add.text(config.width*.1, config.height*.32, "R I G H T  " ,
        { fill: '#fff' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        rightText.setShadow(2, 2, '#000', 5, true, true);

        let letterW = this.add.sprite(config.width*.05, config.height*.15, 'letterKeys')
        letterW.setScale(3)
        letterW.anims.play('animWkey', true)
        let letterA = this.add.sprite(config.width*.05, config.height*.25, 'letterKeys')
        letterA.setScale(3)
        letterA.anims.play('animAkey', true)
        let letterD = this.add.sprite(config.width*.05, config.height*.35, 'letterKeys')
        letterD.setScale(3)
        letterD.anims.play('animDkey', true)

        let arrowL = this.add.sprite(config.width*.08, config.height*.15, 'letterKeys')
        arrowL.setScale(3)
        arrowL.anims.play('animL', true)
        let arrowR = this.add.sprite(config.width*.08, config.height*.25, 'letterKeys')
        arrowR.setScale(3)
        arrowR.anims.play('animR', true)
        let arrowUP = this.add.sprite(config.width*.08, config.height*.35, 'letterKeys')
        arrowUP.setScale(3)
        arrowUP.anims.play('animUP', true)
        //========================================== END ==========================================

        // MAIN MENU BUTTONS
        this.playBtn = this.add.sprite(config.width / 2, config.height *.6, 'uiButton');
        let playText = this.add.text(config.width / 2 - 35, config.height *.56, "P L A Y " ,
        { fill: '#000' , fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.playBtn.setScale(2);

        this.creditsBtn = this.add.sprite(config.width / 2, config.height *.72, 'uiButton');
        let creditsText = this.add.text(config.width / 2 - 65, config.height *.68, "C R E D I T S " ,
        { fill: '#000' ,fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.creditsBtn.setScale(2);

        this.quitBtn = this.add.sprite(config.width / 2, config.height *.84, 'uiButton');
        let quitText = this.add.text(config.width / 2 - 40, config.height *.8, "Q U I T " ,
        { fill: '#000' ,fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.quitBtn.setScale(2);

        this.anims.create({
            key: 'btnPress',
            frames: this.anims.generateFrameNumbers('uiButton', { start: 0, end: 3}),
            frameRate: 30
        });

        this.playBtn.setInteractive();
        this.creditsBtn.setInteractive();
        this.quitBtn.setInteractive();

        // button events for PLAY BUTTON, CREDITS BUTTON, QUIT BUTTON
        //========================================== START ==========================================
        this.playBtn.on("pointerover", ()=>{
            this.playBtn.setTint(0xffe8a8)
            this.playerTwo.visible = true;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .6;
        })
        this.playBtn.on("pointerout", ()=>{
            this.playBtn.clearTint();
            this.playerTwo.visible = false;
            playText.y = config.height *.56;
        })
        this.playBtn.on("pointerdown", ()=>{
            playText.y += 3;
        })
        this.playBtn.on("pointerup", ()=>{
            playText.y -= 3;
            confirmSFX.play();
            this.playBtn.anims.play('btnPress',true);
            this.time.delayedCall(50, () => {
                this.scene.start("GameScene")
            });
        })

        this.creditsBtn.on("pointerover", ()=>{
            this.creditsBtn.setTint(0xffe8a8)
            this.playerTwo.visible = true;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .72;
            
        })
        this.creditsBtn.on("pointerout", ()=>{
            this.creditsBtn.clearTint();
            this.playerTwo.visible = false;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .6;
            creditsText.y = config.height *.68;
        })
        this.creditsBtn.on("pointerdown", ()=>{
            creditsText.y += 3;
        })
        this.creditsBtn.on("pointerup", ()=>{
            creditsText.y -= 3;
            confirmSFX.play();
            this.creditsBtn.anims.play('btnPress',true);
            this.time.delayedCall(50, () => {
                this.scene.start("CreditScene")
            });
            
        })
        
        this.quitBtn.on("pointerover", ()=>{
            this.quitBtn.setTint(0xffe8a8)
            this.playerTwo.visible = true;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .84;
        })
        this.quitBtn.on("pointerout", ()=>{
            this.quitBtn.clearTint();
            this.playerTwo.visible = false;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .6;
            quitText.y = config.height *.8;
        })
        this.quitBtn.on("pointerdown", ()=>{
            quitText.y += 3;
        })
        this.quitBtn.on("pointerup", ()=>{
            quitText.y -= 3;
            declineSFX.play();
            this.quitBtn.anims.play('btnPress',true);
            this.time.delayedCall(50, () => {
                this.sound.stopAll();
                alert("Thank you for playing !")
            });
        })
        //========================================== END ==========================================
    }
}