import { useState, useEffect, useRef, useCallback } from "react";

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
  maxPullDistance?: number;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
  maxPullDistance = 120,
}: UsePullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [canPull, setCanPull] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchY = useRef(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (isRefreshing) return;

      const container = containerRef.current;
      if (!container) return;

      // Only allow pull-to-refresh if we're at the top of the scroll
      const isAtTop = container.scrollTop === 0;
      if (!isAtTop) return;

      setStartY(e.touches[0].clientY);
      lastTouchY.current = e.touches[0].clientY;
      setCanPull(true);
    },
    [isRefreshing],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!canPull || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // Only allow pulling down
      if (deltaY > 0) {
        e.preventDefault(); // Prevent default scroll behavior

        const distance = Math.min(deltaY / resistance, maxPullDistance);
        setPullDistance(distance);

        if (distance > 10 && !isPulling) {
          setIsPulling(true);
        }
      }

      lastTouchY.current = currentY;
    },
    [canPull, isRefreshing, startY, resistance, maxPullDistance, isPulling],
  );

  const handleTouchEnd = useCallback(async () => {
    if (!canPull || isRefreshing) return;

    setCanPull(false);

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
      }
    }

    setIsPulling(false);
    setPullDistance(0);
  }, [canPull, isRefreshing, pullDistance, threshold, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const isTriggered = pullDistance >= threshold;

  return {
    containerRef,
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
    isTriggered,
  };
}
