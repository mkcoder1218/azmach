import type { ComponentProps } from 'react';

export function Input(props: ComponentProps<'input'>) {
  return <input data-slot="input" {...props} />;
}

export function Textarea(props: ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" {...props} />;
}

export function Label(props: ComponentProps<'label'>) {
  return <label data-slot="label" {...props} />;
}

export function Button(props: ComponentProps<'button'>) {
  return <button data-slot="button" {...props} />;
}

export function NativeSelect(props: ComponentProps<'select'>) {
  return <select data-slot="native-select" {...props} />;
}
