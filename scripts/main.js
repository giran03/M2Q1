var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }
        }
    },
    scene: [PreLoadScene,MainMenuScene,GameScene,CreditScene,GameOverScene],
    render: {
        pixelArt: true
    },
    fruitCount: 4, // default: 4
};

const game = new Phaser.Game(config);