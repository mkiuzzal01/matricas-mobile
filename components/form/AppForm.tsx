import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { View } from "react-native";

interface AppFormProps<
  T extends FieldValues = FieldValues,
> extends UseFormProps<T> {
  children: React.ReactNode;
  onSubmit: (values: T, reset: () => void) => void | Promise<void>;
}

export default function AppForm<T extends FieldValues>({
  children,
  onSubmit,
  ...formOptions
}: AppFormProps<T>) {
  const methods = useForm<T>(formOptions);

  const submit: SubmitHandler<T> = async (values) => {
    await onSubmit(values, () => methods.reset());
  };

  return (
    <FormProvider {...methods}>
      <View>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                __submit: submit,
              })
            : child,
        )}
      </View>
    </FormProvider>
  );
}
