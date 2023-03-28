class CreditScene extends Phaser.Scene
{
    constructor() 
    { 
        super("CreditScene")
        this.backButton;
    }

    create() 
    {
        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        let declineSFX = this.sound.add('declineSFX');
        
        // text display for DEVELOPER INFORMATION
        let devInfo = this.add.text(config.width * .1,config.height * .1, "Created by: Guillan Fredd T. Parreño \nSection: A223 \nProgram: EMC " ,
        { fontSize: '45px', fill: '#fff' , fontStyle: 'italic' , fontFamily: 'impact'});
        devInfo.setShadow(2, 2, '#000', 5, true, true);

        // back button
        this.backButton = this.add.sprite(config.width * .05, config.height * .1, 'uiButtonSmall');
        this.backButton.setScale(2)
        
        this.backButton.setInteractive();
        // button events for BACK BUTTON
        this.backButton.on("pointerover", ()=>{
            this.backButton.setTint(0xffe8a8)
        })
        this.backButton.on("pointerout", ()=>{
            this.backButton.clearTint();
        })
        this.backButton.on("pointerdown", ()=>{

        })
        this.backButton.on("pointerup", ()=>{
            declineSFX.play();
            this.backButton.anims.play('btnPressSmall',true);
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            });
        })
    }
}