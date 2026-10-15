import { Toaster } from 'sonner'

const ABOVE_INPUT_BAR = 'calc(env(safe-area-inset-bottom) + 80px)'

export const AppToaster = () => (
  <Toaster
    position="bottom-center"
    duration={4000}
    offset={{ bottom: ABOVE_INPUT_BAR }}
    mobileOffset={{ bottom: ABOVE_INPUT_BAR, left: 16, right: 16 }}
    swipeDirections={['left', 'right', 'bottom']}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast: 'flex w-full items-center gap-3 rounded-xl bg-content py-1 pr-1 pl-4 text-sm text-surface-raised shadow-lg',
        title: 'min-w-0',
        content: 'min-w-0 flex-1',
        actionButton: 'h-11 flex-none px-3 font-bold text-highlight',
      },
    }}
  />
)
