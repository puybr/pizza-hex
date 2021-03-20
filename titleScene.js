class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'titleScene'
        });
    }

    preload() {
        // this.load.image('background', 'assets/sky.png');
    }

    create() {
        // const bg = this.add.sprite(0, 0, 'background');
        // bg.setOrigin(0, 0);

        const text = this.add.text(350, 250, 'Play Game!');
        text.setInteractive({useHandCursor: true});
        text.on('pointerdown', () => this.clickButton());
    }
    clickButton() {
        this.scene.switch('gameScene');
    }

}

export default TitleScene;