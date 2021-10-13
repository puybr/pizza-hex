class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'titleScene'
        });
    }

    preload() {
        this.load.image('mushroom-0', 'assets/mush-0.png');
        this.load.image('mushroom-1', 'assets/mush-1.png');
        this.load.image('clouds', 'assets/clouds2.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('title', 'assets/title.png');
        this.load.spritesheet('pizza', 'assets/pizza.png', {frameWidth: 100, frameHeight: 100});
        this.load.audio('intro', ['assets/intro.wav']);
        this.loadFont('Minecraft', 'assets/Minecraft.ttf');
    }

    create() {
        this.anims.create({
            key: 'spell',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('pizza', {start: 1, end: 3}),repeat: -1
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(400, 250, 'background');
        this.cloudParallax = this.add.tileSprite(0, 400, 1600, 800, 'clouds');
        this.add.image(610,120, 'mushroom-0');
        this.add.image(150,180, 'mushroom-1');
        this.add.text(350, -80, 'Ghost Goblin Presets',
        { color: '#380073',fontSize: 30, fontFamily: 'Minecraft' }).setOrigin(0.5, 0);
        this.add.text(400, 300, 'Press <SPACEBAR> to Start',
        { color: '#380073',fontSize: 38, fontFamily: 'Minecraft' }).setOrigin(0.5, 0);
        this.add.text(400, 400, 'Press the <UP> and <DOWN> to Fly',
        { color: '#380073',fontSize: 18, fontFamily: 'Minecraft' }).setOrigin(0.5, 0);
        this.add.text(400, 425, '<SPACEBAR> to Cast Spells',
        { color: '#380073',fontSize: 18, fontFamily: 'Minecraft' }).setOrigin(0.5, 0);
        this.add.text(400, 450, 'Hold<SHIFT> to Restart',
        { color: '#380073',fontSize: 18, fontFamily: 'Minecraft' }).setOrigin(0.5, 0);
        this.add.text(320, 125, '© Art by Elliott, the best artist in the world!',
        { color: '#380073',fontSize: 11, fontFamily: 'Minecraft' }).setOrigin(0.5, 0);
        this.title = this.add.image(400,220,'title');
        this.title.setInteractive({useHandCursor: true});
        this.pizza = this.add.sprite(330, 160, 'pizza');
        this.pizza.play('spell', true);
        this.title.on('pointerdown', () => this.clickButton());
        this.intro = this.sound.add('intro', { loop: true, volume: 0.2 });
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

    loadFont(name, url) {
        const newFont = new FontFace('Minecraft', 'url(assets/Minecraft.ttf)');
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
    

    update() {
        this.cloudParallax.tilePositionX += 0.2;
        if (this.cursors.space.isDown) {
            this.scene.switch('gameScene');
        }
        
    }

}

export default TitleScene;