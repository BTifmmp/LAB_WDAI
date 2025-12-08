const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const BIRD_SPRITES_PATHS = [
  "./assets/sprites/yellowbird-downflap.png",
  "./assets/sprites/yellowbird-midflap.png",
  "./assets/sprites/yellowbird-upflap.png",
];
const PIPE_SPRITE_PATH = "./assets/sprites/pipe-green.png";
const BASE_SPRITE_PATH = "./assets/sprites/base.png";
const BACKGROUND_SPRITE_PATH = "./assets/sprites/background-day.png";

const JUMP_SOUND_PATH = "./assets/sounds/wing.wav";
const HIT_SOUND_PATH = "./assets/sounds/hit.wav";
const POINT_SOUND_PATH = "./assets/sounds/point.wav";
const DIE_SOUND_PATH = "./assets/sounds/die.wav";
const SWOOSH_SOUND_PATH = "./assets/sounds/swoosh.wav";

const UI_GAME_OVER_PATH = "./assets/ui/gameover.png";
const UI_GET_READY_PATH = "./assets/ui/message.png";

const SCORES_PATHS = [
  "./assets/UI/Numbers/0.png",
  "./assets/UI/Numbers/1.png",
  "./assets/UI/Numbers/2.png",
  "./assets/UI/Numbers/3.png",
  "./assets/UI/Numbers/4.png",
  "./assets/UI/Numbers/5.png",
  "./assets/UI/Numbers/6.png",
  "./assets/UI/Numbers/7.png",
  "./assets/UI/Numbers/8.png",
  "./assets/UI/Numbers/9.png",
];

// -------- Asset Manager --------- //

const AssetManager = {
  birdImages: [],
  pipeImage: null,
  baseImage: null,
  backgroundImage: null,

  gameOverImage: null,
  getReadyImage: null,

  scoreImages: Array(10).fill(null),

  jumpSound: null,
  hitSound: null,
  pointSound: null,
  dieSound: null,
  swooshSound: null,

  async loadAll() {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    const loadSound = (src) => {
      return new Audio(src);
    };

    await Promise.all(
      BIRD_SPRITES_PATHS.map(async (path) => {
        const img = await loadImage(path);
        this.birdImages.push(img);
      })
    );

    await Promise.all(
      SCORES_PATHS.map(async (path, index) => {
        const img = await loadImage(path);
        this.scoreImages[index] = img;
      })
    );

    this.pipeImage = await loadImage(PIPE_SPRITE_PATH);
    this.baseImage = await loadImage(BASE_SPRITE_PATH);
    this.backgroundImage = await loadImage(BACKGROUND_SPRITE_PATH);

    this.gameOverImage = await loadImage(UI_GAME_OVER_PATH);
    this.getReadyImage = await loadImage(UI_GET_READY_PATH);

    this.jumpSound = loadSound(JUMP_SOUND_PATH);
    this.hitSound = loadSound(HIT_SOUND_PATH);
    this.pointSound = loadSound(POINT_SOUND_PATH);
    this.dieSound = loadSound(DIE_SOUND_PATH);
    this.swooshSound = loadSound(SWOOSH_SOUND_PATH);
  },
};

// -------- Animations --------- //

function SwingAnimation(speed = 10, amplitude = 5) {
  return {
    angle: 0,
    progressTime: 0,
    amplitude: 5,
    speed: 10,
    progress(dt) {
      this.progressTime += dt * speed;
      this.angle = Math.sin(this.progressTime) * amplitude;
      return;
    },
  };
}

function FloatAnimation(speed = 2, amplitude = 10) {
  return {
    offsetY: 0,
    progressTime: 0,
    amplitude: amplitude,
    speed: speed,
    progress(dt) {
      this.progressTime += dt * speed;
      this.offsetY = Math.sin(this.progressTime) * amplitude;
      return;
    },
  };
}

// -------- Global Renderer --------- //
const GlobalRenderer = {
  canvas: canvas,
  ctx: ctx,
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawBird(bird) {
    const birdImg = AssetManager.birdImages[bird.frame]; // your bird image
    const { x, y } = bird.position;
    const angle = (bird.angle * Math.PI) / 180; // convert to radians
    const width = birdImg.width;
    const height = birdImg.height;

    this.ctx.save();

    // Move origin to bird position
    this.ctx.translate(x, y);

    // Rotate around the new origin
    this.ctx.rotate(angle);

    // Draw image centered at origin
    this.ctx.drawImage(birdImg, -width / 2, -height / 2, width, height);

    this.ctx.restore();
  },
  drawPipe(pipe, offsetX) {
    const pipeImg = AssetManager.pipeImage;

    this.ctx.save();
    this.ctx.translate(-offsetX, 0);

    this.ctx.drawImage(
      pipeImg,
      pipe.positionX,
      canvas.height - pipeImg.height + pipe.offsetY + pipe.gap / 2
    );
    this.ctx.save();
    this.ctx.scale(1, -1);
    this.ctx.drawImage(
      pipeImg,
      pipe.positionX,
      -canvas.height + pipeImg.height - pipe.offsetY + pipe.gap / 2
    );
    this.ctx.restore();

    this.ctx.restore();
  },
  drawBase(offsetX = 0) {
    const base = AssetManager.baseImage;
    const imgHeight = base.height;

    this.ctx.save();
    this.ctx.translate(0, this.canvas.height - imgHeight);

    const pattern = this.ctx.createPattern(base, "repeat-x");
    this.ctx.fillStyle = pattern;

    // Fill just the height of the image
    this.ctx.fillRect(0, 0, this.canvas.width, imgHeight);

    this.ctx.save();
    this.ctx.translate(-offsetX, 0);
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(
      offsetX,
      0,
      this.canvas.width + offsetX,
      this.canvas.height
    );
    this.ctx.restore();

    this.ctx.restore();
  },
  drawBackground(offsetX = 0) {
    const bg = AssetManager.backgroundImage;
    // Offscreen canvas for scaled sprite
    const offCanvas = document.createElement("canvas");
    offCanvas.width = (bg.width * this.canvas.height) / bg.height; // scale width to keep aspect ratio
    offCanvas.height = this.canvas.height;
    const offCtx = offCanvas.getContext("2d");
    offCtx.drawImage(bg, 0, 0, offCanvas.width, offCanvas.height);

    // Create repeating pattern
    this.ctx.save();
    this.ctx.translate(-offsetX, 0);
    const pattern = this.ctx.createPattern(offCanvas, "repeat-x");
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(
      offsetX,
      0,
      this.canvas.width + offsetX,
      this.canvas.height
    );
    this.ctx.restore();
  },
  drawGetReady(offsetY = 0) {
    const img = AssetManager.getReadyImage;
    const x = (this.canvas.width - img.width) / 2;
    const y = (this.canvas.height - img.height) / 2 - 30 + offsetY;
    this.ctx.drawImage(img, x, y);
  },
  drawGameOver(angle) {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const img = AssetManager.gameOverImage;
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2 - 30);
    this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.drawImage(img, -img.width / 2, img.height / -2);
    this.ctx.restore();

    this.ctx.fillStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Press SPACE to Restart",
      this.canvas.width / 2,
      this.canvas.height / 2 + img.height / 2 + 40
    );
  },
  drawScore(score) {
    const scoreStr = score.toString();
    const totalWidth =
      scoreStr.length * AssetManager.scoreImages[0].width +
      (scoreStr.length - 1) * 5;
    let startX = (this.canvas.width - totalWidth) / 2;
    const y = 50;
    for (let i = 0; i < scoreStr.length; i++) {
      const digit = parseInt(scoreStr[i]);
      const img = AssetManager.scoreImages[digit];
      this.ctx.drawImage(img, startX, y);
      startX += img.width + 5;
    }
  },
};

// -------- Physics --------- //
const Physics = {
  gravity: 800,
  checkPipeCollision(bird, pipes, offsetX) {
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i];
      const pipeX = pipe.positionX - offsetX;
      const birdX = bird.position.x;

      const axisXcollision =
        birdX + AssetManager.birdImages[0].width / 4 > pipeX &&
        birdX + AssetManager.birdImages[0].width / 4 <
          pipeX + AssetManager.pipeImage.width;
      const axisYcollision =
        bird.position.y - AssetManager.birdImages[0].height / 4 <
          canvas.height -
            AssetManager.pipeImage.height +
            pipe.offsetY -
            pipe.gap / 2 ||
        bird.position.y + AssetManager.birdImages[0].height / 4 >
          canvas.height -
            AssetManager.pipeImage.height +
            pipe.offsetY +
            pipe.gap / 2;

      if (axisYcollision && axisXcollision) {
        return i;
      }
    }
    return -1;
  },
  checkPipeScore(bird, pipes, offsetX) {
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i];
      const pipeX = pipe.positionX - offsetX;
      const birdX = bird.position.x;

      if (!pipe.scored && birdX > pipeX + AssetManager.pipeImage.width) {
        return i;
      }
    }
    return -1;
  },
  checkGroundCollision(bird) {
    const groundY =
      canvas.height -
      AssetManager.baseImage.height -
      AssetManager.birdImages[0].height / 2;
    -AssetManager.baseImage.height;
    if (bird.position.y <= 0 || bird.position.y >= groundY) {
      return true;
    }
    return false;
  },
};

// -------- Bird --------- //
function Bird() {
  return {
    position: { x: 150, y: 200 },
    velocity: { x: 0, y: 0 },
    angle: 0,
    frame: 0,
    lastJumpTime: 0,
    downFlapDuration: 0.1,
    jump() {
      this.frame = (this.frame + 1) % AssetManager.birdImages.length;
      this.velocity.y = -400;
      this.lastJumpTime = 0;

      AssetManager.jumpSound.currentTime = 0;
      AssetManager.jumpSound.volume = 0.4;
      AssetManager.jumpSound.play();

      AssetManager.swooshSound.currentTime = 0;
      AssetManager.swooshSound.volume = 0.2;
      AssetManager.swooshSound.play();
    },
    update(dt) {
      this.velocity.y += Physics.gravity * dt;
      this.velocity.y = Math.min(this.velocity.y, 400);

      this.position.y += this.velocity.y * dt;
      this.position.y = Math.max(
        Math.min(
          canvas.height -
            AssetManager.baseImage.height -
            AssetManager.birdImages[0].height / 2,
          this.position.y
        ),
        0
      );

      this.angle = (this.velocity.y / 400) * 45;
      this.lastJumpTime += dt;
      if (this.lastJumpTime > this.downFlapDuration) {
        if (this.velocity.y < -50) {
          this.frame = 1; // mid-flap
        } else {
          this.frame = 2; // up-flap
        }
      } else {
        this.frame = 0; // down-flap
      }
    },
    onGroundCollision() {
      AssetManager.hitSound.currentTime = 0;
      AssetManager.hitSound.volume = 0.7;
      AssetManager.hitSound.play();
    },

    onPipeCollision() {
      AssetManager.hitSound.currentTime = 0;
      AssetManager.hitSound.volume = 0.7;
      AssetManager.hitSound.play();
    },

    onScorePipe() {
      AssetManager.pointSound.currentTime = 0;
      AssetManager.pointSound.volume = 0.7;
      AssetManager.pointSound.play();
    },
  };
}

// -------- Pipe --------- //
function Pipe(x = 0) {
  return {
    positionX: x,
    offsetY: -120 + Math.random() * 240,
    gap: 140,
    scored: false,
  };
}

// -------- Game States --------- //
const GameStates = {
  GET_READY: "GET_READY",
  PLAYING: "PLAYING",
  GAME_OVER: "GAME_OVER",
};

const PlayingState = {
  score: 0,
  pipeSeparation: 400,
  paused: false,
  isOver: false,
  velocity: 200,
  offsetX: 0,
  bird: Bird(),
  pipes: [],
  handleEvent(event) {
    switch (event) {
      case "SPACE":
        if (this.paused || this.isOver) return;
        this.bird.jump();
        break;
      case "PAUSE":
        this.paused = !this.paused;
        break;
    }
  },
  enter() {
    this.score = 0;
    this.paused = false;
    this.isOver = false;
    (this.velocity = 200), (this.offsetX = 0);
    this.bird = Bird();
    this.pipes = [];
    this._createInitialPipes();
  },

  frame(dt) {
    if (this.paused) return;
    this.offsetX += this.velocity * dt;

    this._updatePipes();
    this.bird.update(dt);

    GlobalRenderer.clear();
    GlobalRenderer.drawBackground(this.offsetX * 0.6);
    this.pipes.forEach((pipe) => {
      GlobalRenderer.drawPipe(pipe, this.offsetX);
    });
    GlobalRenderer.drawBase(this.offsetX);
    GlobalRenderer.drawBird(this.bird);
    GlobalRenderer.drawScore(this.score);

    const groundY =
      canvas.height -
      AssetManager.baseImage.height -
      AssetManager.birdImages[0].height / 2;
    -AssetManager.baseImage.height;

    if (this.isOver && this.bird.position.y >= groundY)
      GameStateMachine.changeState(GameStates.GAME_OVER);

    if (this.isOver) return;

    if (Physics.checkGroundCollision(this.bird)) {
      this.isOver = true;
      this.bird.onGroundCollision();
      this.velocity = 0;
    }

    const collisionPipeIndex = Physics.checkPipeCollision(
      this.bird,
      this.pipes,
      this.offsetX
    );

    if (collisionPipeIndex !== -1) {
      this.isOver = true;
      this.bird.onPipeCollision();
      this.velocity = 0;
    }

    const scoredPipeIndex = Physics.checkPipeScore(
      this.bird,
      this.pipes,
      this.offsetX
    );

    if (scoredPipeIndex !== -1) {
      this.pipes[scoredPipeIndex].scored = true;
      this.bird.onScorePipe();
      this.score += 1;
    }
  },

  _updatePipes() {
    var highestX = 0;
    this.pipes.forEach((pipe) => {
      if (pipe.positionX > highestX) {
        highestX = pipe.positionX;
      }
    });

    this.pipes.forEach((pipe, index) => {
      if (pipe.positionX + 500 < this.offsetX) {
        this.pipes[index] = Pipe(
          highestX + this.pipeSeparation + Math.random() * 50
        );
      }
    });
  },

  _createInitialPipes() {
    for (let i = 0; i < 10; i++) {
      this.pipes.push(Pipe(800 + i * this.pipeSeparation + Math.random() * 50));
    }
  },
};

const GetReadyState = {
  floatAnimation: FloatAnimation(5, 7),
  enter() {},
  handleEvent(event) {
    if (event === "SPACE") {
      GameStateMachine.changeState(GameStates.PLAYING);
    }
  },
  frame(dt) {
    this.floatAnimation.progress(dt);

    GlobalRenderer.clear();
    GlobalRenderer.drawBackground(0);
    GlobalRenderer.drawBase(0);
    GlobalRenderer.drawGetReady(this.floatAnimation.offsetY);
  },
};

const GameOverState = {
  swingAnimation: SwingAnimation(6, 5),
  enter() {},
  handleEvent(event) {
    if (event === "SPACE") {
      console.log("Restarting game...");
      GameStateMachine.changeState(GameStates.GET_READY);
    }
  },
  frame(dt) {
    this.swingAnimation.progress(dt);

    GlobalRenderer.clear();
    PlayingState.frame(0); // draw last frame of playing state
    GlobalRenderer.drawGameOver(this.swingAnimation.angle);
    GlobalRenderer.drawScore(PlayingState.score);
  },
};

const GameStateMachine = {
  currentState: GameStates.PLAYING,
  lastTime: 0,
  changeState(newState) {
    this.currentState = newState;
    switch (newState) {
      case GameStates.PLAYING:
        PlayingState.enter();
        break;
      case GameStates.GAME_OVER:
        GameOverState.enter();
        break;
      case GameStates.GET_READY:
        GetReadyState.enter();
        break;
    }
  },
  handleEvent(event) {
    switch (this.currentState) {
      case GameStates.PLAYING:
        PlayingState.handleEvent(event);
        break;
      case GameStates.GAME_OVER:
        GameOverState.handleEvent(event);
        break;
      case GameStates.GET_READY:
        GetReadyState.handleEvent(event);
        break;
    }
  },
  runFrame(time) {
    const dt = time - this.lastTime;
    if (dt < 16) {
      // ~60 FPS
      requestAnimationFrame(this.runFrame.bind(this));
      return;
    }
    this.lastTime = time;
    switch (this.currentState) {
      case GameStates.GET_READY:
        GetReadyState.frame(dt / 1000);
        break;
      case GameStates.PLAYING:
        PlayingState.frame(dt / 1000);
        break;
      case GameStates.GAME_OVER:
        GameOverState.frame(dt / 1000);
        break;
    }

    requestAnimationFrame(this.runFrame.bind(this));
  },
};

//////////////////
function resize() {
  const dpr = window.devicePixelRatio || 1;

  // Internal resolution
  const INTERNAL_WIDTH = 540;
  const INTERNAL_HEIGHT = 540;

  const windowRatio = window.innerWidth / window.innerHeight;

  canvas.height = INTERNAL_HEIGHT;
  canvas.width = windowRatio * INTERNAL_WIDTH;
}

window.addEventListener("resize", resize, { passive: true });
resize();

async function main() {
  console.log("Loading assets...");
  await AssetManager.loadAll();
  console.log("Assets loaded.");

  GameStateMachine.changeState(GameStates.GET_READY);
  GameStateMachine.runFrame(0);

  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      GameStateMachine.handleEvent("SPACE");
    }
    if (event.code === "KeyP") {
      GameStateMachine.handleEvent("PAUSE");
    }
  });
}

main();
