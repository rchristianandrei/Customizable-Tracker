import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import type { AxiosResponse } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  onRegister?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<AxiosResponse<any, any, {}>> | void;
  onLogin?: () => void;
}

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "field is required",
      })
      .regex(/\S+@\S+\.\S+/, {
        message: "Invalid email address",
      }),
    firstName: z
      .string()
      .min(1, {
        message: "field is required",
      })
      .max(100, {
        message: "must be at most 100 characters",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "field is required",
      })
      .max(100, {
        message: "must be at most 100 characters",
      }),
    password: z
      .string()
      .min(2, {
        message: "field is required",
      })
      .max(20, {
        message: "must be at most 20 characters",
      }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({ onRegister, onLogin }: RegisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onSubmitError, setOnSubmitError] = useState("");

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return (score / 4) * 100;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (loading) return;
    setLoading(true);
    setOnSubmitError("");

    try {
      await onRegister?.(data);
      form.reset();
      toast.success("Sucessfully Registered");
    } catch (error: any) {
      setOnSubmitError(() => error.response?.data ?? "Unavailable to Register");
      toast.error("Failed to Register");
    }

    // if (success) {
    //   form.reset();
    //   toast.success("Sucessfully Registered");
    // } else {
    //   toast.error("Failed to Register");
    // }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                disabled={loading}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                disabled={loading}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Email */}
            <FieldGroup className="">
              <Controller
                name="email"
                disabled={loading}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="on"
                    />
                    {/* <FieldDescription>
                      Please enter your email address.
                    </FieldDescription> */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Password */}
            <FieldGroup className="">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => {
                  const passwordStrength = getPasswordStrength(field.value);
                  const showStrength = field.value?.length > 0;

                  return (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor="password">Password</FieldLabel>

                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          disabled={loading}
                          {...field}
                        />

                        <button
                          type="button"
                          disabled={loading}
                          tabIndex={-1}
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {showStrength && (
                        <Progress value={passwordStrength} className="h-2" />
                      )}

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            {/* Confirm Password */}
            <FieldGroup className="">
              <Controller
                name="confirmPassword"
                disabled={loading}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Terms */}
            <FieldGroup className="flex-row gap-1">
              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        aria-invalid={fieldState.invalid}
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <FieldLabel className="text-sm leading-none">
                        I agree to the{" "}
                        <a
                          tabIndex={-1}
                          href="/terms"
                          className="underline hover:text-primary"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          tabIndex={-1}
                          href="/privacy"
                          className="underline hover:text-primary"
                        >
                          Privacy Policy
                        </a>
                      </FieldLabel>
                    </Field>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {onSubmitError && (
              <FieldGroup className="text-center text-sm text-red-600">
                {onSubmitError}
              </FieldGroup>
            )}

            {/* Buttons */}
            <FieldGroup className="flex flex-col gap-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onLogin}
                disabled={loading}
              >
                Back to Login
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
