"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LinkProps } from "next/link";
import { ComponentPropsWithRef } from "react";

type MotionLinkProps = LinkProps & Omit<ComponentPropsWithRef<"a">, keyof LinkProps>;

const Component = (props: MotionLinkProps) => {
  return <Link {...props} />;
};

export const MotionComponent = motion.create(Component);
