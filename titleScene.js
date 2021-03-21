class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'titleScene',
            active: true
        });
    }

    preload() {
        this.load.image('title', 'assets/title.png');
    }

    create() {
        // const bg = this.add.sprite(407, 184, 'title');
        // title.setOrigin(100, 100);
        this.add.image(400, 250, 'title');

        const text = this.add.text(350, 350, 'Play Game!');
        text.setInteractive({useHandCursor: true});
        text.on('pointerdown', () => this.clickButton());
    }
    clickButton() {
        this.scene.switch('gameScene');
    }

}

export default TitleScene;