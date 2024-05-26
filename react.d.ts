import type { NextRequest, NextResponse } from "next/server";
import type { FC, PropsWithChildren, ReactNode } from "react";

declare module "react" {
  export declare type FCC<P = {}> = FC<PropsWithChildren<P>>;
  export declare type Page<P = {}, SP = {}> = FC<RouterParams<P, SP>>;
  export declare type RouteHandler<P = {}> = (
    request: NextRequest,
    context: RouteHandlerContext<P>
  ) => Promise<Response | NextResponse>;
  export declare type Layout<P = {}> = FCC<RouterParams<P>>;
}

declare type RouteHandlerContext<P> = {
  params: P;
};
declare type RouterParams<P, SP> = {
  params: P;
  searchParams: SP;
};
