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
        this.load.image('ghost-goblin', 'assets/ghostgoblin.png');
        this.load.image('pizza-guy', 'assets/pizza-guy.png');
    }

    create() {
        const title = this.add.image(390, 250, 'title');
        this.add.image(300, 160, 'ghost-goblin');
        this.add.image(400, 350, 'start');
        this.add.image(420, 140, 'pizza-guy');
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