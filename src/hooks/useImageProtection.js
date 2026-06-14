import { useEffect, useRef } from 'react';

const useImageProtection = (elementRef) => {
  useEffect(() => {
    if (!elementRef?.current) return;

    const element = elementRef.current;

    // Prevent right-click (context menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent image save
    const handleMouseDown = (e) => {
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    };

    element.addEventListener('contextmenu', handleContextMenu);
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('mousedown', handleMouseDown);

    return () => {
      element.removeEventListener('contextmenu', handleContextMenu);
      element.removeEventListener('dragstart', handleDragStart);
      element.removeEventListener('mousedown', handleMouseDown);
    };
  }, [elementRef]);
};

export default useImageProtection;
