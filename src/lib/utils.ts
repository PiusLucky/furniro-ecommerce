import { type ClassValue, clsx } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    throw new Error(error);
  } else {
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
}


export const successResponse = (
  data: any,
  message: string = "Success",
  code = 200
) => {
  const response = {
    meta: {
      success: true,
      message,
    },
    data,
  };
  return NextResponse.json({ response }, { status: code });
};

export const errorResponse = (
  message: string = "Error",
  code = 400,
  data: any = null
) => {
  const response = {
    meta: {
      success: false,
      message,
    },
    data,
  };
  return NextResponse.json({ response }, { status: code });
};