import { useRef, useState } from 'react';

interface UseZoomPanParams {
  isZoomable: boolean;
}

export const useZoomPan = ({ isZoomable }: UseZoomPanParams) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const scaleRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const startPoint = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const [hasZoomed, setHasZoomed] = useState(false);

  const applyTransform = () => {
    if (gRef.current) {
      const { x, y } = translateRef.current;
      const scale = scaleRef.current;
      gRef.current.setAttribute('transform', `translate(${x},${y}) scale(${scale})`);
      setHasZoomed(scale !== 1 || x !== 0 || y !== 0);
    }
  };

  const getSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM()?.inverse());
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    if (!isZoomable) return;

    const zoomSpeed = 0.1;
    const direction = e.deltaY > 0 ? -1 : 1;
    const newScale = scaleRef.current * (1 + zoomSpeed * direction);
    const clampedScale = Math.max(0.5, Math.min(newScale, 10));

    const { x: cursorX, y: cursorY } = getSvgPoint(e.clientX, e.clientY);
    const scaleChange = clampedScale / scaleRef.current;

    translateRef.current.x = cursorX - (cursorX - translateRef.current.x) * scaleChange;
    translateRef.current.y = cursorY - (cursorY - translateRef.current.y) * scaleChange;

    scaleRef.current = clampedScale;
    applyTransform();
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isZoomable) return;
    isPanning.current = true;
    startPoint.current = getSvgPoint(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isZoomable || !isPanning.current) return;
    const { x, y } = getSvgPoint(e.clientX, e.clientY);
    const dx = x - startPoint.current.x;
    const dy = y - startPoint.current.y;

    translateRef.current.x += dx;
    translateRef.current.y += dy;

    startPoint.current = { x, y };
    applyTransform();
  };

  const handleMouseUp = () => {
    if (!isZoomable) return;
    isPanning.current = false;
  };

  const resetTransform = () => {
    scaleRef.current = 1;
    translateRef.current = { x: 0, y: 0 };
    applyTransform();
  };

  const attachSvgRef = (node: SVGSVGElement | null) => {
    svgRef.current = node;
    if (node && isZoomable) {
      const stopScroll = (e: WheelEvent) => e.preventDefault();
      node.addEventListener('wheel', stopScroll, { passive: false });
      return () => node.removeEventListener('wheel', stopScroll);
    }
  };

  return {
    svgRef,
    gRef,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetTransform,
    attachSvgRef,
    hasZoomed,
    setHasZoomed,
    scaleRef,
    translateRef,
    applyTransform
  };
};
