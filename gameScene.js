class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameScene',
        });
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('witch',
            'assets/witch.png', {
                frameWidth: 200,
                frameHeight: 200
            }
        );

    }

    create() {
        this.anims.create({
            key: 'up',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('witch', {
                start: 2,
                end: 6
            }),
            repeat: 0
        });
        this.anims.create({
            key: 'down',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('witch', {
                start: 9,
                end: 12
            }),
            repeat: 0
        });
        this.anims.create({
            key: 'fly',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('witch', {
                start: 1,
                end: 3
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'ollie',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('witch', {
                start: 13,
                end: 24
            }),
            repeat: 0
        });
        this.add.image(400, 250, 'sky');
        this.player = this.add.sprite(100, 100, 'witch');
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.up.isDown && this.player.y > 50) {
            this.player.y += -4;
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown && this.player.y < 450) {
            this.player.y += 4;
            this.player.anims.play('down', true);
        } else if (this.cursors.space.isDown) {
            this.player.anims.play('ollie', true);
            
        };

    }
}

export default GameScene;