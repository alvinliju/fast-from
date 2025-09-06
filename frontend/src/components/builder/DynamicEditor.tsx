"use client";

import dynamic from "next/dynamic";

export const FormBuilder = dynamic(() => import("../../app/builder/page"), { ssr: false });