// Initialise the game object
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
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Preload Function
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('witch',
        'assets/witch.png', {
            frameWidth: 100,
            frameHeight: 100
        }
    );

}

// Create Function
function create() {
    this.anims.create({
        key: 'fly',
        frameRate: 7,
        frames: this.anims.generateFrameNumbers('witch', { start: 1, end: 6 }),
        repeat: -1
    });
    this.add.image(400, 250, 'sky');
    player = this.physics.add.sprite(100, 100, 'witch');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.play('fly');
}

// Update Function
function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
        player.setVelocityY(-330);
        player.anims.play('fly', true);
    };
}