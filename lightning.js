// ============================================================
// LIGHTNING ANIMATION
// ============================================================

const lightningCanvas = document.querySelector("#lightning-canvas");

if (lightningCanvas) {
  const context = lightningCanvas.getContext("2d");

  const startTime = performance.now();
  const duration = 5000;

  let animationFrame;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let devicePixelRatio = 1;

  const resizeLightning = () => {
    devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    lightningCanvas.width = width * devicePixelRatio;
    lightningCanvas.height = height * devicePixelRatio;

    lightningCanvas.style.width = `${width}px`;
    lightningCanvas.style.height = `${height}px`;

    context.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );
  };

  const createBolt = (x, endY, spread) => {
    const points = [{ x, y: -20 }];

    let currentX = x;
    const step = Math.max(25, height / 14);

    for (let y = 0; y < endY; y += step) {
      currentX += (Math.random() - 0.5) * spread;

      points.push({
        x: currentX,
        y: Math.min(y + step, endY)
      });
    }

    return points;
  };

  const drawBolt = (points, alpha, lineWidth) => {
    if (!points || points.length < 2 || alpha <= 0) {
      return;
    }

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }

    context.strokeStyle =
      `rgba(255,255,255,${alpha})`;

    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.shadowBlur = 20;
    context.shadowColor = "#881b1e";

    context.stroke();

    context.shadowBlur = 0;
  };

  // ------------------------------------------------------------
  // YILDIRIMLAR
  // ------------------------------------------------------------

  const strikes = [
    { time: 0,    duration: 700 },
    { time: 850,  duration: 650 },
    { time: 1650, duration: 800 },
    { time: 2550, duration: 600 },
    { time: 3250, duration: 750 },
    { time: 4150, duration: 700 }
  ];

  const createStrike = () => {
    const x =
      width * (0.10 + Math.random() * 0.80);

    const endY =
      height * (0.45 + Math.random() * 0.35);

    const spread =
      width * (0.18 + Math.random() * 0.12);

    const bolt = createBolt(
      x,
      endY,
      spread
    );

    const branches = [];

    // 1-2 yan dal
    const branchCount =
      Math.random() > 0.45 ? 2 : 1;

    for (let i = 0; i < branchCount; i++) {
      const index =
        Math.floor(
          bolt.length *
          (0.25 + Math.random() * 0.45)
        );

      const start = bolt[index];

      branches.push({
        points: [
          start,
          {
            x:
              start.x +
              width *
              (-0.20 + Math.random() * 0.40),

            y:
              start.y +
              height *
              (0.08 + Math.random() * 0.14)
          }
        ]
      });
    }

    return {
      bolt,
      branches
    };
  };

  const lightningStrikes =
    strikes.map(() => createStrike());

  resizeLightning();

  // ------------------------------------------------------------
  // ANIMATION
  // ------------------------------------------------------------

  const renderLightning = (now) => {
    const elapsed =
      now - startTime;

    if (elapsed >= duration) {
      cancelAnimationFrame(animationFrame);

      context.clearRect(
        0,
        0,
        width,
        height
      );

      lightningCanvas.remove();

      window.removeEventListener(
        "resize",
        resizeLightning
      );

      return;
    }

    context.clearRect(
      0,
      0,
      width,
      height
    );

    let screenFlash = 0;

    strikes.forEach((strike, index) => {
      const strikeElapsed =
        elapsed - strike.time;

      if (
        strikeElapsed < 0 ||
        strikeElapsed > strike.duration
      ) {
        return;
      }

      // İlk anda çok parlak
      let flash;

      if (strikeElapsed < 70) {
        flash = 1;
      } else {
        flash =
          Math.max(
            0,
            1 -
            (strikeElapsed - 70) /
            (strike.duration - 70)
          );
      }

      screenFlash =
        Math.max(
          screenFlash,
          flash
        );

      const current =
        lightningStrikes[index];

      // Ana yıldırım
      drawBolt(
        current.bolt,
        flash,
        3.5 + flash * 3
      );

      // Dallar
      current.branches.forEach(
        (branch) => {
          drawBolt(
            branch.points,
            flash * 0.65,
            2
          );
        }
      );
    });

    // Hafif kırmızı ekran parlaması
    if (screenFlash > 0) {
      context.fillStyle =
        `rgba(136,27,30,${screenFlash * 0.07})`;

      context.fillRect(
        0,
        0,
        width,
        height
      );
    }

    animationFrame =
      requestAnimationFrame(
        renderLightning
      );
  };

  window.addEventListener(
    "resize",
    resizeLightning,
    { passive: true }
  );

  animationFrame =
    requestAnimationFrame(
      renderLightning
    );
}