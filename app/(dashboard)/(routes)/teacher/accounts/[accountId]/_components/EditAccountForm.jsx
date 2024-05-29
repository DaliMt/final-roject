"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageForm from "./ImageForm";

const formSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  role: z.string().min(1, "Role is required"),
});

export default function EditAccountForm({ userdata, accountId }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userdata?.username,
      email: userdata?.email,
      password: userdata?.password,
      role: userdata?.role,
    },
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      await axios.patch(`/api/accounts/${accountId}`, values);

      // if (userdata.role === "teacher") {
      //   router.push(`/teacher/accounts`);
      // } else {

      router.push(`/`);
      // }

      toast.success("Account updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  async function onDelete() {
    try {
      await axios.delete(`/api/accounts/${accountId}`);
      toast.success("Account deleted");

      router.push(`/teacher/accounts`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const options = [
    { value: "student", label: "student" },
    { value: "teacher", label: "teacher" },
    { value: "admin", label: "admin" },
  ];

  const selectedOption = options.find(
    (option) => option.value === userdata.role
  );

  return (
    <>
      <div className="max-w-5xl mx-auto border bg-sky-700 rounded-md flex md:items-center md:justify-center h-full p-6">
        <div className="flex gap-x-20 items-start">
          <div className="border bg-slate-100 rounded-md p-6">
            <div className="flex items-center gap-x-20">
              <h1 className="text-2xl">Edit The Account</h1>
              {userdata.role === "admin" && (
                <div>
                  <ConfirmModal onConfirm={onDelete}>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </ConfirmModal>
                </div>
              )}
            </div>

            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Username"
                            {...field}
                          />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="mail@example.com"
                            {...field}
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
                          <Input
                            type="password"
                            disabled={isSubmitting}
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {userdata.role === "admin" && (
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-full text-slate-500">
                                <SelectValue
                                  placeholder={
                                    selectedOption?.label || "Select user role"
                                  }
                                />
                              </SelectTrigger>

                              <SelectContent>
                                {options.map((op) => (
                                  <SelectItem key={op.label} value={op.value}>
                                    {op.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-2">
                  {userdata.role === "student" ? (
                    <Link href="/">
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/teacher/analytics">
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </Link>
                  )}

                  <Button
                    type="submit"
                    disabled={!isValid || !isDirty || isSubmitting}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>

          <ImageForm userdata={userdata} accountId={accountId} />
        </div>
      </div>
    </>
  );
}
