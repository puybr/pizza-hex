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
        // this.load.image('icon', 'assets/icon.png');
    }

    create() {
        const title = this.add.image(390, 250, 'title');
        this.add.image(300, 160, 'ghost-goblin');
        this.add.image(400, 350, 'start');
        this.add.image(400, 150, 'pizza-guy');
        // this.add.image(220, 150, 'icon');
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