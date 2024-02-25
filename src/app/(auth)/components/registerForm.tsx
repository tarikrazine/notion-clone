"use client";

import { useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Loader, UserPlus } from "lucide-react";
import { toast } from "sonner";

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
import FormServerErrors from "@/components/formServerErrors";

import { RegisterSchema, RegisterSchemaType } from "@/schema/register.schema";
import { register } from "@/actions/register";
import FormServerSuccess from "@/components/formServerSuccess";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [serverValidationError, setServerValidationError] = useState<
    Record<string, string[] | undefined>
  >({});
  const [confirmation, setConfirmation] = useState(false);

  const exchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const form = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const { execute: registerAction, status } = useAction(register, {
    onSuccess(data) {
      if (data?.error) {
        form.reset();
        setSubmitError(data.message);
      }

      if (data?.success) {
        form.reset();
        // Todo: Toast for confirmation email
        setSubmitSuccess("Check your email for confirmation link");
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

  function handleFormSubmit(values: RegisterSchemaType) {
    setServerValidationError({});
    setSubmitError("");
    setSubmitSuccess("");

    registerAction({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
        onChange={() => {
          if (submitError) setSubmitError("");
          if (submitSuccess) setSubmitSuccess("");
          if (serverValidationError) setServerValidationError({});
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
          <FormField
            name="confirmPassword"
            control={form.control}
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
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
        <FormServerSuccess success={submitSuccess} />
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <UserPlus className="mr-2 h-5 w-5" />
          )}
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
