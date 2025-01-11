"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

interface DrawerMenuProps {
  isOpen?: boolean;
  position?: "top" | "right" | "bottom" | "left";
  width?: string;
  height?: string;
  renderContent: () => ReactNode;
  renderTitle?: (() => ReactNode) | null;
  children?: ReactNode;
  animationDuration?: number;
  disableScroll?: boolean;
  autoCloseTimeout?: number | null;
  handleClose: () => void;
  overlayColor?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  handleOverlayClick?: () => void;
  className?: string;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen = false,
  position = "left",
  width = "25%",
  height = "100%",
  renderContent,
  renderTitle = null,
  children,
  animationDuration = 1000,
  disableScroll = true,
  autoCloseTimeout = null,
  handleClose = () => {},
  overlayColor = "rgba(0, 0, 0, 0.5)",
  bgColor = "bg-white",
  textColor,
  borderColor = "yellow",
  handleOverlayClick,
  className,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  //   const router = useRouter();

  //   useEffect(() => {
  //     handleClose();
  //     if (handleClose) handleClose();
  //   }, [router.pathname]);

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen, disableScroll]);

  useEffect(() => {
    if (autoCloseTimeout) {
      if (isOpen) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, autoCloseTimeout);
      } else {
        clearTimeout(timeoutRef.current!);
      }
    }
    return () => clearTimeout(timeoutRef.current!);
  }, [isOpen, autoCloseTimeout, handleClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      return;
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  const positionStyles = {
    top: {
      classes: "-translate-y-full",
      style: { top: "0", left: "0", width: "100%", height },
    },
    right: {
      classes: "translate-x-full h-full border",
      style: {
        right: "0",
        top: "0",
        height: "100%",
        borderRight: 0,
        borderTop: 0,
        borderBottom: 0,
        width,
      },
    },
    bottom: {
      classes: "translate-y-full",
      style: { bottom: "0", left: "0", width: "100%", height },
    },
    left: {
      classes: "-translate-x-full h-full border-r",
      style: {
        left: "0",
        top: "0",
        borderLeft: 0,
        borderTop: 0,
        borderBottom: 0,
        height: "100%",
        width,
      },
    },
  };

  const drawerClasses = clsx(
    "fixed transition-transform overflow-auto",
    className,
    `duration-${animationDuration}`,
    bgColor,
    textColor,
    borderColor,
    {
      "transform-none": isOpen,
    },
    positionStyles[position].classes
  );

  const drawerStyle = {
    ...positionStyles[position].style,
    zIndex: 1000,
  };

  const overlayClasses = clsx(
    "fixed inset-0 transition-opacity",
    `duration-${animationDuration}`,
    {
      "opacity-0 pointer-events-none": !isOpen,
      "opacity-100 z-[1000]": isOpen,
    }
  );

  return (
    <>
      <div
        className={overlayClasses}
        onClick={handleOverlayClick}
        style={{ backgroundColor: overlayColor }}
      />
      <div className={drawerClasses} style={drawerStyle}>
        {renderTitle && <div className="p-4">{renderTitle()}</div>}
        <div>{renderContent()}</div>
      </div>
      {children}
    </>
  );
};

export default DrawerMenu;
