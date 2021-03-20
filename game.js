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
        key: 'up',
        frameRate: 7,
        frames: this.anims.generateFrameNumbers('witch', { start: 4, end: 6 }),
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frameRate: 7,
        frames: this.anims.generateFrameNumbers('witch', { start: 7, end: 9 }),
        repeat: -1
    });
    this.anims.create({
        key: 'ollie',
        frameRate: 7,
        frames: this.anims.generateFrameNumbers('witch', { start: 7, end: 9 }),
        repeat: -1
    });
    this.add.image(400, 250, 'sky');
    player = this.add.sprite(100, 100, 'witch');
}

// Update Function
function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown && player.y>50) {
        player.y += -4;
        player.anims.play('up', true);
    } else if (cursors.down.isDown && player.y<450) {
        player.y += 4;
        player.anims.play('down', true);
    };
}