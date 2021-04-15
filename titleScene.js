class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'titleScene'
        });
    }

    preload() {
        this.load.image('mushroom-0', 'assets/mush-0.png');
        this.load.image('mushroom-1', 'assets/mush-1.png');
        this.load.image('cloud-0', 'assets/cloud-0.png');
        this.load.image('cloud-1', 'assets/cloud-1.png');
        this.load.image('cloud-2', 'assets/cloud-2.png');
        this.load.image('background', 'assets/background.png');
        this.load.audio('intro', ['assets/jingle-achievement-01.wav']);
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(400, 250, 'background');
        // this.add.image(220,300, 'mushroom-0');
        this.cloudOne = this.add.tileSprite(0, 100, 1600, 800, 'cloud-0');
        console.log(this.cloudOne.tilePositionX);
        this.add.image(220,180, 'mushroom-1');
        // this.add.image(400, 250, 'cloud-1');
        // this.add.image(750, 100, 'cloud-2');
        this.title = this.add.text(400, -500, 'Pizza Hex',
        { color: '#380073',fontSize: 100, fontFamily: 'Alagard'  }).setOrigin(0.5, 0);
        this.add.text(400, 60, 'Press <SPACEBAR> to Start',
        { color: '#380073',fontSize: 50, fontFamily: 'Alagard'  }).setOrigin(0.5, 0);
        this.title.setInteractive({useHandCursor: true});
        this.title.on('pointerdown', () => this.clickButton());
        this.intro = this.sound.add('intro', { loop: false, volume: 0.2 });
        // A U D I O
        if (!this.sound.locked) {
            this.intro.play(); 
        } else {
            this.sound.on('unlocked', () => {
                this.intro.play();
            })
        };
        
    }
    clickButton() {
        this.scene.switch('gameScene');

    }

    update() {
        this.cloudOne.tilePositionX += 0.2
        if (this.cursors.space.isDown) {
            this.scene.switch('gameScene');
        }
        
    }

}

export default TitleScene;