"use client";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { globalTransitionAtom } from "@/components/global_transition";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LoginSchema } from "@/schemas/auth";

import { login } from "./action";
import { AlertCircleIcon } from "lucide-react";

export const LoginForm: React.FC = () => {
  const [error, setError] = useState("");

  const form = useForm<LoginSchema>();

  const { isPending, startTransition } = useAtomValue(globalTransitionAtom);

  const onSubmit = (values: LoginSchema) => {
    setError("");

    startTransition(() =>
      login(values).then((res) => {
        console.log(res);
        if (!res.success) {
          setError(res.error);
        }
      })
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-y-4" disabled={isPending}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="flex h-8 items-end space-x-1">
              {error === "VALIDATION_ERROR" && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p aria-live="polite" className="text-sm text-red-500">
                    Input data is invalid
                  </p>
                </>
              )}
              {error === "INVALID_CREDENTIALS" && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p aria-live="polite" className="text-sm text-red-500">
                    Email or password is not correct
                  </p>
                </>
              )}
              {error === "UNKNOWN_ERROR" ||
                (error === "UNKNOWN_AUTH_ERROR" && (
                  <>
                    <AlertCircleIcon className="h-5 w-5 text-red-500" />
                    <p aria-live="polite" className="text-sm text-red-500">
                      Something went wrong
                    </p>
                  </>
                ))}
            </div>
          )}
          <Button>Log In</Button>
        </fieldset>
      </form>
    </Form>
  );
};
