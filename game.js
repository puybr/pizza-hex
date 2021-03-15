const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('witch', 
        'assets/witch.png',
        { frameWidth: 100, frameHeight: 100 }
    );

}

function create () {
    this.add.image(400, 250, 'sky');
    const player = this.add.sprite(100, 100, 'witch');

}