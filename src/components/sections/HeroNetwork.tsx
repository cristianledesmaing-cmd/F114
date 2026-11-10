type Point = readonly [number, number];

/**
 * Mallado tipo telaraña en toda el área del hero.
 * Sin hueco: el logo de Nodo se dibuja encima y tapa el mallado.
 */
function buildMesh() {
  const cols = 22;
  const rows = 16;
  const x0 = 1;
  const y0 = 2;
  const x1 = 99;
  const y1 = 98;
  const stepX = (x1 - x0) / cols;
  const stepY = (y1 - y0) / rows;

  const grid: Point[][] = [];

  for (let r = 0; r <= rows; r++) {
    const row: Point[] = [];
    for (let c = 0; c <= cols; c++) {
      const jx = ((r * 17 + c * 31) % 7) * 0.1 - 0.3;
      const jy = ((r * 23 + c * 11) % 7) * 0.1 - 0.3;
      const x = x0 + c * stepX + (c === 0 || c === cols ? 0 : jx);
      const y = y0 + r * stepY + (r === 0 || r === rows ? 0 : jy);
      row.push([x, y]);
    }
    grid.push(row);
  }

  const pointKey = (p: Point) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
  const points: Point[] = [];
  const indexOf = new Map<string, number>();

  function ensure(p: Point) {
    const key = pointKey(p);
    const existing = indexOf.get(key);
    if (existing !== undefined) return existing;
    const i = points.length;
    points.push(p);
    indexOf.set(key, i);
    return i;
  }

  const edgeSet = new Set<string>();
  const edges: Array<[number, number]> = [];

  function addEdge(a: Point, b: Point) {
    const ia = ensure(a);
    const ib = ensure(b);
    const key = ia < ib ? `${ia}-${ib}` : `${ib}-${ia}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push([ia, ib]);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = grid[r][c];
      const tr = grid[r][c + 1];
      const bl = grid[r + 1][c];
      const br = grid[r + 1][c + 1];

      const split = (r + c) % 3 !== 1;
      if (split) {
        const diagA = (r + c) % 2 === 0;
        if (diagA) {
          addEdge(tl, tr);
          addEdge(tr, br);
          addEdge(br, tl);
          addEdge(tl, bl);
          addEdge(bl, br);
        } else {
          addEdge(tl, tr);
          addEdge(tr, bl);
          addEdge(bl, tl);
          addEdge(tr, br);
          addEdge(br, bl);
        }
      } else {
        addEdge(tl, tr);
        addEdge(tr, br);
        addEdge(br, bl);
        addEdge(bl, tl);
      }
    }
  }

  return { points, edges };
}

const { points, edges } = buildMesh();

const degree = points.map(() => 0);
for (const [a, b] of edges) {
  degree[a] += 1;
  degree[b] += 1;
}

type MeshBackgroundProps = {
  className?: string;
};

export function HeroNetwork({ className = "opacity-[0.075]" }: MeshBackgroundProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full text-white ${className}`}
    >
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={points[a][0]}
          y1={points[a][1]}
          x2={points[b][0]}
          y2={points[b][1]}
          stroke="currentColor"
          strokeWidth="0.09"
        />
      ))}
      {points.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={degree[i] >= 4 ? 0.2 : 0.12}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
