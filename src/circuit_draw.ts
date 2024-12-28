export class Vector2 {
  x: number;
  y: number;
  constructor(x = 0, y?: number) {
    this.x = x;
    this.y = typeof y !== "number" ? 0 : y;
  }

  add(b: Vector2) {
    return new Vector2(this.x + b.x, this.y + b.y);
  }

  sub(b: Vector2) {
    return new Vector2(this.x - b.x, this.y - b.y);
  }

  scale(c: number) {
    return new Vector2(this.x * c, this.y * c);
  }
}

export enum CircuitSideJointType {
  Empty,
  Cable,
}

export type CircuitSideJointsAvailableData = {
  n: CircuitSideJointType[];
  e: CircuitSideJointType[];
  w: CircuitSideJointType[];
  s: CircuitSideJointType[];
};

export type CellSideJointsData = {
  n: CircuitSideJointType;
  e: CircuitSideJointType;
  w: CircuitSideJointType;
  s: CircuitSideJointType;
};

export enum CircuitJointType {
  Invalid,
  None,
  Terminal,
  Curve,
  Line,
  Tee,
  Cross,
}

export class CircuitJointData {
  type: CircuitJointType;
  rotate: number;
  variant: number;
  raw: CellSideJointsData;

  constructor(
    raw: CellSideJointsData,
    type = CircuitJointType.None,
    rotate = 0,
    variant = 0
  ) {
    this.raw = raw;
    this.type = type;
    this.rotate = rotate;
    this.variant = variant;
  }

  static templates = [
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.None,
      r: 0,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Terminal,
      r: 0,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Terminal,
      r: 1,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Terminal,
      r: 2,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Terminal,
      r: 3,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Curve,
      r: 0,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Curve,
      r: 1,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Curve,
      r: 2,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Curve,
      r: 3,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Line,
      r: 0,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Line,
      r: 1,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      t: CircuitJointType.Tee,
      r: 0,
      v: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Tee,
      r: 1,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Tee,
      r: 2,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Tee,
      r: 3,
      v: 0,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      t: CircuitJointType.Cross,
      r: 0,
      v: 2,
    },
  ];
  static fromSides(
    n?: CircuitSideJointType,
    e?: CircuitSideJointType,
    s?: CircuitSideJointType,
    w?: CircuitSideJointType
  ) {
    if (
      typeof n === "undefined" ||
      typeof e === "undefined" ||
      typeof s === "undefined" ||
      typeof w === "undefined"
    ) {
      return undefined;
    }

    const sideJointsData = { n, e, s, w };
    for (const template of CircuitJointData.templates) {
      if (
        n === template.n &&
        e === template.e &&
        s === template.s &&
        w === template.w
      ) {
        return new CircuitJointData(
          sideJointsData,
          template.t,
          template.r,
          Math.floor(Math.random() * template.v)
        );
      }
    }

    return new CircuitJointData(sideJointsData, CircuitJointType.Invalid);
  }
}

export class CircuitCell implements CircuitSideJointsAvailableData {
  n: CircuitSideJointType[] = [
    CircuitSideJointType.Empty,
    CircuitSideJointType.Cable,
  ];
  e: CircuitSideJointType[] = [
    CircuitSideJointType.Empty,
    CircuitSideJointType.Cable,
  ];
  s: CircuitSideJointType[] = [
    CircuitSideJointType.Empty,
    CircuitSideJointType.Cable,
  ];
  w: CircuitSideJointType[] = [
    CircuitSideJointType.Empty,
    CircuitSideJointType.Cable,
  ];
  joint: CircuitJointData | undefined;

  constructor(joints?: CircuitSideJointsAvailableData) {
    if (joints) {
      this.n = joints.n;
      this.e = joints.e;
      this.s = joints.s;
      this.w = joints.w;
    }
  }

  collapseJoint(type = 1) {
    switch (type) {
      case 3:
        this._collapseJoint2();
        break;
      case 2:
        this._collapseJoint1(0.8);
        break;
      default:
        this._collapseJoint1();
        break;
    }

    this.joint = CircuitJointData.fromSides(
      this.n[0],
      this.e[0],
      this.s[0],
      this.w[0]
    );
  }

  _collapseJoint1(p = 0.5) {
    if (this.n.length > 1) {
      const r = Math.random();
      if (r >= p) {
        this.n = [CircuitSideJointType.Cable];
      } else {
        this.n = [CircuitSideJointType.Empty];
      }
    }
    if (this.e.length > 1) {
      const r = Math.random();
      if (r >= p) {
        this.e = [CircuitSideJointType.Cable];
      } else {
        this.e = [CircuitSideJointType.Empty];
      }
    }
    if (this.s.length > 1) {
      const r = Math.random();
      if (r >= p) {
        this.s = [CircuitSideJointType.Cable];
      } else {
        this.s = [CircuitSideJointType.Empty];
      }
    }
    if (this.w.length > 1) {
      const r = Math.random();
      if (r >= p) {
        this.w = [CircuitSideJointType.Cable];
      } else {
        this.w = [CircuitSideJointType.Empty];
      }
    }
  }

  _collapseJoint2() {
    let avaliables = ["n", "s", "e", "w"];
    let cableCnt = 0;
    if (this.n.length < 2) {
      avaliables = avaliables.filter((ele) => ele !== "n");
      if (this.n[0] === CircuitSideJointType.Cable) {
        cableCnt += 1;
      }
    }
    if (this.e.length < 2) {
      avaliables = avaliables.filter((ele) => ele !== "e");
      if (this.e[0] === CircuitSideJointType.Cable) {
        cableCnt += 1;
      }
    }
    if (this.s.length < 2) {
      avaliables = avaliables.filter((ele) => ele !== "s");
      if (this.s[0] === CircuitSideJointType.Cable) {
        cableCnt += 1;
      }
    }
    if (this.w.length < 2) {
      avaliables = avaliables.filter((ele) => ele !== "w");
      if (this.w[0] === CircuitSideJointType.Cable) {
        cableCnt += 1;
      }
    }

    let order = ["n", "s", "e", "w"];
    const r = Math.random();
    if (r >= 0.9) {
      order = ["e", "w", "n", "s"];
    }
    const r2 = Math.random();
    if (r2 >= 0.5) {
      order = [order[1], order[0], order[3], order[2]];
    }

    while (order.length > 0) {
      const next = order.shift();
      const r = Math.random();
      let failThershold = 0;
      switch (cableCnt) {
        case 0:
          failThershold = 0.7;
          break;
        case 1:
          failThershold = 0.9;
          break;
        case 2:
          failThershold = 0.1;
          break;
        case 3:
          failThershold = 0.3;
          break;
      }
      if (r >= failThershold) {
        continue;
      }

      if (avaliables.find((ele) => ele === next)) {
        switch (next) {
          case "n":
            this.n = [CircuitSideJointType.Cable];
            break;
          case "e":
            this.e = [CircuitSideJointType.Cable];
            break;
          case "s":
            this.s = [CircuitSideJointType.Cable];
            break;
          case "w":
            this.w = [CircuitSideJointType.Cable];
            break;
        }
        avaliables = avaliables.filter((ele) => ele !== next);
        cableCnt += 1;
      }
    }

    if (avaliables.find((v) => v === "n")) {
      this.n = [CircuitSideJointType.Empty];
    }
    if (avaliables.find((v) => v === "e")) {
      this.e = [CircuitSideJointType.Empty];
    }
    if (avaliables.find((v) => v === "s")) {
      this.s = [CircuitSideJointType.Empty];
    }
    if (avaliables.find((v) => v === "w")) {
      this.w = [CircuitSideJointType.Empty];
    }
  }
}

export class CircuitCellGrid {
  gridData: (CircuitCell | undefined)[][] = [];
  hasCell(position: Vector2) {
    return (
      typeof this.gridData[position.y] !== "undefined" &&
      typeof this.gridData[position.y][position.x] !== "undefined"
    );
  }

  getCellData(position: Vector2) {
    if (!this.hasCell(position)) {
      return undefined;
    }
    return this.gridData[position.y][position.x];
  }

  scanNextCellPosition(maxX = 100, maxY = 100) {
    for (let r = 0; r <= maxY; r++) {
      if (typeof this.gridData[r] === "undefined") {
        return new Vector2(0, r);
      }
      for (let c = 0; c <= maxX; c++) {
        if (typeof this.gridData[r][c] === "undefined") {
          return new Vector2(c, r);
        }
      }
    }
  }

  getNewCellWithJoint(cellPosition: Vector2) {
    const nCell = this.getCellData(cellPosition.sub(new Vector2(0, 1)));
    const eCell = this.getCellData(cellPosition.add(new Vector2(1, 0)));
    const sCell = this.getCellData(cellPosition.add(new Vector2(0, 1)));
    const wCell = this.getCellData(cellPosition.sub(new Vector2(1, 0)));

    const joints: CircuitSideJointsAvailableData = {
      n: [CircuitSideJointType.Empty, CircuitSideJointType.Cable],
      e: [CircuitSideJointType.Empty, CircuitSideJointType.Cable],
      w: [CircuitSideJointType.Empty, CircuitSideJointType.Cable],
      s: [CircuitSideJointType.Empty, CircuitSideJointType.Cable],
    };

    if (nCell) {
      joints.n = [...nCell.s];
    }
    if (eCell) {
      joints.e = [...eCell.w];
    }
    if (sCell) {
      joints.s = [...sCell.n];
    }
    if (wCell) {
      joints.w = [...wCell.e];
    }

    return new CircuitCell(joints);
  }

  addCell(position: Vector2, cell: CircuitCell) {
    if (typeof this.gridData[position.y] === "undefined") {
      this.gridData[position.y] = [];
    }
    this.gridData[position.y][position.x] = cell;
  }
}

type DrawFunctionReturn = { z: number; f: () => void }[];
export class CircuitCellDrawer {
  debugJoint = false;
  jointSize = 0.2;
  backgroundColor = "green";
  circuitColor = "gold";
  drawTemplates = [
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitTerminal.bind(this),
      r: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitTerminal.bind(this),
      r: 1,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitTerminal.bind(this),
      r: 2,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitTerminal.bind(this),
      r: 3,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitCurve.bind(this),
      r: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitCurve.bind(this),
      r: 1,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitCurve.bind(this),
      r: 2,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitCurve.bind(this),
      r: 3,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitLine.bind(this),
      r: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitLine.bind(this),
      r: 1,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Empty,
      v: 0,
      fn: this._drawCircuitTee.bind(this),
      r: 0,
    },
    {
      n: CircuitSideJointType.Empty,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitTee.bind(this),
      r: 1,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Empty,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitTee.bind(this),
      r: 2,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Empty,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitTee.bind(this),
      r: 3,
    },
    {
      n: CircuitSideJointType.Cable,
      e: CircuitSideJointType.Cable,
      s: CircuitSideJointType.Cable,
      w: CircuitSideJointType.Cable,
      v: 0,
      fn: this._drawCircuitCross.bind(this),
      r: 0,
    },
  ];

  _cellToRealPosition(
    position: Vector2,
    screenSize: Vector2,
    cellSize: number
  ) {
    return position
      .scale(cellSize)
      .add(new Vector2(cellSize / 2, cellSize / 2));
  }

  getDrawFn(
    ctx: CanvasRenderingContext2D,
    screenSize: Vector2,
    cellSize: number,
    cellGrid: CircuitCellGrid,
    cellPosition: Vector2
  ) {
    const cellData = cellGrid.getCellData(cellPosition);
    const realPosition = this._cellToRealPosition(
      cellPosition,
      screenSize,
      cellSize
    );

    const drawResult: DrawFunctionReturn = [];

    if (cellData) {
      drawResult.push({
        z: 0,
        f: () => this._drawCircuitCellBackground(ctx, cellSize, realPosition),
      });

      if (cellData.joint) {
        const cellJoint = cellData.joint;
        switch (cellJoint.type) {
          case CircuitJointType.Terminal:
            drawResult.push({
              z: 1,
              f: () =>
                this._drawCircuitTerminal(
                  ctx,
                  cellSize,
                  realPosition,
                  cellJoint.rotate,
                  cellJoint.variant
                ),
            });
            break;
          case CircuitJointType.Curve:
            drawResult.push({
              z: 1,
              f: () =>
                this._drawCircuitCurve(
                  ctx,
                  cellSize,
                  realPosition,
                  cellJoint.rotate,
                  cellJoint.variant
                ),
            });
            break;
          case CircuitJointType.Line:
            drawResult.push({
              z: 1,
              f: () =>
                this._drawCircuitLine(
                  ctx,
                  cellSize,
                  realPosition,
                  cellJoint.rotate,
                  cellJoint.variant
                ),
            });
            break;
          case CircuitJointType.Tee:
            drawResult.push({
              z: 1,
              f: () =>
                this._drawCircuitTee(
                  ctx,
                  cellSize,
                  realPosition,
                  cellJoint.rotate,
                  cellJoint.variant
                ),
            });
            break;
          case CircuitJointType.Cross:
            drawResult.push({
              z: 1,
              f: () =>
                this._drawCircuitCross(
                  ctx,
                  cellSize,
                  realPosition,
                  cellJoint.rotate,
                  cellJoint.variant
                ),
            });
            break;
          case CircuitJointType.Invalid:
            drawResult.push({
              z: 1,
              f: () =>
                this._drawCircuitInvalid(
                  ctx,
                  cellSize,
                  realPosition,
                  cellJoint.rotate,
                  cellJoint.variant
                ),
            });
            break;
          default:
            break;
        }
      }

      if (this.debugJoint) {
        drawResult.push({
          z: 2,
          f: () =>
            this._drawCircuitCellDebug(ctx, cellSize, realPosition, cellData),
        });
      }
    }

    return drawResult;
  }

  _drawCircuitCellBackground(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2
  ) {
    const hs = cellSize / 2;

    ctx.fillStyle = this.backgroundColor;
    ctx.translate(realPosition.x, realPosition.y);
    ctx.fillRect(-hs - 1, -hs - 1, cellSize + 2, cellSize + 2);
    ctx.resetTransform();
  }

  _drawCircuitCellIncomplete(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2
  ) {
    const hs = cellSize / 2;

    ctx.fillStyle = "lime";
    ctx.translate(realPosition.x, realPosition.y);
    ctx.fillRect(-hs - 1, -hs - 1, cellSize + 2, cellSize + 2);
    ctx.resetTransform();
  }

  _drawCircuitCellDebug(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    cellData: CircuitCell | undefined
  ) {
    if (!cellData || !cellData.joint) {
      return;
    }
    const hs = cellSize / 2;
    const joints = cellData.joint.raw;
    const fontSize = cellSize * 0.4;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = "black";
    ctx.translate(realPosition.x, realPosition.y);
    ctx.fillText(
      typeof joints.n !== "undefined" ? joints.n.toString() : "?",
      0,
      -hs + 4
    );
    ctx.fillText(
      typeof joints.e !== "undefined" ? joints.e.toString() : "?",
      hs - 4,
      0
    );
    ctx.fillText(
      typeof joints.s !== "undefined" ? joints.s.toString() : "?",
      0,
      hs - 4
    );
    ctx.fillText(
      typeof joints.w !== "undefined" ? joints.w.toString() : "?",
      -hs + 4,
      0
    );
    ctx.resetTransform();
  }

  _drawCircuitTerminal(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    ctx.fillStyle = this.circuitColor;

    const js = cellSize * this.jointSize;
    const hs = cellSize / 2;
    const qs = cellSize / 4;

    ctx.translate(realPosition.x, realPosition.y);
    ctx.rotate((Math.PI * rotate) / 2);
    ctx.beginPath();
    ctx.arc(0, 0, qs, 0, Math.PI * 2, false);
    if (qs > js) {
      ctx.arc(0, 0, qs - js, 0, Math.PI * 2, true);
    }
    ctx.fill();
    ctx.fillRect(-js / 2, -hs - 1, js, hs - (js + qs) / 2 + 1);
    ctx.resetTransform();
  }

  _subdrawCircuitLine(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    ctx.fillStyle = this.circuitColor;

    const js = cellSize * this.jointSize;
    const hs = cellSize / 2;

    ctx.translate(realPosition.x, realPosition.y);
    ctx.rotate((Math.PI * rotate) / 2);
    ctx.fillRect(-js / 2, -hs - 1, js, cellSize + 2);
    ctx.resetTransform();
  }

  _drawCircuitLine(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    this._subdrawCircuitLine(ctx, cellSize, realPosition, rotate);
  }

  _subdrawCircuitCurve(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    ctx.fillStyle = this.circuitColor;

    const js = cellSize * this.jointSize;
    const hjs = js / 2;
    const h3js = hjs * 3;
    const hs = cellSize / 2;

    ctx.translate(realPosition.x, realPosition.y);
    ctx.rotate((Math.PI * rotate) / 2);
    ctx.beginPath();
    ctx.moveTo(hs + 1, hjs);
    ctx.lineTo(js, hjs); //*
    ctx.lineTo(-hjs, -js); //*
    ctx.lineTo(-hjs, -hs - 1);
    ctx.lineTo(hjs, -hs - 1);
    ctx.lineTo(hjs, -h3js); //*
    ctx.lineTo(h3js, -hjs); //*
    ctx.lineTo(hs + 1, -hjs);
    ctx.lineTo(hs + 1, hjs);
    ctx.fill();
    ctx.resetTransform();
  }

  _drawCircuitCurve(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    this._subdrawCircuitCurve(ctx, cellSize, realPosition, rotate);
  }

  _drawCircuitTee(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    this._subdrawCircuitLine(ctx, cellSize, realPosition, rotate);

    ctx.fillStyle = this.circuitColor;

    const js = cellSize * this.jointSize;
    const hs = cellSize / 2;

    ctx.translate(realPosition.x, realPosition.y);
    ctx.rotate((Math.PI * rotate) / 2);
    ctx.fillRect(0, -js / 2, hs + 1, js);
    ctx.resetTransform();
  }

  _drawCircuitCross(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    if (variant === 0) {
      this._subdrawCircuitLine(ctx, cellSize, realPosition, 0);
      this._subdrawCircuitLine(ctx, cellSize, realPosition, 1);
    } else {
      this._subdrawCircuitCurve(ctx, cellSize, realPosition, 0);
      this._subdrawCircuitCurve(ctx, cellSize, realPosition, 2);
    }
  }

  _drawCircuitInvalid(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    realPosition: Vector2,
    rotate = 0,
    variant = 0
  ) {
    const fontSize = cellSize * 0.8;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = this.circuitColor;
    ctx.translate(realPosition.x, realPosition.y);
    ctx.fillText("?", 0, 0);
    ctx.resetTransform();
  }
}
