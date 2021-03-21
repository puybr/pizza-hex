class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'titleScene',
            active: true
        });
    }

    preload() {
        this.load.image('title', 'assets/title.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('pentagram', 'assets/pentagram.png');
    }

    create() {
        this.add.image(390, 250, 'title');
        // this.add.image(400, 150, 'pentagram');
        const text = this.add.image(400, 350, 'start');
        text.setInteractive({useHandCursor: true});
        text.on('pointerdown', () => this.clickButton());
    }
    clickButton() {
        this.scene.switch('gameScene');
    }

}

export default TitleScene;