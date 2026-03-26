import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import type { ButtonProps } from "../../components/ui/button";
import { MousePointerClick } from "lucide-react";

// ✅ Props (fixed with children support)
type ParticleButtonProps = React.PropsWithChildren<ButtonProps> & {
  onSuccess?: () => void;
  successDuration?: number;
};

// ✅ Particle Animation Component
function SuccessParticles({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const rect = buttonRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return (
    <AnimatePresence>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-black dark:bg-white rounded-full pointer-events-none"
          style={{ left: centerX, top: centerY }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            y: [0, -Math.random() * 50 - 20],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </AnimatePresence>
  );
}

// ✅ Main Button Component
function ParticleButton({
  children,
  onClick,
  onSuccess,
  successDuration = 1000,
  className,
  ...props
}: ParticleButtonProps) {
  const [showParticles, setShowParticles] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowParticles(true);

    // ✅ Call parent onClick
    if (onClick) {
      await onClick(e);
    }

    // ✅ Optional success callback
    if (onSuccess) {
      onSuccess();
      setShowParticles(false);
    }

    // ✅ Hide particles after duration
    setTimeout(() => {
      setShowParticles(false);
    }, successDuration);
  };

  return (
    <>
      {showParticles && <SuccessParticles buttonRef={buttonRef} />}

      <Button
        ref={buttonRef}
        onClick={handleClick}
        className={cn(
          "relative flex items-center gap-2",
          showParticles && "scale-95",
          "transition-transform duration-100",
          className,
        )}
        {...props}
      >
        {children}
        <MousePointerClick className="h-4 w-4" />
      </Button>
    </>
  );
}

export { ParticleButton };
