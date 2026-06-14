// Global image protection utility
export const setupGlobalImageProtection = () => {
  // Prevent context menu (right-click) on all images
  document.addEventListener(
    'contextmenu',
    (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.closest('[data-protected-image]') ||
        e.target.closest('.protected-image')
      ) {
        e.preventDefault();
        return false;
      }
    },
    true
  );

  // Prevent drag and drop on all images
  document.addEventListener(
    'dragstart',
    (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.closest('[data-protected-image]') ||
        e.target.closest('.protected-image')
      ) {
        e.preventDefault();
        return false;
      }
    },
    true
  );

  // Prevent mousedown right-click on images
  document.addEventListener(
    'mousedown',
    (e) => {
      if (
        (e.button === 2 || e.button === 1) &&
        (e.target.tagName === 'IMG' ||
          e.target.closest('[data-protected-image]') ||
          e.target.closest('.protected-image'))
      ) {
        e.preventDefault();
        return false;
      }
    },
    true
  );

  // Prevent image selection
  document.addEventListener(
    'selectstart',
    (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.closest('[data-protected-image]') ||
        e.target.closest('.protected-image')
      ) {
        e.preventDefault();
        return false;
      }
    },
    true
  );

  // Apply CSS protection
  const style = document.createElement('style');
  style.innerHTML = `
    img[draggable="false"],
    img.protected-image,
    [data-protected-image] img,
    .protected-image {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      pointer-events: auto;
      -webkit-touch-callout: none;
    }

    img[draggable="false"]::selection,
    img.protected-image::selection,
    [data-protected-image] img::selection,
    .protected-image::selection {
      background: transparent;
    }

    /* Disable image inspect element overlay */
    img[draggable="false"]::-webkit-outer-spin-button,
    img[draggable="false"]::-webkit-inner-spin-button,
    img.protected-image::-webkit-outer-spin-button,
    img.protected-image::-webkit-inner-spin-button {
      display: none;
    }
  `;
  document.head.appendChild(style);
};

// Component wrapper for protected images
export const ProtectedImage = ({
  src,
  alt,
  className = '',
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`protected-image ${className}`}
      draggable={false}
      data-protected-image
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      {...props}
    />
  );
};
