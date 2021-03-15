const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('witch',
        'assets/witch.png', {
            frameWidth: 100,
            frameHeight: 100
        }
    );

}

function create() {
    this.anims.create({
        key: "fly",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("witch", { start: 1, end: 6 }),
        repeat: -1
    });
    this.add.image(400, 250, 'sky');
    const player = this.add.sprite(100, 100, 'witch');
    player.play('fly')

}