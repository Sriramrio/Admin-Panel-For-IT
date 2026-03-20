// "use client";

// import { memo, useCallback, useEffect, useRef } from "react";
// import { cn } from "../../lib/utils";
// import { animate } from "motion/react";

// interface GlowingEffectProps {
//   blur?: number;
//   proximity?: number;
//   spread?: number;
//   className?: string;
//   disabled?: boolean;
// }

// const GlowingEffect = memo(
//   ({
  
//     className,
//     disabled = false, // ✅ MUST be false
//   }: GlowingEffectProps) => {
//     const ref = useRef<HTMLDivElement>(null);

//     const handleMove = useCallback((e: PointerEvent) => {
//       if (!ref.current) return;

//       const rect = ref.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;

//       const angle =
//         (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 90;

//       animate(
//         parseFloat(ref.current.style.getPropertyValue("--start") || "0"),
//         angle,
//         {
//           duration: 0.6,
//           onUpdate: (v) => {
//             ref.current?.style.setProperty("--start", String(v));
//           },
//         }
//       );

//       ref.current.style.setProperty("--active", "1");
//     }, []);

//     useEffect(() => {
//       if (disabled) return;

//       window.addEventListener("pointermove", handleMove);
//       return () => window.removeEventListener("pointermove", handleMove);
//     }, [handleMove, disabled]);

//     return (
//       <div
//         ref={ref}
//         style={
//           {
//             "--start": "0",
//             "--active": "0",
//           } as React.CSSProperties
//         }
//         className={cn(
//           "pointer-events-none absolute inset-0 rounded-xl",
//           className
//         )}
//       >
//         <div
//           className={cn(
//             "absolute inset-0 rounded-xl",
//             "opacity-[var(--active)] transition duration-300",
//             "blur-[20px]"
//           )}
//           style={{
//             background: `conic-gradient(
//               from calc(var(--start) * 1deg),
//               #dd7bbb,
//               #d79f1e,
//               #5a922c,
//               #4c7894,
//               #dd7bbb
//             )`,
//           }}
//         />
//       </div>
//     );
//   }
// );

// GlowingEffect.displayName = "GlowingEffect";
// export { GlowingEffect };