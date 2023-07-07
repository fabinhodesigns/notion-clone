import { ComponentProps, ReactNode } from 'react';

export interface BubbleButtonMenuProps extends ComponentProps<'button'> {
    children: ReactNode
}

export function BubbleButton(props: BubbleButtonMenuProps) {
    return(
        <button className="p-2 text-zinc-600 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-700 hover:bg-zinc-100 data-[active=true]:text-blue-400 "
            {...props}
        />
    ) 
}