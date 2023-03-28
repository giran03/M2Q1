class GameOverScene extends Phaser.Scene
{
    constructor() 
    { 
        super("GameOverScene")
        this.cursors;
    }

    create() 
    {
        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        let confirmSFX = this.sound.add('confirmSFX');

        // text display for GAME OVER text
        let gameOverText = this.add.text(config.width*.5 - 250, config.height*.3 - 75, "G A M E  O V E R ",
        { fontSize: '100px', fill: '#fff' , fontStyle: 'italic' , fontFamily: 'impact'});
        gameOverText.setShadow(2, 2, '#000', 5, true, true);

        // getting the score from the GameScene via phaser data manager | GameScene.js line:137
        let score = this.scene.get('GameScene').data.get('score');

        // text display for SCORE and Info text
        let detailsText = this.add.text(config.width*.5 - 250, config.height*.5 - 75, "Score: "+score+" ",
        { fontSize: '50px', fill: '#fff' , fontStyle: 'italic' , fontFamily: 'impact'});
        detailsText.setShadow(2, 2, '#000', 5, true, true);
        let infoText = this.add.text(config.width*.5 - 90, config.height*.85, "press space to restart ",
        { fontSize: '20px', fill: '#fff' , fontStyle: 'italic' , fontFamily: 'impact'});
        infoText.setShadow(2, 2, '#000', 5, true, true);

        // restart button
        this.restartBtn = this.add.sprite(config.width / 2, config.height *.6, 'uiButton');
        let playText = this.add.text(config.width / 2 - 70, config.height *.56, "R E S T A R T " ,
        { fill: '#000' , fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.restartBtn.setScale(2);
        
        // main menu button
        this.mainMenuBtn = this.add.sprite(config.width / 2, config.height *.72, 'uiButton');
        let mainMenuText = this.add.text(config.width / 2 - 75, config.height *.68, "M A I N  M E N U " ,
        { fill: '#000' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.mainMenuBtn.setScale(2);
        
        this.restartBtn.setInteractive();
        this.mainMenuBtn.setInteractive();

        // button events for RESTART BUTTON
        this.restartBtn.on("pointerover", ()=>{
            this.restartBtn.setTint(0xffe8a8)
        })
        this.restartBtn.on("pointerout", ()=>{
            this.restartBtn.clearTint();
            playText.y = config.height *.56;
        })
        this.restartBtn.on("pointerdown", ()=>{
            playText.y += 3;
        })
        this.restartBtn.on("pointerup", ()=>{
            playText.y -= 3;
            this.restartBtn.anims.play('btnPress',true);
            this.scene.get('GameScene').data.set('score', 0);
            confirmSFX.play();
            this.time.delayedCall(50, () => {
                this.scene.start("GameScene")
            });
        })

        // button events for MAIN MENU BUTTON
        this.mainMenuBtn.on("pointerover", ()=>{
            this.mainMenuBtn.setTint(0xffe8a8)
        })
        this.mainMenuBtn.on("pointerout", ()=>{
            this.mainMenuBtn.clearTint();
            mainMenuText.y = config.height *.68;
        })
        this.mainMenuBtn.on("pointerdown", ()=>{
            mainMenuText.y += 3;
        })
        this.mainMenuBtn.on("pointerup", ()=>{
            mainMenuText.y -= 3;
            this.mainMenuBtn.anims.play('btnPress',true);
            this.scene.get('GameScene').data.set('score', 0);
            confirmSFX.play();
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            });
        })

        this.cursors = this.input.keyboard.createCursorKeys(); // keyboard controls
    }

    update()
    {
        // bind SPACEBAR to restart game or return to GameScene.js
        if (this.cursors.space.isDown) { this.scene.start("GameScene") }
    }
}