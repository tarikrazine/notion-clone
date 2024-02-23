"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Loader, LogIn } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormValidationErrors from "@/components/formValidationErrors";

import { LoginSchema, LoginSchemaType } from "@/schema/login.schema";
import { login } from "@/actions/login";
import FormServerErrors from "@/components/formServerErrors";

function LoginForm() {
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");
  const [serverValidationError, setServerValidationError] = useState<
    Record<string, string[] | undefined>
  >({});

  const form = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const { execute: loginAction, status } = useAction(login, {
    onSuccess(data) {
      if (data?.error) {
        form.reset();
        setSubmitError(data.message);
      }

      if (data?.success) {
        router.push("/dashboard");
      }
    },
    onError(error) {
      if (error.validationErrors) {
        setServerValidationError(error.validationErrors);
      }
    },
  });

  const id = Object.keys(serverValidationError);

  const isLoading = form.formState.isSubmitting || status === "executing";

  function handleFormSubmit(values: LoginSchemaType) {
    setServerValidationError({});
    setSubmitError("");
    loginAction({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
      >
        <div className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormValidationErrors id={id} errors={serverValidationError} />
        <FormServerErrors error={submitError} />
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-5 w-5" />
          )}
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
