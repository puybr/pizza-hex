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
        this.add.image(400, 250, 'background');
        // this.add.image(220,300, 'mushroom-0');
        this.add.image(220,180, 'mushroom-1');
        this.add.image(20, 100, 'cloud-0');
        this.add.image(400, 250, 'cloud-1');
        this.add.image(750, 100, 'cloud-2');
        this.title = this.add.text(400, -500, 'Pizza Hex',
        { color: '#380073',fontSize: 100, fontFamily: 'Alagard'  }).setOrigin(0.5, 0);
        this.add.text(400, 60, 'Press <SPACEBAR> to Start',
        { color: '#FFBBE2',fontSize: 50, fontFamily: 'Alagard'  }).setOrigin(0.5, 0);
        this.title.setInteractive({useHandCursor: true});
        this.title.on('pointerdown', () => this.clickButton());
        this.intro = this.sound.add('intro', { loop: false, volume: 0.2 });
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.space.isDown) {
            this.scene.switch('gameScene');
        }
        console.log(this.sound.locked);
        console.log(this.sound.context.state);
        if (!this.sound.locked) {
            this.intro.play();
        } else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.intro.play()
            })
        };
        
    }
    clickButton() {
        this.scene.switch('gameScene');

    }

    update() {
        
    }

}

export default TitleScene;