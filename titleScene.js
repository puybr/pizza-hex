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
        this.load.image('ghostgoblin', 'assets/ghostgoblin.png');
    }

    create() {
        const title = this.add.image(390, 250, 'title');
        this.add.image(400, 150, 'ghostgoblin');
        this.add.image(400, 350, 'start');
        title.setInteractive({useHandCursor: true});
        title.on('pointerdown', () => this.clickButton());
    }
    clickButton() {
        this.scene.switch('gameScene');
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.space.isDown) {
            this.scene.switch('gameScene');
        }
    }

}

export default TitleScene;