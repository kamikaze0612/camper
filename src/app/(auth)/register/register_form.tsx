"use client";
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
import type { RegisterSchema } from "@/schemas/auth";

import { register } from "./action";
import { signIn } from "@/auth";
import { useAtomValue } from "jotai";
import { AlertCircleIcon } from "lucide-react";

export const RegisterForm: React.FC = () => {
  const [error, setError] = useState("");
  const { isPending, startTransition } = useAtomValue(globalTransitionAtom);

  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    setError("");

    startTransition(() =>
      register(values).then((res) => {
        if (res.success) {
          const { email, password } = res.data;

          signIn("credentials", {
            email,
            password,
          });
        } else {
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone number" type="text" />
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
              {error === "UNKNOWN_ERROR" && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p aria-live="polite" className="text-sm text-red-500">
                    Something went wrong
                  </p>
                </>
              )}
              {error === "EMAIL_EXISTING" && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p aria-live="polite" className="text-sm text-red-500">
                    There is already an account with this email
                  </p>
                </>
              )}
            </div>
          )}
          <Button>Register</Button>
        </fieldset>
      </form>
    </Form>
  );
};
