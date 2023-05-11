import { Toast, ToastClose, ToastDescription, ToastProvider, ToastViewport } from '@/components/common/Toast/Toast';
import { useToast } from '@/components/common/Toaster/useToast';

export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ action, description, id, ...props }) => (
        <Toast key={id} {...props}>
          <div className='grid gap-1'>{description && <ToastDescription>{description}</ToastDescription>}</div>
          {action}
          {/* <ToastClose /> */}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};
