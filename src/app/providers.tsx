import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <MotionConfig reducedMotion='user'>{children}</MotionConfig>
    </ThemeProvider>
  );
}
